import React from 'react';
import { Link } from 'react-router-dom';
import { familyLawQAs } from '../data/content';
import './FamilyLawPage.css';

const FamilyLawPage: React.FC = () => {
    return (
        <main className="container family-law-page">
            <header className="page-header">
                <h1>Hôn nhân – Gia đình</h1>
                <p>Các câu hỏi thường gặp và dịch vụ tư vấn trong lĩnh vực hôn nhân và gia đình.</p>
            </header>

            <section className="family-list">
                {familyLawQAs.map((qa) => (
                    <article key={qa.id} className="family-card">
                        <div className="thumb" style={{ backgroundImage: `url(${qa.image})` }} />
                        <div className="content">
                            <h3>{qa.question}</h3>
                            <p>{qa.shortDescription}</p>
                            <Link to={`/family-law/${qa.id}`} className="btn btn-outline">
                                Xem chi tiết
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default FamilyLawPage;
