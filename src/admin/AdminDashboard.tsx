import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaFileContract, FaUsers, FaCog, FaSignOutAlt, FaHome, FaEdit, FaTrash, FaTrophy, FaMapMarkerAlt, FaImage, FaInfo, FaHeart } from 'react-icons/fa';
import { blogService } from './api/blogService';
import { mockBlogPosts } from '../data/mockData';
import type { BlogPost } from '../types';
import './AdminDashboard.css';

interface AdminDashboardProps {
    onLogout: () => void;
}

type AdminTab = 'news' | 'services' | 'viban' | 'statistics' | 'serviceAreas' | 'familyLaw' | 'gallery' | 'team' | 'company';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('news');
    const [posts, setPosts] = useState<BlogPost[]>(() => {
        blogService.initializePosts(mockBlogPosts);
        return blogService.getAllPosts();
    });

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
                        <FaNewspaper /> Tin tức & Blog
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                    >
                        <FaFileContract /> Dịch vụ
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'viban' ? 'active' : ''}`}
                        onClick={() => setActiveTab('viban')}
                    >
                        <FaUsers /> Vi bằng
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'statistics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('statistics')}
                    >
                        <FaTrophy /> Thống kê
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'serviceAreas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('serviceAreas')}
                    >
                        <FaMapMarkerAlt /> Lĩnh vực dịch vụ
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'familyLaw' ? 'active' : ''}`}
                        onClick={() => setActiveTab('familyLaw')}
                    >
                        <FaHeart /> Hôn nhân - Gia đình
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gallery')}
                    >
                        <FaImage /> Thư viện ảnh & Video
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'team' ? 'active' : ''}`}
                        onClick={() => setActiveTab('team')}
                    >
                        <FaUsers /> Đội ngũ
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'company' ? 'active' : ''}`}
                        onClick={() => setActiveTab('company')}
                    >
                        <FaInfo /> Thông tin công ty
                    </button>
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
                <div className="admin-header">
                    <h1>
                        {activeTab === 'news' && 'Quản lý Tin tức & Blog'}
                        {activeTab === 'services' && 'Quản lý Dịch vụ'}
                        {activeTab === 'viban' && 'Quản lý Vi bằng'}
                        {activeTab === 'statistics' && 'Quản lý Thống kê'}
                        {activeTab === 'serviceAreas' && 'Quản lý Lĩnh vực Dịch vụ'}
                        {activeTab === 'familyLaw' && 'Quản lý Hôn nhân - Gia đình'}
                        {activeTab === 'gallery' && 'Quản lý Thư viện'}
                        {activeTab === 'team' && 'Quản lý Đội ngũ'}
                        {activeTab === 'company' && 'Quản lý Thông tin công ty'}
                    </h1>
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

                    {/* Vi bang Management */}
                    {activeTab === 'viban' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaCog size={48} />
                                <h3>Quản lý Lập vi bằng</h3>
                                <p>Tính năng quản lý Vi bằng</p>
                            </div>
                        </div>
                    )}

                    {/* Statistics Management */}
                    {activeTab === 'statistics' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaTrophy size={48} />
                                <h3>Quản lý Thống kê</h3>
                                <p>Quản lý các chỉ số thống kê trên trang chủ</p>
                            </div>
                        </div>
                    )}

                    {/* Service Areas Management */}
                    {activeTab === 'serviceAreas' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaMapMarkerAlt size={48} />
                                <h3>Quản lý Lĩnh vực Dịch vụ</h3>
                                <p>Quản lý các lĩnh vực hoạt động dịch vụ</p>
                            </div>
                        </div>
                    )}

                    {/* Family Law Management */}
                    {activeTab === 'familyLaw' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaHeart size={48} />
                                <h3>Quản lý Hôn nhân - Gia đình</h3>
                                <p>Quản lý các câu hỏi hôn nhân và gia đình</p>
                            </div>
                        </div>
                    )}

                    {/* Gallery Management */}
                    {activeTab === 'gallery' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaImage size={48} />
                                <h3>Quản lý Thư viện</h3>
                                <p>Quản lý hình ảnh và video</p>
                            </div>
                        </div>
                    )}

                    {/* Team Management */}
                    {activeTab === 'team' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaUsers size={48} />
                                <h3>Quản lý Đội ngũ</h3>
                                <p>Quản lý thành viên đội ngũ công ty</p>
                            </div>
                        </div>
                    )}

                    {/* Company Info Management */}
                    {activeTab === 'company' && (
                        <div className="admin-info">
                            <div className="info-box">
                                <FaInfo size={48} />
                                <h3>Quản lý Thông tin công ty</h3>
                                <p>Quản lý thông tin liên hệ và thông tin công ty</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
