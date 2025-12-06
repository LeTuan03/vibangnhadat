import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './components/Layout';
import QALayout from './components/QALayout';
import NotFound from './components/NotFound';
import AdminLayout from './admin/components/AdminLayout';
import navigationService from './admin/api/navigationService';
import { mockNavigation, mockCategories } from './data/mockData';
import { categoryService } from './admin/api/categoryService';
import './index.css';

// Lazy load main pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const DocumentDetailPage = React.lazy(() => import('./pages/DocumentDetailPage'));
const QADetailPage = React.lazy(() => import('./pages/QADetailPage'));
const ServiceAreaDetailPage = React.lazy(() => import('./pages/ServiceAreaDetailPage'));
const FamilyLawPage = React.lazy(() => import('./pages/FamilyLawPage'));
const FamilyLawDetailPage = React.lazy(() => import('./pages/FamilyLawDetailPage'));

// Lazy load admin components
const AdminLogin = React.lazy(() => import('./components/AdminLogin'));
const QA = React.lazy(() => import('./components/QA'));
const LegalDocuments = React.lazy(() => import('./components/LegalDocuments'));
const NewAdmin = React.lazy(() => import('./admin/news/NewAdmin'));
const VibanAdmin = React.lazy(() => import('./admin/viban/VibanAdmin'));
const ServicesAdmin = React.lazy(() => import('./admin/services/ServicesAdmin'));
const Category = React.lazy(() => import('./admin/category/CategoryAdmin'));
const DocumentsAdmin = React.lazy(() => import('./admin/documents/DocumentsAdmin'));
const QAAdmin = React.lazy(() => import('./admin/qa/QAAdmin'));
const AdminMenuEditor = React.lazy(() => import('./admin/menu/AdminMenuEditor'));
const StatisticsAdmin = React.lazy(() => import('./admin/statistics/StatisticsAdmin'));
const ServiceAreasAdmin = React.lazy(() => import('./admin/service-areas/ServiceAreasAdmin'));
const FamilyLawAdmin = React.lazy(() => import('./admin/family-law/FamilyLawAdmin'));
const GalleryAdmin = React.lazy(() => import('./admin/gallery/GalleryAdmin'));
const CompanyInfoAdmin = React.lazy(() => import('./admin/company-info/CompanyInfoAdmin'));
const TeamAdmin = React.lazy(() => import('./admin/team/TeamAdmin'));

/**
 * Suspense boundary component for lazy-loaded routes
 */
const RouteLoader = () => <LoadingSpinner />;

/**
 * Main App component with routes and lazy loading
 */
function App() {
    React.useEffect(() => {
        // Initialize navigation service
        try {
            navigationService.initialize(mockNavigation);
            categoryService.initializeCategories(mockCategories as any);
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }, []);

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
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    {/* Main public routes */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="blog/:id" element={<ArticlePage />} />
                        <Route path="documents" element={<LegalDocuments />} />
                        <Route path="documents/:id" element={<DocumentDetailPage />} />

                        {/* QA routes with dedicated layout */}
                        <Route path="qa" element={<QALayout />}>
                            <Route index element={<QA />} />
                            <Route path=":id" element={<QADetailPage />} />
                        </Route>

                        {/* Service area routes */}
                        <Route path="service-areas/:id" element={<ServiceAreaDetailPage />} />

                        {/* Family law routes */}
                        <Route path="family-law" element={<FamilyLawPage />} />
                        <Route path="family-law/:id" element={<FamilyLawDetailPage />} />

                        {/* 404 fallback */}
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Admin routes */}
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
                        <Route path="menu" element={<AdminMenuEditor />} />
                        <Route path="documents" element={<DocumentsAdmin />} />
                        <Route path="qa" element={<QAAdmin />} />
                        <Route path="statistics" element={<StatisticsAdmin />} />
                        <Route path="service-areas" element={<ServiceAreasAdmin />} />
                        <Route path="family-law" element={<FamilyLawAdmin />} />
                        <Route path="gallery" element={<GalleryAdmin />} />
                        <Route path="company-info" element={<CompanyInfoAdmin />} />
                        <Route path="team" element={<TeamAdmin />} />
                    </Route>

                    {/* Admin login route */}
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
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
