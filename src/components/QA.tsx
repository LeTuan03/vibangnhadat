import React, { useState, useEffect } from 'react';
import { FaTag, FaBook, FaLightbulb } from 'react-icons/fa';
import QAFirebaseService from '../services/QAFirebaseService';
import { FAQ } from '../types';
import './QA.css';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';

interface QuestionSubmission {
    name: string;
    email: string;
    phone: string;
    category: string;
    question: string;
    agreedTerms: boolean;
}

const QA: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [formData, setFormData] = useState<QuestionSubmission>({
        name: '',
        email: '',
        phone: '',
        category: '',
        question: '',
        agreedTerms: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoading(true);
                const data = await QAFirebaseService.getAllFAQs();
                setFaqs(data);
                // Increment views for important FAQs
                data.forEach((faq) => {
                    if (faq.isImportant) {
                        QAFirebaseService.incrementViews(faq.id);
                    }
                });
            } catch (err) {
                console.error('Error loading FAQs:', err);
                setError('Không thể tải câu hỏi. Vui lòng thử lại sau.');
                toast.error('Lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        loadFAQs();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <section className="qa-section">
                <div className="container">
                    <h2>Hỏi & Đáp</h2>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </section>
        );
    }

    const categories = ['all', ...new Set(faqs.map((f) => f.category))];
    
    const filteredFAQs = faqs.filter((f) => {
        const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
        const matchSearch =
            f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const handleFormInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreedTerms) {
            toast.error('Vui lòng đồng ý với chính sách bảo mật');
            return;
        }
        if (!formData.name || !formData.email || !formData.phone || !formData.question) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        toast.success('Câu hỏi của bạn đã được gửi thành công!');
        setIsSubmitted(true);
        setTimeout(() => {
            setShowForm(false);
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                category: '',
                question: '',
                agreedTerms: false,
            });
        }, 2000);
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
        if (expandedId !== id) {
            QAFirebaseService.incrementViews(id);
        }
    };

    return (
        <section id="qa" className="qa-section">
            <div className="container">
                <h2 className="section-title">Hỏi Đáp</h2>
                <p className="section-subtitle">
                    Các câu hỏi thường gặp và tư vấn pháp lý chi tiết từ các chuyên gia
                </p>

                {/* Search Bar */}
                <div className="qa-search-container">
                    <input
                        type="text"
                        className="qa-search"
                        placeholder="Tìm kiếm câu hỏi, từ khóa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <div className="qa-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'all' ? 'Tất cả' : cat}
                        </button>
                    ))}
                </div>

                {/* Q&A List */}
                <div className="qa-list">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`qa-item ${expandedId === faq.id ? 'expanded' : ''}`}
                            >
                                <div
                                    className="qa-question"
                                    onClick={() => toggleExpand(faq.id)}
                                >
                                    <div className="qa-header">
                                        {faq.isImportant && (
                                            <span className="qa-important">
                                                <FaLightbulb /> Quan trọng
                                            </span>
                                        )}
                                        <span className="qa-question-text">{faq.question}</span>
                                    </div>
                                    {/* <FaChevronDown
                                        className={`qa-icon ${expandedId === faq.id ? 'rotated' : ''}`}
                                    /> */}
                                </div>

                                {expandedId === faq.id && (
                                    <div className="qa-answer">
                                        <div className="qa-answer-content">
                                            <p className="qa-answer-short">{faq.answer}</p>

                                            {faq.detailedExplanation && (
                                                <div className="qa-detailed">
                                                    <h5>Giải thích chi tiết</h5>
                                                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                                        {faq.detailedExplanation}
                                                    </div>
                                                </div>
                                            )}

                                            {faq.examples && faq.examples.length > 0 && (
                                                <div className="qa-examples">
                                                    <h5>
                                                        <FaLightbulb /> Ví dụ thực tế
                                                    </h5>
                                                    <ul>
                                                        {faq.examples.map((example, idx) => (
                                                            <li key={idx}>{example}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {faq.relatedLaws && faq.relatedLaws.length > 0 && (
                                                <div className="qa-laws">
                                                    <h5>
                                                        <FaBook /> Văn bản pháp luật liên quan
                                                    </h5>
                                                    <ul>
                                                        {faq.relatedLaws.map((law, idx) => (
                                                            <li key={idx}>{law}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {faq.tags && faq.tags.length > 0 && (
                                                <div className="qa-tags">
                                                    {faq.tags.map((tag) => (
                                                        <span key={tag} className="qa-tag">
                                                            <FaTag /> {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="qa-footer">
                                            <button
                                                className="qa-helpful"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    QAFirebaseService.incrementHelpful(faq.id);
                                                    toast.success('Cảm ơn phản hồi của bạn!');
                                                }}
                                            >
                                                👍 Hữu ích ({faq.helpfulCount || 0})
                                            </button>
                                            <span className="qa-views">
                                                👁 {faq.views || 0} lượt xem
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="qa-empty">
                            <p>Không tìm thấy câu hỏi nào. Vui lòng thử tìm kiếm khác.</p>
                        </div>
                    )}
                </div>

                {/* Submit Question */}
                <div className="qa-submit-section">
                    <h3>Không tìm thấy câu trả lời?</h3>
                    <p>Gửi câu hỏi của bạn cho luật sư tư vấn. Chúng tôi sẽ phản hồi trong 24 giờ.</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Ẩn form' : 'Gửi câu hỏi'}
                    </button>

                    {showForm && (
                        <form className="qa-form" onSubmit={handleFormSubmit}>
                            {isSubmitted ? (
                                <div className="qa-success">
                                    <h4>✓ Gửi câu hỏi thành công!</h4>
                                    <p>Chúng tôi sẽ phản hồi lại trong 24 giờ.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Họ và tên *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormInputChange}
                                                placeholder="Nhập họ và tên"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormInputChange}
                                                placeholder="Nhập email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Số điện thoại *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormInputChange}
                                                placeholder="Nhập số điện thoại"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Lĩnh vực *</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleFormInputChange}
                                                required
                                            >
                                                <option value="">-- Chọn lĩnh vực --</option>
                                                {categories
                                                    .filter((c) => c !== 'all')
                                                    .map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group full">
                                        <label>Câu hỏi của bạn *</label>
                                        <textarea
                                            name="question"
                                            value={formData.question}
                                            onChange={handleFormInputChange}
                                            placeholder="Nhập câu hỏi chi tiết..."
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    <div className="form-group-checkbox">
                                        <input
                                            type="checkbox"
                                            id="agreedTermsQA"
                                            name="agreedTerms"
                                            checked={formData.agreedTerms}
                                            onChange={handleFormInputChange}
                                        />
                                        <label htmlFor="agreedTermsQA">
                                            Tôi đồng ý với chính sách bảo mật
                                        </label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Gửi câu hỏi
                                    </button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QA;
