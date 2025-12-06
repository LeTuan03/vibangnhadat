import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Statistic } from '../../types';
import { statisticsService } from '../api/statisticsService';
import { mockStatistics } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface FormData {
    label: string;
    value: number;
    suffix: string;
    icon: string;
}

const StatisticsAdmin: React.FC = () => {
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        label: '',
        value: 0,
        suffix: '',
        icon: 'FaAward'
    });

    useEffect(() => {
        statisticsService.initialize(mockStatistics);
        loadStatistics();
    }, []);

    const loadStatistics = () => {
        const allStats = statisticsService.getAllStatistics();
        setStatistics(allStats);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ label: '', value: 0, suffix: '', icon: 'FaAward' });
        setIsModalOpen(true);
    };

    const handleEdit = (stat: Statistic) => {
        setEditingId(stat.id);
        setFormData({
            label: stat.label,
            value: stat.value,
            suffix: stat.suffix,
            icon: stat.icon
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.label || formData.value < 0) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingId) {
            statisticsService.updateStatistic(editingId, formData);
            toast.success('Cập nhật thành công');
        } else {
            statisticsService.createStatistic(formData);
            toast.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
        loadStatistics();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            statisticsService.deleteStatistic(id);
            toast.success('Xóa thành công');
            loadStatistics();
        }
    };

    const filteredStats = statistics.filter(stat =>
        stat.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Thống Kê</h2>
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
                            <th>Giá trị</th>
                            <th>Hậu tố</th>
                            <th>Biểu tượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStats.map(stat => (
                            <tr key={stat.id}>
                                <td>{stat.label}</td>
                                <td>{stat.value}</td>
                                <td>{stat.suffix}</td>
                                <td>{stat.icon}</td>
                                <td>
                                    <button
                                        className="btn-icon btn-edit"
                                        onClick={() => handleEdit(stat)}
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(stat.id)}
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
                        <h3>{editingId ? 'Sửa Thống Kê' : 'Thêm Thống Kê'}</h3>
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                placeholder="VD: Năm kinh nghiệm"
                            />
                        </div>
                        <div className="form-group">
                            <label>Giá trị</label>
                            <input
                                type="number"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                                placeholder="VD: 20"
                            />
                        </div>
                        <div className="form-group">
                            <label>Hậu tố</label>
                            <input
                                type="text"
                                value={formData.suffix}
                                onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                                placeholder="VD: +"
                            />
                        </div>
                        <div className="form-group">
                            <label>Biểu tượng</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            >
                                <option value="FaAward">FaAward</option>
                                <option value="FaUsers">FaUsers</option>
                                <option value="FaFileContract">FaFileContract</option>
                                <option value="FaCheckCircle">FaCheckCircle</option>
                            </select>
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

export default StatisticsAdmin;
