import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { isValidEmail } from '../utils/helpers';
import './Newsletter.css';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setStatus('error');
            setMessage('Email không hợp lệ!');
            return;
        }

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setMessage('Đăng ký thành công! Cảm ơn bạn đã quan tâm.');
            setEmail('');

            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        }, 1500);
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-text">
                        <h3>Đăng ký nhận tin tức</h3>
                        <p>Cập nhật thông tin pháp luật và dịch vụ mới nhất từ chúng tôi</p>
                    </div>

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="newsletter-input-wrapper">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-secondary"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    'Đang gửi...'
                                ) : (
                                    <>
                                        <FaPaperPlane /> Đăng ký
                                    </>
                                )}
                            </button>
                        </div>

                        {message && (
                            <div className={`newsletter-message ${status}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
