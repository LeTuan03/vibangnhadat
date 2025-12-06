
// ============================================
// SERVICE FORM MODAL COMPONENT

import { Service } from "@/types";
import { useEffect, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

// ============================================
interface ServiceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Omit<Service, 'id'> | Service) => void;
    editService?: Service | null;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ isOpen, onClose, onSave, editService }) => {
    const [formData, setFormData] = useState<any>({
        title: '',
        description: '',
        icon: '',
        details: [],
    });

    const [detailInput, setDetailInput] = useState('');

    useEffect(() => {
        if (editService) {
            setFormData({
                title: editService.title,
                description: editService.description,
                icon: editService.icon,
                details: editService.details || [],
            });
        } else {
            setFormData({
                title: '',
                description: '',
                icon: '',
                details: [],
            });
        }
    }, [editService, isOpen]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.description || !formData.icon) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (editService) {
            onSave({ ...formData, id: editService.id });
        } else {
            onSave(formData);
        }
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addDetail = () => {
        if (detailInput.trim()) {
            setFormData({
                ...formData,
                details: [...formData.details, detailInput.trim()],
            });
            setDetailInput('');
        }
    };

    const removeDetail = (index: number) => {
        setFormData({
            ...formData,
            details: formData.details.filter((_: any, i: number) => i !== index),
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDetail();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label htmlFor="title">Tên dịch vụ *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Ví dụ: Công chứng hợp đồng"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Mô tả *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="form-control"
                            placeholder="Mô tả chi tiết về dịch vụ"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="icon">Icon (React Icons) *</label>
                        <input
                            type="text"
                            id="icon"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Ví dụ: FaFileContract, FaUsers, FaHome"
                        />
                        <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                            Tên icon từ thư viện react-icons/fa
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Chi tiết dịch vụ</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <input
                                type="text"
                                value={detailInput}
                                onChange={(e) => setDetailInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="form-control"
                                placeholder="Nhập chi tiết và nhấn Enter"
                            />
                            <button
                                type="button"
                                onClick={addDetail}
                                className="btn btn-secondary"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                Thêm
                            </button>
                        </div>

                        {formData.details.length > 0 && (
                            <div style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                padding: '12px',
                                backgroundColor: '#f9fafb'
                            }}>
                                {formData.details.map((detail: any, index: number) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '8px',
                                            marginBottom: '4px',
                                            backgroundColor: 'white',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <span>• {detail}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeDetail(index)}
                                            className="btn-icon btn-delete"
                                            style={{ padding: '4px 8px' }}
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        {editService ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};