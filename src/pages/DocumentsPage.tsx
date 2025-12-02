import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LegalDocuments from '../components/LegalDocuments';
import FloatingContact from '../components/FloatingContact';
import BackToTop from '../components/BackToTop';

const DocumentsPage: React.FC = () => {
    return (
        <div className="documents-page">
            <Header />
            <main>
                <LegalDocuments />
            </main>
            <Footer />
            <FloatingContact />
            <BackToTop />
        </div>
    );
};

export default DocumentsPage;
