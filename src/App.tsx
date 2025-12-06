import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import QADetailPage from './pages/QADetailPage';
import Layout from './components/Layout';
import QALayout from './components/QALayout';
import ServiceAreaDetailPage from './pages/ServiceAreaDetailPage';
import FamilyLawPage from './pages/FamilyLawPage';
import FamilyLawDetailPage from './pages/FamilyLawDetailPage';
import NotFound from './components/NotFound';
import './index.css';
import AdminLogin from './components/AdminLogin';
import QA from './components/QA';
import LegalDocuments from './components/LegalDocuments';
import AdminLayout from './admin/components/AdminLayout';
import NewAdmin from './admin/news/NewAdmin';
import VibanAdmin from './admin/viban/VibanAdmin';
import ServicesAdmin from './admin/services/ServicesAdmin';
import Category from './admin/category/Category';

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(() => {
        return localStorage.getItem('adminLoggedIn') === 'true';
    });

    const handleLogin = () => {
        localStorage.setItem('adminLoggedIn', 'true');
        setIsAdminLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        setIsAdminLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Route-level Layout wraps common header/footer and renders children via Outlet */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog/:id" element={<ArticlePage />} />
                    <Route path="documents" element={<LegalDocuments />} />
                    <Route path="documents/:id" element={<DocumentDetailPage />} />

                    {/* QA routes use a dedicated QA layout (header + outlet) */}
                    <Route path="qa" element={<QALayout />}>
                        <Route index element={<QA />} />
                        <Route path=":id" element={<QADetailPage />} />
                    </Route>

                    {/* Service area detail pages */}
                    <Route path="service-areas/:id" element={<ServiceAreaDetailPage />} />

                    {/* Family law (Hôn nhân – Gia đình) listing and details */}
                    <Route path="family-law" element={<FamilyLawPage />} />
                    <Route path="family-law/:id" element={<FamilyLawDetailPage />} />

                    {/* Fallback 404 inside layout so header/footer remain visible */}
                    <Route path="*" element={<NotFound />} />

                </Route>
                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        isAdminLoggedIn ? (
                            <AdminLayout onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/admin/login" replace />
                        )
                    }
                >
                    <Route index element={<Navigate to="/admin/news" replace />} />
                    <Route path="news" element={<NewAdmin />} />
                    <Route path="services" element={<ServicesAdmin />} />
                    <Route path="viban" element={<VibanAdmin />} />
                    <Route path="category" element={<Category />} />
                </Route>

                <Route
                    path="/admin/login"
                    element={
                        isAdminLoggedIn ? (
                            <Navigate to="/admin/news" replace />
                        ) : (
                            <AdminLogin onLogin={handleLogin} />
                        )
                    }
                />


            </Routes>
        </BrowserRouter>
    );
}

export default App;
