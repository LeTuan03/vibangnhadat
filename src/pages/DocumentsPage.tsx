import React from 'react';
import Layout from '../components/Layout';
import LegalDocuments from '../components/LegalDocuments';

const DocumentsPage: React.FC = () => {
    return (
        <div className="documents-page">
            <Layout>
                <main>
                    <LegalDocuments />
                </main>
            </Layout>
        </div>
    );
};

export default DocumentsPage;
