import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AdminLogin.css';

interface AdminLoginProps {
    onLogin: (username: string, password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Demo credentials
        if (username === 'admin' && password === 'admin123') {
            onLogin(username, password);
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-container">
                <div className="admin-login-header">
                    <h1>Quản Trị Hệ Thống</h1>
                    <p>Văn phòng Thừa phát lại</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                            <FaUser /> Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <FaLock /> Mật khẩu
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary btn-lg">
                        Đăng nhập
                    </button>

                    <div className="demo-credentials">
                        <p><strong>Demo:</strong> admin / admin123</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
