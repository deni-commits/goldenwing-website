import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export interface SeoReportPdfData {
  websiteUrl: string
  score: number
  criticalIssues: number
  warningIssues: number
  passedChecks: number
  issues: Array<{
    severity: 'critical' | 'warning' | 'passed'
    title: string
    description: string
  }>
  title?: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
  }
  description?: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
  }
}

function getScoreColor(score: number): [number, number, number] {
  if (score >= 90) return [0.133, 0.773, 0.369] // green
  if (score >= 70) return [0.949, 0.984, 0.192] // yellow
  if (score >= 50) return [0.976, 0.451, 0.086] // orange
  return [0.937, 0.267, 0.267] // red
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Ausgezeichnet'
  if (score >= 70) return 'Gut'
  if (score >= 50) return 'Verbesserungsbedarf'
  return 'Kritisch'
}

export async function generateSeoReportPdf(data: SeoReportPdfData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const page = pdfDoc.addPage([595, 842]) // A4
  const { width, height } = page.getSize()
  const margin = 50

  const scoreColor = getScoreColor(data.score)
  const scoreLabel = getScoreLabel(data.score)

  let y = height - margin

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.039, 0.039, 0.039),
  })

  // Title
  page.drawText('SEO Analyse Report', {
    x: margin,
    y: height - 55,
    size: 24,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  })

  // URL
  const urlText = data.websiteUrl.length > 50 ? data.websiteUrl.substring(0, 47) + '...' : data.websiteUrl
  page.drawText(urlText, {
    x: margin,
    y: height - 80,
    size: 11,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  })

  // Date
  const dateStr = new Date().toLocaleDateString('de-AT', { dateStyle: 'long' })
  page.drawText(`Erstellt am ${dateStr}`, {
    x: margin,
    y: height - 100,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  })

  // Score
  page.drawText(data.score.toString(), {
    x: width - 100,
    y: height - 70,
    size: 42,
    font: helveticaBold,
    color: rgb(...scoreColor),
  })

  page.drawText('/ 100', {
    x: width - 85,
    y: height - 95,
    size: 12,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  })

  y = height - 160

  // Score Label
  page.drawText(scoreLabel, {
    x: margin,
    y: y,
    size: 18,
    font: helveticaBold,
    color: rgb(...scoreColor),
  })

  y -= 40

  // Summary section
  page.drawText('Zusammenfassung', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.039, 0.039, 0.039),
  })

  y -= 30

  const boxWidth = (width - margin * 2 - 20) / 3
  const boxHeight = 55

  // Critical box
  page.drawRectangle({
    x: margin,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0.996, 0.949, 0.949),
  })
  page.drawText(data.criticalIssues.toString(), {
    x: margin + boxWidth / 2 - 10,
    y: y - 25,
    size: 24,
    font: helveticaBold,
    color: rgb(0.937, 0.267, 0.267),
  })
  page.drawText('Kritisch', {
    x: margin + boxWidth / 2 - 20,
    y: y - 45,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  })

  // Warning box
  page.drawRectangle({
    x: margin + boxWidth + 10,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(1, 0.969, 0.929),
  })
  page.drawText(data.warningIssues.toString(), {
    x: margin + boxWidth + 10 + boxWidth / 2 - 10,
    y: y - 25,
    size: 24,
    font: helveticaBold,
    color: rgb(0.976, 0.451, 0.086),
  })
  page.drawText('Warnungen', {
    x: margin + boxWidth + 10 + boxWidth / 2 - 28,
    y: y - 45,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  })

  // Passed box
  page.drawRectangle({
    x: margin + (boxWidth + 10) * 2,
    y: y - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0.941, 0.992, 0.957),
  })
  page.drawText(data.passedChecks.toString(), {
    x: margin + (boxWidth + 10) * 2 + boxWidth / 2 - 10,
    y: y - 25,
    size: 24,
    font: helveticaBold,
    color: rgb(0.133, 0.773, 0.369),
  })
  page.drawText('Bestanden', {
    x: margin + (boxWidth + 10) * 2 + boxWidth / 2 - 25,
    y: y - 45,
    size: 10,
    font: helvetica,
    color: rgb(0.4, 0.4, 0.4),
  })

  y -= boxHeight + 40

  // Issues section
  page.drawText('Gefundene Probleme', {
    x: margin,
    y: y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.039, 0.039, 0.039),
  })

  y -= 25

  // Sort issues
  const sortedIssues = [...data.issues].sort((a, b) => {
    const order = { critical: 0, warning: 1, passed: 2 }
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3)
  })

  for (const issue of sortedIssues.slice(0, 12)) {
    if (y < 100) break

    const severityColor: [number, number, number] =
      issue.severity === 'critical' ? [0.937, 0.267, 0.267] :
      issue.severity === 'warning' ? [0.976, 0.451, 0.086] :
      [0.133, 0.773, 0.369]

    // Severity dot
    page.drawCircle({
      x: margin + 6,
      y: y + 4,
      size: 5,
      color: rgb(...severityColor),
    })

    // Title
    const titleText = issue.title.length > 60 ? issue.title.substring(0, 57) + '...' : issue.title
    page.drawText(titleText, {
      x: margin + 20,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    })

    y -= 16

    // Description
    const descText = issue.description.length > 80 ? issue.description.substring(0, 77) + '...' : issue.description
    page.drawText(descText, {
      x: margin + 20,
      y: y,
      size: 9,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    })

    y -= 22
  }

  if (data.issues.length > 12) {
    page.drawText(`+ ${data.issues.length - 12} weitere Checks`, {
      x: margin,
      y: y,
      size: 10,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    })
  }

  // Footer CTA
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: 80,
    color: rgb(0.039, 0.039, 0.039),
  })

  page.drawText('Kostenlose Beratung: goldenwing.at/kontakt', {
    x: margin,
    y: 45,
    size: 12,
    font: helveticaBold,
    color: rgb(0.949, 0.984, 0.192),
  })

  page.drawText('GoldenWing Creative Studios | Wien - Dubai - California', {
    x: margin,
    y: 25,
    size: 9,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}
