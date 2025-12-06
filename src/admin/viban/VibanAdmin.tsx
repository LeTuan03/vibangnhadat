import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { vibanService } from '../api/vibanService';
import { mockVibans } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface Viban {
    id: string;
    name: string;
    description: string;
    category: string;
    status: string;
    createdDate: string;
}

const VibanAdmin: React.FC = () => {
    const [vibans, setVibans] = useState<Viban[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingViban, setEditingViban] = useState<Viban | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        vibanService.initializeVibans(mockVibans);
        loadVibans();
    }, []);

    const loadVibans = () => {
        const allVibans = vibanService.getAllVibans();
        setVibans(allVibans);
    };

    const handleAddNew = () => {
        setEditingViban(null);
        setFormData({
            name: '',
            description: '',
            category: '',
            status: 'active',
            createdDate: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleEdit = (viban: Viban) => {
        setEditingViban(viban);
        setFormData({
            name: viban.name,
            description: viban.description,
            category: viban.category,
            status: viban.status,
            createdDate: viban.createdDate
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.name || !formData.category) {
            toast.error('Vui lòng điền tất cả các trường bắt buộc');
            return;
        }

        if (editingViban) {
            const updated = vibanService.updateViban(editingViban.id, {
                ...editingViban,
                ...formData
            });
            if (updated) {
                setVibans(vibans.map(v => v.id === editingViban.id ? updated : v));
                toast.success('Cập nhật vi bằng thành công!');
            }
        } else {
            const newViban = vibanService.createViban(formData);
            setVibans([newViban, ...vibans]);
            toast.success('Thêm vi bằng mới thành công!');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa vi bằng này?')) {
            const success = vibanService.deleteViban(id);
            if (success) {
                setVibans(vibans.filter(v => v.id !== id));
                toast.success('Xóa vi bằng thành công!');
            }
        }
    };

    const filteredVibans = vibans.filter(viban =>
        viban.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viban.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản lý Vi bằng</h2>
                <button className="btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="admin-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm vi bằng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tên vi bằng</th>
                            <th>Danh mục</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVibans.length > 0 ? (
                            filteredVibans.map(viban => (
                                <tr key={viban.id}>
                                    <td>{viban.name}</td>
                                    <td>{viban.category}</td>
                                    <td>
                                        <span className={`status-badge ${viban.status}`}>
                                            {viban.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                                        </span>
                                    </td>
                                    <td>{new Date(viban.createdDate).toLocaleDateString('vi-VN')}</td>
                                    <td className="action-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(viban)}>
                                            <FaEdit /> Sửa
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(viban.id)}>
                                            <FaTrash /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingViban ? 'Chỉnh sửa vi bằng' : 'Thêm vi bằng mới'}</h3>
                        
                        <div className="form-group">
                            <label>Tên vi bằng *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Nhập tên vi bằng"
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
                            <label>Trạng thái</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Vô hiệu hóa</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Ngày tạo</label>
                            <input
                                type="date"
                                value={formData.createdDate}
                                onChange={(e) => setFormData({...formData, createdDate: e.target.value})}
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

export default VibanAdmin;