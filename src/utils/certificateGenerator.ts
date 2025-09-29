import type { CarbonCredit, RetirementCertificate } from '../types/carbonCredit';

export const generateRetirementCertificate = (credit: CarbonCredit): RetirementCertificate => {
  return {
    unic_id: credit.unic_id,
    project_name: credit.project_name,
    vintage: credit.vintage,
    status: credit.status,
    timestamp: new Date().toISOString(),
  };
};

export const downloadCertificateAsHTML = (certificate: RetirementCertificate): void => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carbon Credit Retirement Certificate</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .certificate {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border-radius: 20px;
            padding: 3rem;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 2px solid #d4af37;
            text-align: center;
        }
        .title {
            color: #d4af37;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .subtitle {
            color: #f4e4bc;
            font-size: 1.2rem;
            margin-bottom: 2rem;
            font-weight: 300;
        }
        .divider {
            height: 3px;
            background: linear-gradient(90deg, #d4af37 0%, #b8941f 100%);
            margin: 2rem 0;
            border-radius: 2px;
        }
        .details {
            text-align: left;
            margin: 2rem 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            padding: 0.75rem;
            background: rgba(212, 175, 55, 0.1);
            border-radius: 8px;
            border-left: 4px solid #d4af37;
        }
        .label {
            font-weight: bold;
            color: #d4af37;
        }
        .value {
            color: #ffffff;
            font-family: 'Courier New', monospace;
        }
        .footer {
            margin-top: 2rem;
            color: #6b7280;
            font-size: 0.9rem;
        }
        .logo {
            font-size: 3rem;
            color: #d4af37;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="logo">🌱</div>
        <h1 class="title">Carbon Credit Retirement Certificate</h1>
        <p class="subtitle">Certificate of Carbon Emission Offset</p>
        
        <div class="divider"></div>
        
        <div class="details">
            <div class="detail-row">
                <span class="label">UNIC ID:</span>
                <span class="value">${certificate.unic_id}</span>
            </div>
            <div class="detail-row">
                <span class="label">Project Name:</span>
                <span class="value">${certificate.project_name}</span>
            </div>
            <div class="detail-row">
                <span class="label">Vintage:</span>
                <span class="value">${certificate.vintage}</span>
            </div>
            <div class="detail-row">
                <span class="label">Status:</span>
                <span class="value">${certificate.status}</span>
            </div>
            <div class="detail-row">
                <span class="label">Retirement Date:</span>
                <span class="value">${new Date(certificate.timestamp).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
                <span class="label">Timestamp:</span>
                <span class="value">${certificate.timestamp}</span>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="footer">
            <p>This certificate serves as proof of carbon credit retirement and emission offset.</p>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `carbon-credit-certificate-${certificate.unic_id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCertificateAsPDF = (certificate: RetirementCertificate): void => {
  // For a production app, you'd use a library like jsPDF or html2pdf
  // For this demo, we'll create a simple text-based PDF content
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 500
>>
stream
BT
/F1 24 Tf
100 700 Td
(Carbon Credit Retirement Certificate) Tj
0 -50 Td
/F1 12 Tf
(UNIC ID: ${certificate.unic_id}) Tj
0 -20 Td
(Project Name: ${certificate.project_name}) Tj
0 -20 Td
(Vintage: ${certificate.vintage}) Tj
0 -20 Td
(Status: ${certificate.status}) Tj
0 -20 Td
(Retirement Date: ${new Date(certificate.timestamp).toLocaleDateString()}) Tj
0 -20 Td
(Timestamp: ${certificate.timestamp}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000831 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
890
%%EOF`;

  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `carbon-credit-certificate-${certificate.unic_id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
