import React, { useState } from 'react';
import { FaNewspaper, FaQuestionCircle, FaFileAlt, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { blogPosts, faqs, legalDocuments } from '../data/content';
import { formatDate } from '../utils/helpers';
import BlogDetail from './BlogDetail';
import type { BlogPost } from '../types';
import './Knowledge.css';

const Knowledge: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'news' | 'faq' | 'legal'>('news');
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

    const toggleFaq = (id: string) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredDocs = legalDocuments.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="knowledge" className="section section-alt">
            <div className="container">
                <h2 className="section-title">Kiến Thức & Tài Liệu</h2>
                <p className="section-subtitle">
                    Cập nhật tin tức, giải đáp thắc mắc và tài liệu pháp luật
                </p>

                {/* Tab Navigation */}
                <div className="knowledge-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        <FaNewspaper /> Tin tức / Blog
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        <FaQuestionCircle /> Hỏi đáp (FAQ)
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'legal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('legal')}
                    >
                        <FaFileAlt /> Văn bản pháp luật
                    </button>
                </div>

                {/* Tab Content */}
                <div className="knowledge-content">
                    {/* News Tab */}
                    {activeTab === 'news' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="news-grid">
                                {blogPosts.map((post) => (
                                    <article key={post.id} className="news-card">
                                        <div className="news-image">
                                            <FaNewspaper />
                                        </div>
                                        <div className="news-content">
                                            <span className="news-category">{post.category}</span>
                                            <h3>{post.title}</h3>
                                            <p className="news-excerpt">{post.excerpt}</p>
                                            <div className="news-meta">
                                                <span className="news-author">{post.author}</span>
                                                <span className="news-date">{formatDate(post.date)}</span>
                                            </div>
                                            <button
                                                className="news-read-more"
                                                onClick={() => setSelectedBlog(post)}
                                            >
                                                Đọc thêm →
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="faq-search">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm câu hỏi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="faq-list">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq) => (
                                        <div key={faq.id} className="faq-item">
                                            <button
                                                className={`faq-question ${expandedFaq === faq.id ? 'active' : ''}`}
                                                onClick={() => toggleFaq(faq.id)}
                                            >
                                                <span>{faq.question}</span>
                                                {expandedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                            {expandedFaq === faq.id && (
                                                <div className="faq-answer animate-fadeIn">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-results">Không tìm thấy câu hỏi phù hợp.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Legal Documents Tab */}
                    {activeTab === 'legal' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="faq-search">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm văn bản..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="legal-list">
                                {filteredDocs.length > 0 ? (
                                    filteredDocs.map((doc) => (
                                        <div key={doc.id} className="legal-item">
                                            <div className="legal-icon">
                                                <FaFileAlt />
                                            </div>
                                            <div className="legal-content">
                                                <h4>{doc.title}</h4>
                                                <p>{doc.description}</p>
                                                <div className="legal-meta">
                                                    <span className="legal-category">{doc.category}</span>
                                                    <span className="legal-date">Ngày ban hành: {formatDate(doc.publishDate)}</span>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline">Xem chi tiết</button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-results">Không tìm thấy văn bản phù hợp.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Blog Detail Modal */}
                {selectedBlog && (
                    <BlogDetail
                        post={selectedBlog}
                        onClose={() => setSelectedBlog(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default Knowledge;
