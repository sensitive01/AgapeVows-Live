import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

const JobsFilter = ({ 
  filterOptions = {
    categories: [],
    jobTypes: [],
    experienceLevels: [],
    locations: [],
    specializations: []
  }, 
  currentFilters = {
    jobType: '',
    location: '',
    experienceLevel: '',
    category: '',
    searchQuery: '',
    sort: '',
    salaryFrom: '',
    salaryTo: ''
  }, 
  onApplyFilters = () => {}, 
  onClose = () => {}
}) => {
  const [openCategory, setOpenCategory] = useState(true);
  const [openExperience, setOpenExperience] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);
  const [openSalary, setOpenSalary] = useState(true);
  const [openSpecialization, setOpenSpecialization] = useState(true);
  
  const [filters, setFilters] = useState({
    jobType: currentFilters.jobType || '',
    location: currentFilters.location || '',
    experienceLevel: currentFilters.experienceLevel || '',
    category: currentFilters.category || '',
    salaryFrom: currentFilters.salaryFrom || '',
    salaryTo: currentFilters.salaryTo || '',
    searchQuery: currentFilters.searchQuery || '',
    sort: currentFilters.sort || ''
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      jobType: '',
      location: '',
      experienceLevel: '',
      category: '',
      salaryFrom: '',
      salaryTo: '',
      searchQuery: '',
      sort: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleSalaryChange = (type, value) => {
    const numValue = value === '' ? '' : parseInt(value);
    setFilters(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const CollapsibleSection = ({ title, isOpen, onToggle, children }) => (
    <div style={{ 
      marginBottom: '24px', 
      borderBottom: '1px solid #e5e7eb', 
      paddingBottom: isOpen ? '20px' : '16px'
    }}>
      <button 
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: '0 0 16px 0',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1e40af',
          textAlign: 'left'
        }}
      >
        {title}
        <span style={{ 
          fontSize: '20px',
          fontWeight: 'bold',
          transition: 'transform 0.2s',
          color: '#6b7280'
        }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      width: '400px',
      height: '100vh',
      background: '#f8fafc',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '24px 20px',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1001,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>Filter Jobs</h3>
        <button 
          onClick={onClose}
          style={{
            background: 'white',
            border: '2px solid #d1d5db',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} color="#6b7280" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Job Type Filter */}
        <CollapsibleSection 
          title="Job Type" 
          isOpen={openType} 
          onToggle={() => setOpenType(!openType)}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filterOptions.jobTypes.map(type => (
              <label key={type} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151'
              }}>
                <input 
                  type="radio" 
                  name="jobType"
                  checked={filters.jobType === type}
                  onChange={() => handleFilterChange('jobType', type)}
                  style={{ 
                    marginRight: '8px',
                    width: '16px',
                    height: '16px',
                    accentColor: '#1e40af'
                  }}
                />
                <span>{type}</span>
              </label>
            ))}
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151'
            }}>
              <input 
                type="radio" 
                name="jobType"
                checked={filters.jobType === ''}
                onChange={() => handleFilterChange('jobType', '')}
                style={{ 
                  marginRight: '8px',
                  width: '16px',
                  height: '16px',
                  accentColor: '#1e40af'
                }}
              />
              <span>Any Type</span>
            </label>
          </div>
        </CollapsibleSection>

        {/* Location Filter */}
        <CollapsibleSection 
          title="Location" 
          isOpen={openLocation} 
          onToggle={() => setOpenLocation(!openLocation)}
        >
          <select 
            name="location"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '24px',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              color: filters.location ? '#374151' : '#9ca3af'
            }}
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            {filterOptions.locations.map(location => (
              <option key={location} value={location} style={{ color: '#374151' }}>{location}</option>
            ))}
          </select>
        </CollapsibleSection>

        {/* Experience Level Filter */}
        <CollapsibleSection 
          title="Experience Level" 
          isOpen={openExperience} 
          onToggle={() => setOpenExperience(!openExperience)}
        >
          <select 
            name="experienceLevel"
            value={filters.experienceLevel || ''}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '24px',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              color: filters.experienceLevel ? '#374151' : '#9ca3af'
            }}
          >
            <option value="">Any Experience Level</option>
            {filterOptions.experienceLevels.map(level => (
              <option key={level} value={level} style={{ color: '#374151' }}>{level}</option>
            ))}
          </select>
        </CollapsibleSection>

        {/* Job Category Filter */}
        <CollapsibleSection 
          title="Job Category" 
          isOpen={openCategory} 
          onToggle={() => setOpenCategory(!openCategory)}
        >
          <select 
            name="category"
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '24px',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              color: filters.category ? '#374151' : '#9ca3af'
            }}
          >
            <option value="">All Categories</option>
            {filterOptions.categories.map(category => (
              <option key={category} value={category} style={{ color: '#374151' }}>{category}</option>
            ))}
          </select>
        </CollapsibleSection>

        {/* Specialization Filter */}
        <CollapsibleSection 
          title="Specialization" 
          isOpen={openSpecialization} 
          onToggle={() => setOpenSpecialization(!openSpecialization)}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px',
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {filterOptions.specializations.map(specialization => (
              <label key={specialization} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151'
              }}>
                <input 
                  type="radio" 
                  name="category"
                  checked={filters.category === specialization}
                  onChange={() => handleFilterChange('category', specialization)}
                  style={{ 
                    marginRight: '8px',
                    width: '16px',
                    height: '16px',
                    accentColor: '#1e40af'
                  }}
                />
                <span>{specialization}</span>
              </label>
            ))}
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151'
            }}>
              <input 
                type="radio" 
                name="category"
                checked={filters.category === ''}
                onChange={() => handleFilterChange('category', '')}
                style={{ 
                  marginRight: '8px',
                  width: '16px',
                  height: '16px',
                  accentColor: '#1e40af'
                }}
              />
              <span>All Specializations</span>
            </label>
          </div>
        </CollapsibleSection>

        {/* Salary Filter */}
        <CollapsibleSection 
          title="Salary Range" 
          isOpen={openSalary} 
          onToggle={() => setOpenSalary(!openSalary)}
        >
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input 
                type="number" 
                name="salaryFrom"
                placeholder="From" 
                value={filters.salaryFrom || ''}
                onChange={(e) => handleSalaryChange('salaryFrom', e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  background: 'white',
                  fontSize: '13px',
                  outline: 'none',
                  maxWidth: '120px'
                }}
              />
              <input 
                type="number" 
                name="salaryTo"
                placeholder="To" 
                value={filters.salaryTo || ''}
                onChange={(e) => handleSalaryChange('salaryTo', e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  background: 'white',
                  fontSize: '13px',
                  outline: 'none',
                  maxWidth: '120px'
                }}
              />
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: '#6b7280', 
              margin: 0,
              textAlign: 'center'
            }}>
              Leave empty to search all salary ranges
            </p>
          </div>
        </CollapsibleSection>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '20px' }}>
          <button 
            type="button" 
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'transparent',
              color: '#1e40af',
              border: '1px solid #1e40af',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Reset filters
          </button>
          <button 
            type="submit"
            style={{
              flex: 1,
              padding: '14px 20px',
              background: '#1e40af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Filter size={16} />
            Apply Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobsFilter;