import { useEffect, useState } from "react";
import { VibangType } from "./VibanAdmin";
import { FaTimes, FaTrash } from "react-icons/fa";

interface VibanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (viban: Omit<VibangType, 'id'> | VibangType) => void;
    editViban?: VibangType | null;
}

export const VibanFormModal: React.FC<VibanFormModalProps> = ({ isOpen, onClose, onSave, editViban }) => {
    const [formData, setFormData] = useState<Omit<VibangType, 'id'>>({
        title: '',
        // icon: '',
        description: '',
        requirements: [],
        process: [],
        fees: '',
    });

    const [requirementInput, setRequirementInput] = useState('');
    const [processInput, setProcessInput] = useState('');

    useEffect(() => {
        if (editViban) {
            setFormData({
                title: editViban.title,
                // icon: editViban.icon,
                description: editViban.description,
                requirements: editViban.requirements || [],
                process: editViban.process || [],
                fees: editViban.fees,
            });
        } else {
            setFormData({
                title: '',
                // icon: '',
                description: '',
                requirements: [],
                process: [],
                fees: '',
            });
        }
    }, [editViban, isOpen]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!formData.title ||
            //  !formData.icon ||
            !formData.description || !formData.fees) {
            return;
        }

        if (editViban) {
            onSave({ ...formData, id: editViban.id });
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

    const addRequirement = () => {
        if (requirementInput.trim()) {
            setFormData({
                ...formData,
                requirements: [...formData.requirements, requirementInput.trim()],
            });
            setRequirementInput('');
        }
    };

    const removeRequirement = (index: number) => {
        setFormData({
            ...formData,
            requirements: formData.requirements.filter((_, i) => i !== index),
        });
    };

    const addProcess = () => {
        if (processInput.trim()) {
            setFormData({
                ...formData,
                process: [...formData.process, processInput.trim()],
            });
            setProcessInput('');
        }
    };

    const removeProcess = (index: number) => {
        setFormData({
            ...formData,
            process: formData.process.filter((_, i) => i !== index),
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editViban ? 'Chỉnh sửa vi bằng' : 'Thêm vi bằng mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div style={{ padding: '20px', maxHeight: 'calc(90vh - 160px)', overflowY: 'auto' }}>
                    <div className="form-group">
                        <label htmlFor="title">Tên vi bằng *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Ví dụ: Vi bằng dân sự"
                        />
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="icon">Icon (React Icons) *</label>
                        <input
                            type="text"
                            id="icon"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Ví dụ: FaFileContract, FaHome, FaUsers"
                        />
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="description">Mô tả *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="form-control"
                            placeholder="Mô tả chi tiết về loại vi bằng"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fees">Phí dịch vụ *</label>
                        <input
                            type="text"
                            id="fees"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Ví dụ: 500.000đ - 1.000.000đ"
                        />
                    </div>

                    {/* Requirements */}
                    <div className="form-group">
                        <label>Yêu cầu hồ sơ</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <input
                                type="text"
                                value={requirementInput}
                                onChange={(e) => setRequirementInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                                className="form-control"
                                placeholder="Nhập yêu cầu và nhấn Enter"
                            />
                            <button
                                type="button"
                                onClick={addRequirement}
                                className="btn btn-secondary"
                            >
                                Thêm
                            </button>
                        </div>

                        {formData.requirements.length > 0 && (
                            <div className="list-container">
                                {formData.requirements.map((req, index) => (
                                    <div key={index} className="list-item">
                                        <span>{index + 1}. {req}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="btn-icon btn-delete"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Process */}
                    <div className="form-group">
                        <label>Quy trình thực hiện</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <input
                                type="text"
                                value={processInput}
                                onChange={(e) => setProcessInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProcess())}
                                className="form-control"
                                placeholder="Nhập bước thực hiện và nhấn Enter"
                            />
                            <button
                                type="button"
                                onClick={addProcess}
                                className="btn btn-secondary"
                            >
                                Thêm
                            </button>
                        </div>

                        {formData.process.length > 0 && (
                            <div className="list-container">
                                {formData.process.map((step, index) => (
                                    <div key={index} className="list-item">
                                        <span>Bước {index + 1}: {step}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeProcess(index)}
                                            className="btn-icon btn-delete"
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
                        {editViban ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};
