import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FaBook,
    // FaDownload,
    FaCalendar, FaArrowLeft
} from 'react-icons/fa';
// Layout provided by route-level wrapper
import DocumentFirebaseService from '../services/DocumentFirebaseService';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import type { LegalDocument } from '../types';
import './DocumentDetailPage.css';

// Note: Fetches from Firebase; mockLegalDocuments is fallback

const DocumentDetailPage: React.FC = () => {
    const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                setLoading(true);
                const data = await DocumentFirebaseService.getAllDocuments();
                setLegalDocuments(data);
                if (!data.find(d => d.id === id)) {
                    setNotFound(true);
                }
            } catch (err) {
                console.error('Error loading documents:', err);
                setLegalDocuments([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadDocuments();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const document = legalDocuments.find((d) => d.id === id);

    if (!document || notFound) {
        return (
            <main className="container">
                <h2>Tài liệu không tìm thấy</h2>
                <p>Xin lỗi, tài liệu bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/documents">Quay về thư viện tài liệu</Link>
            </main>
        );
    }

    const relatedDocs = legalDocuments
        .filter((d) => d.category === document.category && d.id !== document.id)
        .slice(0, 3);

    return (
        <main className="container document-detail-container">
            <Link to="/documents" className="back-link">
                <FaArrowLeft /> Quay lại thư viện
            </Link>

            <article className="document-detail">
                <header className="document-header">
                    <div className="document-icon">
                        <FaBook />
                    </div>
                    <h1>{document.title}</h1>
                    <div className="document-meta">
                        <span className="doc-category">{document.category}</span>
                        <span>
                            <FaCalendar /> {formatDate(document.publishDate)}
                        </span>
                    </div>
                </header>

                <div className="document-body">
                    <p className="document-description">{document.description}</p>

                    {/* Document Overview Section */}
                    <section className="doc-section">
                        <h2>Tổng quan</h2>
                        <p>
                            {document.category === 'Luật'
                                ? 'Đây là một bộ luật quan trọng trong hệ thống pháp luật Việt Nam, quy định các quyền và nghĩa vụ của các chủ thể pháp luật trong lĩnh vực liên quan.'
                                : document.category === 'Nghị định'
                                    ? 'Đây là một nghị định của Chính phủ, có giá trị pháp lý cao trong việc quy định chi tiết việc thực hiện các quy định của luật.'
                                    : document.category === 'Thông tư'
                                        ? 'Đây là một thông tư hướng dẫn cách thực hiện các quy định của pháp luật từ các bộ, ngành có thẩm quyền.'
                                        : document.category === 'Quyết định'
                                            ? 'Đây là một quyết định hành chính, có tác dụng ràng buộc các chủ thể thực hiện theo quy định của quyết định này.'
                                            : 'Đây là một văn bản công vụ, quy định các yêu cầu và hướng dẫn thực hiện trong lĩnh vực tương ứng.'}
                        </p>
                    </section>

                    {/* Key Points Section */}
                    <section className="doc-section">
                        <h2>Điểm chính</h2>
                        <ul className="key-points">
                            <li>Quy định chi tiết về các nguyên tắc và yêu cầu trong lĩnh vực này</li>
                            <li>Xác định quyền và nghĩa vụ của các chủ thể liên quan</li>
                            <li>Quy định hình phạt và biện pháp xử lý vi phạm</li>
                            <li>Cung cấp hướng dẫn thực hiện cụ thể</li>
                        </ul>
                    </section>

                    {/* Application Scope Section */}
                    <section className="doc-section">
                        <h2>Phạm vi áp dụng</h2>
                        <p>
                            Văn bản này áp dụng cho tất cả các cá nhân, tổ chức hoạt động trong lĩnh vực{' '}
                            {document.category.toLowerCase()}. Các quy định trong văn bản này có hiệu lực từ ngày được
                            công bố và có thể được sửa đổi, bổ sung theo quy định pháp luật hiện hành.
                        </p>
                    </section>

                    {/* Implementation Guidance */}
                    <section className="doc-section">
                        <h2>Hướng dẫn thực hiện</h2>
                        <p>
                            Để thực hiện đúng quy định của văn bản này, các chủ thể liên quan cần:
                        </p>
                        <ol>
                            <li>Tìm hiểu toàn bộ nội dung văn bản</li>
                            <li>Xác định các yêu cầu áp dụng cho hoạt động của mình</li>
                            <li>Chuẩn bị các tài liệu và hồ sơ cần thiết</li>
                            <li>Thực hiện đúng quy trình, thủ tục quy định</li>
                            <li>Lưu giữ các chứng cứ để chứng minh việc thực hiện quy định</li>
                        </ol>
                    </section>

                    {/* Download Section */}
                    {/* <aside className="document-cta">
                            <h4>Tải về văn bản</h4>
                            <p>Tải xuống bản đầy đủ của văn bản này để tham khảo chi tiết.</p>
                            <button className="btn btn-primary">
                                <FaDownload /> Tải xuống PDF
                            </button>
                        </aside> */}

                    {/* Related Documents */}
                    {relatedDocs.length > 0 && (
                        <section className="related-documents">
                            <h3>Tài liệu liên quan</h3>
                            <div className="related-list">
                                {relatedDocs.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        to={`/documents/${rel.id}`}
                                        className="related-item"
                                    >
                                        <FaBook />
                                        <div>
                                            <p className="related-title">{rel.title}</p>
                                            <p className="related-category">{rel.category}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Consultation CTA */}
                    <aside className="consultation-cta">
                        <h4>Cần tư vấn thêm?</h4>
                        <p>Liên hệ với luật sư của chúng tôi để được giải thích chi tiết về nội dung văn bản.</p>
                        <Link to="/" className="btn btn-primary">
                            Đặt lịch tư vấn
                        </Link>
                    </aside>
                </div>
            </article>
        </main>
    );
};

export default DocumentDetailPage;
