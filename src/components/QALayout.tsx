import React from 'react';
import { Outlet } from 'react-router-dom';
import './QALayout.css';

const QALayout: React.FC = () => {
    return (
        <div className="qa-layout container">
            <section className="qa-content">
                <Outlet />
            </section>
        </div>
    );
};

export default QALayout;
