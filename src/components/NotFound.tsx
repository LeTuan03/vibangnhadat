import React from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/" className="btn btn-primary btn-lg">
                        <FaHome /> Về trang chủ
                    </Link>
                    <Link to="/#contact" className="btn btn-outline btn-lg">
                        <FaSearch /> Liên hệ hỗ trợ
                    </Link>
                </div>

                <div className="not-found-suggestions">
                    <h3>Có thể bạn đang tìm:</h3>
                    <ul>
                        <li><Link to="/#services">Dịch vụ của chúng tôi</Link></li>
                        <li><Link to="/#about">Giới thiệu</Link></li>
                        <li><Link to="/#knowledge">Tin tức & Kiến thức</Link></li>
                        <li><Link to="/#contact">Liên hệ</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
