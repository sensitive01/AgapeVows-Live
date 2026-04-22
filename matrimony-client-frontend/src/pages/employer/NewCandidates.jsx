import React, { useState } from 'react';
import { Search, Users, Calendar, ChevronDown, Filter, Download, Plus, Phone, Mail, MessageCircle, Bookmark, Eye, FileDown, RotateCcw, Check, List, Grid } from 'lucide-react';

const NewCandidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Role');
  const [selectedStatus, setSelectedStatus] = useState('Select Status');
  const [sortBy, setSortBy] = useState('Sort By : Last 7 Days');
  const [filters, setFilters] = useState({
    jobCategory: [],
    jobType: [],
    gender: 'male',
    salaryFrom: '',
    salaryTo: '',
    location: '',
    qualification: '',
    experienceFrom: '',
    experienceTo: ''
  });

  const candidates = [
    {
      id: 1,
      name: 'Sandra Ornellas',
      image: 'assets/img/users/user-13.jpg',
      appliedOn: '02 Feb, 2025',
      lastActive: '3 days ago',
      experience: '5 Years',
      salary: '12,00,000 Per Annum',
      gender: 'Male',
      designation: 'Department Head',
      dob: '19 Feb 1990 / 35',
      qualification: 'MCA, M Phil, Ph.D',
      location: 'Bengaluru, Karnataka - 560078',
      isPremium: true
    },
    {
      id: 2,
      name: 'John Harris',
      image: 'assets/img/users/user-19.jpg',
      appliedOn: '02 Feb, 2025',
      lastActive: '3 days ago',
      experience: '15 Years',
      salary: '12,00,000 Per Annum',
      gender: 'Female',
      designation: 'Department Head',
      dob: '19 Feb 1990 / 35',
      qualification: 'MCA, M Phil, Ph.D',
      location: 'Bengaluru, Karnataka - 560078',
      isPremium: false
    },
    {
      id: 3,
      name: 'PGT Teacher',
      image: 'assets/img/users/user-13.jpg',
      appliedOn: '02 Feb, 2025',
      lastActive: '3 days ago',
      experience: '5 Years',
      salary: '12,00,000 Per Annum',
      gender: 'Male',
      designation: 'Department Head',
      dob: '19 Feb 1990 / 35',
      qualification: 'MCA, M Phil, Ph.D',
      location: 'Bengaluru, Karnataka - 560078',
      isPremium: false
    },
    {
      id: 4,
      name: 'PGT Teacher',
      image: 'assets/img/users/user-19.jpg',
      appliedOn: '02 Feb, 2025',
      lastActive: '3 days ago',
      experience: '15 Years',
      salary: '12,00,000 Per Annum',
      gender: 'Female',
      designation: 'Department Head',
      dob: '19 Feb 1990 / 35',
      qualification: 'MCA, M Phil, Ph.D',
      location: 'Bengaluru, Karnataka - 560078',
      isPremium: false
    },
    {
      id: 5,
      name: 'PGT Teacher',
      image: 'assets/img/users/user-22.jpg',
      appliedOn: '02 Feb, 2025',
      lastActive: '3 days ago',
      experience: '15 Years',
      salary: '12,00,000 Per Annum',
      gender: 'Female',
      designation: 'Department Head',
      dob: '19 Feb 1990 / 35',
      qualification: 'MCA, M Phil, Ph.D',
      location: 'Bengaluru, Karnataka - 560078',
      isPremium: false
    }
  ];

  const roles = ['All', 'PGT Mathematics Teacher', 'Physical Trainer', 'Chemistry Teacher', 'Receptionist', 'Bus Driver', 'Security'];
  const statuses = ['Active', 'Inactive', 'New', 'On Hold', 'Shortlisted', 'Rejected'];
  const sortOptions = ['Recently Added', 'Ascending', 'Descending', 'Last Month', 'Last 7 Days'];

  const handleFilterChange = (category, value) => {
    if (category === 'jobCategory' || category === 'jobType') {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    } else {
      setFilters(prev => ({ ...prev, [category]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({
      jobCategory: [],
      jobType: [],
      gender: 'male',
      salaryFrom: '',
      salaryTo: '',
      location: '',
      qualification: '',
      experienceFrom: '',
      experienceTo: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold flex items-center">
              <Users className="text-blue-600 mr-2" />
              Candidates
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <input
                type="text"
                className="form-control border border-gray-300 rounded px-3 py-2 text-sm"
                style={{width: '205px'}}
                placeholder="dd/mm/yyyy - dd/mm/yyyy"
              />
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <DropdownButton
              value={selectedRole}
              onChange={setSelectedRole}
              options={roles}
              placeholder="Role"
            />
            
            <DropdownButton
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statuses}
              placeholder="Select Status"
            />
            
            <DropdownButton
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              placeholder="Sort By"
            />
            
            <div className="flex items-center border bg-white rounded p-1">
              <button className="btn btn-sm p-2 text-gray-600"><List className="w-4 h-4" /></button>
              <button className="btn btn-sm p-2 bg-gray-600 text-white rounded"><Grid className="w-4 h-4" /></button>
            </div>
            
            <DropdownButton
              value="Export"
              options={['Export as PDF', 'Export as Excel']}
              placeholder="Export"
              icon={<Download className="w-4 h-4 mr-1" />}
            />
            
            <button className="btn bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filter Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="card bg-white border rounded-lg">
              <div className="card-body p-4">
                <h3 className="text-lg font-medium text-gray-600 mb-1">Filter Candidates</h3>
                <p className="text-gray-800 mb-4">Search & Filter</p>
                
                {/* Job Category */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Select Job Category
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {['Teachers', 'Lab Assistants', 'Principals', 'Sports Trainers', 'Office Staffs'].map((item) => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters.jobCategory.includes(item)}
                          onChange={() => handleFilterChange('jobCategory', item)}
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Select Job Type
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {['Full Time', 'Part Time', 'Remote', 'Temporary'].map((item) => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-1"
                          checked={filters.jobType.includes(item)}
                          onChange={() => handleFilterChange('jobType', item)}
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Gender
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <label className="flex items-center border rounded px-3 py-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={filters.gender === 'male'}
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                        className="mr-1"
                      />
                      Male
                    </label>
                    <label className="flex items-center border rounded px-3 py-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={filters.gender === 'female'}
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                        className="mr-1"
                      />
                      Female
                    </label>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Salary Range
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="From"
                      className="form-control border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                      value={filters.salaryFrom}
                      onChange={(e) => handleFilterChange('salaryFrom', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="To"
                      className="form-control border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                      value={filters.salaryTo}
                      onChange={(e) => handleFilterChange('salaryTo', e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Location
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Choose Location"
                    className="form-control border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>

                {/* Qualification */}
                <div className="mb-4">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Qualification
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Qualification"
                    className="form-control border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    value={filters.qualification}
                    onChange={(e) => handleFilterChange('qualification', e.target.value)}
                  />
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <div className="border-b pb-2 mb-3">
                    <button className="w-full flex items-center justify-between text-gray-800 font-medium">
                      Experience
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="From"
                      className="form-control border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                      value={filters.experienceFrom}
                      onChange={(e) => handleFilterChange('experienceFrom', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="To"
                      className="form-control border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                      value={filters.experienceTo}
                      onChange={(e) => handleFilterChange('experienceTo', e.target.value)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 btn bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </button>
                  <button className="flex-1 btn bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center">
                    <Check className="w-4 h-4 mr-1" />
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {/* Search Bar */}
            <div className="card bg-white border rounded-lg mb-6">
              <div className="card-body p-4">
                <form className="flex gap-2">
                  <input
                    type="text"
                    className="form-control border border-gray-300 rounded px-3 py-2 flex-1"
                    placeholder="Search Candidates"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn bg-gray-600 text-white px-4 py-2 rounded">
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
              
              <div className="text-right">
                <button className="btn bg-gray-600 text-white px-6 py-2 rounded">
                  <RotateCcw className="w-4 h-4 mr-1 inline" />
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownButton = ({ value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-white border border-gray-300 bg-white px-3 py-2 rounded text-sm flex items-center"
      >
        {icon}
        {value}
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 p-3 min-w-full">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CandidateCard = ({ candidate }) => {
  return (
    <div className="card bg-white border rounded-lg">
      <div className="card-body p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-3">
          <div className="flex items-center mb-4 lg:mb-0">
            <div className="avatar flex-shrink-0 mr-3">
              <img
                src={candidate.image}
                className="w-12 h-12 rounded-full object-cover"
                alt="img"
              />
            </div>
            <div>
              <h6 className="text-sm font-medium text-blue-600 mb-1">
                <a href="#" className="text-gray-600">
                  {candidate.name} | <span className="text-gray-800"><Eye className="inline w-3 h-3" /> View Profile</span>
                </a>
              </h6>
              <p className="text-xs">
                <b>Applied On:</b> {candidate.appliedOn} | Last Active: {candidate.lastActive} | 
                <a href="#" className="font-medium text-blue-600 ml-1">
                  <FileDown className="inline w-3 h-3" /> Download Resume
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button className="btn btn-light text-green-600 p-2 border rounded">
              <Phone className="w-4 h-4" />
            </button>
            <button className="btn btn-light text-red-600 p-2 border rounded">
              <Mail className="w-4 h-4" />
            </button>
            <button className="btn btn-light text-blue-600 p-2 border rounded">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="btn btn-light text-blue-600 p-2 border rounded">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded p-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2 text-sm">
            <span><b>Experience</b>: {candidate.experience}</span>
            <span><b>Minimum Expected Salary</b>: {candidate.salary}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2 text-sm">
            <span><b>Gender</b>: {candidate.gender}</span>
            <span><b>Current / Previous Designation</b>: {candidate.designation}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2 text-sm">
            <span><b>Date-of-Birth / Age</b>: {candidate.dob}</span>
            <span><b>Qualification</b>: {candidate.qualification}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span><b>Current Location</b>: {candidate.location}</span>
            <span>
              <b>View More Details</b>: 
              {candidate.isPremium ? (
                <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded ml-1">
                  <Eye className="inline w-3 h-3" /> View Profile
                </span>
              ) : (
                <span className="text-xs font-bold bg-gray-600 text-white px-2 py-1 rounded ml-1">
                  🔒 Subscribe to Unlock
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCandidates;