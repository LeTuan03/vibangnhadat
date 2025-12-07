import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { getContactInfo } from '../services';
import { mockContactInfo } from '../data/mockData';
import { createPhoneLink, createZaloLink, formatPhoneNumber, isValidEmail, isValidPhone } from '../utils/helpers';
import './Contact.css';

const Contact: React.FC = () => {
    const [contactInfo, setContactInfo] = useState(mockContactInfo);

    useEffect(() => {
        const loadContactInfo = async () => {
            try {
                const data = await getContactInfo();
                if (data) {
                    setContactInfo(data);
                }
            } catch (error) {
                console.error('Lỗi tải thông tin liên hệ:', error);
                // Fallback to mock data
            }
        };

        loadContactInfo();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Vui lòng nhập nội dung';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });

            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="section section-alt">
            <div className="container">
                <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
                <p className="section-subtitle">
                    Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí cho bạn
                </p>

                <div className="contact-wrapper">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3>Thông tin liên hệ</h3>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaPhone />
                            </div>
                            <div>
                                <h4>Điện thoại</h4>
                                <a href={createPhoneLink(contactInfo.phone)} className="contact-link">
                                    {formatPhoneNumber(contactInfo.phone)}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <SiZalo />
                            </div>
                            <div>
                                <h4>Zalo</h4>
                                <a href={createZaloLink(contactInfo.phone)} target="_blank" rel="noopener noreferrer" className="contact-link">
                                    {formatPhoneNumber(contactInfo.phone)}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4>Email</h4>
                                <a href={`mailto:${contactInfo.email}`} className="contact-link">
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4>Địa chỉ</h4>
                                <p>{contactInfo.address}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaClock />
                            </div>
                            <div>
                                <h4>Giờ làm việc</h4>
                                {(() => {
                                    const wh: any = (contactInfo as any).workingHours;
                                    if (typeof wh === 'string') {
                                        return <p>{wh}</p>;
                                    }

                                    if (wh && typeof wh === 'object') {
                                        const labelMap: Record<string, string> = {
                                            weekday: 'Thứ trong tuần',
                                            saturday: 'Thứ 7',
                                            sunday: 'Chủ nhật'
                                        };

                                        return (
                                            <div className="working-hours">
                                                {Object.entries(wh).map(([key, value]) => (
                                                    <p key={key}>
                                                        <strong>{labelMap[key] ?? key}:</strong> {value as any}
                                                    </p>
                                                ))}
                                            </div>
                                        );
                                    }

                                    return <p>---</p>;
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Họ và tên *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nguyễn Văn A"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Số điện thoại *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0901234567"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Nội dung *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Vui lòng mô tả nhu cầu của bạn..."
                                    rows={5}
                                />
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-xl"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang gửi...' : (
                                    <>
                                        <FaPaperPlane /> Gửi liên hệ
                                    </>
                                )}
                            </button>

                            {submitSuccess && (
                                <div className="success-message">
                                    ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="map-section">
                    <h3 className="map-title">Vị trí văn phòng</h3>
                    <a
                        href={contactInfo.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-wrapper"
                        title="Mở Google Maps để chỉ đường"
                    >
                        <iframe
                            src={contactInfo.googleMapsEmbed}
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Bản đồ văn phòng"
                        />
                        <div className="map-overlay">
                            <FaMapMarkerAlt /> Click để mở Google Maps
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
