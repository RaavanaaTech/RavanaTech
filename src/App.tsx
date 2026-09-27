import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { PublicLayout } from './components/layout/PublicLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Standalone Live Concept Demos
import { BakeryDemoPage } from './pages/demos/BakeryDemoPage';
import { CafeDemoPage } from './pages/demos/CafeDemoPage';
import { SalonDemoPage } from './pages/demos/SalonDemoPage';
import { FloraDemoPage } from './pages/demos/FloraDemoPage';
import { RealEstateDemoPage } from './pages/demos/RealEstateDemoPage';
import { PersonalTrainerDemoPage } from './pages/demos/PersonalTrainerDemoPage';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Website Shell */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Route>

        {/* 6 Standalone Live Concept Demos */}
        <Route path="/demo/bakery" element={<BakeryDemoPage />} />
        <Route path="/demo/cafe" element={<CafeDemoPage />} />
        <Route path="/demo/salon" element={<SalonDemoPage />} />
        <Route path="/demo/flora" element={<FloraDemoPage />} />
        <Route path="/demo/real-estate" element={<RealEstateDemoPage />} />
        <Route path="/demo/personal-trainer" element={<PersonalTrainerDemoPage />} />

        {/* Admin Authentication & Protected Portal */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/inquiries" replace />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
        </Route>

        {/* Catch-all Route -> 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
