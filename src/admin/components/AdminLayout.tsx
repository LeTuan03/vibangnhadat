import React from 'react';
import { FaFileContract, FaHome, FaNewspaper, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../AdminDashboard.css';

interface LayoutProps {
    children?: React.ReactNode;
    onLogout?: () => void;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, onLogout }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin Panel</h2>
                    <p>Văn phòng Thừa phát lại</p>
                </div>

                <nav className="admin-nav">
                    <Link
                        to="/admin/news"
                        className={`admin-nav-item ${isActive('/admin/news') ? 'active' : ''}`}
                    >
                        <FaNewspaper /> Quản lý Tin tức & Blog
                    </Link>
                    <Link
                        to="/admin/services"
                        className={`admin-nav-item ${isActive('/admin/services') ? 'active' : ''}`}
                    >
                        <FaFileContract /> Quản lý Dịch vụ
                    </Link>
                    <Link
                        to="/admin/viban"
                        className={`admin-nav-item ${isActive('/admin/viban') ? 'active' : ''}`}
                    >
                        <FaUsers /> Quản lý Vi bằng
                    </Link>
                    <Link
                        to="/admin/category"
                        className={`admin-nav-item ${isActive('/admin/category') ? 'active' : ''}`}
                    >
                        <FaNewspaper /> Quản lý Danh mục
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <Link to="/" className="admin-nav-item">
                        <FaHome /> Về trang chủ
                    </Link>
                    <button className="admin-nav-item logout-btn" onClick={onLogout}>
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
                <Link
                    to="/admin/category"
                    className={`admin-nav-item ${isActive('/admin/category') ? 'active' : ''}`}
                >
                    <FaNewspaper /> Quản lý Tin tức & Blog
                </Link>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {children ?? <Outlet />}
            </main>
        </div>
    );
};

export default AdminLayout;