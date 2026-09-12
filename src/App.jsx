import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStats } from './components/AboutStats';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ProjectModal } from './components/Admin/ProjectModal';

const PortfolioContent = () => {
  const { isAdminDashboardOpen } = usePortfolio();
  
  // Project modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const handleOpenProjectModal = (project = null) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* If Admin dashboard view is active */}
      {isAdminDashboardOpen ? (
        <AdminDashboard onOpenProjectModal={handleOpenProjectModal} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <AboutStats />
            <Projects onOpenProjectModal={handleOpenProjectModal} />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {/* Global Modals */}
      <AdminLoginModal />
      <ProjectModal
        isOpen={isProjectModalOpen}
        projectToEdit={projectToEdit}
        onClose={handleCloseProjectModal}
      />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
