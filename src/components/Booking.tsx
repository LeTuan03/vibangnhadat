import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Booking.css';
import { toast } from 'react-toastify';

interface BookingFormData {
    name: string;
    phone: string;
    email: string;
    consultationType: string;
    consultationArea: string;
    preferredDate: string;
    description: string;
    agreedTerms: boolean;
}

const Booking: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        phone: '',
        email: '',
        consultationType: 'online',
        consultationArea: '',
        preferredDate: '',
        description: '',
        agreedTerms: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreedTerms) {
            toast.error('Vui lòng đồng ý với chính sách bảo mật');
            return;
        }
        if (!formData.name || !formData.phone || !formData.email || !formData.consultationArea || !formData.preferredDate) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        toast.success('Yêu cầu tư vấn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ bạn sớm!');
        setIsSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsSubmitted(false);
            setFormData({
                name: '',
                phone: '',
                email: '',
                consultationType: 'online',
                consultationArea: '',
                preferredDate: '',
                description: '',
                agreedTerms: false,
            });
        }, 2000);
    };

    return (
        <>
            {/* Floating CTA Button */}
            {/* <button className="booking-cta-button" onClick={() => setIsOpen(true)}>
                <FaCalendarAlt />
            </button> */}

            {/* Booking Modal */}
            {isOpen && (
                <div className="booking-modal" onClick={() => setIsOpen(false)}>
                    <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="booking-modal-close"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        {isSubmitted ? (
                            <div className="booking-success">
                                <div className="success-icon">✓</div>
                                <h3>Đặt lịch thành công!</h3>
                                <p>Chúng tôi sẽ liên hệ lại với bạn trong thời gian soonest.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="booking-title">Đặt lịch tư vấn miễn phí</h2>
                                <form onSubmit={handleSubmit} className="booking-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Họ và tên *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Nhập họ và tên"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Nhập số điện thoại"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Nhập email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Hình thức tư vấn *</label>
                                            <select
                                                name="consultationType"
                                                value={formData.consultationType}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="online">Online</option>
                                                <option value="offline">Trực tiếp tại văn phòng</option>
                                                <option value="phone">Qua điện thoại</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Lĩnh vực vụ việc *</label>
                                            <select
                                                name="consultationArea"
                                                value={formData.consultationArea}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">-- Chọn lĩnh vực --</option>
                                                <option value="business">Luật Doanh nghiệp</option>
                                                <option value="land">Luật Đất đai</option>
                                                <option value="criminal">Luật Hình sự</option>
                                                <option value="family">Hôn nhân - Gia đình</option>
                                                <option value="debt">Thu hồi nợ</option>
                                                <option value="arbitration">Trọng tài thương mại</option>
                                                <option value="ip">Sở hữu trí tuệ</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Thời gian mong muốn *</label>
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group full">
                                        <label>Mô tả ngắn vụ việc</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Mô tả ngắn vụ việc của bạn..."
                                            rows={4}
                                        />
                                    </div>

                                    <div className="form-group-checkbox">
                                        <input
                                            type="checkbox"
                                            id="agreedTerms"
                                            name="agreedTerms"
                                            checked={formData.agreedTerms}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="agreedTerms">
                                            Tôi đồng ý với chính sách bảo mật và điều khoản dịch vụ
                                        </label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg booking-submit">
                                        Đặt lịch tư vấn
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Booking Info Section */}
            <section id="booking" className="booking-section">
                <div className="container">
                    <h2 className="section-title">Đặt lịch tư vấn</h2>
                    <div className="booking-info-grid">
                        <div className="booking-info-card">
                            <FaPhone className="booking-info-icon" />
                            <h3>Gọi cho chúng tôi</h3>
                            <p>Hotline: <strong>0901234567</strong></p>
                            <p className="booking-info-desc">Hỗ trợ 24/7, mọi lúc</p>
                        </div>
                        <div className="booking-info-card">
                            <FaEnvelope className="booking-info-icon" />
                            <h3>Gửi email</h3>
                            <p><strong>contact@thuaphatlaivn.com</strong></p>
                            <p className="booking-info-desc">Phản hồi trong 2 giờ</p>
                        </div>
                        <div className="booking-info-card">
                            <FaCalendarAlt className="booking-info-icon" />
                            <h3>Đặt lịch trực tuyến</h3>
                            <p>Form đặt lịch online</p>
                            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;
