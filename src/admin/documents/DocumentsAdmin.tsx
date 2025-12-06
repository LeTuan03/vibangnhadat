import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { LegalDocument } from '../../types';
import { documentService } from '../api/documentService';
import { mockLegalDocuments } from '../../data/mockData';
import { toast } from 'react-toastify';
import './Admin.css';

const DocumentsAdmin: React.FC = () => {
    const [documents, setDocuments] = useState<LegalDocument[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<LegalDocument | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        publishDate: '',
        fileUrl: ''
    });

    useEffect(() => {
        documentService.initializeDocuments(mockLegalDocuments);
        loadDocuments();
    }, []);

    const loadDocuments = () => {
        const allDocs = documentService.getAllDocuments();
        setDocuments(allDocs);
    };

    const handleAddNew = () => {
        setEditingDoc(null);
        setFormData({
            title: '',
            description: '',
            category: '',
            publishDate: '',
            fileUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (doc: LegalDocument) => {
        setEditingDoc(doc);
        setFormData({
            title: doc.title,
            description: doc.description,
            category: doc.category,
            publishDate: doc.publishDate,
            fileUrl: doc.fileUrl || ''
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.category) {
            toast.error('Vui lòng điền tất cả các trường bắt buộc');
            return;
        }

        if (editingDoc) {
            const updated = documentService.updateDocument(editingDoc.id, {
                ...editingDoc,
                ...formData
            });
            if (updated) {
                setDocuments(documents.map(d => d.id === editingDoc.id ? updated : d));
                toast.success('Cập nhật tài liệu thành công!');
            }
        } else {
            const newDoc = documentService.createDocument(formData);
            setDocuments([newDoc, ...documents]);
            toast.success('Thêm tài liệu mới thành công!');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa tài liệu này?')) {
            const success = documentService.deleteDocument(id);
            if (success) {
                setDocuments(documents.filter(d => d.id !== id));
                toast.success('Xóa tài liệu thành công!');
            }
        }
    };

    const filteredDocs = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản lý Tài liệu Pháp luật</h2>
                <button className="btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="admin-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Danh mục</th>
                            <th>Ngày phát hành</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map(doc => (
                                <tr key={doc.id}>
                                    <td>{doc.title}</td>
                                    <td>{doc.category}</td>
                                    <td>{new Date(doc.publishDate).toLocaleDateString('vi-VN')}</td>
                                    <td className="action-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(doc)}>
                                            <FaEdit /> Sửa
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(doc.id)}>
                                            <FaTrash /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingDoc ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</h3>
                        
                        <div className="form-group">
                            <label>Tiêu đề *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="Nhập tiêu đề"
                            />
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Nhập mô tả"
                                rows={3}
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

                        <div className="form-group">
                            <label>Ngày phát hành</label>
                            <input
                                type="date"
                                value={formData.publishDate}
                                onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Link file</label>
                            <input
                                type="text"
                                value={formData.fileUrl}
                                onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                                placeholder="Nhập đường dẫn file"
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

export default DocumentsAdmin;
