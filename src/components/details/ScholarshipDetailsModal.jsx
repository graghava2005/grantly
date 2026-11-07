import React from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../common/CircularProgress';
import {
  X,
  Bookmark,
  GitCompare,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Award,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

export default function ScholarshipDetailsModal() {
  const {
    selectedScholarship,
    closeScholarshipDetails,
    savedIds,
    toggleSaveScholarship,
    compareList,
    toggleCompareScholarship,
    addApplication,
    profile,
    setActiveTab
  } = useApp();

  if (!selectedScholarship) return null;

  const isSaved = savedIds.includes(selectedScholarship.id);
  const isCompared = compareList.includes(selectedScholarship.id);
  const match = selectedScholarship.matchDetails;

  const handleApply = () => {
    // Add to Application Tracker in 'Preparing Documents'
    addApplication(selectedScholarship, 'Preparing Documents');
    if (selectedScholarship.officialUrl) {
      window.open(selectedScholarship.officialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeScholarshipDetails}>
      <div
        className="modal-content modal-lg"
        style={{ padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--primary-indigo-light) 100%)',
            padding: '2rem',
            borderBottom: '1px solid var(--border-color)',
            position: 'relative'
          }}
        >
          <div className="flex justify-between items-start gap-4">
            <div style={{ flex: 1 }}>
              <div className="flex items-center gap-2 wrap" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-indigo">{selectedScholarship.category}</span>
                {selectedScholarship.verified && (
                  <span className="badge badge-emerald">
                    <ShieldCheck size={12} /> Government / CSR Verified
                  </span>
                )}
                <span className="badge badge-neutral">{selectedScholarship.type}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {selectedScholarship.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Offered by <strong>{selectedScholarship.provider}</strong>
              </p>
            </div>

            <button
              onClick={closeScholarshipDetails}
              className="btn btn-secondary btn-icon"
              style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Stat Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
              background: 'var(--bg-card)',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Award Amount
              </span>
              <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: 0 }}>
                {selectedScholarship.awardAmount}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Deadline
              </span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {selectedScholarship.deadline}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Timeline
              </span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: selectedScholarship.daysLeft <= 15 ? 'var(--accent-rose)' : 'var(--accent-amber)', margin: 0 }}>
                {selectedScholarship.daysLeft} days remaining
              </p>
            </div>

            <div className="flex items-center gap-2">
              <CircularProgress value={selectedScholarship.matchScore} size={42} strokeWidth={4} />
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Match Fit
                </span>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {selectedScholarship.matchGrade}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 1. Algorithmic AI Eligibility Match Audit */}
          <div
            style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem'
            }}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} color="var(--accent-violet)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                  AI Profile Match Audit ({selectedScholarship.matchScore}% Compatibility)
                </h4>
              </div>
              <span className={`badge ${selectedScholarship.matchScore >= 70 ? 'badge-emerald' : 'badge-amber'}`}>
                {selectedScholarship.matchGrade}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {match?.summary || 'Evaluated against your latest academic score, family income, and category.'}
            </p>

            {/* Matched reasons checklist */}
            {match?.matchedReasons && match.matchedReasons.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Criteria You Satisfy:
                </span>
                <div className="flex-col gap-2">
                  {match.matchedReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unmatched / Blockers */}
            {match?.unmatchedReasons && match.unmatchedReasons.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Potential Eligibility Barriers:
                </span>
                <div className="flex-col gap-2">
                  {match.unmatchedReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--accent-rose)' }}>
                      <AlertTriangle size={16} color="#f43f5e" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Info */}
            {match?.missingInfo && match.missingInfo.length > 0 && (
              <div style={{ background: 'var(--accent-amber-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Action Needed to Increase Match:
                </span>
                {match.missingInfo.map((info, idx) => (
                  <p key={idx} style={{ margin: 0, fontSize: '0.8125rem', color: '#b45309' }}>
                    • {info}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* 2. Overview */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Program Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.65 }}>
              {selectedScholarship.fullOverview || selectedScholarship.description}
            </p>
          </div>

          {/* 3. Benefits & Coverage */}
          {selectedScholarship.benefits && selectedScholarship.benefits.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Scholarship Benefits & Grants
              </h4>
              <div className="flex-col gap-2">
                {selectedScholarship.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5" style={{ fontSize: '0.9rem' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--accent-emerald-light)',
                        color: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Award size={13} />
                    </div>
                    <span style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Required Documentation */}
          {selectedScholarship.requiredDocuments && selectedScholarship.requiredDocuments.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Mandatory Supporting Documents
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                {selectedScholarship.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-card-subtle)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <FileText size={16} color="var(--accent-violet)" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveScholarship(selectedScholarship.id)}
              className="btn btn-secondary"
            >
              <Bookmark size={16} fill={isSaved ? 'var(--accent-violet)' : 'none'} color={isSaved ? 'var(--accent-violet)' : 'currentColor'} />
              <span>{isSaved ? 'Saved in Bookmarks' : 'Save Scholarship'}</span>
            </button>

            <button
              onClick={() => toggleCompareScholarship(selectedScholarship.id)}
              className={`btn ${isCompared ? 'btn-emerald' : 'btn-secondary'}`}
            >
              <GitCompare size={16} />
              <span>{isCompared ? 'In Compare Table' : 'Compare'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'none' }} id="apply-portal-hint">
              Opens {selectedScholarship.provider} Official Portal
            </span>
            <button
              onClick={handleApply}
              className="btn btn-primary btn-lg"
            >
              <span>Apply on Official Portal & Track</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
