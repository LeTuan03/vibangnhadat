import React, { useState } from 'react';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import './BlogList.css';

const POSTS_PER_PAGE = 6;

const BlogList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...new Set(blogPosts.map((p) => p.category))];
    const filteredPosts =
        selectedCategory === 'all' ? blogPosts : blogPosts.filter((p) => p.category === selectedCategory);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const displayedPosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <section className="blog-list-section">
            <div className="container">
                <h2 className="section-title">Thư viện bài viết</h2>
                <p className="section-subtitle">
                    Cập nhật kiến thức pháp luật, tin tức pháp luật mới nhất
                </p>

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
                    {displayedPosts.map((post) => (
                        <article key={post.id} className="blog-card">
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
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            ← Trang trước
                        </button>

                        <div className="pagination-numbers">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Trang sau →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogList;
