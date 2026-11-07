import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, loginDemoUser, loginUser, notify } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  if (!isAuthModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }
    if (authMode === 'register' && (!name || name.trim().length < 2)) {
      errs.name = 'Please enter your full name.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    loginUser({ name: name || email.split('@')[0], email });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content" style={{ maxWidth: '480px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
        {/* Header with Close */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Sparkles size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {authMode === 'register' ? 'Create Student Account' : 'Welcome to Grantly'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div
          style={{
            background: 'var(--primary-indigo-light)',
            border: '1px solid var(--accent-violet)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-violet)', textTransform: 'uppercase' }}>
              Hackathon Evaluation Fast-Track
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
              Instant Demo
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Jump straight into the live student dashboard pre-loaded with verified documents, applications, and realistic criteria.
          </p>
          <button
            type="button"
            onClick={loginDemoUser}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            <CheckCircle2 size={16} /> Continue as Demo Student (Aarav Sharma)
          </button>
        </div>

        {/* Mode Tabs */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.25rem',
            marginBottom: '1.5rem'
          }}
        >
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: authMode === 'login' ? 'var(--bg-card)' : 'transparent',
              color: authMode === 'login' ? 'var(--accent-violet)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: authMode === 'login' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: authMode === 'register' ? 'var(--bg-card)' : 'transparent',
              color: authMode === 'register' ? 'var(--accent-violet)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: authMode === 'register' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Register
          </button>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                Full Student Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. Priya Iyer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
              {errors.name && <span style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }}>{errors.name}</span>}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                placeholder="aarav@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                style={{ paddingLeft: '36px' }}
              />
            </div>
            {errors.email && <span style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }}>{errors.email}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                style={{ paddingLeft: '36px' }}
              />
            </div>
            {errors.password && <span style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }}>{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <span>{authMode === 'register' ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
