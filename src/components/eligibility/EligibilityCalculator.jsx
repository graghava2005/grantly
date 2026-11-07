import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateEligibilityMatch } from '../../utils/eligibilityEngine';
import CircularProgress from '../common/CircularProgress';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Save,
  ArrowRight,
  HelpCircle,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function EligibilityCalculator() {
  const { scholarships, profile, updateProfile, openScholarshipDetails, addApplication, notify } = useApp();

  const [selectedSchId, setSelectedSchId] = useState(() => scholarships[0]?.id || 'reliance-ug-2025');

  // Simulated profile state for live testing
  const [simMarks, setSimMarks] = useState(profile?.percentage || 82.5);
  const [simIncome, setSimIncome] = useState(profile?.familyIncome || 240000);
  const [simCategory, setSimCategory] = useState(profile?.category || 'General');
  const [simGender, setSimGender] = useState(profile?.gender || 'Male');
  const [simCourse, setSimCourse] = useState(profile?.educationLevel || 'B.Tech');
  const [simState, setSimState] = useState(profile?.domicileState || 'Maharashtra');

  const selectedScholarship = useMemo(() => {
    return scholarships.find(s => s.id === selectedSchId) || scholarships[0];
  }, [scholarships, selectedSchId]);

  // Construct simulated student profile object
  const simulatedStudent = useMemo(() => ({
    ...profile,
    percentage: Number(simMarks),
    familyIncome: Number(simIncome),
    category: simCategory,
    gender: simGender,
    educationLevel: simCourse,
    course: simCourse,
    domicileState: simState
  }), [profile, simMarks, simIncome, simCategory, simGender, simCourse, simState]);

  // Run live rule-based eligibility calculation
  const matchResult = useMemo(() => {
    return calculateEligibilityMatch(simulatedStudent, selectedScholarship);
  }, [simulatedStudent, selectedScholarship]);

  const saveSimulationToProfile = () => {
    updateProfile({
      percentage: Number(simMarks),
      familyIncome: Number(simIncome),
      category: simCategory,
      gender: simGender,
      educationLevel: simCourse,
      domicileState: simState
    });
    notify('Simulation applied to your permanent student profile!', 'success');
  };

  const statesList = [
    'All India', 'Maharashtra', 'Karnataka', 'Delhi', 'Uttar Pradesh', 'Tamil Nadu',
    'Telangana', 'West Bengal', 'Kerala', 'Gujarat', 'Rajasthan', 'Bihar',
    'Jammu & Kashmir', 'Ladakh', 'Punjab', 'Madhya Pradesh', 'Andhra Pradesh'
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
          <span className="badge badge-indigo">
            <Sparkles size={12} /> Transparent Rule Engine
          </span>
          <span className="badge badge-emerald">Deterministic Evaluation</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI Eligibility Engine & Profile Auditor
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', fontSize: '0.95rem' }}>
          Inspect how our algorithmic matcher compares your exact parameters against institutional requirements. Simulate parameter changes live to see what unlocks higher funding probability.
        </p>
      </div>

      {/* SCHOLARSHIP SELECTOR DROPDOWN */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', background: 'var(--bg-card)' }}>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Select Scholarship to Audit Against:
        </label>
        <div className="flex gap-4 wrap items-center">
          <select
            value={selectedSchId}
            onChange={(e) => setSelectedSchId(e.target.value)}
            className="select"
            style={{ flex: 1, fontSize: '1rem', fontWeight: 600 }}
          >
            {scholarships.map((sch) => (
              <option key={sch.id} value={sch.id}>
                {sch.title} — {sch.provider} ({sch.awardAmount})
              </option>
            ))}
          </select>
          <button
            onClick={() => openScholarshipDetails(selectedScholarship)}
            className="btn btn-secondary"
          >
            View Scheme Details
          </button>
        </div>
      </div>

      {/* TWO-COLUMN AUDIT VIEW */}
      <div className="calculator-layout-grid">
        {/* Left Column: Live Calculation Result Card */}
        <div className="flex-col gap-4">
          <div
            className="card"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--primary-indigo-light) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div className="flex justify-between items-start gap-4" style={{ marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
                  {selectedScholarship.category}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                  {selectedScholarship.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {selectedScholarship.provider} • Max Ceiling: ₹{((selectedScholarship.maxIncome || 0)/100000).toFixed(1)}L p.a.
                </p>
              </div>

              <div className="flex-col items-center">
                <CircularProgress value={matchResult.score} size={68} strokeWidth={6} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.25rem', color: matchResult.score >= 70 ? 'var(--accent-emerald)' : '#f59e0b' }}>
                  {matchResult.grade}
                </span>
              </div>
            </div>

            {/* Verdict Box */}
            <div
              style={{
                background: 'var(--bg-card)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem'
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
                {matchResult.isEligible ? (
                  <CheckCircle2 size={18} color="#10b981" />
                ) : (
                  <AlertTriangle size={18} color="#f43f5e" />
                )}
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: matchResult.isEligible ? '#059669' : '#e11d48' }}>
                  {matchResult.isEligible ? 'Technically Eligible' : 'Eligibility Issues Detected'}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {matchResult.summary}
              </p>
            </div>

            {/* Breakdown of Satisfied Rules */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Satisfied Rule Benchmarks ({matchResult.matchedReasons.length})
              </h4>
              <div className="flex-col gap-2">
                {matchResult.matchedReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-primary)' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakdown of Failed Rules / Blockers */}
            {matchResult.unmatchedReasons.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  Unsatisfied Benchmarks ({matchResult.unmatchedReasons.length})
                </h4>
                <div className="flex-col gap-2">
                  {matchResult.unmatchedReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--accent-rose-light)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        border: '1px solid rgba(244, 63, 94, 0.2)'
                      }}
                    >
                      <AlertTriangle size={16} color="#f43f5e" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#be123c', fontWeight: 500 }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Button */}
            <div className="flex gap-3 wrap" style={{ marginTop: '1.5rem' }}>
              <button
                onClick={() => addApplication(selectedScholarship, 'Interested')}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>Add to My Application Tracker</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Profile Simulator */}
        <div className="card" style={{ padding: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
            <div className="flex items-center gap-2">
              <Sliders size={20} color="var(--accent-violet)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Live Criteria Simulator
              </h3>
            </div>
            <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>Interactive</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Adjust any attribute below. The AI matching algorithm instantly recalculates score, explanations, and disqualifiers.
          </p>

          <div className="flex-col gap-4">
            {/* 1. Academic Percentage Slider */}
            <div>
              <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  Academic Score / 12th Marks:
                </label>
                <strong style={{ color: 'var(--accent-violet)', fontSize: '1rem' }}>
                  {simMarks}%
                </strong>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="0.5"
                value={simMarks}
                onChange={(e) => setSimMarks(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-violet)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Required minimum for {selectedScholarship.title}: <strong>{selectedScholarship.minPercentage}%</strong>
              </span>
            </div>

            {/* 2. Family Income Slider */}
            <div>
              <div className="flex justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  Annual Family Income:
                </label>
                <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>
                  ₹{(Number(simIncome) / 100000).toFixed(2)} Lakhs
                </strong>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="25000"
                value={simIncome}
                onChange={(e) => setSimIncome(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Ceiling limit for {selectedScholarship.title}: <strong>₹{((selectedScholarship.maxIncome || 0)/100000).toFixed(1)} Lakhs</strong>
              </span>
            </div>

            {/* 3. Category Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Social Category / Caste Reservation:
              </label>
              <select
                value={simCategory}
                onChange={(e) => setSimCategory(e.target.value)}
                className="select"
              >
                <option value="General">General / Open</option>
                <option value="OBC">Other Backward Classes (OBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            {/* 4. Gender Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Gender:
              </label>
              <select
                value={simGender}
                onChange={(e) => setSimGender(e.target.value)}
                className="select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Non-Binary</option>
              </select>
            </div>

            {/* 5. Course / Degree Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Degree / Course Stream:
              </label>
              <select
                value={simCourse}
                onChange={(e) => setSimCourse(e.target.value)}
                className="select"
              >
                <option value="B.Tech">B.Tech / B.E (Engineering)</option>
                <option value="MBBS">MBBS / Medical / Dental</option>
                <option value="B.Sc">B.Sc / General Science</option>
                <option value="B.Com">B.Com / BBA / Commerce</option>
                <option value="Class 12">Class 11 / Class 12 Senior Secondary</option>
                <option value="Diploma">Polytechnic Diploma</option>
              </select>
            </div>

            {/* 6. Domicile State */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Permanent Domicile State:
              </label>
              <select
                value={simState}
                onChange={(e) => setSimState(e.target.value)}
                className="select"
              >
                {statesList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              onClick={saveSimulationToProfile}
              className="btn btn-secondary"
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Save size={16} />
              <span>Save Changes to My Permanent Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
