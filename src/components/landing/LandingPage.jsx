import React, { useState } from 'react';
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
  Star
} from 'lucide-react';

export default function LandingPage() {
  const { setActiveTab, scholarships, savedIds, toggleSaveScholarship, openScholarshipDetails, user, setIsAuthModalOpen } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const featuredList = scholarships.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4.5rem',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
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
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '1.75rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent-violet)'
            }}
          >
            <Sparkles size={16} />
            <span>The Unified Indian Scholarship Discovery & Management Platform</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>2026 Edition</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
              maxWidth: '920px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Your Future Deserves <span className="text-gradient">Funding.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}
          >
            Stop missing out on government quotas and CSR funds. Grantly uses algorithmic AI matching to connect Indian college students with verified scholarships in minutes.
          </p>

          {/* CTAs */}
          <div className="flex justify-center items-center gap-4 wrap" style={{ marginBottom: '3.5rem' }}>
            <button
              onClick={() => {
                if (user) {
                  setActiveTab('dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="btn btn-primary btn-lg"
            >
              <span>Find My Scholarships</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setActiveTab('discovery')}
              className="btn btn-secondary btn-lg"
            >
              <Search size={18} />
              <span>Explore Opportunities</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="flex items-center justify-center gap-6 wrap"
            style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} color="#10b981" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} color="#10b981" />
              <span>NSP & Corporate CSR Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={18} color="#6366f1" />
              <span>Rule-Based Eligibility Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE STATISTICS SECTION */}
      <section style={{ borderY: '1px solid var(--border-color)', background: 'var(--bg-card)', padding: '2.5rem 0' }}>
        <div className="container">
          <div className="grid-cols-4 gap-6" style={{ textAlign: 'center' }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-indigo)', letterSpacing: '-0.02em' }}>
                ₹500Cr+
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Verified Scholarship Pool
              </p>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-violet)', letterSpacing: '-0.02em' }}>
                1,20,000+
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Active Student Beneficiaries
              </p>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '-0.02em' }}>
                98.4%
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Eligibility Match Accuracy
              </p>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em' }}>
                18+
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Prestigious Partner Portals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>Simple 3-Step Process</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              How Grantly Eliminates Scholarship Friction
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              No more scrolling through confusing 40-page PDF notifications or guessing your income eligibility.
            </p>
          </div>

          <div className="grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--primary-indigo-light)',
                  color: 'var(--accent-violet)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  fontWeight: 800,
                  fontSize: '1.25rem'
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Enter Profile Credentials
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Add your 12th/current marks, degree, category (General, OBC, SC, ST, EWS), family annual income, and domicile state.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--accent-emerald-light)',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  fontWeight: 800,
                  fontSize: '1.25rem'
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Algorithmic AI Matching
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Our rule engine audits every scholarship in real-time, showing your exact match percentage and highlighting any missing requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ padding: '2rem', position: 'relative' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--accent-amber-light)',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  fontWeight: 800,
                  fontSize: '1.25rem'
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Track & Apply Without Stress
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Move items across our Kanban Application Tracker from 'Preparing Documents' to 'Applied' with deadline reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED SCHOLARSHIPS */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-card-subtle)' }}>
        <div className="container">
          <div className="flex justify-between items-end" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>High-Value Opportunities</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Featured Indian Scholarships
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('discovery')}
              className="btn btn-secondary"
            >
              <span>View All 18+ Schemes</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-cols-2 gap-6">
            {featuredList.map((scholarship) => {
              const isSaved = savedIds.includes(scholarship.id);
              return (
                <div key={scholarship.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                    <div style={{ flex: 1, paddingRight: '1rem' }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                        <span className="badge badge-indigo">{scholarship.category}</span>
                        {scholarship.verified && (
                          <span className="badge badge-emerald">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        )}
                      </div>
                      <h3
                        onClick={() => openScholarshipDetails(scholarship)}
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          lineHeight: 1.3
                        }}
                      >
                        {scholarship.title}
                      </h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Offered by {scholarship.provider}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <CircularProgress value={scholarship.matchScore} size={48} strokeWidth={4} />
                      <button
                        onClick={() => toggleSaveScholarship(scholarship.id)}
                        className="btn btn-secondary btn-icon"
                        style={{ width: '38px', height: '38px', borderRadius: '50%' }}
                        title={isSaved ? 'Remove bookmark' : 'Save scholarship'}
                      >
                        <Bookmark size={16} fill={isSaved ? 'var(--accent-violet)' : 'none'} color={isSaved ? 'var(--accent-violet)' : 'currentColor'} />
                      </button>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                    {scholarship.description}
                  </p>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Award Grant</span>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>{scholarship.awardAmount}</strong>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Deadline</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{scholarship.deadline}</strong>
                    </div>

                    <button
                      onClick={() => openScholarshipDetails(scholarship)}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Why Grantly</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Engineered For The Indian College Reality
            </h2>
          </div>

          <div className="grid-cols-3 gap-6">
            <div className="card" style={{ padding: '1.75rem' }}>
              <Zap size={28} color="#6366f1" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Instant Eligibility Audit
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Clear explanations for why you qualify or why you don't. No legal jargon or ambiguity on income limits.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <Layers size={28} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Side-by-Side Comparison
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Compare up to 3 scholarships across award amounts, document burdens, and merit requirements in one table.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <Clock size={28} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
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
      <section style={{ padding: '5rem 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>Student Success</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Trusted By Scholars Across India
            </h2>
          </div>

          <div className="grid-cols-3 gap-6">
            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '1rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "I was skeptical about private scholarships until Grantly flagged the Reliance Foundation scheme based on my 12th marks. The document tracker made sure I submitted my Tehsildar certificate in time."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Ananya Roy"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Ananya Roy</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>B.Tech CSE, IIT Kharagpur (₹2L Scholar)</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '1rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "As an OBC candidate from a rural district, finding government schemes without middle-man fees used to be impossible. Grantly's rule engine verified my PM YASASVI eligibility instantly!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                  alt="Rohan Verma"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Rohan Verma</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>B.Sc Agriculture, Punjab Agricultural Uni</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div className="flex items-center gap-1" style={{ marginBottom: '1rem' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "The Adobe Women in Tech scholarship gave me full funding and a dream internship. The AI advisor even gave me tips on drafting my Statement of Purpose."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
                  alt="Divya Hegde"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Divya Hegde</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>B.E. Information Science, PES Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-neutral" style={{ marginBottom: '0.75rem' }}>Clear Answers</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
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
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '1rem',
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
                    <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
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
      <section style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 20px 30px -10px rgba(67, 56, 202, 0.4)'
            }}
          >
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Ready To Claim Your Scholarship?
            </h2>
            <p style={{ maxWidth: '620px', margin: '0 auto 2rem', fontSize: '1.05rem', color: '#e0e7ff', lineHeight: 1.6 }}>
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
