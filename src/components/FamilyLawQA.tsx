import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { familyLawService } from '../admin/api/familyLawService';
import { mockFamilyLawQAs } from '../data/mockData';
import './FamilyLawQA.css';

const FamilyLawQA: React.FC = () => {
    const [familyLawQAs] = useState(() => {
        familyLawService.initialize(mockFamilyLawQAs);
        return familyLawService.getAllFamilyLaws();
    });

    return (
        <section id="family-law-qa" className="family-law-qa-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Hôn nhân – Gia đình</h2>
                    <Link to="/family-law" className="see-more-link">Xem thêm <FaArrowRight /></Link>
                </div>
                <div className="family-qa-grid">
                    {familyLawQAs.map((qa) => (
                        <Link to={`/family-law/${qa.id}`} key={qa.id} className="family-qa-card">
                            <div
                                className="family-qa-image"
                                style={{ backgroundImage: `url(${qa.image})` }}
                            />
                            <div className="family-qa-content">
                                <h3 className="family-qa-question">{qa.question}</h3>
                                <p className="family-qa-description">{qa.shortDescription}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FamilyLawQA;
