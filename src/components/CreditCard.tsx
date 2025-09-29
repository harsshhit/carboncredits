import React from 'react';
import type { CarbonCredit } from '../types/carbonCredit';

interface CreditCardProps {
  credit: CarbonCredit;
  onDownloadCertificate: (credit: CarbonCredit, format?: 'HTML' | 'PDF') => void;
}

const CreditCard: React.FC<CreditCardProps> = ({ credit, onDownloadCertificate }) => {
  const isActive = credit.status === 'Active';
  
  return (
    <div className="card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <h3 style={{ color: 'var(--royal-golden)', margin: 0, fontSize: '1.15rem', lineHeight: 1.3 }}>
          {credit.project_name}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className={`badge ${isActive ? 'badge-active' : 'badge-retired'}`}>
            {credit.status}
          </span>
          <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>UNIC {credit.unic_id}</span>
          <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Vintage {credit.vintage}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => onDownloadCertificate(credit, 'HTML')}
          style={{ flex: '1', minWidth: '140px' }}
        >
          Download HTML
        </button>
        <button
          onClick={() => onDownloadCertificate(credit, 'PDF')}
          style={{ flex: '1', minWidth: '140px' }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CreditCard;
