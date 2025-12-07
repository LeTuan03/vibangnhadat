import React from 'react';
import { FaPhone, FaArrowRight, FaShieldAlt, FaHeadset, FaClock, FaTrophy } from 'react-icons/fa';
import { getCompanyInfo, getContactInfo } from '../services';
import { scrollToElement, createPhoneLink } from '../utils/helpers';
import './Hero.css';

const Hero: React.FC = () => {
    const [companyInfo, setCompanyInfo] = React.useState<any>({ fullName: '', slogan: '', description: '' });
    const [contactInfo, setContactInfo] = React.useState<any>({ phone: '' });

    React.useEffect(() => {
        const load = async () => {
            try {
                const [company, contact] = await Promise.all([getCompanyInfo(), getContactInfo()]);
                if (company) setCompanyInfo(company);
                if (contact) setContactInfo(contact);
            } catch (err) {
                console.error('Lỗi tải dữ liệu Hero:', err);
            }
        };

        load();
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-background"></div>
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title animate-fadeInUp">
                        {companyInfo.fullName}
                    </h1>
                    <p className="hero-slogan animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {companyInfo.slogan}
                    </p>
                    <p className="hero-description animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        {companyInfo.description}
                    </p>
                    <div className="hero-cta animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => scrollToElement('booking')}
                        >
                            Đặt lịch tư vấn miễn phí <FaArrowRight />
                        </button>
                        <a
                            href={createPhoneLink(contactInfo.phone)}
                            className="btn btn-secondary btn-lg"
                        >
                            <FaPhone /> {contactInfo.phone}
                        </a>
                    </div>

                    {/* USP - Lợi thế cạnh tranh */}
                    <div className="hero-usps animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                        <div className="hero-usp">
                            <FaShieldAlt className="usp-icon" />
                            <span>Bảo mật tuyệt đối</span>
                        </div>
                        <div className="hero-usp">
                            <FaClock className="usp-icon" />
                            <span>Dịch vụ nhanh chóng</span>
                        </div>
                        <div className="hero-usp">
                            <FaHeadset className="usp-icon" />
                            <span>Hỗ trợ 24/7</span>
                        </div>
                        <div className="hero-usp">
                            <FaTrophy className="usp-icon" />
                            <span>Đội ngũ chuyên gia</span>
                        </div>
                    </div>

                    {/* Thống kê tin cậy */}
                    {/* <div className="hero-stats animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                        {statistics.map((stat) => (
                            <div key={stat.id} className="hero-stat">
                                <div className="stat-value">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
