import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  vintageFilter: string;
  onSearchChange: (term: string) => void;
  onVintageChange: (vintage: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  vintageFilter,
  onSearchChange,
  onVintageChange,
}) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input" style={{ position: 'relative', flex: 1 }}>
          <span className="search-icon">🔎</span>
          <input
            type="text"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="select-wrap">
          <select
            value={vintageFilter}
            onChange={(e) => onVintageChange(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">All Vintages</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
