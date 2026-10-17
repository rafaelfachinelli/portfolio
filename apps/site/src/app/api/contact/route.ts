import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_TO_EMAIL = 'rafael.l.a.fachinelli@gmail.com'
const DEFAULT_FROM_EMAIL = 'Portfolio <onboarding@resend.dev>'

const MIN_NAME_LENGTH = 2
const MIN_MESSAGE_LENGTH = 5
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 200
const MAX_MESSAGE_LENGTH = 4000

// Simple in-memory rate limit (per server instance) to discourage abuse.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestsByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (requestsByIp.get(ip) ?? []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recent)
    return true
  }

  recent.push(now)
  requestsByIp.set(ip, recent)
  return false
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function readString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not configured')
    return NextResponse.json({ error: 'not_configured' }, { status: 500 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (readString(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = readString(body.name, MAX_NAME_LENGTH)
  const email = readString(body.email, MAX_EMAIL_LENGTH)
  const message = readString(body.message, MAX_MESSAGE_LENGTH)

  const isValid =
    name.length >= MIN_NAME_LENGTH &&
    message.length >= MIN_MESSAGE_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!isValid) {
    return NextResponse.json({ error: 'validation' }, { status: 400 })
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio: nova mensagem de ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `<p><strong>Nome:</strong> ${escapeHtml(name)}</p><p><strong>E-mail:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  })

  if (!response.ok) {
    console.error(
      '[contact] Resend error',
      response.status,
      await response.text(),
    )
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
