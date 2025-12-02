import React from 'react';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';
import BackToTop from '../components/BackToTop';

const BlogPage: React.FC = () => {
    return (
        <div className="blog-page">
            <Header />
            <main>
                <BlogList />
                <Contact />
            </main>
            <Footer />
            <FloatingContact />
            <BackToTop />
        </div>
    );
};

export default BlogPage;
