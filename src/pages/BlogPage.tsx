import React from 'react';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';
import { useSEO } from '../hooks/useSEO';

const BlogPage: React.FC = () => {
    useSEO({
        title: 'Thư viện bài viết pháp lý | Thừa phát lại Hoàng Mai',
        description: 'Khám phá các bài viết pháp lý chi tiết, hướng dẫn thi hành án, lập vi bằng, tống đạt văn bản và nhiều chủ đề pháp luật khác từ chuyên gia Thừa phát lại Hoàng Mai.',
        keywords: 'bài viết pháp lý, hướng dẫn luật, tư vấn pháp luật, thừa phát lại hoàng mai, kiến thức pháp luật',
        canonical: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '',
        ogType: 'website',
        ogTitle: 'Thư viện bài viết pháp lý - Thừa phát lại Hoàng Mai',
        ogDescription: 'Đọc các bài viết pháp lý chi tiết từ Văn phòng Thừa phát lại Hoàng Mai',
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
