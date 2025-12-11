import React from 'react';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';
import { useSEO } from '../hooks/useSEO';

const BlogPage: React.FC = () => {
    useSEO({
        title: 'Thư viện bài viết pháp lý - Văn phòng Thừa phát lại',
        description: 'Khám phá các bài viết pháp lý chi tiết, hướng dẫn thử hành án, lập vi bằng, tống đạt văn bản và nhiều chủ đề khác từ chuyên gia pháp luật',
        keywords: 'bài viết pháp lý, hướng dẫn luật, tư vấn pháp luật, thừa phát lại',
        canonical: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '',
        ogType: 'website',
        ogTitle: 'Thư viện bài viết pháp lý',
        ogDescription: 'Đọc các bài viết pháp lý chi tiết từ văn phòng thừa phát lại',
        ogUrl: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '',
    });

    return (
        <div className="blog-page">
            <main>
                <BlogList />
                <Contact />
            </main>
        </div>
    );
};

export default BlogPage;
