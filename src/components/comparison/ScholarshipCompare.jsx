import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../common/CircularProgress';
import {
  GitCompare,
  X,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ScholarshipCompare() {
  const {
    compareList,
    removeFromCompare,
    scholarships,
    toggleCompareScholarship,
    openScholarshipDetails,
    addApplication,
    setActiveTab
  } = useApp();

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  // Retrieve full objects for scholarships in compareList
  const comparedItems = compareList
    .map(id => scholarships.find(s => s.id === id))
    .filter(Boolean);

  const availableToAdd = scholarships.filter(s => !compareList.includes(s.id));

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Header */}
      <div className="flex justify-between items-end wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
            <span className="badge badge-indigo">Side-by-Side Matrix</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Comparing {comparedItems.length} of 3 Schemes
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Scholarship Comparison Matrix
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Evaluate funding values, eligibility requirements, and document overhead side by side.
          </p>
        </div>

        {/* Add more button */}
        {comparedItems.length < 3 && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
              className="btn btn-secondary"
            >
              <Plus size={16} />
              <span>Add Scheme to Compare</span>
            </button>

            {addDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: 'min(320px, calc(100vw - 2.5rem))',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 80,
                  padding: '0.5rem'
                }}
              >
                {availableToAdd.map(sch => (
                  <button
                    key={sch.id}
                    onClick={() => {
                      toggleCompareScholarship(sch.id);
                      setAddDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontWeight: 700 }}>{sch.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>{sch.awardAmount} • {sch.provider}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {comparedItems.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-indigo-light)',
              color: 'var(--accent-violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <GitCompare size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            No Scholarships in Comparison Table
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
            Select any scholarship in the Discovery directory and click "Compare" to view them side-by-side.
          </p>
          <button onClick={() => setActiveTab('discovery')} className="btn btn-primary">
            Explore Scholarships
          </button>
        </div>
      ) : (
        /* COMPARISON TABLE */
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            ⇄ Swipe horizontally on mobile / tablet to inspect all comparison columns
          </span>
          <div className="card" style={{ overflowX: 'auto', padding: '0', borderRadius: 'var(--radius-xl)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <tbody>
              {/* ROW 1: Header / Title Card */}
              <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.5rem', width: '22%', fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  Scholarship Overview
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.5rem', width: `${78 / comparedItems.length}%`, verticalAlign: 'top' }}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="badge badge-indigo" style={{ fontSize: '0.65rem', marginBottom: '0.35rem' }}>
                          {item.category}
                        </span>
                        <h4
                          onClick={() => openScholarshipDetails(item)}
                          style={{ fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', color: 'var(--text-primary)', lineHeight: 1.3 }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {item.provider}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        title="Remove from comparison"
                        aria-label={`Remove ${item.title} from comparison`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 2: AI Match Compatibility */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  AI Profile Match
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="flex items-center gap-3">
                      <CircularProgress value={item.matchScore} size={48} strokeWidth={4} />
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.matchGrade}</strong>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                          {item.isEligible ? 'Eligible' : 'Check requirements'}
                        </p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 3: Award Amount */}
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Award Grant Amount
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                      {item.awardAmount}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.type}
                    </span>
                  </td>
                ))}
              </tr>

              {/* ROW 4: Application Deadline */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Closing Deadline
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {item.deadline}
                    </strong>
                    <span
                      className={`badge ${item.daysLeft <= 15 ? 'badge-rose' : 'badge-amber'}`}
                      style={{ marginLeft: '0.5rem', fontSize: '0.68rem' }}
                    >
                      {item.daysLeft}d left
                    </span>
                  </td>
                ))}
              </tr>

              {/* ROW 5: Minimum Academic Score */}
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Min Academic Score
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                    <strong>{item.minPercentage}%</strong> in 10th / 12th / Degree
                  </td>
                ))}
              </tr>

              {/* ROW 6: Family Income Limit */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Max Family Income
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                    <strong>₹{((item.maxIncome || 0)/100000).toFixed(1)} Lakhs / year</strong>
                  </td>
                ))}
              </tr>

              {/* ROW 7: Social Category & Reservation */}
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Target Category
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem' }}>
                    {(item.targetCategory || ['All']).join(', ')}
                  </td>
                ))}
              </tr>

              {/* ROW 8: Gender Restriction */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Gender Policy
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem' }}>
                    {item.targetGender === 'All' ? 'Open to All Genders' : `Exclusively for ${item.targetGender}s`}
                  </td>
                ))}
              </tr>

              {/* ROW 9: Required Documents Count */}
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '0.875rem' }}>
                  Documents Required
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.25rem 1.5rem', fontSize: '0.8125rem' }}>
                    <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-secondary)' }}>
                      {(item.requiredDocuments || []).slice(0, 4).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 10: Apply / Action CTA */}
              <tr style={{ background: 'var(--bg-card-subtle)' }}>
                <td style={{ padding: '1.5rem', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Action
                </td>
                {comparedItems.map(item => (
                  <td key={item.id} style={{ padding: '1.5rem' }}>
                    <button
                      onClick={() => {
                        addApplication(item, 'Preparing Documents');
                        if (item.officialUrl) window.open(item.officialUrl, '_blank');
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <span>Apply & Track</span>
                      <ArrowRight size={14} />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
}
