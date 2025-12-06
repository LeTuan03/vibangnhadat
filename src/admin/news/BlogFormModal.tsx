import { BlogPost } from "@/types";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface BlogFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Omit<BlogPost, 'id'> | BlogPost) => void;
    editPost?: BlogPost | null;
}

export const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, onSave, editPost }) => {
    const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
    });

    useEffect(() => {
        if (editPost) {
            setFormData({
                title: editPost.title,
                excerpt: editPost.excerpt,
                content: editPost.content,
                author: editPost.author,
                date: editPost.date,
                category: editPost.category,
            });
        } else {
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                author: '',
                date: new Date().toISOString().split('T')[0],
                category: '',
            });
        }
    }, [editPost, isOpen]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.excerpt || !formData.content ||
            !formData.author || !formData.date || !formData.category) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (editPost) {
            onSave({ ...formData, id: editPost.id });
        } else {
            onSave(formData);
        }
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes color="#fff" />
                    </button>
                </div>

                <div style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label htmlFor="title">Tiêu đề *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Nhập tiêu đề bài viết"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="excerpt">Mô tả ngắn *</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="form-control"
                            placeholder="Nhập mô tả ngắn về bài viết"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Nội dung *</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={10}
                            className="form-control"
                            placeholder="Nhập nội dung chi tiết"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="author">Tác giả *</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="form-control"
                                placeholder="Tên tác giả"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Ngày đăng *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Danh mục *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            <option value="">Chọn danh mục</option>
                            <option value="Tin tức">Tin tức</option>
                            <option value="Thông báo">Thông báo</option>
                            <option value="Hướng dẫn">Hướng dẫn</option>
                            <option value="Pháp luật">Pháp luật</option>
                        </select>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        {editPost ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};