import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FamilyLawFirebaseService from '../services/FamilyLawFirebaseService';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSEO, generateBreadcrumbStructuredData } from '../hooks/useSEO';
import type { FamilyLawQA } from '../types';
import { familyLawFallback } from '../data/familyLawFallback';
import './FamilyLawDetailPage.css';

// Note: Fetches from Firebase; mockFamilyLawQAs is fallback

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
                // If not found in Firebase, but exists in local fallback, consider it found
                if (!data.find(qa => qa.id === id) && !(id && familyLawFallback[id])) {
                    setNotFound(true);
                } else {
                    setNotFound(false);
                }
            } catch (err) {
                console.error('Error loading family law Q&As:', err);
                setFamilyLawQAs([]);
                setNotFound(true);
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
    // Merge with fallback so missing fields from Firebase are filled from local seed
    const displayItem: FamilyLawQA | null = item ? { ...(familyLawFallback[item.id] || {}), ...item } : (id && familyLawFallback[id]) || null;

    useSEO({
        title: displayItem ? `${displayItem.question} | Luật Hôn nhân Hoàng Mai` : 'Tư vấn Luật Hôn nhân Gia đình',
        description: displayItem?.shortDescription || 'Tư vấn pháp luật hôn nhân và gia đình uy tín tại Văn phòng thi hành án dân sự Hoàng Mai.',
        keywords: `${displayItem?.question || ''}, luật hôn nhân gia đình, tư vấn ly hôn, quyền nuôi con, thừa phát lại hoàng mai`,
        ogType: 'article',
        ogTitle: displayItem?.question,
        ogDescription: displayItem?.shortDescription,
        canonical: typeof window !== 'undefined' ? window.location.href : '',
        structuredData: displayItem ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': displayItem.question,
            'description': displayItem.shortDescription,
            'author': {
                '@type': 'Organization',
                'name': 'Văn phòng thi hành án dân sự Hoàng Mai'
            },
            'breadcrumb': generateBreadcrumbStructuredData([
                { name: 'Trang chủ', url: typeof window !== 'undefined' ? window.location.origin : '' },
                { name: 'Hôn nhân Gia đình', url: typeof window !== 'undefined' ? `${window.location.origin}/family-law` : '' },
                { name: displayItem.question, url: typeof window !== 'undefined' ? window.location.href : '' }
            ])
        } : undefined
    });

    if (!displayItem || notFound) {
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
                    <h1>{item?.question}</h1>
                    <p className="lead">{item?.shortDescription}</p>
                    <div className="meta-info">
                        <span className="tag">Hôn nhân – Gia đình</span>
                        <span className="date">Cập nhật: 2025</span>
                    </div>
                </header>

                <section className="detail-body">
                    <>
                        {displayItem.overview && (
                            <>
                                <div className="content-intro">
                                    <p>
                                        <strong>{displayItem.question}</strong> là một vấn đề pháp lý quan trọng trong lĩnh vực hôn nhân và gia đình.
                                        {displayItem.overview && ` ${displayItem.overview}`}
                                    </p>
                                </div>
                            </>
                        )}

                        {displayItem.overview && (
                            <>
                                <h3>📋 Tổng quan vấn đề</h3>
                                <p>{displayItem.overview}</p>
                            </>
                        )}

                        {displayItem.definition && (
                            <>
                                <h3>🔍 Khái niệm và định nghĩa</h3>
                                <p>{displayItem.definition}</p>
                            </>
                        )}

                        {displayItem.relatedLaws && displayItem.relatedLaws.length > 0 && (
                            <>
                                <h3>📑 Quy định pháp luật liên quan</h3>
                                <ul>
                                    {displayItem.relatedLaws.map((law, idx) => (
                                        <li key={idx}>{law}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {displayItem.processSteps && displayItem.processSteps.length > 0 && (
                            <>
                                <h3>📋 Hướng dẫn thực hiện từng bước</h3>
                                <ol className="step-list">
                                    {displayItem.processSteps.map((step, idx) => (
                                        <li key={idx}>
                                            <strong>{step.title}</strong>
                                            <p>{step.description}</p>
                                        </li>
                                    ))}
                                </ol>
                            </>
                        )}

                        {displayItem.tips && displayItem.tips.length > 0 && (
                            <>
                                <h3>💡 Lưu ý quan trọng</h3>
                                <div className="highlight-box">
                                    <ul>
                                        {displayItem.tips.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </>

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
