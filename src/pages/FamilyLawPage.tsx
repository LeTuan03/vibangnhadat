import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FamilyLawFirebaseService from '../services/FamilyLawFirebaseService';
import LoadingSpinner from '../components/LoadingSpinner';
import type { FamilyLawQA } from '../types';
import './FamilyLawPage.css';

// Note: Fetches from Firebase; mockFamilyLawQAs is fallback

const FamilyLawPage: React.FC = () => {
    const [familyLawQAs, setFamilyLawQAs] = useState<FamilyLawQA[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await FamilyLawFirebaseService.getAllQAs();
                setFamilyLawQAs(data);
            } catch (err) {
                console.error('Error loading family law Q&As:', err);
                setFamilyLawQAs([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <section className="family-law-page">
            <div className="container">
                <header className="page-header">
                    <h2 className='section-title'>Hôn nhân – Gia đình</h2>
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
            </div>
        </section>
    );
};

export default FamilyLawPage;
