'use client'

import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import { Download, Loader } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

export function ResumeDownloadButton() {
  const { translation } = useLanguage()
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4') // Use millimeters and A4 size
    const timeline = translation.pages.about.timeline.content
    const margin = 14 // mm
    let yPosition = margin

    // Add Logo
    doc.addImage('/logo_1024x1024.png', 'PNG', margin, 2, 20, 20)

    // Add Name and Position
    doc.setFontSize(24)
    const nameText = translation.pages.about.resume.name
    const nameWidth = doc.getTextWidth(nameText)
    const pageWidth = doc.internal.pageSize.getWidth()
    const nameX = (pageWidth - nameWidth) / 2
    doc.text(nameText, nameX, yPosition)
    yPosition += 6
    doc.setFontSize(16)
    const titleText = translation.pages.about.resume.position
    const titleWidth = doc.getTextWidth(titleText)
    const titleX = (pageWidth - titleWidth) / 2
    doc.text(titleText, titleX, yPosition)
    yPosition += 10

    // Add Contact Info
    doc.setFontSize(10)
    const contactText = `Ferraz de Vasconcelos - SP, Brazil | LinkedIn: linkedin.com/in/rafaelfachinelli | GitHub: github.com/rafaelfachinelli`
    const contactWidth = doc.getTextWidth(contactText)
    const contactX = (pageWidth - contactWidth) / 2
    doc.text(contactText, contactX, yPosition)
    yPosition += 6

    // Add horizontal line
    doc.setDrawColor('#3b82f6')
    doc.line(margin, yPosition, 210 - margin, yPosition)
    yPosition += 10

    // Add Resume
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(translation.pages.about.resume.sections.resume, margin, yPosition)
    yPosition += 7
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    const summary = translation.pages.about.me.content[0]
    const splitSummary = doc.splitTextToSize(summary, 180)
    doc.text(splitSummary, margin + 5, yPosition)
    yPosition += splitSummary.length * 7 // Add space based on number of lines

    // Add horizontal line
    doc.setDrawColor('#3b82f6')
    doc.line(margin, yPosition, 210 - margin, yPosition)
    yPosition += 10

    // Add Professional Experience
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(
      translation.pages.about.resume.sections.professionalExperience,
      margin,
      yPosition,
    )
    yPosition += 7
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')

    timeline.forEach(entry => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = margin
      }

      // Company and role
      doc.setFont('helvetica', 'bold')
      doc.text(
        `${entry.role} ${translation.commons.at} ${entry.company}`,
        margin + 5,
        yPosition,
      )
      yPosition += 7

      // Duration and location
      doc.setFont('helvetica', 'normal')
      doc.text(`${entry.duration} | ${entry.location}`, margin + 5, yPosition)
      yPosition += 7

      // Responsibilities
      entry.responsibilities.forEach(responsibility => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = margin
        }
        const splitResponsibility = doc.splitTextToSize(responsibility, 170)
        doc.text('• ' + splitResponsibility, margin + 10, yPosition)
        yPosition += splitResponsibility.length * 7
      })

      yPosition += 5
    })

    // Add horizontal line after Professional Experience
    doc.setDrawColor('#3b82f6')
    doc.line(margin, yPosition, 210 - margin, yPosition)
    yPosition += 10

    // Add Skills
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(translation.pages.about.resume.sections.skills, margin, yPosition)
    yPosition += 7
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')

    const skills = [
      'HTML5',
      'CSS3',
      'TailwindCSS',
      'JavaScript',
      'TypeScript',
      'React',
      'NextJS',
      'sass',
      'Jest',
      'Vitest',
      'Datadog Rum',
      'Git',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Agile',
      'SCRUM',
      'Clean Code',
      'Kafka',
      'MySQL',
      'Elasticsearch',
      'Logstash',
      'Google Cloud Platform',
      'Firebase',
      'Java',
      'Spring Boot',
      'Semantic Versioning',
    ]

    const skillsLeft = skills.slice(0, Math.ceil(skills.length / 2))
    const skillsRight = skills.slice(Math.ceil(skills.length / 2))

    const startYSkills = yPosition
    skillsLeft.forEach((skill, index) => {
      doc.text(`• ${skill}`, margin + 5, startYSkills + index * 7)
    })

    skillsRight.forEach((skill, index) => {
      doc.text(`• ${skill}`, margin + 90, startYSkills + index * 7)
    })

    yPosition =
      startYSkills + Math.max(skillsLeft.length, skillsRight.length) * 7 + 10

    doc.save(translation.pages.about.resume.file.name)
  }

  return (
    <Card className="mb-4 w-full border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="relative flex w-full items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/resume/resume.png"
          alt={translation.pages.about.resume.title}
          width={200}
          height={400}
          priority
          className="rounded-lg object-cover transition-transform duration-500 select-none hover:scale-105"
          title={translation.pages.about.resume.downloadDescription}
          onLoad={() => setIsLoadingImage(false)}
          onError={() => {
            setIsLoadingImage(false)
          }}
        />
        {isLoadingImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
      </motion.div>
      <p className="text-foreground text-center text-sm">
        {translation.pages.about.resume.downloadDescription}
      </p>
      <Button
        onClick={generatePDF}
        className="flex w-full cursor-pointer items-center gap-2"
        variant="secondary"
      >
        <Download className="h-4 w-4" />
        {translation.pages.about.resume.download}
      </Button>
      <div className="flex w-full items-center justify-between">
        <p className="text-foreground text-sm">
          {translation.pages.about.resume.file.name}
        </p>
        <p className="text-foreground text-sm">4.1 MB</p>
      </div>
    </Card>
  )
}
