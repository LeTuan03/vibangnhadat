import React, { useEffect } from 'react';
import { FaCalendar, FaUser, FaTimes, FaClock, FaTag, FaNewspaper } from 'react-icons/fa';
import type { BlogPost } from '../types';
import { BlogFirebaseService } from '../services';
import { formatDate } from '../utils/helpers';
import './BlogDetail.css';

interface BlogDetailProps {
    post: BlogPost;
    onClose: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onClose }) => {
    // Track view on mount
    useEffect(() => {
        const trackView = async () => {
            try {
                await BlogFirebaseService.incrementViews(post.id);
            } catch (err) {
                console.warn('Could not track view:', err);
            }
        };
        trackView();
    }, [post.id]);

    const renderContent = (content: string) => {
        return content.split('\n\n').map((para, idx) => {
            // Check if paragraph is a heading
            const headingMatch = para.trim().match(/^#+\s/);
            if (headingMatch) {
                const level = para.match(/^#+/)?.[0].length || 2;
                const text = para.replace(/^#+\s/, '').trim();
                const HeadingTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
                return React.createElement(HeadingTag, { key: idx, className: 'blog-detail-heading' }, text);
            }

            // Check if paragraph is a list
            if (para.trim().match(/^[-*•]\s/)) {
                const items = para
                    .split('\n')
                    .filter(line => line.trim())
                    .map(line => line.replace(/^[-*•]\s/, '').trim());
                return (
                    <ul key={idx} className="blog-detail-list">
                        {items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                );
            }

            return (
                <p key={idx} className="blog-detail-paragraph">{para.trim()}</p>
            );
        });
    };

    return (
        <div className="blog-detail-overlay" onClick={onClose}>
            <div className="blog-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="blog-detail-close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="blog-detail-header">
                    <div className="blog-detail-image">
                        <FaNewspaper />
                    </div>
                    {/* {post?.image && (
                        <div className="blog-detail-image-container">
                            <img src={post.image} alt={post?.title} className="blog-detail-featured-image" />
                        </div>
                    )} */}
                    <div className="blog-detail-badges">
                        <span className="blog-detail-category">{post.category}</span>
                        {post.featured && <span className="blog-detail-featured-badge">⭐ Nổi bật</span>}
                    </div>
                    <h1 className="blog-detail-title">{post.title}</h1>
                    <div className="blog-detail-meta">
                        <span>
                            <FaUser /> {post.author}
                        </span>
                        <span>
                            <FaCalendar /> {formatDate(post.date)}
                        </span>
                        {post.readTime && (
                            <span>
                                <FaClock /> {post.readTime} phút đọc
                            </span>
                        )}
                        {post.views !== undefined && (
                            <span>
                                👁️ {post.views.toLocaleString()} lượt xem
                            </span>
                        )}
                    </div>
                </div>

                <div className="blog-detail-content">
                    <p className="blog-detail-excerpt">{post.excerpt}</p>

                    {post.tags && post.tags.length > 0 && (
                        <div className="blog-detail-tags">
                            {post.tags.map(tag => (
                                <span key={tag} className="blog-detail-tag">
                                    <FaTag /> {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="blog-detail-body">
                        {renderContent(post.content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
