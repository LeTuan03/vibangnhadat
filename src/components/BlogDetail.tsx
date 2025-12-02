import React from 'react';
import { FaNewspaper, FaCalendar, FaUser, FaTimes } from 'react-icons/fa';
import type { BlogPost } from '../types';
import { formatDate } from '../utils/helpers';
import './BlogDetail.css';

interface BlogDetailProps {
    post: BlogPost;
    onClose: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onClose }) => {
    return (
        <div className="blog-detail-overlay" onClick={onClose}>
            <div className="blog-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="blog-detail-close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="blog-detail-header">
                    <div className="blog-detail-image">
                        <FaNewspaper />
                    </div>
                    <span className="blog-detail-category">{post.category}</span>
                    <h1>{post.title}</h1>
                    <div className="blog-detail-meta">
                        <span>
                            <FaUser /> {post.author}
                        </span>
                        <span>
                            <FaCalendar /> {formatDate(post.date)}
                        </span>
                    </div>
                </div>

                <div className="blog-detail-content">
                    <p className="blog-detail-excerpt">{post.excerpt}</p>

                    <div className="blog-detail-body">
                        <p>{post.content}</p>

                        {/* Nội dung mẫu */}
                        <h2>Giới thiệu</h2>
                        <p>
                            Thừa phát lại đóng vai trò quan trọng trong hệ thống tư pháp Việt Nam,
                            giúp bảo vệ quyền và lợi ích hợp pháp của công dân, tổ chức. Hoạt động
                            của Thừa phát lại được quy định bởi Luật Thừa phát lại năm 2011.
                        </p>

                        <h2>Vai trò chính</h2>
                        <ul>
                            <li>Lập vi bằng các giao dịch dân sự, kinh tế</li>
                            <li>Tống đạt văn bản tư pháp đảm bảo đúng thời hạn</li>
                            <li>Xác minh điều kiện thi hành án dân sự</li>
                            <li>Tổ chức thi hành án theo ủy quyền</li>
                        </ul>

                        <h2>Tầm quan trọng</h2>
                        <p>
                            Thừa phát lại góp phần quan trọng trong việc đảm bảo tính minh bạch,
                            công bằng trong các giao dịch dân sự và quá trình thi hành án. Các
                            văn bản do Thừa phát lại lập có giá trị pháp lý cao, được sử dụng làm
                            chứng cứ trong tố tụng.
                        </p>

                        <h2>Kết luận</h2>
                        <p>
                            Việc hiểu rõ vai trò và chức năng của Thừa phát lại giúp công dân và
                            doanh nghiệp tận dụng tốt các dịch vụ pháp lý, bảo vệ quyền lợi của mình
                            một cách hiệu quả nhất.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
