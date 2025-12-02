import React from 'react';
import AdminLogin from '../components/AdminLogin';

interface AdminLoginPageProps {
    onLogin: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
    const handleLogin = (username: string, password: string) => {
        // In a real app, validate against backend
        if (username === 'admin' && password === 'admin123') {
            onLogin();
        }
    };

    return <AdminLogin onLogin={handleLogin} />;
};

export default AdminLoginPage;
