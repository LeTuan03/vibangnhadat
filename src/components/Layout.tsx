import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import BackToTop from './BackToTop';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <Header />
            <div className="layout-content">{children}</div>
            <Footer />
            <FloatingContact />
            <BackToTop />
        </div>
    );
};

export default Layout;
