// Renders the Storybook sharing card: og/og.html -> public/og.png (1200x630).
// Usage: npm run og -w @datum/storybook   (CHROME=<path> to pick the browser)
// Talks to headless Chrome over the DevTools protocol, so the image has the
// exact size (a plain --screenshot counts the window frame in the height).
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const source = pathToFileURL(path.join(root, 'og', 'og.html')).href
const target = path.join(root, 'public', 'og.png')
const chromePath =
  process.env.CHROME ??
  {
    win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  }[process.platform] ??
  'google-chrome'

const port = 9300 + Math.floor(Math.random() * 500)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'datum-og-'))
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
])
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

try {
  let page
  for (let i = 0; i < 50 && !page; i++) {
    await sleep(200)
    try {
      const targets = await (
        await fetch(`http://127.0.0.1:${port}/json`)
      ).json()
      page = targets.find(t => t.type === 'page')
    } catch {
      // Chrome is still starting.
    }
  }
  if (!page) throw new Error(`Chrome did not start (${chromePath})`)

  const socket = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise(resolve => socket.addEventListener('open', resolve))
  let lastId = 0
  const pending = new Map()
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    pending.get(message.id)?.(message)
    pending.delete(message.id)
  })
  const send = (method, params = {}) =>
    new Promise(resolve => {
      const id = ++lastId
      pending.set(id, resolve)
      socket.send(JSON.stringify({ id, method, params }))
    })

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send('Page.enable')
  await send('Page.navigate', { url: source })
  // Web fonts load from Google Fonts (display=block): give them time.
  await sleep(4000)
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(target, Buffer.from(shot.result.data, 'base64'))
  console.log(`written ${path.relative(process.cwd(), target)}`)
  socket.close()
} finally {
  chrome.kill()
}
