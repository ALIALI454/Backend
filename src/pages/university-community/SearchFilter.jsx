// SearchFilter.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchFilter.css'; // Import the external CSS file

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  // Generate years for the last 5 years, including the current year
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchTerm) {
      queryParams.append("search", searchTerm);
    }
    if (filterYear) {
      queryParams.append("year", filterYear);
    }

    // Navigate to the ApprovedPromotions route with the generated query parameters
    // Assuming '/university-community/promotions' is the route for ApprovedPromotions
    navigate(`/university-community/promotions?${queryParams.toString()}`);
  };

  return (
    <div className="search-filter-main-container">
      <p className="announcement-text">View official promotion announcements from HR Board</p>

      <div className="search-filter-inputs-wrapper">
        <div className="search-input-group">
          <label htmlFor="search-name" className="search-label">
            Search by Name or Department:
          </label>
          <input
            id="search-name"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search promotions..."
            className="search-input"
          />
        </div>
        
        <div className="filter-select-group">
          <label htmlFor="filter-year" className="filter-label">
            Filter by Year:
          </label>
          <select
            id="filter-year"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;