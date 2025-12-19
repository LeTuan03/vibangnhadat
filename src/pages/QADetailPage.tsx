import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';
import QAFirebaseService from '../services/QAFirebaseService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSEO, generateBreadcrumbStructuredData } from '../hooks/useSEO';
import type { FAQ } from '../types';
import './QADetailPage.css';

// Note: Fetches from Firebase; mockFAQs is fallback

const QADetailPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoading(true);
                const data = await QAFirebaseService.getAllFAQs();
                setFaqs(data);
                if (!data.find(f => f.id === id)) {
                    setNotFound(true);
                }
            } catch (err) {
                console.error('Error loading FAQs:', err);
                // no fallback data available; mark not found
                setFaqs([]);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadFAQs();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const faq = faqs.find((f) => f.id === id);

    useSEO({
        title: faq ? `${faq.question} | Hỏi đáp Thừa phát lại Hoàng Mai` : 'Hỏi đáp pháp luật',
        description: faq?.answer.substring(0, 160) || 'Giải đáp thắc mắc về dịch vụ thừa phát lại, lập vi bằng, tống đạt văn bản.',
        keywords: `${faq?.category || 'pháp luật'}, hỏi đáp thừa phát lại, ${faq?.question}, giải đáp pháp luật`,
        ogType: 'article',
        ogTitle: faq?.question,
        ogDescription: faq?.answer.substring(0, 160),
        canonical: typeof window !== 'undefined' ? window.location.href : '',
        structuredData: faq ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [{
                '@type': 'Question',
                'name': faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer
                }
            }],
            'breadcrumb': generateBreadcrumbStructuredData([
                { name: 'Trang chủ', url: typeof window !== 'undefined' ? window.location.origin : '' },
                { name: 'Hỏi đáp', url: typeof window !== 'undefined' ? `${window.location.origin}/qa` : '' },
                { name: faq.question, url: typeof window !== 'undefined' ? window.location.href : '' }
            ])
        } : undefined
    });

    if (!faq || notFound) {
        return (
            <main className="container">
                <h2>Câu hỏi không tìm thấy</h2>
                <p>Xin lỗi, câu hỏi bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/qa">Quay về trang hỏi đáp</Link>
            </main>
        );
    }

    const relatedFaqs = faqs
        .filter((f) => f.category === faq.category && f.id !== faq.id)
        .slice(0, 3);

    return (
        <div className="qa-detail-page">
            <main className="container qa-detail-container">
                <Link to="/qa" className="back-link">
                    <FaArrowLeft /> Quay lại trang hỏi đáp
                </Link>

                <article className="qa-detail">
                    <header className="qa-header">
                        <div className="qa-icon">
                            <FaQuestionCircle />
                        </div>
                        <h1>{faq.question}</h1>
                        <div className="qa-meta">
                            <span className="qa-category">{faq.category}</span>
                        </div>
                    </header>

                    <div className="qa-body">
                        <section className="qa-answer-section">
                            <h2>Câu trả lời</h2>
                            <div className="qa-answer-content">
                                <p>{faq.answer}</p>

                                {/* Additional explanation */}
                                <div className="qa-explanation">
                                    <h3>Giải thích chi tiết</h3>
                                    {faq.fullDescription ? (
                                        <div className="full-description">{faq.fullDescription.split('\n').map((p, i) => <p key={i}>{p}</p>)}</div>
                                    ) : (
                                        <p>
                                            {faq.category === 'Tổng quan'
                                                ? 'Câu hỏi này giúp bạn hiểu rõ hơn về định nghĩa, khái niệm cơ bản trong lĩnh vực pháp luật liên quan.'
                                                : faq.category === 'Lập vi bằng'
                                                    ? 'Lập vi bằng là một trong những dịch vụ quan trọng của Thừa phát lại, giúp xác thực các giao dịch dân sự, kinh tế.'
                                                    : faq.category === 'Chi phí'
                                                        ? 'Chi phí dịch vụ được quy định theo quy chuẩn của Nhà nước, đảm bảo tính công khai, minh bạch và hợp lý.'
                                                        : faq.category === 'Xác minh điều kiện'
                                                            ? 'Xác minh điều kiện thi hành án là quá trình kiểm tra, xác nhận tài sản, thu nhập của người phải thi hành án.'
                                                            : faq.category === 'Dịch vụ khác'
                                                                ? 'Ngoài các dịch vụ chính, Thừa phát lại còn cung cấp nhiều dịch vụ hỗ trợ khác để đáp ứng nhu cầu khách hàng.'
                                                                : 'Đây là một câu hỏi quan trọng giúp bạn hiểu rõ hơn về quyền lợi và nghĩa vụ của mình.'}
                                        </p>
                                    )}
                                </div>

                                {/* Practical Examples */}
                                <div className="qa-examples">
                                    <h3>Ví dụ thực tế</h3>
                                    <p>
                                        Trong thực tiễn, {faq.question.toLowerCase()} được áp dụng trong nhiều tình huống khác nhau như:
                                    </p>
                                    <ul>
                                        <li>Trong các giao dịch buôn bán, chuyển nhượng tài sản</li>
                                        <li>Trong quá trình giải quyết tranh chấp pháp lý</li>
                                        <li>Trong các thủ tục hành chính cần xác thực</li>
                                        <li>Trong quá trình thi hành án dân sự</li>
                                    </ul>
                                </div>

                                {/* Related Regulations */}
                                <div className="qa-regulations">
                                    <h3>Văn bản pháp luật liên quan</h3>
                                    <ul>
                                        <li>Luật Thừa phát lại năm 2011</li>
                                        <li>Bộ Luật dân sự năm 2015</li>
                                        <li>Luật thi hành án dân sự năm 2008</li>
                                        <li>Các quyết định, thông tư hướng dẫn của Bộ Tư pháp</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Consultation CTA */}
                        <aside className="qa-consultation-cta">
                            <h4>Có thêm câu hỏi khác?</h4>
                            <p>Liên hệ với luật sư của chúng tôi để được giải đáp chi tiết và tư vấn pháp luật chuyên sâu.</p>
                            <Link to="/" className="btn btn-primary">
                                Đặt lịch tư vấn
                            </Link>
                        </aside>

                        {/* Related FAQs */}
                        {relatedFaqs.length > 0 && (
                            <section className="related-faqs">
                                <h3>Câu hỏi liên quan</h3>
                                <div className="related-qa-list">
                                    {relatedFaqs.map((rel) => (
                                        <Link
                                            key={rel.id}
                                            to={`/qa/${rel.id}`}
                                            className="related-qa-item"
                                        >
                                            <FaQuestionCircle />
                                            <p>{rel.question}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </main>
        </div>
    );
};

export default QADetailPage;
