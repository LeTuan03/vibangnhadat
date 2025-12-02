import React from 'react';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';

const BlogPage: React.FC = () => {
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
