import { BlogPost } from "@/types";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Omit<BlogPost, 'id'> | BlogPost) => void;
    editPost?: BlogPost | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, onSave, editPost }) => {
    const [formData, setFormData] = useState<any>({
        title: '',
    });

    useEffect(() => {
        if (editPost) {
            setFormData({
                title: editPost.title,
            });
        } else {
            setFormData({
                title: '',

            });
        }
    }, [editPost, isOpen]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title) {
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
                    <h2>{editPost ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes color="#fff" />
                    </button>
                </div>

                <div style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label htmlFor="title">Tên danh mục *</label>
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