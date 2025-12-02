import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { navigationItems } from '../data/content';
import { scrollToElement } from '../utils/helpers';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Header.css';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const sectionIds = navigationItems.map(item => item.href.replace('#', ''));
    const activeSection = useScrollSpy(sectionIds);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.nav-item-wrapper')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleNavClick = (href: string) => {
        const elementId = href.replace('#', '');
        scrollToElement(elementId);
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <div className="header-logo">
                        <img  src='/logo.png'/>
                        {/* <h1 className="logo-text">Thừa Phát Lại</h1>
                        <p className="logo-subtitle">Uy tín - Chuyên nghiệp</p> */}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="header-nav desktop-nav">
                        {navigationItems.map((item) => (
                            <div key={item.id} className="nav-item-wrapper">
                                {item.children ? (
                                    <>
                                        <button
                                            className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(item.id);
                                            }}
                                            onMouseEnter={() => setOpenDropdown(item.id)}
                                        >
                                            {item.label}
                                        </button>
                                        {openDropdown === item.id && (
                                            <div
                                                className="dropdown-menu"
                                                onMouseEnter={() => setOpenDropdown(item.id)}
                                            >
                                                {item.children.map((child) => (
                                                    <button
                                                        key={child.id}
                                                        className="dropdown-item"
                                                        onClick={() => handleNavClick(child.href)}
                                                    >
                                                        {child.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                                        onClick={() => handleNavClick(item.href)}
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <a href="tel:+840901234567" className="header-cta btn btn-secondary">
                        <FaPhone /> Liên hệ ngay
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="mobile-nav">
                        {navigationItems.map((item) => (
                            <div key={item.id} className="mobile-nav-item">
                                <button
                                    className={`mobile-nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                                    onClick={() => {
                                        if (item.children) {
                                            toggleDropdown(item.id);
                                        } else {
                                            handleNavClick(item.href);
                                        }
                                    }}
                                >
                                    {item.label}
                                </button>
                                {item.children && openDropdown === item.id && (
                                    <div className="mobile-dropdown">
                                        {item.children.map((child) => (
                                            <button
                                                key={child.id}
                                                className="mobile-dropdown-item"
                                                onClick={() => handleNavClick(child.href)}
                                            >
                                                {child.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
