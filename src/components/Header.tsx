import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import { navigationItems } from '../data/content';
import { scrollToElement } from '../utils/helpers';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Chỉ lấy các id của section thật sự (href dạng #id) cho scroll spy
  const sectionIds = [
    ...navigationItems
      .filter((item) => item.href.startsWith('#'))
      .map((item) => item.href.replace('#', '')),
    ...navigationItems
      .flatMap((item) => item.children ?? [])
      .filter((child) => child.href.startsWith('#'))
      .map((child) => child.href.replace('#', '')),
  ];

  const activeSection = useScrollSpy(sectionIds);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-item-wrapper') && !target.closest('.dropdown-menu')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // ESC đóng mobile menu + dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Khóa scroll body khi mở mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll top khi đổi route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isLinkActive = (href: string): boolean => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      return activeSection === id;
    }

    if (href.startsWith('/')) {
      // Active theo pathname cho các page như /blog, /documents, /qa...
      return location.pathname === href;
    }

    return false;
  };

  const isParentActive = (item: any): boolean => {
    // Item cha chỉ active nếu chính nó match, KHÔNG active nếu có child match
    if (item.children && item.children.length > 0) {
      // Nếu có child cùng href thì không active item cha
      return isLinkActive(item.href) && !item.children.some((child: any) => isLinkActive(child.href));
    }
    return isLinkActive(item.href);
  };

  const handleNavClick = (href: string, hasChildren?: boolean) => {
    // Nếu chỉ là nút cha để mở dropdown thì không làm gì thêm
    if (hasChildren && href === '#') return;

    if (href.startsWith('/')) {
      // Route nội bộ
      if (location.pathname !== href) {
        navigate(href);
      }
    } else if (href.startsWith('#')) {
      const elementId = href.replace('#', '');
      scrollToElement(elementId);
    }

    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const toggleMobileDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo" onClick={handleLogoClick}>
            <img src="/logo.png" alt="Thừa Phát Lại Logo" />
            <div>
              <h1 className="logo-text">Thừa Phát Lại</h1>
              <p className="logo-subtitle">Uy tín - Chuyên nghiệp</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav" role="navigation">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className="nav-item-wrapper"
                onMouseEnter={() => item.children && handleMouseEnter(item.id)}
                onMouseLeave={() => item.children && handleMouseLeave()}
              >
                {item.children ? (
                  <>
                    <button
                      className={`nav-link ${isParentActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle dropdown khi click
                        setOpenDropdown((prev) => (prev === item.id ? null : item.id));
                        // Nếu muốn đồng thời scroll đến section cha (ví dụ #about)
                        if (item.href.startsWith('#')) {
                          handleNavClick(item.href);
                        }
                      }}
                      aria-expanded={openDropdown === item.id}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <FaChevronDown
                        style={{
                          marginLeft: '0.25rem',
                          fontSize: '0.75rem',
                          transition: 'transform 0.3s ease',
                          transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0)',
                        }}
                      />
                    </button>
                    {openDropdown === item.id && (
                      <div
                        ref={dropdownRef}
                        className="dropdown-menu"
                        role="menu"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            className={`dropdown-item ${isLinkActive(child.href) ? 'active' : ''}`}
                            onClick={() => handleNavClick(child.href)}
                            role="menuitem"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    className={`nav-link ${isLinkActive(item.href) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="tel:+840901234567"
            className="header-cta"
            aria-label="Liên hệ ngay qua điện thoại"
          >
            <FaPhone style={{ fontSize: '0.875rem' }} />
            Liên hệ ngay
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav" role="navigation">
            {navigationItems.map((item) => (
              <div key={item.id} className="mobile-nav-item">
                <button
                  className={`mobile-nav-link ${item.children ? isParentActive(item) : isLinkActive(item.href)
                      ? 'active'
                      : ''
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.children) {
                      toggleMobileDropdown(item.id);
                    } else {
                      handleNavClick(item.href);
                    }
                  }}
                  aria-expanded={item.children ? openDropdown === item.id : undefined}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <FaChevronDown
                      style={{
                        fontSize: '0.875rem',
                        transition: 'transform 0.3s ease',
                        transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  )}
                </button>
                {item.children && openDropdown === item.id && (
                  <div className="mobile-dropdown">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`mobile-dropdown-item ${isLinkActive(child.href) ? 'active' : ''
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(child.href);
                        }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div
              style={{
                padding: '0.75rem 0',
                marginTop: '0.5rem',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <a
                href="tel:+840901234567"
                className="header-cta"
                style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                aria-label="Liên hệ ngay qua điện thoại"
              >
                <FaPhone style={{ fontSize: '0.875rem' }} />
                Liên hệ ngay
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;