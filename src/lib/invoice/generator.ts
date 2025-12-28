import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface InvoiceData {
  // Company Info
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  companyWebsite: string
  companyTaxId?: string

  // Invoice Info
  invoiceNumber: string
  invoiceDate: Date
  bookingReference: string

  // Customer Info
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string

  // Booking Type
  bookingType: 'property' | 'car' | 'transfer' | 'flight'

  // Line Items
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>

  // Pricing
  subtotal: number
  tax: number
  serviceFee?: number
  cleaningFee?: number
  deposit?: number
  totalAmount: number
  currency: string

  // Payment Info
  paymentMethod: string
  paymentStatus: string

  // Notes
  notes?: string
}

/**
 * Generate PDF invoice for a booking
 */
export async function generateInvoice(data: InvoiceData): Promise<Blob> {
  const doc = new jsPDF()

  // Set font
  doc.setFont('helvetica')

  // Company Logo/Header
  doc.setFontSize(24)
  doc.setTextColor(59, 130, 246) // Blue
  doc.text('Travel LyDian', 20, 20)

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(data.companyAddress, 20, 28)
  doc.text(`Tel: ${data.companyPhone} | Email: ${data.companyEmail}`, 20, 33)
  doc.text(data.companyWebsite, 20, 38)
  if (data.companyTaxId) {
    doc.text(`Tax ID: ${data.companyTaxId}`, 20, 43)
  }

  // Invoice Title
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text('INVOICE', 150, 20)

  // Invoice Info Box
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Invoice #: ${data.invoiceNumber}`, 150, 28)
  doc.text(`Date: ${formatDate(data.invoiceDate)}`, 150, 33)
  doc.text(`Booking Ref: ${data.bookingReference}`, 150, 38)

  // Line separator
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 50, 190, 50)

  // Customer Information
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Bill To:', 20, 60)

  doc.setFontSize(10)
  doc.setTextColor(60, 60, 60)
  doc.text(data.customerName, 20, 68)
  doc.text(data.customerEmail, 20, 73)
  if (data.customerPhone) {
    doc.text(data.customerPhone, 20, 78)
  }
  if (data.customerAddress) {
    doc.text(data.customerAddress, 20, 83)
  }

  // Booking Type Badge
  const yPos = 60
  doc.setFillColor(59, 130, 246)
  doc.roundedRect(150, yPos - 5, 40, 8, 2, 2, 'F')
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.text(data.bookingType.toUpperCase(), 155, yPos)

  // Line Items Table
  const tableStartY = data.customerAddress ? 95 : 90

  autoTable(doc, {
    startY: tableStartY,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: data.items.map((item) => [
      item.description,
      item.quantity.toString(),
      `${data.currency} ${formatCurrency(item.unitPrice)}`,
      `${data.currency} ${formatCurrency(item.total)}`,
    ]),
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' },
    },
  })

  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Pricing Summary (Right aligned)
  const rightX = 140
  let summaryY = finalY

  doc.setFontSize(10)
  doc.setTextColor(60, 60, 60)

  // Subtotal
  doc.text('Subtotal:', rightX, summaryY)
  doc.text(`${data.currency} ${formatCurrency(data.subtotal)}`, 190, summaryY, {
    align: 'right',
  })
  summaryY += 6

  // Service Fee
  if (data.serviceFee && data.serviceFee > 0) {
    doc.text('Service Fee:', rightX, summaryY)
    doc.text(`${data.currency} ${formatCurrency(data.serviceFee)}`, 190, summaryY, {
      align: 'right',
    })
    summaryY += 6
  }

  // Cleaning Fee
  if (data.cleaningFee && data.cleaningFee > 0) {
    doc.text('Cleaning Fee:', rightX, summaryY)
    doc.text(`${data.currency} ${formatCurrency(data.cleaningFee)}`, 190, summaryY, {
      align: 'right',
    })
    summaryY += 6
  }

  // Tax
  doc.text('Tax (8%):', rightX, summaryY)
  doc.text(`${data.currency} ${formatCurrency(data.tax)}`, 190, summaryY, {
    align: 'right',
  })
  summaryY += 6

  // Deposit
  if (data.deposit && data.deposit > 0) {
    doc.text('Deposit:', rightX, summaryY)
    doc.text(`${data.currency} ${formatCurrency(data.deposit)}`, 190, summaryY, {
      align: 'right',
    })
    summaryY += 6
  }

  // Separator line
  doc.setDrawColor(200, 200, 200)
  doc.line(rightX, summaryY, 190, summaryY)
  summaryY += 4

  // Total
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text('Total:', rightX, summaryY)
  doc.text(`${data.currency} ${formatCurrency(data.totalAmount)}`, 190, summaryY, {
    align: 'right',
  })

  // Payment Information
  summaryY += 15
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)

  doc.text('Payment Method:', 20, summaryY)
  doc.text(data.paymentMethod, 60, summaryY)
  summaryY += 6

  doc.text('Payment Status:', 20, summaryY)
  doc.setTextColor(
    data.paymentStatus === 'COMPLETED' ? 34 : data.paymentStatus === 'PENDING' ? 234 : 239,
    data.paymentStatus === 'COMPLETED' ? 197 : data.paymentStatus === 'PENDING' ? 179 : 68,
    data.paymentStatus === 'COMPLETED' ? 94 : data.paymentStatus === 'PENDING' ? 8 : 68
  )
  doc.text(data.paymentStatus, 60, summaryY)

  // Notes
  if (data.notes) {
    summaryY += 15
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('Notes:', 20, summaryY)
    summaryY += 5
    doc.setTextColor(60, 60, 60)
    const splitNotes = doc.splitTextToSize(data.notes, 170)
    doc.text(splitNotes, 20, summaryY)
  }

  // Footer
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('Thank you for choosing Travel LyDian!', 105, pageHeight - 20, {
    align: 'center',
  })
  doc.text('For any questions, please contact us at support@travel.lydian.com', 105, pageHeight - 15, {
    align: 'center',
  })

  // Convert to Blob
  const pdfBlob = doc.output('blob')
  return pdfBlob
}

/**
 * Download invoice as PDF
 */
export function downloadInvoice(data: InvoiceData, filename?: string) {
  generateInvoice(data).then((blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || `invoice-${data.invoiceNumber}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  })
}

/**
 * Get invoice as base64 string
 */
export async function getInvoiceBase64(data: InvoiceData): Promise<string> {
  const blob = await generateInvoice(data)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      resolve(base64.split(',')[1]) // Remove data:application/pdf;base64, prefix
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Helper functions
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function formatCurrency(amount: number): string {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
