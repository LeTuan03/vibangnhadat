import React, { useState } from 'react';
import { FaNewspaper, FaFileContract, FaUsers, FaCog, FaSignOutAlt, FaHome, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { blogPosts, services } from '../data/content';
import type { BlogPost } from '../types';
import './AdminDashboard.css';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'news' | 'services' | 'viban'>('news');
    const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

    const handleDeletePost = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            setPosts(posts.filter(post => post.id !== id));
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin Panel</h2>
                    <p>Văn phòng Thừa phát lại</p>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        <FaNewspaper /> Quản lý Tin tức
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                    >
                        <FaFileContract /> Quản lý Dịch vụ
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'viban' ? 'active' : ''}`}
                        onClick={() => setActiveTab('viban')}
                    >
                        <FaUsers /> Quản lý Vi bằng
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <a href="/" className="admin-nav-item">
                        <FaHome /> Về trang chủ
                    </a>
                    <button className="admin-nav-item logout-btn" onClick={onLogout}>
                        <FaSignOutAlt /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <div className="admin-header">
                    <h1>
                        {activeTab === 'news' && 'Quản lý Tin tức'}
                        {activeTab === 'services' && 'Quản lý Dịch vụ'}
                        {activeTab === 'viban' && 'Quản lý Vi bằng'}
                    </h1>
                    <button className="btn btn-primary">
                        <FaPlus /> Thêm mới
                    </button>
                </div>

                <div className="admin-content">
                    {/* News Management */}
                    {activeTab === 'news' && (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tiêu đề</th>
                                        <th>Tác giả</th>
                                        <th>Ngày đăng</th>
                                        <th>Danh mục</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>{post.author}</td>
                                            <td>{new Date(post.date).toLocaleDateString('vi-VN')}</td>
                                            <td><span className="badge">{post.category}</span></td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon btn-edit" title="Sửa">
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn-icon btn-delete"
                                                        title="Xóa"
                                                        onClick={() => handleDeletePost(post.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Services Management */}
                    {activeTab === 'services' && (
                        <div className="admin-cards">
                            {services.map((service) => (
                                <div key={service.id} className="admin-card">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <div className="admin-card-actions">
                                        <button className="btn btn-outline">
                                            <FaEdit /> Chỉnh sửa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Vi bang Management */}
                    {activeTab === 'viban' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaCog size={48} />
                                <h3>Quản lý Lập vi bằng</h3>
                                <p>Tính năng đang được phát triển</p>
                                <p className="text-muted">
                                    Bạn có thể quản lý 6 loại vi bằng: Dân sự, Nhà đất, Thế chấp, Di chúc, Kinh doanh, Cho thuê
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
