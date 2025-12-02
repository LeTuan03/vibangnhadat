import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { companyInfo, contactInfo, navigationItems } from '../data/content';
import { scrollToElement, formatPhoneNumber, createPhoneLink, createZaloLink } from '../utils/helpers';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-column">
                            <h3 className="footer-title">{companyInfo.name}</h3>
                            <p className="footer-description">{companyInfo.description}</p>
                            <div className="footer-social">
                                <a href={createZaloLink(contactInfo.phone)} target="_blank" rel="noopener noreferrer" className="social-link" title="Zalo">
                                    <SiZalo />
                                </a>
                                {contactInfo.facebookLink && (
                                    <a href={contactInfo.facebookLink} target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                                        <FaFacebook />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Liên kết nhanh</h4>
                            <ul className="footer-links">
                                {navigationItems.map((item) => (
                                    <li key={item.id}>
                                        <button onClick={() => scrollToElement(item.href.replace('#', ''))}>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Dịch vụ</h4>
                            <ul className="footer-links">
                                <li><button onClick={() => scrollToElement('services')}>Lập Vi bằng</button></li>
                                <li><button onClick={() => scrollToElement('services')}>Tống đạt Văn bản</button></li>
                                <li><button onClick={() => scrollToElement('services')}>Xác minh Điều kiện THA</button></li>
                                <li><button onClick={() => scrollToElement('services')}>Tổ chức Thi hành án</button></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Liên hệ</h4>
                            <ul className="footer-contact">
                                <li>
                                    <FaPhone />
                                    <a href={createPhoneLink(contactInfo.phone)}>{formatPhoneNumber(contactInfo.phone)}</a>
                                </li>
                                <li>
                                    <FaEnvelope />
                                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                                </li>
                                <li>
                                    <FaMapMarkerAlt />
                                    <span>{contactInfo.address}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} {companyInfo.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
