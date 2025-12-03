import React, { useState } from 'react';
import { FaUsers, FaBullseye, FaHeart, FaBriefcase } from 'react-icons/fa';
import { companyInfo, teamMembers } from '../data/content';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { scrollToElement } from '../utils/helpers';
import './About.css';

const About: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'vision' | 'careers'>('overview');
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">Giới Thiệu</h2>
                <p className="section-subtitle">
                    Tìm hiểu về chúng tôi - Đội ngũ chuyên nghiệp, tận tâm phục vụ
                </p>

                {/* Tab Navigation */}
                <div className="about-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaBriefcase /> Giới thiệu chung
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
                        onClick={() => setActiveTab('team')}
                    >
                        <FaUsers /> Đội ngũ
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vision')}
                    >
                        <FaBullseye /> Tầm nhìn & Sứ mệnh
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('careers')}
                    >
                        <FaHeart /> Tuyển dụng
                    </button>
                </div>

                {/* Tab Content */}
                <div className="about-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="overview-grid">
                                <div className="overview-text">
                                    <h3>{companyInfo.fullName}</h3>
                                    <p className="lead">{companyInfo.slogan}</p>
                                    <p>{companyInfo.description}</p>
                                    <div className="values-list">
                                        <h4>Giá trị cốt lõi:</h4>
                                        <ul>
                                            {companyInfo.values.map((value, index) => (
                                                <li key={index}>{value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="overview-image">
                                    <div className="image-placeholder">
                                        <FaBriefcase />
                                        <p>Văn phòng chuyên nghiệp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Tab */}
                    {activeTab === 'team' && (
                        <div className="tab-panel animate-fadeIn">
                            <div ref={ref} className={`team-grid ${isVisible ? 'visible' : ''}`}>
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className="team-card"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="team-avatar">
                                            <FaUsers />
                                        </div>
                                        <h4>{member.name}</h4>
                                        <p className="team-position">{member.position}</p>
                                        <p className="team-bio">{member.bio}</p>
                                        {member.email && (
                                            <a href={`mailto:${member.email}`} className="team-contact">
                                                {member.email}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Vision Tab */}
                    {activeTab === 'vision' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="vision-grid">
                                <div className="vision-card">
                                    <div className="vision-icon">
                                        <FaBullseye />
                                    </div>
                                    <h3>Tầm nhìn</h3>
                                    <p>{companyInfo.vision}</p>
                                </div>
                                <div className="vision-card">
                                    <div className="vision-icon">
                                        <FaHeart />
                                    </div>
                                    <h3>Sứ mệnh</h3>
                                    <p>{companyInfo.mission}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Careers Tab */}
                    {activeTab === 'careers' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="careers-content">
                                <h3>Cơ hội nghề nghiệp</h3>
                                <p className="lead">
                                    Chúng tôi luôn tìm kiếm những người tài năng, nhiệt huyết để gia nhập đội ngũ.
                                </p>
                                <div className="careers-info">
                                    <h4>Chúng tôi tìm kiếm:</h4>
                                    <ul>
                                        <li>Thừa phát lại viên có chứng chỉ hành nghề</li>
                                        <li>Chuyên viên pháp lý</li>
                                        <li>Nhân viên hành chính</li>
                                    </ul>
                                    <h4>Quyền lợi:</h4>
                                    <ul>
                                        <li>Mức lương cạnh tranh</li>
                                        <li>Môi trường làm việc chuyên nghiệp</li>
                                        <li>Cơ hội phát triển nghề nghiệp</li>
                                        <li>Đào tạo và nâng cao kỹ năng</li>
                                    </ul>
                                    <button className="btn btn-primary" onClick={() => scrollToElement('contact')}>
                                        Liên hệ ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default About;
