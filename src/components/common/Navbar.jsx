import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Compass,
  LayoutDashboard,
  CheckCircle2,
  GitCompare,
  Sparkles,
  Bookmark,
  Sun,
  Moon,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    user,
    savedIds,
    compareList,
    setIsAuthModalOpen,
    setAuthMode,
    logoutUser,
    setIsChatOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'discovery', label: 'Discover', icon: Compass, count: null },
    { id: 'eligibility', label: 'AI Match', icon: Sparkles, count: null },
    { id: 'tracker', label: 'Tracker', icon: CheckCircle2, count: null },
    { id: 'compare', label: 'Compare', icon: GitCompare, count: compareList.length > 0 ? compareList.length : null },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container flex items-center justify-between" style={{ height: '100%' }}>
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('landing')}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
          >
            <GraduationCap size={24} strokeWidth={2.3} />
          </div>
          <div className="flex-col">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-main)'
                }}
              >
                GRANTLY
              </span>
              <span className="badge badge-indigo" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                IN
              </span>
            </div>
            <span
              className="navbar-brand-tagline"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                lineHeight: 1
              }}
            >
              Your Future Deserves Funding
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ border: 'none', background: isActive ? 'var(--primary-indigo-light)' : 'transparent', cursor: 'pointer' }}
              >
                {Icon && <Icon size={16} />}
                <span>{item.label}</span>
                {item.count !== null && item.count > 0 && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: 'var(--accent-violet)',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      padding: '0.1rem 0.4rem',
                      lineHeight: 1
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Ask AI Assistant Floating Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn btn-outline btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: 'var(--accent-violet)',
              color: 'var(--accent-violet)'
            }}
            title="Open Grantly AI Assistant"
            aria-label="Open Grantly AI Assistant"
          >
            <Sparkles size={15} />
            <span style={{ fontWeight: 700 }}>AI Advisor</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            style={{ borderRadius: 'var(--radius-full)', width: '38px', height: '38px' }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#f59e0b" />}
          </button>

          {/* User Profile or Login CTA */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.75rem 0.25rem 0.35rem',
                  cursor: 'pointer'
                }}
                aria-label="User profile menu"
                aria-expanded={profileDropdownOpen}
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
                  alt={user.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-violet)'
                  }}
                />
                <div className="navbar-user-name">
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    Verified Student
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '230px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: '0.5rem',
                    zIndex: 100,
                    animation: 'scaleUp 0.15s ease-out'
                  }}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{user.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                  </div>

                  <div style={{ padding: '0.35rem 0' }}>
                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="nav-link"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <LayoutDashboard size={15} />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="nav-link"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <User size={15} />
                      <span>Profile & Eligibility</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('tracker');
                        setProfileDropdownOpen(false);
                      }}
                      className="nav-link"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <CheckCircle2 size={15} />
                      <span>Application Tracker</span>
                    </button>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.35rem' }}>
                    <button
                      onClick={() => {
                        logoutUser();
                        setProfileDropdownOpen(false);
                      }}
                      className="nav-link"
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: 'var(--accent-rose)'
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="btn btn-secondary btn-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('demo');
                  setIsAuthModalOpen(true);
                }}
                className="btn btn-primary btn-sm"
              >
                Demo Student
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-icon navbar-mobile-toggle"
            style={{ borderRadius: 'var(--radius-md)', width: '38px', height: '38px' }}
            aria-label="Toggle mobile navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            padding: '1.25rem 1rem',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: 'none',
                  background: isActive ? 'var(--primary-indigo-light)' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </div>
                {item.count !== null && item.count > 0 ? (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'var(--accent-violet)',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      padding: '0.15rem 0.5rem'
                    }}
                  >
                    {item.count}
                  </span>
                ) : (
                  <ChevronRight size={16} color="var(--text-muted)" />
                )}
              </button>
            );
          })}

          {/* Mobile Fast-Track Actions */}
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setMobileMenuOpen(false);
              }}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} />
              <span>Ask Grantly AI Advisor</span>
            </button>

            {!user && (
              <button
                onClick={() => {
                  setAuthMode('demo');
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Instant Demo Student Access</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
