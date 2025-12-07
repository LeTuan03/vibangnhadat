import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FamilyLawFirebaseService from '../services/FamilyLawFirebaseService';
import { mockFamilyLawQAs } from '../data/mockData';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import type { FamilyLawQA } from '../types';
import './FamilyLawDetailPage.css';

const FamilyLawDetailPage: React.FC = () => {
    const [familyLawQAs, setFamilyLawQAs] = useState<FamilyLawQA[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await FamilyLawFirebaseService.getAllQAs();
                setFamilyLawQAs(data);
                if (!data.find(qa => qa.id === id)) {
                    setNotFound(true);
                }
            } catch (err) {
                console.error('Error loading family law Q&As:', err);
                setFamilyLawQAs(mockFamilyLawQAs);
                if (!mockFamilyLawQAs.find(qa => qa.id === id)) {
                    setNotFound(true);
                }
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const item = familyLawQAs.find((f) => f.id === id);

    if (!item || notFound) {
        return (
            <main className="container">
                <h2>Không tìm thấy nội dung</h2>
                <Link to="/family-law">Quay lại Hôn nhân – Gia đình</Link>
            </main>
        );
    }

    return (
        <main className="container family-law-detail">
            <Link to="/family-law" className="back-link">
                <FaArrowLeft /> Quay lại
            </Link>

            <article>
                <header className="detail-header">
                    <h1>{item.question}</h1>
                    <p className="lead">{item.shortDescription}</p>
                    <div className="meta-info">
                        <span className="tag">Hôn nhân – Gia đình</span>
                        <span className="date">Cập nhật: 2025</span>
                    </div>
                </header>

                <section className="detail-body">
                    <div className="content-intro">
                        <p>
                            <strong>{item.question}</strong> là một vấn đề pháp lý quan trọng trong lĩnh vực hôn nhân và gia đình. 
                            Bài viết này cung cấp hướng dẫn chi tiết, giải thích các quy định pháp luật hiện hành, thủ tục cần thiết, 
                            tài liệu cần chuẩn bị và các lưu ý thực tiễn khi xử lý tình huống này.
                        </p>
                    </div>

                    <h3>📋 Tổng quan vấn đề</h3>
                    <p>
                        Đây là một trong những câu hỏi phổ biến mà các cặp vợ chồng hoặc những người liên quan đến pháp luật gia đình 
                        thường gặp phải. Việc hiểu rõ quy định pháp luật sẽ giúp bạn bảo vệ quyền lợi chính đáng của mình.
                    </p>

                    <h3>🔍 Khái niệm và định nghĩa</h3>
                    <p>
                        Theo pháp luật hiện hành, {item.question.toLowerCase()} được hiểu là... (nội dung giải thích chi tiết)
                    </p>

                    <h3>📑 Quy định pháp luật liên quan</h3>
                    <ul>
                        <li>Bộ Luật Dân sự năm 2015</li>
                        <li>Luật Hôn nhân và Gia đình năm 2000</li>
                        <li>Các quyết định hướng dẫn của Tòa án Tối cao</li>
                        <li>Thông tư hướng dẫn của Bộ Tư pháp</li>
                    </ul>

                    <h3>📋 Hướng dẫn thực hiện từng bước</h3>
                    <ol className="step-list">
                        <li>
                            <strong>Bước 1: Chuẩn bị giấy tờ cần thiết</strong>
                            <p>Chuẩn bị đầy đủ các chứng chỉ, hợp đồng, giấy tờ liên quan có liên quan đến vấn đề của bạn.</p>
                        </li>
                        <li>
                            <strong>Bước 2: Tư vấn với luật sư chuyên viên</strong>
                            <p>Gặp luật sư để được tư vấn cụ thể, hiểu rõ quyền lợi và nghĩa vụ của bạn.</p>
                        </li>
                        <li>
                            <strong>Bước 3: Tiến hành thủ tục theo quy định</strong>
                            <p>Thực hiện đúng quy trình và thủ tục quy định bởi pháp luật để bảo vệ quyền lợi của mình.</p>
                        </li>
                        <li>
                            <strong>Bước 4: Theo dõi tiến trình</strong>
                            <p>Theo dõi kết quả và liên hệ với cơ quan chuyên trách nếu cần hỗ trợ thêm.</p>
                        </li>
                    </ol>

                    <h3>💡 Lưu ý quan trọng</h3>
                    <div className="highlight-box">
                        <ul>
                            <li>Luôn giữ bản gốc của các tài liệu quan trọng</li>
                            <li>Thực hiện thủ tục trong thời hạn quy định</li>
                            <li>Tìm kiếm tư vấn pháp lý khi cần thiết</li>
                            <li>Không trì hoãn các vấn đề pháp lý quan trọng</li>
                        </ul>
                    </div>

                    <h3>❓ Câu hỏi thường gặp</h3>
                    <details className="faq-item">
                        <summary>Có thời hạn nào để thực hiện thủ tục này không?</summary>
                        <p>Có, theo quy định pháp luật, bạn cần thực hiện trong thời hạn... (chi tiết cụ thể)</p>
                    </details>
                    <details className="faq-item">
                        <summary>Chi phí cho dịch vụ tư vấn là bao nhiêu?</summary>
                        <p>Chi phí tư vấn pháp lý được tính dựa trên độ phức tạp của vụ việc. Liên hệ với chúng tôi để được báo giá chi tiết.</p>
                    </details>
                </section>

                <aside className="consult-cta">
                    <div className="cta-content">
                        <h4>🎯 Cần hỗ trợ pháp lý ngay?</h4>
                        <p>Đội ngũ luật sư chuyên viên của chúng tôi sẵn sàng hỗ trợ bạn. Đặt lịch tư vấn miễn phí hôm nay!</p>
                        <Link to="/" className="btn btn-primary btn-lg">
                            Đặt lịch tư vấn miễn phí
                        </Link>
                        <p className="cta-footer">Phản hồi trong 2 giờ | Tư vấn miễn phí</p>
                    </div>
                </aside>
            </article>
        </main>
    );
};

export default FamilyLawDetailPage;
