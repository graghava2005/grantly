import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Heart, ShieldCheck, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { setActiveTab, notify } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      notify('Please enter a valid student email address.', 'warning');
      return;
    }
    notify('Subscribed to Weekly Scholarship Alert Digests! Check your inbox.', 'success');
    setEmailInput('');
  };

  return (
    <footer
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        marginTop: '5rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand & Mission Column */}
          <div className="flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <GraduationCap size={22} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                GRANTLY
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              India’s unified, AI-powered scholarship discovery and management ecosystem. Bridging the gap between ambitious students and over ₹500+ Crores of verified government and CSR funding.
            </p>

            <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" />
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                100% Free • Verified Government & CSR Grants
              </span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button
                  onClick={() => { setActiveTab('discovery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Scholarship Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('eligibility'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  AI Eligibility Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Application Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('compare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Scholarship Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Official National Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  National Scholarship Portal (NSP) <ExternalLink size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aicte-india.org"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  AICTE Pragati & Saksham <ExternalLink size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://yet.nta.ac.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  NTA PM YASASVI Portal <ExternalLink size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.reliancefoundation.org"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Reliance Foundation Higher Ed <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Alerts */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Scholarship Deadline Alerts
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Receive weekly alerts for upcoming closing dates, CSR announcements, and state merit quotas.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="student@college.edu"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="input"
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.5rem 0.85rem' }}>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}
        >
          <div className="flex items-center gap-1">
            <span>© 2026 GRANTLY. Built for THE OUTPOST Hackathon.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Government Portal Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
