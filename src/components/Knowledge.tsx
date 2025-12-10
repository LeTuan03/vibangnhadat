import React, { useState, useEffect } from 'react';
import {
    // FaNewspaper,
    FaFileAlt, FaChevronDown, FaChevronUp, FaSearch, FaBook, FaLink, FaLightbulb
} from 'react-icons/fa';
// import BlogFirebaseService from '../services/BlogFirebaseService';
import DocumentFirebaseService from '../services/DocumentFirebaseService';
import { getAllLegalArticles } from '../services';
// Removed mock fallbacks: data is loaded from Firebase services
import { mainLaws, legalTerms, usefulReferences } from '../data/legalKnowledge';
import { formatDate } from '../utils/helpers';
import BlogDetail from './BlogDetail';
import LoadingSpinner from './LoadingSpinner';
import type { BlogPost, LegalDocument, LegalArticle } from '../types';
import './Knowledge.css';

const Knowledge: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'news' | 'faq' | 'legal' | 'articles' | 'laws' | 'terms' | 'references'>('legal');
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

    // const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>([]);
    const [legalArticles, setLegalArticles] = useState<LegalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [_error, setError] = useState<string | null>(null);

    useEffect(() => {
        let unsubArticles: (() => void) | null = null
        const loadData = async () => {
            try {
                setLoading(true);
                const [
                    // posts, 
                    docs] = await Promise.all([
                        // BlogFirebaseService.getAllPosts(),
                        DocumentFirebaseService.getAllDocuments(),
                    ]);
                // setBlogPosts(posts || []);
                setLegalDocuments(docs || []);

                // subscribe to realtime legal articles
                try {
                    const svc = await import('../services/LegalArticleFirebaseService');
                    unsubArticles = svc.default.subscribeArticles((items: any[]) => {
                        setLegalArticles(items || []);
                    });
                } catch (err) {
                    console.warn('Could not subscribe to realtime articles, falling back to one-time fetch', err);
                    try {
                        const articles = await getAllLegalArticles();
                        setLegalArticles(articles || []);
                    } catch (e) {
                        console.error('Error loading articles fallback:', e);
                    }
                }
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Không thể tải dữ liệu');
                // Keep empty lists if Firebase fails
                // setBlogPosts([]);
                setLegalDocuments([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();

        return () => {
            if (unsubArticles) unsubArticles()
        }
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    const toggleFaq = (id: string) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };


    const filteredDocs = legalDocuments.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="knowledge" className="section section-alt">
            <div className="container">
                <h2 className="section-title">Kiến Thức & Tài Liệu Pháp Luật</h2>
                <p className="section-subtitle">
                    Cập nhật tin tức, giải đáp thắc mắc và tài liệu pháp luật chi tiết
                </p>

                {/* Tab Navigation */}
                <div className="knowledge-tabs">
                    {/* <button
                        className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        <FaNewspaper /> Tin tức / Blog
                    </button> */}
                    <button
                        className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        <FaBook /> Bài Viết Pháp Luật
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'laws' ? 'active' : ''}`}
                        onClick={() => setActiveTab('laws')}
                    >
                        <FaLightbulb /> Luật & Quy Định
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
                        onClick={() => setActiveTab('terms')}
                    >
                        <FaBook /> Thuật Ngữ Pháp Luật
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'references' ? 'active' : ''}`}
                        onClick={() => setActiveTab('references')}
                    >
                        <FaLink /> Tài Liệu Tham Khảo
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'legal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('legal')}
                    >
                        <FaFileAlt /> Tài Liệu Pháp Lý
                    </button>
                </div>

                {/* Tab Content */}
                <div className="knowledge-content">
                    {/* News Tab */}
                    {/* {activeTab === 'news' && (
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
                    )} */}

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
                                            {/* <button className="btn btn-outline">Xem chi tiết</button> */}
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-results">Không tìm thấy văn bản phù hợp.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Legal Articles Tab */}
                    {activeTab === 'articles' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="articles-grid">
                                {legalArticles.map(article => (
                                    <div key={article.id} className="article-card">
                                        <div className="article-header">
                                            <h3>{article.title}</h3>
                                            <span className="article-category">{article.category}</span>
                                        </div>
                                        <p className="article-excerpt">{article.content.substring(0, 150)}...</p>
                                        <div className="article-meta">
                                            {article.author && <span>✍️ {article.author}</span>}
                                            <span>📅 {formatDate(article.datePublished)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Laws Tab */}
                    {activeTab === 'laws' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="laws-list">
                                {mainLaws.map(law => (
                                    <div key={law.id} className="law-card">
                                        <div className="law-header" onClick={() => toggleFaq(law.id)}>
                                            <div>
                                                <h3>{law.lawName}</h3>
                                                <span className="law-number">{law.lawNumber}</span>
                                            </div>
                                            <button className="expand-btn">
                                                {expandedFaq === law.id ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                        </div>
                                        {expandedFaq === law.id && (
                                            <div className="law-details">
                                                <div className="law-dates">
                                                    <span><strong>Công bố:</strong> {formatDate(law.publishedDate)}</span>
                                                    <span><strong>Có hiệu lực:</strong> {formatDate(law.effectiveDate)}</span>
                                                </div>
                                                <div>
                                                    <h4>Các Điểm Chính:</h4>
                                                    <ul>
                                                        {law.mainPoints.map((point, idx) => (
                                                            <li key={idx}>{point}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <p><strong>Phạm Vi Áp Dụng:</strong> {law.applicationScope}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Legal Terms Tab */}
                    {activeTab === 'terms' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="terms-grid">
                                {legalTerms.map(term => (
                                    <div key={term.id} className="term-card">
                                        <h3>{term.term}</h3>
                                        <p>{term.definition}</p>
                                        {term.examples && term.examples.length > 0 && (
                                            <div className="term-examples">
                                                <strong>Ví dụ:</strong>
                                                <ul>
                                                    {term.examples.map((example, idx) => (
                                                        <li key={idx}>{example}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* References Tab */}
                    {activeTab === 'references' && (
                        <div className="tab-panel animate-fadeIn">
                            <div className="references-grid">
                                {usefulReferences.map(ref => (
                                    <div key={ref.id} className="reference-card">
                                        <h3>{ref.name}</h3>
                                        <span className="reference-category">{ref.category}</span>
                                        <p>{ref.description}</p>
                                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="reference-link">
                                            🔗 Truy cập trang web →
                                        </a>
                                    </div>
                                ))}
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
