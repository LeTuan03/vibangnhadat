import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceAreaFirebaseService from '../services/ServiceAreaFirebaseService';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSEO, generateBreadcrumbStructuredData } from '../hooks/useSEO';
import type { ServiceArea } from '../types';
import './ServiceAreaDetailPage.css';

// Note: Fetches from Firebase; mockServiceAreas is fallback

const ServiceAreaDetailPage: React.FC = () => {
    const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const loadServiceAreas = async () => {
            try {
                setLoading(true);
                const data = await ServiceAreaFirebaseService.getAllServiceAreas();
                setServiceAreas(data);
                if (!data.find(s => s.id === id)) {
                    setNotFound(true);
                }
            } catch (err) {
                console.error('Error loading service areas:', err);
                setServiceAreas([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadServiceAreas();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const area = serviceAreas.find((s) => s.id === id);

    useSEO({
        title: area ? `${area.title} | Thừa phát lại Hoàng Mai` : 'Dịch vụ Thừa phát lại',
        description: area?.description || 'Dịch vụ thừa phát lại chuyên nghiệp, uy tín tại Hoàng Mai, Hà Nội.',
        keywords: `${area?.title || ''}, thừa phát lại hoàng mai, dịch vụ thừa phát lại, lập vi bằng, tống đạt`,
        ogType: 'website',
        ogTitle: area?.title,
        ogDescription: area?.description,
        ogImage: area?.image || '/logo.png',
        canonical: typeof window !== 'undefined' ? window.location.href : '',
        structuredData: area ? {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': area.title,
            'description': area.description,
            'provider': {
                '@type': 'LocalBusiness',
                'name': 'Văn phòng thi hành án dân Hoàng Mai'
            },
            'breadcrumb': generateBreadcrumbStructuredData([
                { name: 'Trang chủ', url: typeof window !== 'undefined' ? window.location.origin : '' },
                { name: 'Lĩnh vực', url: typeof window !== 'undefined' ? window.location.origin : '' },
                { name: area.title, url: typeof window !== 'undefined' ? window.location.href : '' }
            ])
        } : undefined
    });

    if (!area || notFound) {
        return (
            <main className="container">
                <h2>Không tìm thấy lĩnh vực</h2>
                <p>Xin lỗi, lĩnh vực bạn tìm không tồn tại.</p>
                <Link to="/">Quay lại trang chủ</Link>
            </main>
        );
    }

    return (
        <main className="container service-area-detail">
            <Link to="/" className="back-link">
                <FaArrowLeft /> Quay lại trang chủ
            </Link>

            <div className="area-hero" style={{ backgroundImage: `url(${area.image})` }}>
                <div className="area-hero-inner">
                    <span className="badge">Lĩnh vực hành nghề</span>
                    <h1>{area.title}</h1>
                    <p className="hero-subtitle">{area.description}</p>
                </div>
            </div>

            <section className="area-overview">
                {area.details && area.details.length > 0 ? (
                    <div className="overview-grid">
                        {area.details.map((d, idx) => (
                            <div className="overview-item" key={idx}>
                                <div className="overview-content">
                                    <p>{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overview-grid">
                        <div className="overview-item"><h4>Không có thông tin tóm tắt</h4></div>
                    </div>
                )}
            </section>

            <section className="area-content">
                <h2>🎯 Tổng quan dịch vụ</h2>
                <p>{area.description}</p>

                <h3>📋 Dịch vụ chính</h3>
                <div className="services-list">
                    {area.servicesOffered && area.servicesOffered.length > 0 ? (
                        area.servicesOffered.map((s, i) => (
                            <div className="service-item" key={i}>
                                <h4>{s.title}</h4>
                                <p>{s.description}</p>
                            </div>
                        ))
                    ) : (
                        <div className="service-item"><p>Thông tin dịch vụ chưa được cập nhật.</p></div>
                    )}
                </div>

                <h3>📊 Quy trình làm việc</h3>
                <div className="process-flow">
                    {area.processSteps && area.processSteps.length > 0 ? (
                        area.processSteps.map((step, i) => (
                            <div className="process-step" key={i}>
                                <span className="step-num">{i + 1}</span>
                                <h4>{step}</h4>
                            </div>
                        ))
                    ) : (
                        <div className="process-step"><p>Quy trình chưa được cập nhật.</p></div>
                    )}
                </div>

                <h3>🎁 Ưu điểm khi chọn chúng tôi</h3>
                <ul className="benefits-list">
                    {area.benefits && area.benefits.length > 0 ? (
                        area.benefits.map((b, i) => <li key={i}>{b}</li>)
                    ) : (
                        <li>Ưu điểm chưa được cập nhật.</li>
                    )}
                </ul>
            </section>

            <aside className="consult-cta">
                <div className="cta-content">
                    <h4>💡 Bạn cần hỗ trợ ngay?</h4>
                    <p>Liên hệ với chúng tôi hôm nay để nhận tư vấn miễn phí và giải pháp tối ưu cho vấn đề của bạn</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Đặt lịch tư vấn miễn phí
                    </Link>
                    <div className="cta-info">
                        <span>📞 Gọi: {area.contactCTA?.phone || 'Chưa cập nhật'}</span>
                        <span>📧 Email: {area.contactCTA?.email || 'Chưa cập nhật'}</span>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default ServiceAreaDetailPage;
