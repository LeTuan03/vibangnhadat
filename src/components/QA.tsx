import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { faqs } from '../data/content';
import './QA.css';

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
    const [formData, setFormData] = useState<QuestionSubmission>({
        name: '',
        email: '',
        phone: '',
        category: '',
        question: '',
        agreedTerms: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const categories = ['all', ...new Set(faqs.map((f) => f.category))];
    const filteredFAQs =
        selectedCategory === 'all' ? faqs : faqs.filter((f) => f.category === selectedCategory);

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
            alert('Vui lòng đồng ý với chính sách bảo mật');
            return;
        }
        console.log('Question submitted:', formData);
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

    return (
        <section id="qa" className="qa-section">
            <div className="container">
                <h2 className="section-title">Hỏi Đáp</h2>
                <p className="section-subtitle">
                    Các câu hỏi thường gặp từ khách hàng
                </p>

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
                    {filteredFAQs.map((faq) => (
                        <Link
                            key={faq.id}
                            to={`/qa/${faq.id}`}
                            className="qa-item"
                        >
                            <div className="qa-question">
                                <span>{faq.question}</span>
                                <FaChevronDown style={{ marginLeft: 'auto' }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Submit Question */}
                <div className="qa-submit-section">
                    <h3>Không tìm thấy câu trả lời?</h3>
                    <p>Gửi câu hỏi của bạn cho luật sư tư vấn</p>
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
