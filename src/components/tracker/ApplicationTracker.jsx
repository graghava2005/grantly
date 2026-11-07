import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CircularProgress from '../common/CircularProgress';
import {
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
  Save,
  Award
} from 'lucide-react';

export default function ApplicationTracker() {
  const {
    applications,
    updateApplicationStatus,
    scholarships,
    addApplication,
    openScholarshipDetails,
    notify
  } = useApp();

  const [activeEditingApp, setActiveEditingApp] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSchToAdd, setSelectedSchToAdd] = useState('');

  const stages = [
    { id: 'Interested', label: 'Interested', color: 'var(--text-secondary)', badgeClass: 'badge-neutral' },
    { id: 'Preparing Documents', label: 'Preparing Docs', color: '#d97706', badgeClass: 'badge-amber' },
    { id: 'Applied', label: 'Applied', color: 'var(--accent-violet)', badgeClass: 'badge-indigo' },
    { id: 'Under Review', label: 'Under Review', color: '#8b5cf6', badgeClass: 'badge-indigo' },
    { id: 'Approved', label: 'Approved 🎉', color: 'var(--accent-emerald)', badgeClass: 'badge-emerald' },
    { id: 'Rejected', label: 'Rejected', color: 'var(--accent-rose)', badgeClass: 'badge-rose' }
  ];

  // Calculate high-level pipeline stats
  const approvedTotal = applications
    .filter(a => a.status === 'Approved')
    .reduce((acc, curr) => acc + (curr.amount.includes('₹') ? parseInt(curr.amount.replace(/[^0-9]/g, '')) || 0 : 0), 0);

  const pendingTotal = applications
    .filter(a => ['Applied', 'Under Review'].includes(a.status))
    .reduce((acc, curr) => acc + (curr.amount.includes('₹') ? parseInt(curr.amount.replace(/[^0-9]/g, '')) || 0 : 0), 0);

  const openEditModal = (app) => {
    setActiveEditingApp(app);
    setEditingNotes(app.notes || '');
    setEditingStatus(app.status);
  };

  const handleSaveNotes = () => {
    if (!activeEditingApp) return;
    updateApplicationStatus(activeEditingApp.id, editingStatus, editingNotes);
    setActiveEditingApp(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!selectedSchToAdd) {
      notify('Please select a scholarship to track.', 'warning');
      return;
    }
    const sch = scholarships.find(s => s.id === selectedSchToAdd);
    if (sch) {
      addApplication(sch, 'Interested');
      setIsAddModalOpen(false);
      setSelectedSchToAdd('');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Header */}
      <div className="flex justify-between items-end wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
            <span className="badge badge-indigo">Kanban Workflow</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {applications.length} Active Records
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Scholarship Application Tracker
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Monitor your milestones from document verification to disbursement approval. Drag or click status to progress.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Track New Scholarship</span>
        </button>
      </div>

      {/* Pipeline Summary Bar */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-around',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-subtle) 100%)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            In Active Pipeline
          </span>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {applications.length} Schemes
          </p>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Funds In Review / Processing
          </span>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-violet)', margin: 0 }}>
            ₹{(pendingTotal / 100000).toFixed(2)} Lakhs
          </p>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Approved Grants
          </span>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: 0 }}>
            ₹{(approvedTotal / 100000).toFixed(2)} Lakhs
          </p>
        </div>
      </div>

      {/* KANBAN BOARD 6-COLUMN GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start'
        }}
      >
        {stages.map((stage) => {
          const itemsInStage = applications.filter(a => a.status === stage.id);

          return (
            <div
              key={stage.id}
              style={{
                background: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '1rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center" style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {stage.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    borderRadius: '9999px',
                    padding: '0.15rem 0.55rem',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {itemsInStage.length}
                </span>
              </div>

              {/* Items List */}
              <div className="flex-col gap-3" style={{ flex: 1 }}>
                {itemsInStage.map((app) => (
                  <div
                    key={app.id}
                    className="card"
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div className="flex justify-between items-start gap-2" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                        {app.matchScore}% Match
                      </span>
                      <button
                        onClick={() => openEditModal(app)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        title="Edit status & notes"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        const sch = scholarships.find(s => s.id === app.scholarshipId);
                        if (sch) openScholarshipDetails(sch);
                      }}
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                        marginBottom: '0.35rem'
                      }}
                    >
                      {app.title}
                    </h4>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {app.provider}
                    </p>

                    <div className="flex justify-between items-center" style={{ fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>{app.amount}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Due: {app.deadline}
                      </span>
                    </div>

                    {app.notes && (
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          background: 'var(--bg-card-subtle)',
                          padding: '0.4rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: '0.75rem',
                          lineHeight: 1.4
                        }}
                      >
                        "{app.notes}"
                      </p>
                    )}

                    {/* Quick Move Status Selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="select"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', height: 'auto' }}
                      >
                        {stages.map(st => (
                          <option key={st.id} value={st.id}>
                            Move to: {st.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {itemsInStage.length === 0 && (
                  <div
                    style={{
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                      fontStyle: 'italic',
                      border: '1px dashed var(--border-color)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    No applications at this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL FOR NOTES & STATUS */}
      {activeEditingApp && (
        <div className="modal-overlay" onClick={() => setActiveEditingApp(null)}>
          <div className="modal-content" style={{ maxWidth: '500px', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Update Application Record</h3>
              <button onClick={() => setActiveEditingApp(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>{activeEditingApp.title}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeEditingApp.provider} • {activeEditingApp.amount}</p>
            </div>

            <div className="flex-col gap-3">
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Application Status
                </label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  className="select"
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Student Notes & Reminders
                </label>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="textarea"
                  placeholder="e.g. Uploaded bonafide form on 12th Nov, waiting for HOD verification..."
                />
              </div>

              <div className="flex justify-between items-center" style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    // Remove from applications
                    updateApplicationStatus(activeEditingApp.id, 'Rejected');
                    setActiveEditingApp(null);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  Mark Inactive
                </button>

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW APPLICATION MODAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add Scholarship to Tracker</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="flex-col gap-4">
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Select Scholarship Scheme:
                </label>
                <select
                  value={selectedSchToAdd}
                  onChange={(e) => setSelectedSchToAdd(e.target.value)}
                  className="select"
                  required
                >
                  <option value="">-- Choose a scholarship --</option>
                  {scholarships.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.provider}) — {s.awardAmount}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                <Plus size={16} /> Track Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
