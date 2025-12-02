import React from 'react';
import LegalDocuments from '../components/LegalDocuments';

const DocumentsPage: React.FC = () => {
    return (
        <div className="documents-page">
            <main>
                <LegalDocuments />
            </main>
        </div>
    );
};

export default DocumentsPage;
