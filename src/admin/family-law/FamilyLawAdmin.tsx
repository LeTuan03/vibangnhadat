import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { FamilyLawQA } from '../../types';
import { familyLawService } from '../api/familyLawService';
import { mockFamilyLawQAs } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface FormData {
    question: string;
    image: string;
    shortDescription: string;
}

const FamilyLawAdmin: React.FC = () => {
    const [familyLaws, setFamilyLaws] = useState<FamilyLawQA[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        question: '',
        image: '',
        shortDescription: ''
    });

    useEffect(() => {
        familyLawService.initialize(mockFamilyLawQAs);
        loadFamilyLaws();
    }, []);

    const loadFamilyLaws = () => {
        const allLaws = familyLawService.getAllFamilyLaws();
        setFamilyLaws(allLaws);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ question: '', image: '', shortDescription: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (law: FamilyLawQA) => {
        setEditingId(law.id);
        setFormData({
            question: law.question,
            image: law.image,
            shortDescription: law.shortDescription
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.question || !formData.image) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingId) {
            familyLawService.updateFamilyLaw(editingId, formData);
            toast.success('Cập nhật thành công');
        } else {
            familyLawService.createFamilyLaw(formData);
            toast.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
        loadFamilyLaws();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            familyLawService.deleteFamilyLaw(id);
            toast.success('Xóa thành công');
            loadFamilyLaws();
        }
    };

    const filteredLaws = familyLaws.filter(law =>
        law.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Hôn Nhân - Gia Đình</h2>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Câu hỏi</th>
                            <th>Mô tả ngắn</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLaws.map(law => (
                            <tr key={law.id}>
                                <td>{law.question}</td>
                                <td>{law.shortDescription}</td>
                                <td><img src={law.image} alt={law.question} style={{ maxWidth: '50px' }} /></td>
                                <td>
                                    <button
                                        className="btn-icon btn-edit"
                                        onClick={() => handleEdit(law)}
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(law.id)}
                                        title="Xóa"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>{editingId ? 'Sửa Hôn Nhân - Gia Đình' : 'Thêm Hôn Nhân - Gia Đình'}</h3>
                        <div className="form-group">
                            <label>Câu hỏi</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                placeholder="VD: Thủ tục ly hôn"
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô tả ngắn</label>
                            <textarea
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                placeholder="Mô tả ngắn"
                                rows={3}
                            />
                        </div>
                        <div className="form-group">
                            <label>URL Hình ảnh</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="VD: /images/family-qa-1.jpg"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                Hủy
                            </button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilyLawAdmin;
