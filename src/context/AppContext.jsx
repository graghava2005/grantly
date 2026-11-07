import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { DEFAULT_DEMO_STUDENT, INITIAL_APPLICATIONS, INITIAL_SAVED_IDS } from '../data/initialUserData';
import { calculateEligibilityMatch } from '../utils/eligibilityEngine';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => loadFromStorage('grantly_theme', 'light'));

  // Auth & Student Profile state
  const [user, setUser] = useState(() => loadFromStorage('grantly_user', DEFAULT_DEMO_STUDENT));
  const [profile, setProfile] = useState(() => loadFromStorage('grantly_profile', DEFAULT_DEMO_STUDENT));

  // Navigation state
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'dashboard' | 'discovery' | 'tracker' | 'compare' | 'eligibility' | 'profile'

  // Saved / Bookmarks
  const [savedIds, setSavedIds] = useState(() => loadFromStorage('grantly_saved_ids', INITIAL_SAVED_IDS));

  // Application Tracker records
  const [applications, setApplications] = useState(() => loadFromStorage('grantly_applications', INITIAL_APPLICATIONS));

  // Compare List (IDs, max 3)
  const [compareList, setCompareList] = useState(() => loadFromStorage('grantly_compare_ids', ['reliance-ug-2025', 'hdfc-badhte-kadam-2025']));

  // Modals & Drawers
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage('grantly_theme', theme);
  }, [theme]);

  // Persist Profile & User
  useEffect(() => {
    saveToStorage('grantly_user', user);
    saveToStorage('grantly_profile', profile);
  }, [user, profile]);

  // Persist bookmarks
  useEffect(() => {
    saveToStorage('grantly_saved_ids', savedIds);
  }, [savedIds]);

  // Persist Applications
  useEffect(() => {
    saveToStorage('grantly_applications', applications);
  }, [applications]);

  // Persist Compare
  useEffect(() => {
    saveToStorage('grantly_compare_ids', compareList);
  }, [compareList]);

  // Dynamic Scholarships with live recalculated match score based on current profile!
  const augmentedScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.map(sch => {
      const match = calculateEligibilityMatch(profile, sch);
      return {
        ...sch,
        matchScore: match.score,
        matchGrade: match.grade,
        isEligible: match.isEligible,
        matchDetails: match
      };
    });
  }, [profile]);

  // Toast dispatch (stable callback)
  const notify = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Toggle Theme
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      notify(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      return next;
    });
  }, [notify]);

  // Toggle Save / Bookmark
  const toggleSaveScholarship = useCallback((id) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        notify('Removed from your saved bookmarks', 'info');
        return prev.filter(item => item !== id);
      } else {
        notify('Added to your saved bookmarks! View anytime in Dashboard.', 'success');
        return [...prev, id];
      }
    });
  }, [notify]);

  // Toggle Compare
  const toggleCompareScholarship = useCallback((id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        notify('Removed from comparison table', 'info');
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        notify('You can compare at most 3 scholarships at a time.', 'warning');
        return prev;
      }
      notify('Added to comparison! Open the Compare tab to inspect side by side.', 'success');
      return [...prev, id];
    });
  }, [notify]);

  const removeFromCompare = useCallback((id) => {
    setCompareList(prev => prev.filter(item => item !== id));
    notify('Scholarship removed from comparison', 'info');
  }, [notify]);

  // Open & Close Details Modal
  const openScholarshipDetails = useCallback((scholarship) => {
    // Look up augmented version with match details
    const found = augmentedScholarships.find(s => s.id === scholarship.id) || scholarship;
    setSelectedScholarship(found);
  }, [augmentedScholarships]);

  const closeScholarshipDetails = useCallback(() => {
    setSelectedScholarship(null);
  }, []);

  // Discovery Filter State for Cross-Page Deep-Linking
  const [discoveryFilter, setDiscoveryFilter] = useState('All');

  const navigateToDiscovery = useCallback((category = 'All') => {
    setDiscoveryFilter(category);
    setActiveTab('discovery');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Delete Application from Tracker
  const deleteApplication = useCallback((appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    notify('Application removed from tracker', 'info');
  }, [notify]);

  // Update Application in Tracker
  const updateApplicationStatus = useCallback((appId, newStatus, newNotes = null) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            notes: newNotes !== null ? newNotes : app.notes,
            appliedDate: newStatus === 'Applied' && !app.appliedDate ? new Date().toISOString().split('T')[0] : app.appliedDate
          };
        }
        return app;
      })
    );
    notify(`Application status updated to "${newStatus}"`, 'success');
  }, [notify]);

  // Add Application to Tracker
  const addApplication = useCallback((scholarship, initialStatus = 'Interested') => {
    const existing = applications.find(a => a.scholarshipId === scholarship.id);
    if (existing) {
      notify(`This scholarship is already in your tracker (Status: ${existing.status}).`, 'info');
      setActiveTab('tracker');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      scholarshipId: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      amount: scholarship.awardAmount,
      status: initialStatus,
      appliedDate: initialStatus === 'Applied' ? new Date().toISOString().split('T')[0] : null,
      deadline: scholarship.deadline,
      notes: `Targeting deadline ${scholarship.deadline}. Ensure all income and academic documents are certified.`,
      matchScore: scholarship.matchScore || 85,
      documentsReady: 2,
      documentsTotal: scholarship.requiredDocuments ? scholarship.requiredDocuments.length : 5
    };

    setApplications(prev => [newApp, ...prev]);
    notify(`"${scholarship.title}" added to your Application Tracker!`, 'success');
    setSelectedScholarship(null);
  }, [applications, notify]);

  // Update Profile
  const updateProfile = useCallback((updatedFields) => {
    setProfile(prev => {
      const next = { ...prev, ...updatedFields };
      setUser(current => (current ? { ...current, ...updatedFields } : current));
      return next;
    });
    notify('Profile updated! Match scores recalculated across all scholarships.', 'success');
  }, [notify]);

  // Login Demo Student
  const loginDemoUser = useCallback(() => {
    setUser(DEFAULT_DEMO_STUDENT);
    setProfile(DEFAULT_DEMO_STUDENT);
    setIsAuthModalOpen(false);
    notify(`Welcome back, ${DEFAULT_DEMO_STUDENT.name}! Demo student session activated.`, 'success');
    setActiveTab('dashboard');
  }, [notify]);

  // Custom User Login
  const loginUser = useCallback((formData) => {
    setProfile(prev => {
      const loggedIn = {
        ...prev,
        name: formData.name || prev?.name || 'Student Scholar',
        email: formData.email
      };
      setUser(loggedIn);
      return loggedIn;
    });
    setIsAuthModalOpen(false);
    notify(`Welcome! You are now logged in.`, 'success');
    setActiveTab('dashboard');
  }, [notify]);

  // Logout
  const logoutUser = useCallback(() => {
    setUser(null);
    notify('You have been logged out.', 'info');
    setActiveTab('landing');
  }, [notify]);

  // Memoized context value to prevent unnecessary cascading re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    user,
    profile,
    updateProfile,
    activeTab,
    setActiveTab,
    scholarships: augmentedScholarships,
    savedIds,
    toggleSaveScholarship,
    applications,
    updateApplicationStatus,
    deleteApplication,
    addApplication,
    discoveryFilter,
    setDiscoveryFilter,
    navigateToDiscovery,
    compareList,
    toggleCompareScholarship,
    removeFromCompare,
    selectedScholarship,
    openScholarshipDetails,
    closeScholarshipDetails,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    isChatOpen,
    setIsChatOpen,
    toasts,
    notify,
    removeToast,
    loginDemoUser,
    loginUser,
    logoutUser
  }), [
    theme,
    toggleTheme,
    user,
    profile,
    updateProfile,
    activeTab,
    augmentedScholarships,
    savedIds,
    toggleSaveScholarship,
    applications,
    updateApplicationStatus,
    deleteApplication,
    addApplication,
    discoveryFilter,
    navigateToDiscovery,
    compareList,
    toggleCompareScholarship,
    removeFromCompare,
    selectedScholarship,
    openScholarshipDetails,
    closeScholarshipDetails,
    isAuthModalOpen,
    authMode,
    isChatOpen,
    toasts,
    notify,
    removeToast,
    loginDemoUser,
    loginUser,
    logoutUser
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
