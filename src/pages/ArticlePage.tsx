import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import { formatDate } from '../utils/helpers';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const { id } = useParams<{ id: string }>();
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        return (
            <main className="article-page">
                <div className="container not-found">
                    <div className="not-found-content">
                        <div className="not-found-icon">📄</div>
                        <h2>Bài viết không tìm thấy</h2>
                        <p>Xin lỗi, bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                        <Link to="/blog" className="btn btn-primary">Quay về thư viện bài viết</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="article-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2L2 7h2v5h3V9h2v3h3V7h2L8 2z" fill="currentColor"/>
                        </svg>
                        Trang chủ
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/blog" className="breadcrumb-link">Thư viện</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{post.title}</span>
                </nav>

                {/* Article Header */}
                <header className="article-header">
                    <div className="category-badge">{post.category}</div>
                    <h1 className="article-title">{post.title}</h1>
                    <div className="article-meta">
                        <div className="meta-item">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="6" r="3" fill="currentColor"/>
                                <path d="M9 10.5c-3.5 0-6.5 2-6.5 4.5h13c0-2.5-3-4.5-6.5-4.5z" fill="currentColor"/>
                            </svg>
                            <span>{post.author}</span>
                        </div>
                        <div className="meta-item">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="3" y="4" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                <path d="M3 7h12M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <span>{formatDate(post.date)}</span>
                        </div>
                    </div>
                    <p className="article-excerpt">{post.excerpt}</p>
                </header>

                {/* Main Content Area */}
                <div className="article-layout">
                    {/* Article Body */}
                    <article className="article-content">
                        <div className="content-body">
                            {post.content.split('\n\n').map((para, idx) => (
                                <p key={idx} className="content-paragraph">{para}</p>
                            ))}
                        </div>

                        {/* Related Posts */}
                        <section className="related-posts">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 7h14M3 13h14M7 3v14" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                Bài viết liên quan
                            </h3>
                            <div className="related-grid">
                                {blogPosts
                                    .filter((p) => p.category === post.category && p.id !== post.id)
                                    .slice(0, 3)
                                    .map((rel) => (
                                        <Link key={rel.id} to={`/blog/${rel.id}`} className="related-card">
                                            <div className="related-badge">{rel.category}</div>
                                            <h4 className="related-title">{rel.title}</h4>
                                            <p className="related-excerpt">{rel.excerpt}</p>
                                            <div className="related-footer">
                                                <span className="related-date">{formatDate(rel.date)}</span>
                                                <span className="related-arrow">→</span>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </section>
                    </article>

                    {/* Sidebar */}
                    <aside className="article-sidebar">
                        <div className="sidebar-sticky">
                            {/* CTA Card */}
                            <div className="cta-card">
                                <div className="cta-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" fill="currentColor" opacity="0.2"/>
                                        <path d="M24 14v20M14 24h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h4 className="cta-title">Cần tư vấn pháp lý?</h4>
                                <p className="cta-description">
                                    Đặt lịch tư vấn miễn phí với đội ngũ luật sư chuyên nghiệp của chúng tôi
                                </p>
                                <Link to="/" className="btn btn-cta">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    Đặt lịch ngay
                                </Link>
                            </div>

                            {/* Quick Info */}
                            <div className="quick-info">
                                <h5 className="quick-info-title">Thông tin bài viết</h5>
                                <div className="quick-info-item">
                                    <span className="info-label">Tác giả:</span>
                                    <span className="info-value">{post.author}</span>
                                </div>
                                <div className="quick-info-item">
                                    <span className="info-label">Danh mục:</span>
                                    <span className="info-value">{post.category}</span>
                                </div>
                                <div className="quick-info-item">
                                    <span className="info-label">Ngày đăng:</span>
                                    <span className="info-value">{formatDate(post.date)}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default ArticlePage;