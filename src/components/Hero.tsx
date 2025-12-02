import React from 'react';
import { FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { companyInfo, contactInfo } from '../data/content';
import { scrollToElement, createPhoneLink } from '../utils/helpers';
import './Hero.css';

const Hero: React.FC = () => {
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
                            onClick={() => scrollToElement('services')}
                        >
                            Dịch vụ của chúng tôi <FaArrowRight />
                        </button>
                        <a
                            href={createPhoneLink(contactInfo.phone)}
                            className="btn btn-secondary btn-lg"
                        >
                            <FaPhone /> {contactInfo.phone}
                        </a>
                    </div>
                    <div className="hero-features animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                        <div className="hero-feature">
                            <FaPhone className="feature-icon" />
                            <span>Tư vấn 24/7</span>
                        </div>
                        <div className="hero-feature">
                            <FaEnvelope className="feature-icon" />
                            <span>Phản hồi nhanh</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
