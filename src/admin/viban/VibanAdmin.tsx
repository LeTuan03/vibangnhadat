// src/pages/admin/VibanAdmin.tsx

import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import vibanService from "../services/vibanService";
import { VibanFormModal } from "./VibanFormModal";
import { vibangTypes } from "@/components/VibanServices";
import { R } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { toast } from "react-toastify";

// ============================================
// VIBAN TYPE INTERFACE
// ============================================
export interface VibangType {
    id: string;
    title: string;
    // icon?: React.ReactNode;
    description: string;
    requirements: string[];
    process: string[];
    fees: string;
}

function VibanAdmin() {
    const [vibanList, setVibanList] = useState<VibangType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingViban, setEditingViban] = useState<VibangType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        vibanService.initializeViban(vibangTypes);
        loadViban();
    }, []);

    const loadViban = () => {
        const allViban = vibanService.getAllViban();
        setVibanList(allViban);
    };

    const handleAddNew = () => {
        setEditingViban(null);
        setIsModalOpen(true);
    };

    const handleEdit = (viban: VibangType) => {
        setEditingViban(viban);
        setIsModalOpen(true);
    };

    const handleSave = (vibanData: Omit<VibangType, 'id'> | VibangType) => {
        if ('id' in vibanData) {
            const updated = vibanService.updateViban(vibanData.id, vibanData);
            if (updated) {
                setVibanList(vibanList.map(v => v.id === vibanData.id ? updated : v));
                toast.success('Cập nhật vi bằng thành công!');
            }
        } else {
            const newViban = vibanService.createViban(vibanData);
            setVibanList([newViban, ...vibanList]);
            toast.success('Thêm vi bằng mới thành công!');
        }
        setIsModalOpen(false);
        setEditingViban(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa vi bằng này?')) {
            const success = vibanService.deleteViban(id);
            if (success) {
                setVibanList(vibanList.filter(viban => viban.id !== id));
                toast.success('Xóa vi bằng thành công!');
            } else {
                toast.error('Xóa vi bằng thất bại!');
            }
        }
    };

    const filteredViban = vibanList.filter(viban =>
        viban.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viban.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>

            <div className="admin-header">
                <h1>Quản lý Vi bằng</h1>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm vi bằng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                    style={{ maxWidth: '400px' }}
                />
            </div>

            <div className="admin-content">
                <div className="viban-grid">
                    {filteredViban.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            gridColumn: '1 / -1',
                            color: '#6b7280'
                        }}>
                            {searchTerm ? 'Không tìm thấy vi bằng phù hợp' : 'Chưa có vi bằng nào'}
                        </div>
                    ) : (
                        filteredViban.map((viban) => (
                            <div key={viban.id} className="viban-card">
                                <div className="viban-header">
                                    <div>
                                        <h3>{viban.title}</h3>
                                        {/* <span className="icon-badge">{viban.icon}</span> */}
                                    </div>
                                </div>
                                <div className="viban-fees">
                                    <strong>Phí:</strong> {viban.fees}
                                </div>

                                <div className="viban-actions">
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => handleEdit(viban)}
                                    >
                                        <FaEdit /> Chỉnh sửa
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(viban.id)}
                                    >
                                        <FaTrash /> Xóa
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px'
                }}>
                    <div style={{ color: '#6b7280' }}>
                        Tổng số vi bằng: <strong>{vibanList.length}</strong>
                        {searchTerm && ` | Kết quả tìm kiếm: ${filteredViban.length}`}
                    </div>
                </div>
            </div>

            <VibanFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingViban(null);
                }}
                onSave={handleSave}
                editViban={editingViban}
            />
        </div>
    );
}

export default VibanAdmin;