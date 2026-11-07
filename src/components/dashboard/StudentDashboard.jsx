import React from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../common/CircularProgress';
import {
  Sparkles,
  Bookmark,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileCheck,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Award,
  ChevronRight,
  Calendar,
  Layers,
  UserCheck
} from 'lucide-react';

export default function StudentDashboard() {
  const {
    user,
    profile,
    scholarships,
    savedIds,
    applications,
    setActiveTab,
    openScholarshipDetails,
    setIsChatOpen
  } = useApp();

  // Metrics
  const highMatchScholarships = scholarships.filter(s => s.matchScore >= 80);
  const savedScholarships = scholarships.filter(s => savedIds.includes(s.id));
  const activeApplications = applications.filter(a => a.status !== 'Rejected');
  const submittedCount = applications.filter(a => ['Applied', 'Under Review', 'Approved'].includes(a.status)).length;

  // Upcoming deadlines (sort by daysLeft ascending)
  const upcomingDeadlines = [...scholarships]
    .filter(s => s.daysLeft > 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  // Profile completion calculation
  const profileFields = [
    { label: 'Basic Info & Email', done: Boolean(profile?.email && profile?.name) },
    { label: 'Category & Gender', done: Boolean(profile?.category && profile?.gender) },
    { label: 'Academic Percentage', done: Boolean(profile?.percentage) },
    { label: 'Annual Household Income', done: Boolean(profile?.familyIncome) },
    { label: 'Domicile State', done: Boolean(profile?.domicileState) },
    { label: 'Uploaded Documents', done: Boolean(profile?.documentsUploaded && profile.documentsUploaded.length >= 3) }
  ];
  const completedFieldsCount = profileFields.filter(f => f.done).length;
  const profileCompletionPercent = Math.round((completedFieldsCount / profileFields.length) * 100);

  // Application Stage breakdown for native SVG chart
  const stageCounts = {
    Interested: applications.filter(a => a.status === 'Interested').length,
    'Preparing Docs': applications.filter(a => a.status === 'Preparing Documents').length,
    Applied: applications.filter(a => a.status === 'Applied').length,
    'Under Review': applications.filter(a => a.status === 'Under Review').length,
    Approved: applications.filter(a => a.status === 'Approved').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const totalApps = applications.length || 1;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* 1. WELCOME HEADER */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--primary-indigo-light) 100%)',
          border: '1px solid var(--border-color)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
            alt={profile?.name || 'Student'}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent-violet)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Welcome back, {profile?.name || 'Aarav'}! 👋
              </h1>
              <span className="badge badge-emerald">Verified Scholar</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {profile?.course || 'B.Tech CSE'} • {profile?.institution || 'VJTI Mumbai'} • State Domicile: {profile?.domicileState || 'Maharashtra'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 wrap">
          <button
            onClick={() => setActiveTab('discovery')}
            className="btn btn-primary"
          >
            <Sparkles size={16} />
            <span>Find More Schemes</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="btn btn-secondary"
          >
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. TOP KPI CARDS */}
      <div className="grid-cols-4 gap-6" style={{ marginBottom: '2.5rem' }}>
        {/* KPI 1 */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>High Matches (≥80%)</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--primary-indigo-light)', color: 'var(--accent-violet)' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {highMatchScholarships.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            Based on current academic profile
          </span>
        </div>

        {/* KPI 2 */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Saved Bookmarks</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--accent-emerald-light)', color: '#059669' }}>
              <Bookmark size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {savedIds.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Shortlisted for application
          </span>
        </div>

        {/* KPI 3 */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>In Pipeline</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--accent-amber-light)', color: '#d97706' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {applications.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
            {submittedCount} submitted / in review
          </span>
        </div>

        {/* KPI 4 */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Profile Strength</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--primary-indigo-light)', color: 'var(--accent-violet)' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            {profileCompletionPercent}%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            {completedFieldsCount} of {profileFields.length} criteria verified
          </span>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (2 COLUMN GRID) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Left Column: Top Recommended Scholarships */}
        <div className="flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Top Recommended For You</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Highest algorithmic fit matching your stream and criteria</p>
            </div>
            <button
              onClick={() => setActiveTab('discovery')}
              className="btn btn-secondary btn-sm"
            >
              <span>Explore All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex-col gap-3">
            {highMatchScholarships.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer'
                }}
                onClick={() => openScholarshipDetails(item)}
              >
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>{item.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.provider}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4" style={{ fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{item.awardAmount}</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Deadline: {item.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CircularProgress value={item.matchScore} size={48} strokeWidth={4} />
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>

          {/* Application Pipeline Analytics (Native SVG Chart) */}
          <div className="card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Application Pipeline Analytics</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Current distribution across workflow stages</p>
              </div>
              <button
                onClick={() => setActiveTab('tracker')}
                className="btn btn-secondary btn-sm"
              >
                Open Tracker
              </button>
            </div>

            {/* Native SVG Bar Visualization */}
            <div className="flex-col gap-3">
              {Object.entries(stageCounts).map(([stage, count]) => {
                const percentage = Math.round((count / totalApps) * 100);
                let barColor = 'var(--accent-violet)';
                if (stage === 'Approved') barColor = 'var(--accent-emerald)';
                if (stage === 'Under Review') barColor = '#f59e0b';
                if (stage === 'Rejected') barColor = 'var(--accent-rose)';

                return (
                  <div key={stage} className="flex-col gap-1">
                    <div className="flex justify-between items-center" style={{ fontSize: '0.8125rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stage}</span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: 'var(--bg-card-subtle)',
                        borderRadius: '9999px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(percentage, count > 0 ? 8 : 0)}%`,
                          height: '100%',
                          background: barColor,
                          borderRadius: '9999px',
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Deadlines & Profile Completion Meter */}
        <div className="flex-col gap-4">
          {/* Deadlines Widget */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <div className="flex items-center gap-2">
                <Clock size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Upcoming Scheme Deadlines</h3>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>Act Fast</span>
            </div>

            <div className="flex-col gap-3">
              {upcomingDeadlines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openScholarshipDetails(item)}
                  style={{
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {item.title}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Closes on {item.deadline}
                    </span>
                  </div>

                  <span
                    className={item.daysLeft <= 15 ? 'badge badge-rose' : 'badge badge-amber'}
                    style={{ fontSize: '0.72rem', flexShrink: 0 }}
                  >
                    {item.daysLeft} days left
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Profile Completeness</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Required for 100% eligibility accuracy</p>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {profileCompletionPercent}%
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: '10px',
                background: 'var(--bg-card-subtle)',
                borderRadius: '9999px',
                overflow: 'hidden',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  width: `${profileCompletionPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-violet) 0%, var(--accent-emerald) 100%)',
                  borderRadius: '9999px',
                  transition: 'width 0.6s ease'
                }}
              />
            </div>

            <div className="flex-col gap-2">
              {profileFields.map((field, idx) => (
                <div key={idx} className="flex items-center justify-between" style={{ fontSize: '0.8125rem' }}>
                  <span style={{ color: field.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {field.label}
                  </span>
                  {field.done ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Pending</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '1.25rem' }}
            >
              Update Credentials & Documents
            </button>
          </div>

          {/* AI Advisor Assistant Prompt Callout */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--primary-indigo) 0%, #312e81 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={18} color="#818cf8" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Need Scholarship Guidance?</h4>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#e0e7ff', lineHeight: 1.5 }}>
              Ask the Grantly AI Assistant about document attestation, central portal deadlines, or statement of purpose guidelines.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="btn btn-sm"
              style={{ background: '#ffffff', color: 'var(--primary-indigo)', fontWeight: 700, alignSelf: 'flex-start' }}
            >
              Launch AI Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
