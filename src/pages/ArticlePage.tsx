import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa';
import BlogFirebaseService from '../services/BlogFirebaseService';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSEO, generateArticleStructuredData } from '../hooks/useSEO';
import type { BlogPost } from '../types';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const data = await BlogFirebaseService.getAllPosts();
                setBlogPosts(data);
                if (!data.find(p => p.id === id)) {
                    setNotFound(true);
                }
                // Increment views
                if (id) {
                    try {
                        await BlogFirebaseService.incrementViews(id);
                    } catch (err) {
                        console.warn('Could not increment views:', err);
                    }
                }
            } catch (err) {
                console.error('Error loading blog posts:', err);
                setBlogPosts([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, [id]);

    const post = blogPosts.find((p) => p.id === id);

    // Call SEO hook unconditionally to keep hook order stable across renders
    useSEO({
        title: post ? `${post.title} - Văn phòng Thừa phát lại` : 'Bài viết không tìm thấy',
        description: post?.excerpt || 'Đọc bài viết pháp lý chi tiết từ văn phòng thừa phát lại',
        keywords: post?.tags?.join(', ') || 'bài viết, pháp luật',
        ogType: 'article',
        ogTitle: post?.title,
        ogDescription: post?.excerpt,
        ogImage: post?.image || '/logo.png',
        ogUrl: typeof window !== 'undefined' ? window.location.href : '',
        canonical: typeof window !== 'undefined' ? window.location.href : '',
        structuredData: post ? generateArticleStructuredData({
            title: post.title,
            description: post.excerpt,
            image: post.image,
            author: post.author,
            publishedDate: new Date(post.date).toISOString(),
            modifiedDate: post.modifiedDate ? new Date(post.modifiedDate).toISOString() : new Date(post.date).toISOString(),
            content: post.content,
            url: typeof window !== 'undefined' ? window.location.href : '',
        }) : undefined,
    });

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!post || notFound) {
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

    const relatedPosts = blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id && (p.status === 'published' || p.status === undefined))
        .slice(0, 3);

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
                    <div className="header-badges">
                        <div className="category-badge">{post.category}</div>
                        {post.featured && <div className="featured-badge">⭐ Nổi bật</div>}
                    </div>
                    <h1 className="article-title">{post.title}</h1>
                    
                    <div className="article-meta">
                        <div className="meta-item">
                            <FaUser /> {post.author}
                        </div>
                        <div className="meta-item">
                            <FaCalendar /> {formatDate(post.date)}
                        </div>
                        {post.readTime && (
                            <div className="meta-item">
                                <FaClock /> {post.readTime} phút đọc
                            </div>
                        )}
                        {post.views !== undefined && (
                            <div className="meta-item">
                                👁️ {post.views.toLocaleString()} lượt xem
                            </div>
                        )}
                    </div>
                    
                    <p className="article-excerpt">{post.excerpt}</p>

                    {post.image && (
                        <div className="article-featured-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                    )}
                </header>

                {/* Main Content Area */}
                <div className="article-layout">
                    {/* Article Body */}
                    <article className="article-content">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="article-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="tag">
                                        <FaTag /> {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="content-body">
                            {post.content.split('\n\n').map((para, idx) => {
                                // Check if paragraph is a heading
                                if (para.trim().match(/^#+\s/)) {
                                    const level = para.match(/^#+/)?.[0].length || 2;
                                    const text = para.replace(/^#+\s/, '').trim();
                                    const HeadingTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
                                    return React.createElement(HeadingTag, { key: idx, className: 'content-heading' }, text);
                                }

                                // Check if paragraph is a list
                                if (para.trim().match(/^[-*•]\s/)) {
                                    const items = para
                                        .split('\n')
                                        .filter(line => line.trim())
                                        .map(line => line.replace(/^[-*•]\s/, '').trim());
                                    return (
                                        <ul key={idx} className="content-list">
                                            {items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }

                                return (
                                    <p key={idx} className="content-paragraph">{para}</p>
                                );
                            })}
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <section className="related-posts">
                                <h3 className="section-title">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 7h14M3 13h14M7 3v14" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    Bài viết liên quan
                                </h3>
                                <div className="related-grid">
                                    {relatedPosts.map((rel) => (
                                        <Link key={rel.id} to={`/blog/${rel.id}`} className="related-card">
                                            {rel.image && <img src={rel.image} alt={rel.title} className="related-image" />}
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
                        )}
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
                                {post.readTime && (
                                    <div className="quick-info-item">
                                        <span className="info-label">Thời gian đọc:</span>
                                        <span className="info-value">{post.readTime} phút</span>
                                    </div>
                                )}
                                {post.views !== undefined && (
                                    <div className="quick-info-item">
                                        <span className="info-label">Lượt xem:</span>
                                        <span className="info-value">{post.views.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default ArticlePage;