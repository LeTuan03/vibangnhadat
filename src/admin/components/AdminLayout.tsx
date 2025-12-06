import React from 'react';
import { FaFileContract, FaHome, FaNewspaper, FaSignOutAlt, FaUsers, FaQuestionCircle, FaList, FaBook, FaTrophy, FaMapMarkerAlt, FaImage, FaInfo, FaHeart } from 'react-icons/fa';
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
                        <FaNewspaper /> Tin tức & Blog
                    </Link>
                    <Link
                        to="/admin/services"
                        className={`admin-nav-item ${isActive('/admin/services') ? 'active' : ''}`}
                    >
                        <FaFileContract /> Dịch vụ
                    </Link>
                    <Link
                        to="/admin/viban"
                        className={`admin-nav-item ${isActive('/admin/viban') ? 'active' : ''}`}
                    >
                        <FaUsers /> Vi bằng
                    </Link>
                    <Link
                        to="/admin/category"
                        className={`admin-nav-item ${isActive('/admin/category') ? 'active' : ''}`}
                    >
                        <FaList /> Danh mục
                    </Link>
                    <Link
                        to="/admin/documents"
                        className={`admin-nav-item ${isActive('/admin/documents') ? 'active' : ''}`}
                    >
                        <FaBook /> Tài liệu
                    </Link>
                    <Link
                        to="/admin/qa"
                        className={`admin-nav-item ${isActive('/admin/qa') ? 'active' : ''}`}
                    >
                        <FaQuestionCircle /> Hỏi & Đáp
                    </Link>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #ddd', margin: '10px 0' }}></div>

                    {/* New admin sections */}
                    <Link
                        to="/admin/statistics"
                        className={`admin-nav-item ${isActive('/admin/statistics') ? 'active' : ''}`}
                    >
                        <FaTrophy /> Thống kê
                    </Link>
                    <Link
                        to="/admin/service-areas"
                        className={`admin-nav-item ${isActive('/admin/service-areas') ? 'active' : ''}`}
                    >
                        <FaMapMarkerAlt /> Lĩnh vực dịch vụ
                    </Link>
                    <Link
                        to="/admin/family-law"
                        className={`admin-nav-item ${isActive('/admin/family-law') ? 'active' : ''}`}
                    >
                        <FaHeart /> Hôn nhân - Gia đình
                    </Link>
                    <Link
                        to="/admin/gallery"
                        className={`admin-nav-item ${isActive('/admin/gallery') ? 'active' : ''}`}
                    >
                        <FaImage /> Thư viện ảnh & Video
                    </Link>
                    <Link
                        to="/admin/team"
                        className={`admin-nav-item ${isActive('/admin/team') ? 'active' : ''}`}
                    >
                        <FaUsers /> Đội ngũ
                    </Link>
                    <Link
                        to="/admin/company-info"
                        className={`admin-nav-item ${isActive('/admin/company-info') ? 'active' : ''}`}
                    >
                        <FaInfo /> Thông tin công ty
                    </Link>
                    <Link
                        to="/admin/menu"
                        className={`admin-nav-item ${isActive('/admin/menu') ? 'active' : ''}`}
                    >
                        <FaList /> Menu Client
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
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {children ?? <Outlet />}
            </main>
        </div>
    );
};

export default AdminLayout;