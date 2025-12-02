import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { familyLawQAs } from '../data/content';
import { FaArrowLeft } from 'react-icons/fa';
import './FamilyLawDetailPage.css';

const FamilyLawDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const item = familyLawQAs.find((f) => f.id === id);

    if (!item) {
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
                </header>

                <section className="detail-body">
                    <p>
                        Nội dung chi tiết về câu hỏi: <strong>{item.question}</strong>. Đây là phần mô tả chi tiết,
                        giải thích các quy định pháp luật có liên quan, thủ tục, hồ sơ và các lưu ý thực tiễn khi
                        xử lý tình huống này.
                    </p>

                    <h3>Hướng dẫn thực hiện</h3>
                    <ol>
                        <li>Chuẩn bị giấy tờ liên quan.</li>
                        <li>Gặp luật sư để tư vấn cụ thể.</li>
                        <li>Tiến hành thủ tục theo hướng dẫn pháp luật.</li>
                    </ol>
                </section>

                <aside className="consult-cta">
                    <h4>Cần hỗ trợ pháp lý?</h4>
                    <Link to="/" className="btn btn-primary">
                        Đặt lịch tư vấn
                    </Link>
                </aside>
            </article>
        </main>
    );
};

export default FamilyLawDetailPage;
