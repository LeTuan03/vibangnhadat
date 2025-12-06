import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaDownload, FaFilter } from 'react-icons/fa';
import { documentService } from '../admin/api/documentService';
import { mockLegalDocuments } from '../data/mockData';
import './LegalDocuments.css';

const LegalDocuments: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [legalDocuments] = useState(() => {
        documentService.initializeDocuments(mockLegalDocuments);
        return documentService.getAllDocuments();
    });

    const categories = ['all', ...new Set(legalDocuments.map((d) => d.category))];
    const filteredDocs =
        selectedCategory === 'all' ? legalDocuments : legalDocuments.filter((d) => d.category === selectedCategory);

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Luật': '#dc2626',
            'Nghị định': '#2563eb',
            'Thông tư': '#7c3aed',
            'Quyết định': '#059669',
            'Công văn': '#ea580c',
        };
        return colors[category] || '#6b7280';
    };

    return (
        <section className="legal-documents-section">
            <div className="container">
                <h2 className="section-title">Văn bản pháp luật</h2>
                <p className="section-subtitle">
                    Thư viện các luật, nghị định, thông tư và công văn hướng dẫn
                </p>

                {/* Category Filter */}
                <div className="doc-filters">
                    <FaFilter className="filter-icon" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'all' ? 'Tất cả' : cat}
                        </button>
                    ))}
                </div>

                {/* Document List */}
                <div className="doc-list">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="doc-item">
                            <div className="doc-icon" style={{ backgroundColor: getCategoryColor(doc.category) }}>
                                <FaBook />
                            </div>
                            <Link to={`/documents/${doc.id}`} className="doc-info">
                                <h3 className="doc-title">{doc.title}</h3>
                                <p className="doc-description">{doc.description}</p>
                                <div className="doc-meta">
                                    <span className="doc-category">{doc.category}</span>
                                    <span className="doc-date">
                                        {new Date(doc.publishDate).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </Link>
                            <Link to={`/documents/${doc.id}`} className="doc-download">
                                <FaDownload /> Tải xuống
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LegalDocuments;
