import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './QALayout.css';

const QALayout: React.FC = () => {
    return (
        <div className="qa-layout container">
            <header className="qa-header">
                <h2>Hỏi & Đáp pháp luật</h2>
                <nav className="qa-nav">
                    <Link to="/qa">Tất cả</Link>
                    <Link to="/qa">Theo lĩnh vực</Link>
                </nav>
            </header>

            <section className="qa-content">
                <Outlet />
            </section>
        </div>
    );
};

export default QALayout;
