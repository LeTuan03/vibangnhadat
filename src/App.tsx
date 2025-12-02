import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import AdminDashboard from './pages/AdminDashboard';
import NotFound from './components/NotFound';
import './index.css';
import AdminLogin from './components/AdminLogin';

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
                {/* Client Routes */}
                <Route path="/" element={<HomePage />} />

                {/* Admin Routes */}
                <Route
                    path="/admin/login"
                    element={
                        isAdminLoggedIn ? (
                            <Navigate to="/admin/dashboard" replace />
                        ) : (
                            <AdminLogin onLogin={handleLogin} />
                        )
                    }
                />

                {/* <Route
                    path="/admin/dashboard"
                    element={
                        isAdminLoggedIn ? (
                            <AdminDashboard onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/admin/login" replace />
                        )
                    }
                /> */}

                <Route
                    path="/admin"
                    element={<Navigate to="/admin/login" replace />}
                />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
