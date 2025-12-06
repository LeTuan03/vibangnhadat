import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { GalleryItem } from '../../types';
import { galleryService } from '../api/galleryService';
import { mockGalleryItems } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface FormData {
    title: string;
    type: 'image' | 'video';
    thumbnail: string;
    videoId?: string;
    description: string;
}

const GalleryAdmin: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        title: '',
        type: 'image',
        thumbnail: '',
        videoId: '',
        description: ''
    });

    useEffect(() => {
        galleryService.initialize(mockGalleryItems);
        loadGallery();
    }, []);

    const loadGallery = () => {
        const allItems = galleryService.getAllGalleryItems();
        setItems(allItems);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ title: '', type: 'image', thumbnail: '', videoId: '', description: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingId(item.id);
        setFormData({
            title: item.title,
            type: item.type,
            thumbnail: item.thumbnail,
            videoId: item.videoId || '',
            description: item.description
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.thumbnail) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingId) {
            galleryService.updateGalleryItem(editingId, formData);
            toast.success('Cập nhật thành công');
        } else {
            galleryService.createGalleryItem(formData);
            toast.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
        loadGallery();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            galleryService.deleteGalleryItem(id);
            toast.success('Xóa thành công');
            loadGallery();
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Thư Viện Hình Ảnh & Video</h2>
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
                            <th>Loại</th>
                            <th>Mô tả</th>
                            <th>Thumbnail</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td><span className="badge">{item.type === 'image' ? '📷 Hình' : '🎥 Video'}</span></td>
                                <td>{item.description}</td>
                                <td><img src={item.thumbnail} alt={item.title} style={{ maxWidth: '50px' }} /></td>
                                <td>
                                    <button
                                        className="btn-icon btn-edit"
                                        onClick={() => handleEdit(item)}
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(item.id)}
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
                        <h3>{editingId ? 'Sửa Hình Ảnh/Video' : 'Thêm Hình Ảnh/Video'}</h3>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Tiêu đề"
                            />
                        </div>
                        <div className="form-group">
                            <label>Loại</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })}
                            >
                                <option value="image">Hình ảnh</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>URL Thumbnail</label>
                            <input
                                type="text"
                                value={formData.thumbnail}
                                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                placeholder="VD: /images/gallery-1.jpg"
                            />
                        </div>
                        {formData.type === 'video' && (
                            <div className="form-group">
                                <label>ID Video (YouTube)</label>
                                <input
                                    type="text"
                                    value={formData.videoId || ''}
                                    onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                                    placeholder="VD: dQw4w9WgXcQ"
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Mô tả</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Mô tả"
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

export default GalleryAdmin;
