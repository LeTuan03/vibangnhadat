import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { ServiceArea } from '../../types';
import { serviceAreaService } from '../api/serviceAreaService';
import { mockServiceAreas } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface FormData {
    title: string;
    image: string;
    description: string;
}

const ServiceAreasAdmin: React.FC = () => {
    const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        title: '',
        image: '',
        description: ''
    });

    useEffect(() => {
        serviceAreaService.initialize(mockServiceAreas);
        loadServiceAreas();
    }, []);

    const loadServiceAreas = () => {
        const allAreas = serviceAreaService.getAllServiceAreas();
        setServiceAreas(allAreas);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ title: '', image: '', description: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (area: ServiceArea) => {
        setEditingId(area.id);
        setFormData({
            title: area.title,
            image: area.image,
            description: area.description
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.image) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingId) {
            serviceAreaService.updateServiceArea(editingId, formData);
            toast.success('Cập nhật thành công');
        } else {
            serviceAreaService.createServiceArea(formData);
            toast.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
        loadServiceAreas();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            serviceAreaService.deleteServiceArea(id);
            toast.success('Xóa thành công');
            loadServiceAreas();
        }
    };

    const filteredAreas = serviceAreas.filter(area =>
        area.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Lĩnh Vực Dịch Vụ</h2>
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
                            <th>Tiêu đề</th>
                            <th>Mô tả</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAreas.map(area => (
                            <tr key={area.id}>
                                <td>{area.title}</td>
                                <td>{area.description}</td>
                                <td><img src={area.image} alt={area.title} style={{ maxWidth: '50px' }} /></td>
                                <td>
                                    <button
                                        className="btn-icon btn-edit"
                                        onClick={() => handleEdit(area)}
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(area.id)}
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
                        <h3>{editingId ? 'Sửa Lĩnh Vực Dịch Vụ' : 'Thêm Lĩnh Vực Dịch Vụ'}</h3>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="VD: Tư vấn luật đất đai"
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Mô tả ngắn"
                            />
                        </div>
                        <div className="form-group">
                            <label>URL Hình ảnh</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="VD: /images/service-land-law.jpg"
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

export default ServiceAreasAdmin;
