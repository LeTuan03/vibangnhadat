import React, { useState, useEffect } from 'react';
import { FaUsers, FaBullseye, FaHeart, FaBriefcase } from 'react-icons/fa';
import { getCompanyInfo, getAllTeamMembers } from '../services';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './About.css';

const About: React.FC = () => {
    const [companyInfo, setCompanyInfo] = useState<any>({ fullName: '', slogan: '', description: '', values: [], vision: '', mission: '' });
    const [teamMembers, setTeamMembers] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [company, team] = await Promise.all([
                    getCompanyInfo(),
                    getAllTeamMembers()
                ]);

                if (company) setCompanyInfo(company);
                if (team && team.length > 0) setTeamMembers(team);
            } catch (error) {
                console.error('Lỗi tải dữ liệu:', error);
                // Keep defaults if Firebase fails
            }
        };

        loadData();
    }, []);

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
                                            {companyInfo.values.map((value: any, index: number) => (
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

                </div>
            </div>
        </section>
    );
};

export default About;
