import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { StickyWhatsApp } from '../StickyWhatsApp';
import { ResumeModal } from '../ResumeModal';
import { VirtualCyberReceptionist } from '../home/VirtualCyberReceptionist';

export const PublicLayout: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-sans selection:bg-stone-200 selection:text-stone-900 antialiased">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="flex-1">
        <Outlet context={{ openResume: () => setIsResumeOpen(true) }} />
      </main>

      <StickyWhatsApp />
      <VirtualCyberReceptionist />
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};
