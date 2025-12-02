import React from 'react';
import { useParams, Link } from 'react-router-dom';
// Route-level Layout will provide Header/Footer via Outlet
import { blogPosts } from '../data/content';
import { formatDate } from '../utils/helpers';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        return (
            <main className="container">
                <h2>Bài viết không tìm thấy</h2>
                <p>Xin lỗi, bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/blog">Quay về thư viện bài viết</Link>
            </main>
        );
    }

    return (
        <main className="container article-container">
                <nav className="breadcrumb">
                    <Link to="/">Trang chủ</Link> / <Link to="/blog">Thư viện</Link> / <span>{post.title}</span>
                </nav>

                <article className="article-detail">
                    <header className="article-header">
                        <h1>{post.title}</h1>
                        <div className="article-meta">
                            <span>✍️ {post.author}</span>
                            <span>📅 {formatDate(post.date)}</span>
                            <span>🏷️ {post.category}</span>
                        </div>
                        <p className="article-excerpt">{post.excerpt}</p>
                    </header>

                    <div className="article-body">
                        {/* Render content as paragraphs for now */}
                        {post.content.split('\n\n').map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}

                        {/* Simple related posts (same category) */}
                        <section className="related-posts">
                            <h3>Bài viết liên quan</h3>
                            <div className="related-list">
                                {blogPosts
                                    .filter((p) => p.category === post.category && p.id !== post.id)
                                    .slice(0, 3)
                                    .map((rel) => (
                                        <Link key={rel.id} to={`/blog/${rel.id}`} className="related-item">
                                            {rel.title}
                                        </Link>
                                    ))}
                            </div>
                        </section>

                        <aside className="article-cta">
                            <h4>Muốn tư vấn chuyên sâu?</h4>
                            <p>Đặt lịch tư vấn miễn phí với luật sư của chúng tôi.</p>
                            <Link to="/" className="btn btn-primary">Đặt lịch tư vấn</Link>
                        </aside>
                    </div>
                </article>
            </main>
    );
};

export default ArticlePage;
