import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BlogFirebaseService } from '../services';
import { BlogPost } from '../types';
import './BlogList.css';

const POSTS_PER_PAGE = 6;

/**
 * BlogCard - Memoized component for individual blog post display
 */
const BlogCard = React.memo(({ post }: { post: BlogPost }) => (
    <article className="blog-card">
        <div className="blog-image">
            <img
                src={post.image || '/images/blog-placeholder.jpg'}
                alt={post.title}
            />
            <span className="blog-category">{post.category}</span>
        </div>
        <div className="blog-content">
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-excerpt">{post.excerpt}</p>
            <div className="blog-meta">
                <span><FaCalendar /> {new Date(post.date).toLocaleDateString('vi-VN')}</span>
                <span><FaUser /> {post.author}</span>
            </div>
            <Link to={`/blog/${post.id}`} className="blog-link">
                Đọc thêm →
            </Link>
        </div>
    </article>
));

BlogCard.displayName = 'BlogCard';

/**
 * BlogList - Main component for displaying paginated blog posts with filtering
 */
const BlogList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await BlogFirebaseService.getAllPosts();
                setPosts(data);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Lỗi khi tải bài viết');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Memoized categories list
    const categories = useMemo(
        () => ['all', ...new Set(posts.map((p) => p.category))],
        [posts]
    );

    // Memoized filtered posts
    const filteredPosts = useMemo(
        () => selectedCategory === 'all' ? posts : posts.filter((p) => p.category === selectedCategory),
        [posts, selectedCategory]
    );

    // Memoized pagination calculations
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
        const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
        const displayedPosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
        return { totalPages, displayedPosts };
    }, [filteredPosts, currentPage]);

    // Memoized callbacks
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    }, []);

    return (
        <section className="blog-list-section">
            <div className="container">
                <h2 className="section-title">Thư viện bài viết</h2>
                <p className="section-subtitle">
                    Cập nhật kiến thức pháp luật, tin tức pháp luật mới nhất
                </p>

                {loading && <div className="loading">Đang tải bài viết...</div>}
                {error && <div className="error">{error}</div>}

                {!loading && !error && posts.length === 0 && (
                    <div className="no-posts">Chưa có bài viết nào</div>
                )}

                {!loading && !error && posts.length > 0 && (
                    <>
                        {/* Category Filter */}
                        <div className="blog-filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat === 'all' ? 'Tất cả' : cat}
                                </button>
                            ))}
                        </div>

                        {/* Blog Grid */}
                        <div className="blog-grid">
                            {paginationData.displayedPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {paginationData.totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ← Trang trước
                                </button>

                                <div className="pagination-numbers">
                                    {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(Math.min(paginationData.totalPages, currentPage + 1))}
                                    disabled={currentPage === paginationData.totalPages}
                                >
                                    Trang sau →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default React.memo(BlogList);
