import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';
import LandingPage from './components/landing/LandingPage';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ScholarshipDiscovery from './components/discovery/ScholarshipDiscovery';
import ScholarshipDetailsModal from './components/details/ScholarshipDetailsModal';
import EligibilityCalculator from './components/eligibility/EligibilityCalculator';
import ApplicationTracker from './components/tracker/ApplicationTracker';
import ScholarshipCompare from './components/comparison/ScholarshipCompare';
import ProfileSettings from './components/profile/ProfileSettings';
import AuthModal from './components/auth/AuthModal';
import GrantlyAssistant from './components/chat/GrantlyAssistant';
import { Sparkles, MessageSquare } from 'lucide-react';

function MainAppContent() {
  const { activeTab, isChatOpen, setIsChatOpen } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'discovery':
        return <ScholarshipDiscovery />;
      case 'eligibility':
        return <EligibilityCalculator />;
      case 'tracker':
        return <ApplicationTracker />;
      case 'compare':
        return <ScholarshipCompare />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {renderActiveView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ScholarshipDetailsModal />
      <AuthModal />
      <GrantlyAssistant />
      <ToastContainer />

      {/* Floating AI Assistant Trigger Button (when chat is minimized) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            right: '1.75rem',
            zIndex: 90,
            background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="pulse-badge floating-ai-trigger"
          title="Open Grantly AI Advisor"
        >
          <Sparkles size={18} />
          <span>Ask Grantly AI</span>
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
