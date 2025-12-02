import React from 'react';
import Layout from '../components/Layout';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';

const BlogPage: React.FC = () => {
    return (
        <div className="blog-page">
            <Layout>
                <main>
                    <BlogList />
                    <Contact />
                </main>
            </Layout>
        </div>
    );
};

export default BlogPage;
