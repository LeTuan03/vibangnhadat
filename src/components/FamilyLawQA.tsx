import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { familyLawQAs } from '../data/content';
import './FamilyLawQA.css';

const FamilyLawQA: React.FC = () => {
    return (
        <section id="family-law-qa" className="family-law-qa-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Hôn nhân – Gia đình</h2>
                    <a href="#" className="see-more-link">Xem thêm <FaArrowRight /></a>
                </div>
                <div className="family-qa-grid">
                    {familyLawQAs.map((qa) => (
                        <div key={qa.id} className="family-qa-card">
                            <div
                                className="family-qa-image"
                                style={{ backgroundImage: `url(${qa.image})` }}
                            />
                            <div className="family-qa-content">
                                <h3 className="family-qa-question">{qa.question}</h3>
                                <p className="family-qa-description">{qa.shortDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FamilyLawQA;
