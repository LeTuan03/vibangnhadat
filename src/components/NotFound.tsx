import React from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import './NotFound.css';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-number">404</div>
                <h1>Không tìm thấy trang</h1>
                <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>

                <div className="not-found-actions">
                    <a href="/" className="btn btn-primary btn-lg">
                        <FaHome /> Về trang chủ
                    </a>
                    <a href="/#contact" className="btn btn-outline btn-lg">
                        <FaSearch /> Liên hệ hỗ trợ
                    </a>
                </div>

                <div className="not-found-suggestions">
                    <h3>Có thể bạn đang tìm:</h3>
                    <ul>
                        <li><a href="/#services">Dịch vụ của chúng tôi</a></li>
                        <li><a href="/#about">Giới thiệu</a></li>
                        <li><a href="/#knowledge">Tin tức & Kiến thức</a></li>
                        <li><a href="/#contact">Liên hệ</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
