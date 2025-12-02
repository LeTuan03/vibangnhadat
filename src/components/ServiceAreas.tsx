import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { serviceAreas } from '../data/content';
import './ServiceAreas.css';

const ServiceAreas: React.FC = () => {
    return (
        <section id="service-areas" className="service-areas-section">
            <div className="container">
                <h2 className="section-title">Lĩnh vực hành nghề của chúng tôi</h2>
                <div className="service-areas-grid">
                    {serviceAreas.map((area) => (
                        <div key={area.id} className="service-area-card">
                            <Link to={`/service-areas/${area.id}`} className="service-area-image" style={{ backgroundImage: `url(${area.image})` }}>
                                <div className="service-area-overlay">
                                    <h3 className="service-area-title">{area.title}</h3>
                                    <span className="btn btn-primary btn-sm">
                                        Xem chi tiết <FaArrowRight />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceAreas;
