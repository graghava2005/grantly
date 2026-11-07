import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../common/CircularProgress';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Bookmark,
  GitCompare,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  Check,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function ScholarshipDiscovery() {
  const {
    scholarships,
    savedIds,
    toggleSaveScholarship,
    compareList,
    toggleCompareScholarship,
    openScholarshipDetails,
    addApplication,
    profile,
    discoveryFilter,
    setDiscoveryFilter
  } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(discoveryFilter || 'All');
  const [selectedTargetCaste, setSelectedTargetCaste] = useState('All');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedIncomeLimit, setSelectedIncomeLimit] = useState('All');
  const [sortBy, setSortBy] = useState('matchScore'); // 'matchScore' | 'deadline' | 'amount' | 'title'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [onlyEligible, setOnlyEligible] = useState(false);

  React.useEffect(() => {
    if (discoveryFilter) {
      setSelectedCategory(discoveryFilter);
    }
  }, [discoveryFilter]);

  // Available unique options for dropdowns
  const categories = ['All', 'Government', 'Merit-cum-Means', 'CSR', 'Women in STEM', 'Healthcare', 'Engineering'];
  const casteCategories = ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'];
  const educationLevels = ['All', 'Undergraduate', 'B.Tech', 'MBBS', 'Class 11', 'Class 12', 'Diploma'];

  // Filter & Sort Logic
  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((s) => {
        // Search term check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = s.title.toLowerCase().includes(q);
          const matchProvider = s.provider.toLowerCase().includes(q);
          const matchDesc = s.description.toLowerCase().includes(q);
          const matchEdu = (s.educationLevel || []).some(e => e.toLowerCase().includes(q));
          if (!matchTitle && !matchProvider && !matchDesc && !matchEdu) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && s.category !== selectedCategory) {
          return false;
        }

        // Target Caste filter
        if (selectedTargetCaste !== 'All') {
          const targets = s.targetCategory || ['All'];
          if (!targets.includes('All') && !targets.includes(selectedTargetCaste)) {
            return false;
          }
        }

        // Education Level filter
        if (selectedEducationLevel !== 'All') {
          const levels = s.educationLevel || [];
          if (!levels.includes('Undergraduate') && !levels.includes(selectedEducationLevel)) {
            return false;
          }
        }

        // Gender filter
        if (selectedGender !== 'All') {
          if (s.targetGender !== 'All' && s.targetGender !== selectedGender) {
            return false;
          }
        }

        // Income ceiling filter
        if (selectedIncomeLimit !== 'All') {
          const maxLimit = parseInt(selectedIncomeLimit, 10);
          if (s.maxIncome && s.maxIncome < maxLimit) {
            return false;
          }
        }

        // Only Eligible checkbox
        if (onlyEligible && s.matchScore < 60) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'matchScore') {
          return b.matchScore - a.matchScore;
        }
        if (sortBy === 'deadline') {
          return a.daysLeft - b.daysLeft;
        }
        if (sortBy === 'amount') {
          return (b.awardAmountNum || 0) - (a.awardAmountNum || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [
    scholarships,
    searchQuery,
    selectedCategory,
    selectedTargetCaste,
    selectedEducationLevel,
    selectedGender,
    selectedIncomeLimit,
    onlyEligible,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDiscoveryFilter('All');
    setSelectedTargetCaste('All');
    setSelectedEducationLevel('All');
    setSelectedGender('All');
    setSelectedIncomeLimit('All');
    setOnlyEligible(false);
    setSortBy('matchScore');
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Title & Subtitle */}
      <div className="flex justify-between items-end wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="flex items-center gap-2 wrap" style={{ marginBottom: '0.4rem' }}>
            <span className="badge badge-indigo">Official Indian Grants</span>
            <span className="badge badge-emerald">18 Curated Schemes</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              NSP & Corporate CSR Backed
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Scholarship Discovery Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Algorithmic matching calibrated against: <strong>{profile?.category || 'General'}</strong>, <strong>{profile?.course || 'Degree'}</strong>, Family Income <strong>₹{(Number(profile?.familyIncome || 0)/100000).toFixed(1)}L</strong>.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            All records are modeled on published guidelines with direct links to official government and trust portals.
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`btn btn-secondary btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: viewMode === 'grid' ? 'var(--primary-indigo-light)' : 'var(--bg-card)',
              color: viewMode === 'grid' ? 'var(--accent-violet)' : 'var(--text-secondary)'
            }}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`btn btn-secondary btn-icon ${viewMode === 'list' ? 'active' : ''}`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: viewMode === 'list' ? 'var(--primary-indigo-light)' : 'var(--bg-card)',
              color: viewMode === 'list' ? 'var(--accent-violet)' : 'var(--text-secondary)'
            }}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        {/* Top search & Sort row */}
        <div className="flex gap-4 wrap items-center" style={{ marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            <input
              type="text"
              placeholder="Search by scholarship title, provider (e.g. Reliance, AICTE), stream, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: '38px' }}
            />
          </div>

          <div className="flex items-center gap-2 wrap">
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select"
              style={{ width: 'auto', minWidth: '170px' }}
            >
              <option value="matchScore">Best Match % (AI)</option>
              <option value="deadline">Deadline (Urgent First)</option>
              <option value="amount">Award Amount (High to Low)</option>
              <option value="title">Scholarship Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter controls row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Scheme Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Caste / Social Category
            </label>
            <select
              value={selectedTargetCaste}
              onChange={(e) => setSelectedTargetCaste(e.target.value)}
              className="select"
            >
              {casteCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Education Level
            </label>
            <select
              value={selectedEducationLevel}
              onChange={(e) => setSelectedEducationLevel(e.target.value)}
              className="select"
            >
              {educationLevels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Gender Quota
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="select"
            >
              <option value="All">All Genders</option>
              <option value="Female">Female Only</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Family Income Limit
            </label>
            <select
              value={selectedIncomeLimit}
              onChange={(e) => setSelectedIncomeLimit(e.target.value)}
              className="select"
            >
              <option value="All">Any Income</option>
              <option value="250000">Up to ₹2.5 Lakhs</option>
              <option value="500000">Up to ₹5.0 Lakhs</option>
              <option value="800000">Up to ₹8.0 Lakhs</option>
            </select>
          </div>
        </div>

        {/* Quick toggles & Reset */}
        <div className="flex justify-between items-center wrap gap-3" style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={onlyEligible}
              onChange={(e) => setOnlyEligible(e.target.checked)}
              style={{ accentColor: 'var(--accent-violet)', width: '16px', height: '16px' }}
            />
            <span>Show Only Eligible Schemes (Match Score ≥ 60%)</span>
          </label>

          <button
            onClick={resetFilters}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {/* RESULTS COUNT BAR */}
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredScholarships.length}</strong> scholarships
        </p>
        {compareList.length > 0 && (
          <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
            {compareList.length} / 3 in Compare Basket
          </span>
        )}
      </div>

      {/* SCHOLARSHIP CARDS (GRID OR LIST) */}
      {filteredScholarships.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--primary-indigo-light)',
              color: 'var(--accent-violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <Search size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Matching Scholarships Found
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
            Try broadening your search term or resetting the family income and course filters.
          </p>
          <button onClick={resetFilters} className="btn btn-primary btn-sm">
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => {
            const isSaved = savedIds.includes(scholarship.id);
            const isCompared = compareList.includes(scholarship.id);

            return (
              <div
                key={scholarship.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  position: 'relative'
                }}
              >
                {/* Header row with badges and match circle */}
                <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                  <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                    <div className="flex items-center gap-1.5 wrap" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                        {scholarship.category}
                      </span>
                      {scholarship.verified && (
                        <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                          <ShieldCheck size={11} /> Verified
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => openScholarshipDetails(scholarship)}
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        lineHeight: 1.35
                      }}
                    >
                      {scholarship.title}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {scholarship.provider}
                    </p>
                  </div>

                  <div className="flex-col items-center gap-2">
                    <CircularProgress value={scholarship.matchScore} size={48} strokeWidth={4} />
                    <button
                      onClick={() => toggleSaveScholarship(scholarship.id)}
                      className="btn btn-secondary btn-icon"
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark Scholarship'}
                    >
                      <Bookmark size={14} fill={isSaved ? 'var(--accent-violet)' : 'none'} color={isSaved ? 'var(--accent-violet)' : 'currentColor'} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.84rem',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {scholarship.description}
                </p>

                {/* Quick Key Facts */}
                <div
                  style={{
                    background: 'var(--bg-card-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8125rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Grant Award</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>{scholarship.awardAmount}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Deadline</span>
                    <strong style={{ color: scholarship.daysLeft <= 15 ? 'var(--accent-rose)' : 'var(--text-primary)' }}>
                      {scholarship.deadline} ({scholarship.daysLeft}d left)
                    </strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openScholarshipDetails(scholarship)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => toggleCompareScholarship(scholarship.id)}
                    className={`btn btn-sm ${isCompared ? 'btn-emerald' : 'btn-secondary'}`}
                    style={{ padding: '0.375rem 0.65rem' }}
                    title={isCompared ? 'Remove from compare' : 'Add to compare table'}
                  >
                    <GitCompare size={14} />
                    <span style={{ fontSize: '0.75rem' }}>{isCompared ? 'Added' : 'Compare'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="flex-col gap-3">
          {filteredScholarships.map((scholarship) => {
            const isSaved = savedIds.includes(scholarship.id);
            const isCompared = compareList.includes(scholarship.id);

            return (
              <div
                key={scholarship.id}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: '1 1 320px' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{scholarship.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{scholarship.provider}</span>
                  </div>
                  <h3
                    onClick={() => openScholarshipDetails(scholarship)}
                    style={{ fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}
                  >
                    {scholarship.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {scholarship.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Grant Award</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.05rem' }}>{scholarship.awardAmount}</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Closing Date</span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>{scholarship.deadline}</strong>
                  </div>

                  <CircularProgress value={scholarship.matchScore} size={48} strokeWidth={4} />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveScholarship(scholarship.id)}
                      className="btn btn-secondary btn-icon"
                      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                    >
                      <Bookmark size={15} fill={isSaved ? 'var(--accent-violet)' : 'none'} color={isSaved ? 'var(--accent-violet)' : 'currentColor'} />
                    </button>
                    <button
                      onClick={() => toggleCompareScholarship(scholarship.id)}
                      className={`btn btn-sm ${isCompared ? 'btn-emerald' : 'btn-secondary'}`}
                    >
                      <GitCompare size={14} />
                    </button>
                    <button
                      onClick={() => openScholarshipDetails(scholarship)}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
