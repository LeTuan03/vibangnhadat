import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceAreas } from '../data/content';
import { FaArrowLeft } from 'react-icons/fa';
import './ServiceAreaDetailPage.css';

const ServiceAreaDetailPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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
                <div className="overview-grid">
                    <div className="overview-item">
                        <span className="icon">⚖️</span>
                        <h3>Kinh nghiệm</h3>
                        <p>Hơn 20 năm kinh nghiệm trong lĩnh vực này</p>
                    </div>
                    <div className="overview-item">
                        <span className="icon">👥</span>
                        <h3>Đội ngũ</h3>
                        <p>Luật sư chuyên viên, tận tâm và tỉ mỉ</p>
                    </div>
                    <div className="overview-item">
                        <span className="icon">✓</span>
                        <h3>Chất lượng</h3>
                        <p>Dịch vụ chất lượng cao, đáp ứng tiêu chuẩn</p>
                    </div>
                    <div className="overview-item">
                        <span className="icon">💼</span>
                        <h3>Giải pháp</h3>
                        <p>Giải pháp toàn diện, phù hợp với nhu cầu</p>
                    </div>
                </div>
            </section>

            <section className="area-content">
                <h2>🎯 Tổng quan dịch vụ</h2>
                <p>
                    {area.description} — chúng tôi cung cấp các dịch vụ chuyên sâu, đội ngũ luật sư giàu kinh
                    nghiệm, hỗ trợ thực tế và tư vấn chiến lược cho mọi tình huống pháp lý liên quan. Với phương châm
                    "Uy tín - Chuyên nghiệp", chúng tôi cam kết mang đến giải pháp tối ưu cho khách hàng.
                </p>

                <h3>📋 Dịch vụ chính</h3>
                <div className="services-list">
                    <div className="service-item">
                        <h4>Tư vấn pháp lý chuyên sâu</h4>
                        <p>Tư vấn chi tiết, cập nhật theo pháp luật mới nhất, giải đáp mọi vấn đề có liên quan</p>
                    </div>
                    <div className="service-item">
                        <h4>Soạn thảo và kiểm tra hợp đồng</h4>
                        <p>Soạn thảo, sửa đổi, kiểm tra hợp đồng để bảo vệ quyền lợi của bạn</p>
                    </div>
                    <div className="service-item">
                        <h4>Đại diện thủ tục hành chính và tố tụng</h4>
                        <p>Đại diện toàn quyền hoặc một phần trong các thủ tục pháp lý và tranh chấp</p>
                    </div>
                    <div className="service-item">
                        <h4>Hỗ trợ đàm phán và giải quyết tranh chấp</h4>
                        <p>Tham gia đàm phán, hoà giải hoặc trọng tài để giải quyết tranh chấp hiệu quả</p>
                    </div>
                </div>

                <h3>📊 Quy trình làm việc</h3>
                <div className="process-flow">
                    <div className="process-step">
                        <span className="step-num">1</span>
                        <h4>Tìm hiểu nhu cầu</h4>
                        <p>Tìm hiểu chi tiết tình huống và nhu cầu của bạn</p>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                        <span className="step-num">2</span>
                        <h4>Đề xuất giải pháp</h4>
                        <p>Đề xuất giải pháp tối ưu phù hợp với tình huống</p>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                        <span className="step-num">3</span>
                        <h4>Thực hiện</h4>
                        <p>Thực hiện các thủ tục, dịch vụ theo thỏa thuận</p>
                    </div>
                    <div className="process-arrow">→</div>
                    <div className="process-step">
                        <span className="step-num">4</span>
                        <h4>Theo dõi kết quả</h4>
                        <p>Theo dõi tiến trình và báo cáo kết quả cho bạn</p>
                    </div>
                </div>

                <h3>🎁 Ưu điểm khi chọn chúng tôi</h3>
                <ul className="benefits-list">
                    <li>✓ Đội ngũ luật sư chuyên viên, giàu kinh nghiệm</li>
                    <li>✓ Tư vấn chi tiết, giải đáp mọi vấn đề</li>
                    <li>✓ Phí dịch vụ minh bạch, cạnh tranh</li>
                    <li>✓ Cam kết bảo mật thông tin khách hàng</li>
                    <li>✓ Hỗ trợ nhanh chóng, hiệu quả</li>
                    <li>✓ Giải pháp toàn diện, phù hợp nhu cầu</li>
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
                        <span>📞 Gọi: 090 123 4567</span>
                        <span>📧 Email: contact@thuaphatlai.com</span>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default ServiceAreaDetailPage;
