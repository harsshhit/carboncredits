import React, { useState, useMemo } from 'react';
import type { CarbonCredit } from './types/carbonCredit';
import SearchBar from './components/SearchBar';
import CreditCard from './components/CreditCard';
import Pagination from './components/Pagination';
import { generateRetirementCertificate, downloadCertificateAsHTML } from './utils/certificateGenerator';
import { generateEnhancedPDF } from './utils/enhancedPdfGenerator';
import carbonCreditsData from './data/carbonCredits.json';
import './App.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vintageFilter, setVintageFilter] = useState('');
  const [credits] = useState<CarbonCredit[]>(carbonCreditsData as CarbonCredit[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredCredits = useMemo(() => {
    return credits.filter(credit => {
      const matchesSearch = credit.project_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVintage = !vintageFilter || credit.vintage.toString() === vintageFilter;
      return matchesSearch && matchesVintage;
    });
  }, [credits, searchTerm, vintageFilter]);

  const paginatedCredits = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCredits.slice(startIndex, endIndex);
  }, [filteredCredits, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCredits.length / itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, vintageFilter]);

  const handleDownloadCertificate = (credit: CarbonCredit, format: 'HTML' | 'PDF' = 'HTML') => {
    const certificate = generateRetirementCertificate(credit);
    if (format === 'PDF') {
      generateEnhancedPDF(certificate); // Use enhanced PDF generator
    } else {
      downloadCertificateAsHTML(certificate);
    }
  };

  const activeCredits = filteredCredits.filter(credit => credit.status === 'Active').length;
  const retiredCredits = filteredCredits.filter(credit => credit.status === 'Retired').length;

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>🌱 Carbon Credits Dashboard</h1>
        <p style={{ color: 'var(--gray-100)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Track and manage carbon credit retirement certificates with full transparency
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}>
              {activeCredits}
            </div>
            <div style={{ color: 'var(--gray-100)', fontSize: '0.9rem' }}>Active Credits</div>
          </div>
          
          <div style={{ 
            background: 'rgba(107, 114, 128, 0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)'
          }}>
            <div style={{ color: '#6b7280', fontSize: '2rem', fontWeight: 'bold' }}>
              {retiredCredits}
            </div>
            <div style={{ color: 'var(--gray-100)', fontSize: '0.9rem' }}>Retired Credits</div>
          </div>
          
          <div style={{ 
            background: 'rgba(212, 175, 55, 0.1)', 
            padding: '1rem 2rem', 
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <div style={{ color: 'var(--royal-golden)', fontSize: '2rem', fontWeight: 'bold' }}>
              {filteredCredits.length}
            </div>
            <div style={{ color: 'var(--gray-100)', fontSize: '0.9rem' }}>Total Credits</div>
          </div>
        </div>
      </header>

      <SearchBar
        searchTerm={searchTerm}
        vintageFilter={vintageFilter}
        onSearchChange={setSearchTerm}
        onVintageChange={setVintageFilter}
      />

      {filteredCredits.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: 'var(--gray-600)',
          background: 'rgba(26, 26, 26, 0.5)',
          borderRadius: '16px',
          border: '1px solid var(--royal-black-lighter)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ color: 'var(--royal-golden)', marginBottom: '0.5rem' }}>
            No Credits Found
          </h3>
          <p>Try adjusting your search criteria to find carbon credits.</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {paginatedCredits.map((credit) => (
              <CreditCard
                key={credit.unic_id}
                credit={credit}
                onDownloadCertificate={handleDownloadCertificate}
              />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCredits.length}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
};

export default App;
