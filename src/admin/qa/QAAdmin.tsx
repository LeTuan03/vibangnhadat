import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { FAQ } from '../../types';
import { qaService } from '../api/qaService';
import { mockFAQs } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

const QAAdmin: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: ''
    });

    useEffect(() => {
        qaService.initializeFAQs(mockFAQs);
        loadFAQs();
    }, []);

    const loadFAQs = () => {
        const allFaqs = qaService.getAllFAQs();
        setFaqs(allFaqs);
    };

    const handleAddNew = () => {
        setEditingFaq(null);
        setFormData({
            question: '',
            answer: '',
            category: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (faq: FAQ) => {
        setEditingFaq(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            category: faq.category
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.question || !formData.answer || !formData.category) {
            toast.error('Vui lòng điền tất cả các trường bắt buộc');
            return;
        }

        if (editingFaq) {
            const updated = qaService.updateFAQ(editingFaq.id, {
                ...editingFaq,
                ...formData
            });
            if (updated) {
                setFaqs(faqs.map(f => f.id === editingFaq.id ? updated : f));
                toast.success('Cập nhật câu hỏi thành công!');
            }
        } else {
            const newFaq = qaService.createFAQ(formData);
            setFaqs([newFaq, ...faqs]);
            toast.success('Thêm câu hỏi mới thành công!');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
            const success = qaService.deleteFAQ(id);
            if (success) {
                setFaqs(faqs.filter(f => f.id !== id));
                toast.success('Xóa câu hỏi thành công!');
            }
        }
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản lý Hỏi & Đáp</h2>
                <button className="btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="admin-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Câu hỏi</th>
                            <th>Danh mục</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map(faq => (
                                <tr key={faq.id}>
                                    <td>{faq.question}</td>
                                    <td>{faq.category}</td>
                                    <td className="action-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(faq)}>
                                            <FaEdit /> Sửa
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(faq.id)}>
                                            <FaTrash /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingFaq ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
                        
                        <div className="form-group">
                            <label>Câu hỏi *</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({...formData, question: e.target.value})}
                                placeholder="Nhập câu hỏi"
                            />
                        </div>

                        <div className="form-group">
                            <label>Trả lời *</label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                                placeholder="Nhập câu trả lời"
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label>Danh mục *</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                placeholder="Nhập danh mục"
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
                            <button className="btn-save" onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QAAdmin;
