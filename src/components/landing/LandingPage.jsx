import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/faqData';
import CircularProgress from '../common/CircularProgress';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Bookmark,
  Calendar,
  Award,
  Users,
  TrendingUp,
  FileText,
  ChevronDown,
  Building2,
  Clock,
  Layers,
  Zap,
  Star,
  Lock,
  Compass,
  Laptop,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const {
    setActiveTab,
    scholarships,
    savedIds,
    toggleSaveScholarship,
    openScholarshipDetails,
    user,
    profile,
    setIsAuthModalOpen,
    setAuthMode,
    navigateToDiscovery
  } = useApp();

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Featured schemes filtering
  const featuredSchemes = useMemo(() => {
    switch (featuredFilter) {
      case 'HighValue':
        return scholarships.filter(s => (s.awardAmountNum || 0) >= 100000).slice(0, 6);
      case 'Government':
        return scholarships.filter(s => s.category === 'Government').slice(0, 6);
      case 'WomenInSTEM':
        return scholarships.filter(s => s.category.includes('Women') || s.targetGender === 'Female').slice(0, 6);
      case 'Engineering':
        return scholarships.filter(s => (s.educationLevel || []).includes('B.Tech') || s.category === 'Engineering').slice(0, 6);
      default:
        return scholarships.slice(0, 6);
    }
  }, [scholarships, featuredFilter]);

  const handleHeroFindScholarships = () => {
    if (user) {
      setActiveTab('dashboard');
    } else {
      setAuthMode('demo');
      setIsAuthModalOpen(true);
    }
  };

  const handleHeroExplore = () => {
    setActiveTab('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '3.5rem 0 3rem',
          background: 'radial-gradient(ellipse at 50% -10%, rgba(99, 102, 241, 0.18) 0%, rgba(67, 56, 202, 0.04) 50%, transparent 80%)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Top Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xs)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent-violet)'
            }}
          >
            <Sparkles size={15} />
            <span>Unified Indian Scholarship Discovery & Management Platform</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
              2026 Edition
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '1.15rem',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Your Future Deserves <span className="text-gradient">Funding.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 1.75rem',
              lineHeight: 1.55
            }}
          >
            Stop missing out on government quotas and CSR funds. Grantly uses algorithmic AI matching to connect Indian college students with verified scholarships in minutes.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex justify-center items-center gap-3.5 wrap" style={{ marginBottom: '1.25rem' }}>
            <button
              onClick={handleHeroFindScholarships}
              className="btn btn-primary btn-lg"
            >
              <span>Find My Scholarships</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={handleHeroExplore}
              className="btn btn-secondary btn-lg"
            >
              <Compass size={18} />
              <span>Explore Opportunities</span>
            </button>
          </div>

          {/* Popular Category Fast-Track Pills */}
          <div className="flex items-center justify-center gap-2 wrap" style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Explore Schemes:</span>
            {[
              { label: 'Engineering & B.Tech', cat: 'Engineering' },
              { label: 'Women in STEM', cat: 'Women in STEM' },
              { label: 'Government & NSP', cat: 'Government' },
              { label: 'Healthcare & MBBS', cat: 'Healthcare' }
            ].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => navigateToDiscovery(tag.cat)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-violet)';
                  e.currentTarget.style.color = 'var(--accent-violet)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Sleek Trust Micro-Row directly under CTAs */}
          <div
            className="flex items-center justify-center gap-5 wrap"
            style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} color="#10b981" />
              <span>100% Free Forever</span>
            </div>
            <span style={{ opacity: 0.4 }}>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} color="#10b981" />
              <span>NSP & CSR Verified</span>
            </div>
            <span style={{ opacity: 0.4 }}>•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles size={16} color="#6366f1" />
              <span>Rule-Based Match Guarantee</span>
            </div>
          </div>

          {/* 1A. INTERACTIVE DASHBOARD PREVIEW DIRECTLY BELOW HERO CTAs */}
          <div className="hero-preview-container">
            <div className="hero-preview-glow" />
            <div className="hero-preview-browser">
              {/* Browser Header Bar */}
              <div className="browser-header-bar">
                <div className="browser-dots">
                  <span className="browser-dot" style={{ background: '#f87171' }} />
                  <span className="browser-dot" style={{ background: '#fbbf24' }} />
                  <span className="browser-dot" style={{ background: '#34d399' }} />
                </div>
                <div className="browser-address">
                  <Lock size={12} color="#10b981" />
                  <span>https://grantly.in/app/ai-eligibility-matcher</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Live Pipeline</span>
                </div>
              </div>

              {/* Browser Content */}
              <div style={{ padding: '1.5rem', background: 'var(--bg-main)', textAlign: 'left' }}>
                {/* Active Student Ribbon */}
                <div
                  style={{
                    background: 'var(--bg-card)',
                    padding: '0.875rem 1.15rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.875rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
                      alt="Student"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-violet)' }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong style={{ fontSize: '0.9rem' }}>{profile?.name || 'Aarav Sharma'}</strong>
                        <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{profile?.educationLevel || 'B.Tech'} CSE</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Score: <strong>{profile?.percentage || 82.5}%</strong> • Income: <strong>₹{((profile?.familyIncome || 240000)/100000).toFixed(1)}L</strong> • State: <strong>{profile?.domicileState || 'Maharashtra'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Algorithmic Status</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)' }}>4 High Matches Qualified</strong>
                    </div>
                    <button
                      onClick={() => setActiveTab('eligibility')}
                      className="btn btn-secondary btn-sm"
                    >
                      Audit Rules
                    </button>
                  </div>
                </div>

                {/* 3 Interactive Cards Inside Preview */}
                <div className="hero-preview-cards-grid">
                  {/* Mock Card 1 */}
                  <div
                    className="card"
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid var(--accent-violet)',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const s = scholarships.find(item => item.id === 'reliance-ug-2025') || scholarships[0];
                      openScholarshipDetails(s);
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-start" style={{ marginBottom: '0.35rem' }}>
                        <span className="badge badge-indigo" style={{ fontSize: '0.62rem' }}>Merit-cum-Means</span>
                        <CircularProgress value={95} size={34} strokeWidth={3} />
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.2rem' }}>
                        Reliance Foundation UG Scholarship
                      </h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                        Full undergraduate grant + corporate mentor circle.
                      </p>
                    </div>
                    <div className="flex justify-between items-center" style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>₹2,00,000</strong>
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 600 }}>Under Review</span>
                    </div>
                  </div>

                  {/* Mock Card 2 */}
                  <div
                    className="card"
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid var(--accent-emerald)',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const s = scholarships.find(item => item.id === 'central-sector-nsp-2025') || scholarships[1];
                      openScholarshipDetails(s);
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-start" style={{ marginBottom: '0.35rem' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>Government (NSP)</span>
                        <CircularProgress value={88} size={34} strokeWidth={3} />
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.2rem' }}>
                        Central Sector Scheme for College Students
                      </h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                        MoE direct benefit transfer for top 80th percentile students.
                      </p>
                    </div>
                    <div className="flex justify-between items-center" style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>₹20,000 / yr</strong>
                      <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>18 Days Left</span>
                    </div>
                  </div>

                  {/* Mock Card 3 */}
                  <div
                    className="card"
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: '4px solid #f59e0b',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const s = scholarships.find(item => item.id === 'hdfc-badhte-kadam-2025') || scholarships[2];
                      openScholarshipDetails(s);
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-start" style={{ marginBottom: '0.35rem' }}>
                        <span className="badge badge-amber" style={{ fontSize: '0.62rem' }}>CSR Industry</span>
                        <CircularProgress value={90} size={34} strokeWidth={3} />
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.2rem' }}>
                        HDFC Bank Badhte Kadam Scholarship
                      </h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                        Direct crisis & merit assistance for households &lt; ₹6 Lakhs.
                      </p>
                    </div>
                    <div className="flex justify-between items-center" style={{ paddingTop: '0.45rem', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>₹1,00,000</strong>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Applied</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SCHOLARSHIPS SHOWCASE (IMMEDIATELY BELOW HERO PREVIEW) */}
      <section style={{ padding: '3.75rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="flex justify-between items-end wrap gap-4" style={{ marginBottom: '1.75rem' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>
                High-Value Verified Grants
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Featured Opportunities for Indian Students
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Direct financial aid from central government portals, state departments, and accredited CSR foundations.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('discovery')}
              className="btn btn-secondary"
            >
              <span>Explore All 18+ Schemes</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Filter Pills for Featured Section */}
          <div className="flex items-center gap-2 wrap" style={{ marginBottom: '1.75rem' }}>
            {[
              { id: 'All', label: 'All Top Picks (18)' },
              { id: 'HighValue', label: 'High Grant (₹1L+)' },
              { id: 'Government', label: 'Government & NSP' },
              { id: 'WomenInSTEM', label: 'Women in STEM' },
              { id: 'Engineering', label: 'Engineering & Tech' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFeaturedFilter(tab.id)}
                className={`btn btn-sm ${featuredFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 6 Responsive Cards */}
          <div className="scholarship-card-grid">
            {featuredSchemes.map((scholarship) => {
              const isSaved = savedIds.includes(scholarship.id);

              return (
                <div
                  key={scholarship.id}
                  className="card card-interactive"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  onClick={() => openScholarshipDetails(scholarship)}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                      <div className="flex items-center gap-1.5 wrap">
                        <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                          {scholarship.category}
                        </span>
                        {scholarship.verified && (
                          <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                            <ShieldCheck size={11} /> Verified
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleSaveScholarship(scholarship.id)}
                          className="btn btn-secondary btn-icon"
                          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                          title={isSaved ? 'Remove bookmark' : 'Bookmark scholarship'}
                          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark scholarship'}
                        >
                          <Bookmark size={14} fill={isSaved ? 'var(--accent-violet)' : 'none'} color={isSaved ? 'var(--accent-violet)' : 'currentColor'} />
                        </button>
                      </div>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.35,
                        marginBottom: '0.25rem'
                      }}
                    >
                      {scholarship.title}
                    </h3>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Offered by {scholarship.provider}
                    </p>

                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {scholarship.description}
                    </p>
                  </div>

                  <div>
                    {/* Key Attributes Bar */}
                    <div
                      style={{
                        background: 'var(--bg-card-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.65rem 0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.875rem'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Grant Award</span>
                        <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>{scholarship.awardAmount}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <CircularProgress value={scholarship.matchScore} size={38} strokeWidth={3.5} />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center">
                      <span
                        className={`badge ${scholarship.daysLeft <= 15 ? 'badge-rose' : 'badge-amber'}`}
                        style={{ fontSize: '0.68rem' }}
                      >
                        <Clock size={11} /> {scholarship.daysLeft}d left
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openScholarshipDetails(scholarship);
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LIVE STATISTICS RIBBON */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="stat-ribbon-grid">
            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--primary-indigo)', letterSpacing: '-0.02em' }}>
                ₹500Cr+
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                Curated Program Allocation
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Aggregated funding across modeled schemes</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--accent-violet)', letterSpacing: '-0.02em' }}>
                1,20,000+
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                Annual Quota Beneficiaries
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated seats across 18 programs</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '-0.02em' }}>
                100%
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                Deterministic Rule Precision
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero-hallucination qualification logic</span>
            </div>

            <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '2.3rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em' }}>
                18+
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '0.2rem' }}>
                Official Schemes Modeled
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NSP, AICTE, and verified CSR trusts</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-card-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Simple 3-Step Process</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              How Grantly Eliminates Scholarship Friction
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.4rem auto 0', fontSize: '0.925rem' }}>
              No more scrolling through confusing 40-page PDF notifications or guessing your income eligibility.
            </p>
          </div>

          <div className="grid-cols-3 gap-6">
            <div className="card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-indigo-light)',
                  color: 'var(--accent-violet)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontWeight: 800,
                  fontSize: '1.15rem'
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Enter Profile Credentials
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Add your 12th/current marks, degree, category (General, OBC, SC, ST, EWS), family annual income, and domicile state.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--accent-emerald-light)',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontWeight: 800,
                  fontSize: '1.15rem'
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Algorithmic AI Matching
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Our rule engine audits every scholarship in real-time, showing your exact match percentage and highlighting any missing requirements.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--accent-amber-light)',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontWeight: 800,
                  fontSize: '1.15rem'
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Track & Apply Without Stress
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Move items across our Kanban Application Tracker from 'Preparing Documents' to 'Applied' with deadline reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Why Grantly</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Engineered For The Indian College Reality
            </h2>
          </div>

          <div className="grid-cols-3 gap-6">
            <div className="card" style={{ padding: '1.75rem' }}>
              <Zap size={26} color="#6366f1" style={{ marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Instant Eligibility Audit
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Clear explanations for why you qualify or why you don't. No legal jargon or ambiguity on income limits.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <Layers size={26} color="#10b981" style={{ marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Side-by-Side Comparison
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Compare up to 3 scholarships across award amounts, document burdens, and merit requirements in one table.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <Clock size={26} color="#f59e0b" style={{ marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Deadline Guardian
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Color-coded countdown badges alert you to schemes closing soon so you never miss another portal submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Student Case Studies</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Simulated Beneficiary Journeys
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0.4rem auto 0' }}>
              Illustrative student profiles modeled after actual recipients across premier Indian technical & state universities.
            </p>
          </div>

          <div className="grid-cols-3 gap-6">
            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '0.875rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "I was skeptical about private scholarships until Grantly flagged the Reliance Foundation scheme based on my 12th marks. The document tracker made sure I submitted my Tehsildar certificate in time."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Ananya Roy"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Ananya Roy</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>B.Tech CSE, IIT Kharagpur (₹2L Scholar)</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '0.875rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "As an OBC candidate from a rural district, finding government schemes without middle-man fees used to be impossible. Grantly's rule engine verified my PM YASASVI eligibility instantly!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                  alt="Rohan Verma"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Rohan Verma</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>B.Sc Agriculture, Punjab Agricultural Uni</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '0.875rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "The Adobe Women in Tech scholarship gave me full funding and a dream internship. The AI advisor even gave me tips on drafting my Statement of Purpose."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
                  alt="Divya Hegde"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Divya Hegde</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>B.E. Information Science, PES Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>Clear Answers</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="card" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.4rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="var(--text-muted)"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-fast)'
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.4rem 1.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section style={{ padding: '3.5rem 0 2rem' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '3.25rem 2rem',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 20px 30px -10px rgba(67, 56, 202, 0.4)'
            }}
          >
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.875rem' }}>
              Ready To Claim Your Scholarship?
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.75rem', fontSize: '1rem', color: '#e0e7ff', lineHeight: 1.6 }}>
              Join thousands of Indian students unlocking verified financial aid. Check your personalized eligibility in under 60 seconds.
            </p>
            <div className="flex justify-center items-center gap-4 wrap">
              <button
                onClick={() => setActiveTab('discovery')}
                className="btn btn-emerald btn-lg"
              >
                <span>Browse All Scholarships</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setActiveTab('eligibility')}
                className="btn btn-secondary btn-lg"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                <Sparkles size={18} />
                <span>Test Eligibility Engine</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
