import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Booking.css';
import { toast } from 'react-toastify';
import { getContactInfo } from '../services';

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
    const [contactInfo, setContactInfo] = useState<any>({
        phone: '',
        email: ''
    });

    useEffect(() => {
        const loadContactInfo = async () => {
            try {
                const data = await getContactInfo();
                if (data) {
                    setContactInfo(data);
                }
            } catch (error) {
                console.error('Lỗi tải thông tin liên hệ:', error);
            }
        };

        loadContactInfo();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    // Format ngày sang định dạng dd/mm/yyyy
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Format loại tư vấn
    const getConsultationTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            'online': 'Online',
            'offline': 'Trực tiếp tại văn phòng',
            'phone': 'Qua điện thoại'
        };
        return labels[type] || type;
    };

    // Format lĩnh vực
    const getConsultationAreaLabel = (area: string) => {
        const labels: Record<string, string> = {
            'business': 'Luật Doanh nghiệp',
            'land': 'Luật Đất đai',
            'criminal': 'Luật Hình sự',
            'family': 'Hôn nhân - Gia đình',
            'debt': 'Thu hồi nợ',
            'arbitration': 'Trọng tài thương mại',
            'ip': 'Sở hữu trí tuệ',
            'other': 'Khác'
        };
        return labels[area] || area;
    };

    // CÁCH 1: Sử dụng mailto (Mở ứng dụng email của user)
    const sendEmailWithMailto = () => {
        const subject = encodeURIComponent(`Đặt lịch tư vấn từ ${formData.name}`);
        const body = encodeURIComponent(
            `YÊU CẦU ĐẶT LỊCH TƯ VẤN PHÁP LÝ\n` +
            `=====================================\n\n` +
            `THÔNG TIN KHÁCH HÀNG:\n` +
            `- Họ và tên: ${formData.name}\n` +
            `- Số điện thoại: ${formData.phone}\n` +
            `- Email: ${formData.email}\n\n` +
            `THÔNG TIN TƯ VẤN:\n` +
            `- Hình thức: ${getConsultationTypeLabel(formData.consultationType)}\n` +
            `- Lĩnh vực: ${getConsultationAreaLabel(formData.consultationArea)}\n` +
            `- Thời gian mong muốn: ${formatDate(formData.preferredDate)}\n\n` +
            `MÔ TẢ VỤ VIỆC:\n` +
            `${formData.description || '(Không có mô tả)'}\n\n` +
            `=====================================\n` +
            `Email này được gửi từ website đặt lịch tư vấn.`
        );

        window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
        return true;
    };

    // CÁCH 2: Sử dụng EmailJS (Nếu muốn tự động gửi)
    const sendEmailWithEmailJS = async () => {
        try {
            const emailjs = await import('@emailjs/browser');

            const templateParams = {
                to_email: contactInfo.email,
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                consultation_type: getConsultationTypeLabel(formData.consultationType),
                consultation_area: getConsultationAreaLabel(formData.consultationArea),
                preferred_date: formatDate(formData.preferredDate),
                description: formData.description || '(Không có mô tả)',
            };

            await emailjs.send(
                'YOUR_SERVICE_ID',      // Thay bằng Service ID của bạn
                'YOUR_TEMPLATE_ID',     // Thay bằng Template ID của bạn
                templateParams,
                'YOUR_PUBLIC_KEY'       // Thay bằng Public Key của bạn
            );

            return true;
        } catch (error) {
            console.error('EmailJS error:', error);
            throw error;
        }
    };

    // CÁCH 3: Sử dụng Backend API
    const sendEmailWithBackend = async () => {
        try {
            const response = await fetch('/api/booking/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    toEmail: contactInfo.email,
                    consultationTypeLabel: getConsultationTypeLabel(formData.consultationType),
                    consultationAreaLabel: getConsultationAreaLabel(formData.consultationArea),
                    formattedDate: formatDate(formData.preferredDate),
                }),
            });

            if (!response.ok) {
                throw new Error('Không thể gửi email');
            }

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Backend API error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.agreedTerms) {
            toast.error('Vui lòng đồng ý với chính sách bảo mật');
            return;
        }
        if (!formData.name || !formData.phone || !formData.email || !formData.consultationArea || !formData.preferredDate) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        try {
            // Chọn 1 trong 3 cách dưới đây:

            // CÁCH 1: Mailto (Mở ứng dụng email - Đơn giản nhất)
            sendEmailWithMailto();

            // CÁCH 2: EmailJS (Tự động gửi - Không cần backend)
            // await sendEmailWithEmailJS();

            // CÁCH 3: Backend API (Chuyên nghiệp nhất)
            // await sendEmailWithBackend();

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
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.');
        }
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
                                <p>Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
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
                                                min={new Date().toISOString().split('T')[0]}
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
                            <p>Hotline: <strong>{contactInfo.phone}</strong></p>
                            <p className="booking-info-desc">Hỗ trợ 24/7, mọi lúc</p>
                        </div>
                        <div className="booking-info-card">
                            <FaEnvelope className="booking-info-icon" />
                            <h3>Gửi email</h3>
                            <p><strong>{contactInfo.email}</strong></p>
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