import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceAreas } from '../data/content';
import { FaArrowLeft } from 'react-icons/fa';
import './ServiceAreaDetailPage.css';

const ServiceAreaDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const area = serviceAreas.find((s) => s.id === id);

    if (!area) {
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
                <FaArrowLeft /> Quay lại
            </Link>

            <div className="area-hero" style={{ backgroundImage: `url(${area.image})` }}>
                <div className="area-hero-inner">
                    <h1>{area.title}</h1>
                    <p>{area.description}</p>
                </div>
            </div>

            <section className="area-content">
                <h2>Tổng quan dịch vụ</h2>
                <p>
                    {area.description} — chúng tôi cung cấp các dịch vụ chuyên sâu, đội ngũ luật sư giàu kinh
                    nghiệm, hỗ trợ thực tế và tư vấn chiến lược cho mọi tình huống pháp lý liên quan.
                </p>

                <h3>Dịch vụ chính</h3>
                <ul>
                    <li>Tư vấn pháp lý chuyên sâu</li>
                    <li>Soạn thảo và kiểm tra hợp đồng</li>
                    <li>Đại diện thủ tục hành chính và tố tụng</li>
                    <li>Hỗ trợ đàm phán và giải quyết tranh chấp</li>
                </ul>

                <aside className="consult-cta">
                    <h4>Muốn tư vấn ngay?</h4>
                    <Link to="/" className="btn btn-primary">
                        Đặt lịch tư vấn miễn phí
                    </Link>
                </aside>
            </section>
        </main>
    );
};

export default ServiceAreaDetailPage;
