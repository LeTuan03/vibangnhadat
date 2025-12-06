import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { TeamMember } from '../../types';
import { mockTeamMembers } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';

interface FormData {
    name: string;
    position: string;
    bio: string;
    email?: string;
    phone?: string;
}

const TeamAdmin: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        position: '',
        bio: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        loadTeamMembers();
    }, []);

    const loadTeamMembers = () => {
        // Use vibanService to load team members (since there's no separate team service)
        setMembers(mockTeamMembers);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ name: '', position: '', bio: '', email: '', phone: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (member: TeamMember) => {
        setEditingId(member.id);
        setFormData({
            name: member.name,
            position: member.position,
            bio: member.bio,
            email: member.email || '',
            phone: member.phone || ''
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.name || !formData.position) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingId) {
            const newMembers = members.map(m => 
                m.id === editingId 
                    ? { ...m, ...formData }
                    : m
            );
            setMembers(newMembers);
            localStorage.setItem('team_members', JSON.stringify(newMembers));
            toast.success('Cập nhật thành công');
        } else {
            const newMember: TeamMember = {
                id: `team-${Date.now()}`,
                ...formData
            };
            const newMembers = [...members, newMember];
            setMembers(newMembers);
            localStorage.setItem('team_members', JSON.stringify(newMembers));
            toast.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
            const newMembers = members.filter(m => m.id !== id);
            setMembers(newMembers);
            localStorage.setItem('team_members', JSON.stringify(newMembers));
            toast.success('Xóa thành công');
        }
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Đội Ngũ</h2>
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
                            <th>Tên</th>
                            <th>Chức vụ</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.position}</td>
                                <td>{member.email || '-'}</td>
                                <td>{member.phone || '-'}</td>
                                <td>
                                    <button
                                        className="btn-icon btn-edit"
                                        onClick={() => handleEdit(member)}
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(member.id)}
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
                        <h3>{editingId ? 'Sửa Thành Viên Đội Ngũ' : 'Thêm Thành Viên Đội Ngũ'}</h3>
                        <div className="form-group">
                            <label>Tên</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Họ và tên"
                            />
                        </div>
                        <div className="form-group">
                            <label>Chức vụ</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                placeholder="VD: Luật sư"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Điện thoại</label>
                            <input
                                type="text"
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tiểu sử</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Tiểu sử ngắn"
                                rows={3}
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

export default TeamAdmin;
