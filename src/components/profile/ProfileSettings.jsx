import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_DEMO_STUDENT } from '../../data/initialUserData';
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Save,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Upload,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function ProfileSettings() {
  const { profile, updateProfile, theme, toggleTheme, notify } = useApp();

  // Local state initialized with current profile
  const [formData, setFormData] = useState({
    name: profile?.name || 'Aarav Sharma',
    email: profile?.email || 'aarav.sharma@student.in',
    phone: profile?.phone || '+91 98201 44521',
    gender: profile?.gender || 'Male',
    category: profile?.category || 'General',
    educationLevel: profile?.educationLevel || 'B.Tech',
    course: profile?.course || 'B.Tech (Computer Science)',
    institution: profile?.institution || 'Veermata Jijabai Technological Institute (VJTI)',
    yearOfStudy: profile?.yearOfStudy || '1st Year',
    percentage: profile?.percentage || 82.5,
    class10Percentage: profile?.class10Percentage || 88.4,
    class12Percentage: profile?.class12Percentage || 84.5,
    familyIncome: profile?.familyIncome || 240000,
    domicileState: profile?.domicileState || 'Maharashtra',
    isDifferentlyAbled: profile?.isDifferentlyAbled || false,
    bio: profile?.bio || 'Aspiring software engineer passionate about AI and distributed systems.'
  });

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'academics' | 'financial' | 'documents'
  const [documents, setDocuments] = useState(profile?.documentsUploaded || DEFAULT_DEMO_STUDENT.documentsUploaded);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || 'Aarav Sharma',
        email: profile.email || 'aarav.sharma@student.in',
        phone: profile.phone || '+91 98201 44521',
        gender: profile.gender || 'Male',
        category: profile.category || 'General',
        educationLevel: profile.educationLevel || 'B.Tech',
        course: profile.course || 'B.Tech (Computer Science)',
        institution: profile.institution || 'Veermata Jijabai Technological Institute (VJTI)',
        yearOfStudy: profile.yearOfStudy || '1st Year',
        percentage: profile.percentage || 82.5,
        class10Percentage: profile.class10Percentage || 88.4,
        class12Percentage: profile.class12Percentage || 84.5,
        familyIncome: profile.familyIncome || 240000,
        domicileState: profile.domicileState || 'Maharashtra',
        isDifferentlyAbled: profile.isDifferentlyAbled || false,
        bio: profile.bio || 'Aspiring software engineer passionate about AI and distributed systems.'
      });
      if (profile.documentsUploaded) {
        setDocuments(profile.documentsUploaded);
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      percentage: Number(formData.percentage),
      familyIncome: Number(formData.familyIncome),
      class10Percentage: Number(formData.class10Percentage),
      class12Percentage: Number(formData.class12Percentage),
      documentsUploaded: documents
    });
  };

  const handleResetToDemo = () => {
    setFormData({
      ...DEFAULT_DEMO_STUDENT
    });
    setDocuments(DEFAULT_DEMO_STUDENT.documentsUploaded);
    updateProfile(DEFAULT_DEMO_STUDENT);
    notify('Profile reset to official Demo Student defaults.', 'info');
  };

  const handleUploadDummy = () => {
    const docNames = ['Income Certificate 2026-27', 'EWS Certificate', 'College Fee Receipt', 'NSP Bonafide Form'];
    const randomName = docNames[Math.floor(Math.random() * docNames.length)];
    const newDoc = {
      name: randomName,
      status: 'Verified',
      date: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [newDoc, ...prev]);
    notify(`Document "${randomName}" uploaded and auto-verified!`, 'success');
  };

  const indianStates = [
    'Maharashtra', 'Karnataka', 'Delhi', 'Uttar Pradesh', 'Tamil Nadu',
    'Telangana', 'West Bengal', 'Kerala', 'Gujarat', 'Rajasthan', 'Bihar',
    'Jammu & Kashmir', 'Ladakh', 'Punjab', 'Madhya Pradesh', 'Andhra Pradesh',
    'Assam', 'Haryana', 'Odisha', 'Jharkhand'
  ];

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Title */}
      <div className="flex justify-between items-end wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
            <span className="badge badge-indigo">Student Dossier</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Powers All 18+ Algorithmic Matches
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Profile Credentials & Settings
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Keep your income and academic records updated to ensure 100% eligibility accuracy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDemo}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Defaults</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="profile-layout-grid">
        {/* Left Nav & Summary */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex-col items-center" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img
              src={profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
              alt={formData.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-violet)',
                marginBottom: '0.75rem',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{formData.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>{formData.email}</p>
            <span className="badge badge-emerald">Verified Indian Scholar</span>
          </div>

          {/* Tab Selector */}
          <div className="flex-col gap-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                background: activeTab === 'general' ? 'var(--primary-indigo-light)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <User size={16} />
              <span>Personal Details</span>
            </button>

            <button
              onClick={() => setActiveTab('academics')}
              className={`nav-link ${activeTab === 'academics' ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                background: activeTab === 'academics' ? 'var(--primary-indigo-light)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <GraduationCap size={16} />
              <span>Academic Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('financial')}
              className={`nav-link ${activeTab === 'financial' ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                background: activeTab === 'financial' ? 'var(--primary-indigo-light)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Building2 size={16} />
              <span>Income & Reservation</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
              style={{
                width: '100%',
                border: 'none',
                background: activeTab === 'documents' ? 'var(--primary-indigo-light)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <FileText size={16} />
              <span>Document Locker ({documents.length})</span>
            </button>
          </div>
        </div>

        {/* Right Form Container */}
        <form onSubmit={handleSave} className="card" style={{ padding: '2rem', flex: '1 1 500px' }}>
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Personal Credentials</h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Permanent Domicile State
                  </label>
                  <select
                    name="domicileState"
                    value={formData.domicileState}
                    onChange={handleChange}
                    className="select"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Student Bio / Statement
                </label>
                <textarea
                  rows={3}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="textarea"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMICS */}
          {activeTab === 'academics' && (
            <div className="flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Academic Records</h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Current College / Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Education Level
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="B.Tech">B.Tech / B.E (Engineering)</option>
                    <option value="MBBS">MBBS / Medicine</option>
                    <option value="B.Sc">B.Sc / Pure Science</option>
                    <option value="B.Com">B.Com / Commerce</option>
                    <option value="Class 12">Class 12 Senior Secondary</option>
                    <option value="Diploma">Polytechnic Diploma</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="1st Year">1st Year / Freshman</option>
                    <option value="2nd Year">2nd Year / Sophomore</option>
                    <option value="3rd Year">3rd Year / Junior</option>
                    <option value="4th Year">4th Year / Senior</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Current / 12th Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Class 10th Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="class10Percentage"
                    value={formData.class10Percentage}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Class 12th Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="class12Percentage"
                    value={formData.class12Percentage}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIAL & RESERVATION */}
          {activeTab === 'financial' && (
            <div className="flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Income & Category Criteria</h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Gross Annual Family Income (INR)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    step="5000"
                    name="familyIncome"
                    value={formData.familyIncome}
                    onChange={handleChange}
                    className="input"
                    style={{ paddingLeft: '32px' }}
                    required
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                  Equivalent to <strong>₹{(Number(formData.familyIncome || 0)/100000).toFixed(2)} Lakhs per annum</strong>. Matches Tehsildar Certificate.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Social Category / Caste Reservation
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select"
                >
                  <option value="General">General / Open</option>
                  <option value="OBC">Other Backward Classes (OBC - Non-Creamy)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                </select>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <label className="flex items-center gap-2" style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    name="isDifferentlyAbled"
                    checked={formData.isDifferentlyAbled}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--accent-violet)', width: '18px', height: '18px' }}
                  />
                  <span>Differently-Abled (Disability Certificate ≥ 40%)</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '26px', display: 'block' }}>
                  Unlocks AICTE Saksham and dedicated central welfare quotas.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENT LOCKER */}
          {activeTab === 'documents' && (
            <div className="flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Verified Document Vault</h3>
                <button
                  type="button"
                  onClick={handleUploadDummy}
                  className="btn btn-secondary btn-sm"
                >
                  <Upload size={14} />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="flex-col gap-2">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card-subtle)',
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} color="var(--accent-violet)" />
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>
                          {doc.name}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Uploaded {doc.date}
                        </span>
                      </div>
                    </div>

                    <span className="badge badge-emerald">
                      <ShieldCheck size={12} /> {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Submit Footer */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Save size={18} />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
