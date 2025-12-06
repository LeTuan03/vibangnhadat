import React, { useState } from 'react';
import { FaFileContract, FaEnvelopeOpenText, FaSearchDollar, FaGavel, FaTimes } from 'react-icons/fa';
import serviceService from '../admin/api/serviceService';
import { mockServices } from '../data/mockData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Services.css';

const iconMap: Record<string, React.ReactNode> = {
    FaFileContract: <FaFileContract />,
    FaEnvelopeOpenText: <FaEnvelopeOpenText />,
    FaSearchDollar: <FaSearchDollar />,
    FaGavel: <FaGavel />,
};

const Services: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [ref] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
    const [services] = useState(() => {
        serviceService.initializeServices(mockServices);
        return serviceService.getAllServices();
    });

    const selectedServiceData = services.find((s: any) => s.id === selectedService);

    return (
        <section id="services" className="section">
            <div className="container">
                <h2 className="section-title">Dịch Vụ Của Chúng Tôi</h2>
                <p className="section-subtitle">
                    Cung cấp đầy đủ các dịch vụ thừa phát lại chuyên nghiệp, đảm bảo quyền lợi hợp pháp của bạn
                </p>

                <div ref={ref} className={`services-grid`}>
                    {services.map((service: any, index: number) => (
                        <div
                            key={service.id}
                            className="service-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedService(service.id)}
                        >
                            <div className="service-icon">
                                {iconMap[service.icon]}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <button className="service-btn">Xem chi tiết →</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedServiceData && (
                <div className="modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedService(null)}>
                            <FaTimes />
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon">
                                {iconMap[selectedServiceData.icon]}
                            </div>
                            <h2>{selectedServiceData.title}</h2>
                        </div>

                        <div className="modal-body">
                            <p className="modal-description">{selectedServiceData.description}</p>

                            <div className="modal-section">
                                <h3>Dịch vụ bao gồm:</h3>
                                <ul className="modal-list">
                                    {selectedServiceData.details.map((detail: any, index: number) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-section">
                                <h3>Lợi ích:</h3>
                                <ul className="modal-list benefits-list">
                                    {selectedServiceData.benefits.map((benefit: any, index: number) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="btn btn-primary btn-lg" onClick={() => setSelectedService(null)}>
                                Liên hệ tư vấn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Services;
