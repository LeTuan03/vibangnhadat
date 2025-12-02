import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QA from '../components/QA';
import FloatingContact from '../components/FloatingContact';
import BackToTop from '../components/BackToTop';

const QAPage: React.FC = () => {
    return (
        <div className="qa-page">
            <Header />
            <main>
                <QA />
            </main>
            <Footer />
            <FloatingContact />
            <BackToTop />
        </div>
    );
};

export default QAPage;
