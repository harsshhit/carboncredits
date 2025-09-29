import jsPDF from 'jspdf';
import type { RetirementCertificate } from '../types/carbonCredit';

export const generateEnhancedPDF = (certificate: RetirementCertificate): void => {
  const doc = new jsPDF();
  
  // Set up colors - Change these for different themes
  
  // Add background - Change RGB values for different background
  doc.setFillColor(10, 10, 10);  // Dark background (10,10,10) or white (255,255,255)
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add border - Change color and thickness
  doc.setDrawColor(212, 175, 55);  // Golden border or change to other colors
  doc.setLineWidth(2);             // Border thickness
  doc.rect(10, 10, 190, 277);
  
  // Add company branding
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFSET CARBON CREDITS', 20, 25);
  
  // Add title
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
//   doc.text('🌱', 20, 45);
  doc.text('CARBON CREDIT RETIREMENT CERTIFICATE', 35, 45);
  
  // Add subtitle
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(244, 228, 188);
//   doc.text('Certificate of Carbon Emission Offset', 20, 45);
  
  // Add divider line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(20, 55, 190, 55);
  
  // Add details section
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE DETAILS', 20, 75);
  
  // Add certificate information
  const details = [
    ['Certificate Number:', certificate.unic_id],
    ['Project Name:', certificate.project_name],
    ['Vintage Year:', certificate.vintage.toString()],
    ['Credit Status:', certificate.status],
    ['Retirement Date:', new Date(certificate.timestamp).toLocaleDateString()],
    ['Retirement Time:', new Date(certificate.timestamp).toLocaleTimeString()],
    ['Certificate ID:', `CERT-${certificate.unic_id.slice(-8)}`],
    ['Verified By:', 'Offset Carbon Credits Platform'],
    ['Full Timestamp:', certificate.timestamp]
  ];
  
  let yPosition = 95;
  details.forEach(([label, value]) => {
    // Label
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(label, 20, yPosition);
    
    // Value
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Handle long text wrapping
    const maxWidth = 160;
    const lines = doc.splitTextToSize(value, maxWidth);
    doc.text(lines, 80, yPosition);
    
    // Move to next line
    yPosition += lines.length * 4 + 8;
  });
  
  // Add footer
  doc.setDrawColor(212, 175, 55);
  doc.line(20, 250, 190, 250);
  
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('This certificate serves as proof of carbon credit retirement and emission offset.', 20, 260);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 20, 270);
  
  // Save the PDF
  doc.save(`carbon-credit-certificate-${certificate.unic_id}.pdf`);
};
