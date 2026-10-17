'use client'

import jsPDF from 'jspdf'

import type enUS from '../../translations/en-US.json'

type Translation = typeof enUS

function ensurePageSpace(doc: jsPDF, yPosition: number, requiredSpace = 12) {
  if (yPosition > 297 - 14 - requiredSpace) {
    doc.addPage()
    return 14
  }

  return yPosition
}

function drawSectionTitle(
  doc: jsPDF,
  title: string,
  yPosition: number,
  margin: number,
  minContentSpace = 20,
) {
  const safeY = ensurePageSpace(doc, yPosition, 17 + minContentSpace)
  doc.setDrawColor('#3b82f6')
  doc.line(margin, safeY, 210 - margin, safeY)
  const titleY = safeY + 10
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(title, margin, titleY)

  return titleY + 7
}

function drawWrappedText(doc: jsPDF, text: string, yPosition: number, margin: number) {
  const safeY = ensurePageSpace(doc, yPosition, 16)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  const splitText = doc.splitTextToSize(text, 180)
  doc.text(splitText, margin + 5, safeY)

  return safeY + splitText.length * 7
}

function drawBulletItem(doc: jsPDF, text: string, yPosition: number, margin: number) {
  const safeY = ensurePageSpace(doc, yPosition, 16)
  const splitItem = doc.splitTextToSize(text, 170) as string[]
  const bulletLines = splitItem.map((line, index) =>
    index === 0 ? `• ${line}` : `  ${line}`,
  )

  doc.text(bulletLines, margin + 5, safeY)

  return safeY + bulletLines.length * 7
}

function drawBulletList(doc: jsPDF, items: string[], yPosition: number, margin: number) {
  let currentY = yPosition
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  items.forEach(item => {
    currentY = drawBulletItem(doc, item, currentY, margin)
  })

  return currentY
}

export function generateResumePdf(translation: Translation) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const timeline = translation.pages.about.timeline.content
  const resume = translation.pages.about.resume
  const margin = 14
  let yPosition = margin

  doc.addImage('/logo_1024x1024.png', 'PNG', margin, 2, 20, 20)

  doc.setFontSize(24)
  const nameText = resume.name
  const nameWidth = doc.getTextWidth(nameText)
  const pageWidth = doc.internal.pageSize.getWidth()
  const nameX = (pageWidth - nameWidth) / 2
  doc.text(nameText, nameX, yPosition)
  yPosition += 6
  doc.setFontSize(16)
  const titleText = resume.position
  const titleWidth = doc.getTextWidth(titleText)
  const titleX = (pageWidth - titleWidth) / 2
  doc.text(titleText, titleX, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  const contactLines = [
    `${resume.contact.location} | ${resume.contact.phone}`,
    `${resume.contact.email} | LinkedIn: ${resume.contact.linkedin}`,
    `Portfolio: ${resume.contact.portfolio}`,
  ]

  contactLines.forEach(line => {
    const contactWidth = doc.getTextWidth(line)
    const contactX = (pageWidth - contactWidth) / 2
    doc.text(line, contactX, yPosition)
    yPosition += 6
  })

  yPosition = drawSectionTitle(doc, resume.sections.resume, yPosition, margin, 28)
  yPosition = drawWrappedText(doc, resume.summary, yPosition, margin)
  yPosition += 2

  yPosition = drawSectionTitle(
    doc,
    resume.sections.professionalExperience,
    yPosition,
    margin,
    28,
  )
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  timeline.forEach(entry => {
    yPosition = ensurePageSpace(doc, yPosition, 28)

    doc.setFont('helvetica', 'bold')
    doc.text(
      `${entry.role} ${translation.commons.at} ${entry.company}`,
      margin + 5,
      yPosition,
    )
    yPosition += 7

    doc.setFont('helvetica', 'normal')
    doc.text(`${entry.duration} | ${entry.location}`, margin + 5, yPosition)
    yPosition += 7

    entry.responsibilities.forEach(responsibility => {
      yPosition = drawBulletItem(doc, responsibility, yPosition, margin + 5)
    })

    yPosition += 5
  })

  yPosition = drawSectionTitle(doc, resume.sections.education, yPosition, margin, 30)
  resume.education.forEach(item => {
    yPosition = ensurePageSpace(doc, yPosition, 22)
    doc.setFont('helvetica', 'bold')
    doc.text(item.institution, margin + 5, yPosition)
    yPosition += 7
    doc.setFont('helvetica', 'normal')
    yPosition = drawWrappedText(
      doc,
      `${item.degree} | ${item.period}`,
      yPosition,
      margin,
    )
    yPosition += 5
  })

  yPosition = drawSectionTitle(doc, resume.sections.skills, yPosition, margin, 20)
  yPosition = drawBulletList(doc, resume.skills, yPosition, margin)
  yPosition += 2

  yPosition = drawSectionTitle(doc, resume.sections.languages, yPosition, margin, 20)
  yPosition = drawBulletList(doc, resume.languages, yPosition, margin)
  yPosition += 2

  yPosition = drawSectionTitle(
    doc,
    resume.sections.certifications,
    yPosition,
    margin,
    20,
  )
  yPosition = drawBulletList(doc, resume.certifications, yPosition, margin)
  yPosition += 2

  yPosition = drawSectionTitle(doc, resume.sections.awards, yPosition, margin, 20)
  drawBulletList(doc, resume.awards, yPosition, margin)

  doc.save(resume.file.name)
}
