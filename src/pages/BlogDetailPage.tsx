import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaTag } from 'react-icons/fa';
import { BlogFirebaseService } from '../services';
import { BlogPost } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { formatDate } from '../utils/helpers';
import { useSEO, generateArticleStructuredData } from '../hooks/useSEO';
import './BlogDetailPage.css';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                if (!id) throw new Error('Blog ID not found');

                // Fetch the post
                const postData = await BlogFirebaseService.getById(id);
                if (!postData) {
                    setError('Bài viết không tồn tại');
                    setLoading(false);
                    return;
                }

                setPost(postData);

                // Increment views
                try {
                    await BlogFirebaseService.incrementViews(id);
                } catch (err) {
                    console.warn('Could not increment views:', err);
                }

                // Fetch related posts from same category
                const allPosts = await BlogFirebaseService.getAllPosts();
                const related = allPosts
                    .filter(p => p.category === postData.category && p.id !== id)
                    .slice(0, 3);
                setRelatedPosts(related);

                setError(null);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !post) {
        return (
            <div className="blog-detail-page-error">
                <div className="error-container">
                    <h2>⚠️ {error || 'Bài viết không tồn tại'}</h2>
                    <button className="back-button" onClick={() => navigate('/blog')}>
                        <FaArrowLeft /> Quay lại danh sách bài viết
                    </button>
                </div>
            </div>
        );
    }

    // Use SEO hook when post is loaded
    useSEO({
        title: `${post.title} - Văn phòng Thừa phát lại`,
        description: post.excerpt || 'Đọc bài viết pháp lý chi tiết từ văn phòng thừa phát lại',
        keywords: post.tags?.join(', ') || 'bài viết, pháp luật',
        ogType: 'article',
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.image || '/logo.png',
        ogUrl: typeof window !== 'undefined' ? window.location.href : '',
        canonical: typeof window !== 'undefined' ? window.location.href : '',
        structuredData: generateArticleStructuredData({
            title: post.title,
            description: post.excerpt,
            image: post.image,
            author: post.author,
            publishedDate: new Date(post.date).toISOString(),
            modifiedDate: post.modifiedDate ? new Date(post.modifiedDate).toISOString() : new Date(post.date).toISOString(),
            content: post.content,
            url: typeof window !== 'undefined' ? window.location.href : '',
        }),
    });

    return (
        <article className="blog-detail-page">
            {/* Header */}
            <div className="blog-detail-header">
                <button className="back-button" onClick={() => navigate('/blog')}>
                    <FaArrowLeft /> Quay lại
                </button>

                <div className="blog-detail-breadcrumb">
                    <Link to="/blog">Blog</Link> / <span>{post.category}</span>
                </div>

                <h1 className="blog-detail-title">{post.title}</h1>

                <div className="blog-detail-meta">
                    <span className="meta-item">
                        <FaCalendar /> {formatDate(post.date)}
                    </span>
                    <span className="meta-item">
                        <FaUser /> {post.author}
                    </span>
                    {post.readTime && (
                        <span className="meta-item">
                            <FaClock /> {post.readTime} phút đọc
                        </span>
                    )}
                    {post.views !== undefined && (
                        <span className="meta-item">
                            👁️ {post.views.toLocaleString()} lượt xem
                        </span>
                    )}
                </div>

                {post.image && (
                    <div className="blog-detail-featured-image">
                        <img src={post.image} alt={post.title} />
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="blog-detail-container">
                {/* Excerpt */}
                <p className="blog-detail-excerpt">{post.excerpt}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="blog-detail-tags">
                        {post.tags.map(tag => (
                            <span key={tag} className="tag">
                                <FaTag /> {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="blog-detail-content">
                    {post.content.split('\n\n').map((paragraph, idx) => {
                        // Check if paragraph is a heading
                        const headingMatch = paragraph.trim().match(/^#+\s/);
                        if (headingMatch) {
                            const level = paragraph.match(/^#+/)?.[0].length || 2;
                            const text = paragraph.replace(/^#+\s/, '').trim();
                            const HeadingTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
                            return React.createElement(HeadingTag, { key: idx }, text);
                        }

                        // Check if paragraph is a list
                        if (paragraph.trim().match(/^[-*•]\s/)) {
                            const items = paragraph
                                .split('\n')
                                .filter(line => line.trim())
                                .map(line => line.replace(/^[-*•]\s/, '').trim());
                            return (
                                <ul key={idx}>
                                    {items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }

                        return (
                            <p key={idx}>{paragraph.trim()}</p>
                        );
                    })}
                </div>

                {/* Featured Info */}
                {post.featured && (
                    <div className="blog-detail-featured-badge">
                        ⭐ Bài viết được đề xuất
                    </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="blog-detail-related">
                        <h3>📰 Các bài viết liên quan</h3>
                        <div className="related-posts-grid">
                            {relatedPosts.map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.id}`}
                                    className="related-post-card"
                                >
                                    {relatedPost.image && (
                                        <img src={relatedPost.image} alt={relatedPost.title} />
                                    )}
                                    <div className="related-post-content">
                                        <h4>{relatedPost.title}</h4>
                                        <p>{relatedPost.excerpt}</p>
                                        <small>{formatDate(relatedPost.date)}</small>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Section */}
            <Contact />
        </article>
    );
};

export default BlogDetailPage;
