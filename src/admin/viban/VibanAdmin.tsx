import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { vibanService } from '../api/vibanService';
import { mockVibans } from '../../data/mockData';
import { toast } from 'react-toastify';
import '../documents/Admin.css';
import { VibanFormModal } from './VibanFormModal';

interface Viban {
    id?: string;
    title: string;
    description: string;
    requirements: string[];
    process: string[];
    fees: string;
}
const VibanAdmin: React.FC = () => {
    const [vibans, setVibans] = useState<Viban[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingViban, setEditingViban] = useState<Viban | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: [],
        process: [],
        fees: ''
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
            title: '',
            description: '',
            requirements: [],
            process: [],
            fees: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (viban: Viban) => {
        setEditingViban(viban);
        setFormData({
            title: viban.title,
            description: viban.description,
            requirements: [...viban.requirements],
            process: [...viban.process],
            fees: viban.fees
        } as typeof formData);
        setIsModalOpen(true);
    };

const handleDelete = (id?: string) => {
        if (!id) return;
        if (window.confirm('Bạn có chắc muốn xóa vi bằng này?')) {
            const success = vibanService.deleteViban(id);
            if (success) {
                setVibans(vibans.filter(v => v.id !== id));
                toast.success('Xóa vi bằng thành công!');
            }
        }
    };

    const filteredVibans = vibans.filter(viban =>
        viban.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viban.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <th>Mô tả</th>
                            <th>Phí dịch vụ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVibans.length > 0 ? (
                            filteredVibans.map(viban => (
                                <tr key={viban.id}>
                                    <td>{viban.title}</td>
                                    <td>{viban.description}</td>
                                    <td>{viban.fees}</td>
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
                                <td colSpan={4} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <VibanFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(payload: any) => {
                    // payload may be either with id (edit) or without id (create)
                    if ((payload as any).id) {
                        const id = (payload as any).id as string;
                        const updated = vibanService.updateViban(id, {
                            ...payload,
                            id
                        } as any);
                        if (updated) {
                            setVibans(vibans.map(v => v.id === id ? updated : v));
                            toast.success('Cập nhật vi bằng thành công!');
                        }
                    } else {
                        const newViban = vibanService.createViban(payload as any);
                        setVibans([newViban, ...vibans]);
                        toast.success('Thêm vi bằng mới thành công!');
                    }
                    setIsModalOpen(false);
                }}
                editViban={editingViban}
            />
        </div>
    );
};

export default VibanAdmin;