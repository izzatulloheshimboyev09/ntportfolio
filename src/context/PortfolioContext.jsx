import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'nt_portfolio_data_v2';
const AUTH_KEY = 'nt_portfolio_auth';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Load portfolio data from localStorage or initial
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required sections exist
        return {
          profile: { ...INITIAL_DATA.profile, ...(parsed.profile || {}) },
          skills: parsed.skills || INITIAL_DATA.skills,
          projects: parsed.projects || INITIAL_DATA.projects,
          messages: parsed.messages || INITIAL_DATA.messages,
        };
      }
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
    }
    return INITIAL_DATA;
  });

  // Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Sync with localStorage on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }, [data]);

  // Handle Multi-Tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to parse storage update:', err);
        }
      }
      if (e.key === AUTH_KEY) {
        setIsAdminLoggedIn(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auth methods
  const login = (username, password) => {
    // Standard Credentials
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAdminModalOpen(false);
      setIsAdminDashboardOpen(true);
      return { success: true };
    }
    return { success: false, message: "Noto'g'ri login yoki parol! (Demo: admin / admin123)" };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
    setIsAdminDashboardOpen(false);
  };

  // Profile methods
  const updateProfile = (updatedProfile) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile }
    }));
  };

  // Skill methods
  const addSkill = (skill) => {
    const newSkill = {
      ...skill,
      id: 'skill_' + Date.now()
    };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id, updatedSkill) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updatedSkill } : s))
    }));
  };

  const deleteSkill = (id) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
  };

  // Project methods
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: 'proj_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  // Messages methods (Contact section -> Admin panel)
  const sendMessage = (messageData) => {
    const newMsg = {
      ...messageData,
      id: 'msg_' + Date.now(),
      date: new Date().toLocaleString('uz-UZ', { hour12: false }),
      read: false
    };
    setData((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages]
    }));
    return true;
  };

  const markMessageAsRead = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: true } : m))
    }));
  };

  const deleteMessage = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
  };

  // Reset to default data
  const resetToDefaults = () => {
    setData(INITIAL_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  };

  const value = {
    data,
    profile: data.profile,
    skills: data.skills,
    projects: data.projects,
    messages: data.messages,
    isAdminLoggedIn,
    isAdminModalOpen,
    isAdminDashboardOpen,
    setIsAdminModalOpen,
    setIsAdminDashboardOpen,
    login,
    logout,
    updateProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    sendMessage,
    markMessageAsRead,
    deleteMessage,
    resetToDefaults
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
