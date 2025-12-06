// src/pages/admin/ServicesAdmin.tsx

import { services } from "@/data/content";
import { Service } from "@/types";
import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import serviceService from "../api/serviceAdmin";
import { ServiceFormModal } from "./ServiceFormModal";


function ServicesAdmin() {
    const [servicesList, setServicesList] = useState<Service[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Khởi tạo dữ liệu khi component mount
    useEffect(() => {
        serviceService.initializeServices(services);
        loadServices();
    }, []);

    // Load danh sách dịch vụ
    const loadServices = () => {
        const allServices = serviceService.getAllServices();
        setServicesList(allServices);
    };

    // Xử lý thêm mới
    const handleAddNew = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    // Xử lý chỉnh sửa
    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    // Xử lý lưu (thêm mới hoặc cập nhật)
    const handleSave = (serviceData: Omit<Service, 'id'> | Service) => {
        if ('id' in serviceData) {
            // Cập nhật
            const updated = serviceService.updateService(serviceData.id, serviceData);
            if (updated) {
                setServicesList(servicesList.map(s => s.id === serviceData.id ? updated : s));
                toast.success('Cập nhật dịch vụ thành công!');
            }
        } else {
            // Thêm mới
            const newService = serviceService.createService(serviceData);
            setServicesList([newService, ...servicesList]);
            toast.success('Thêm dịch vụ mới thành công!');
        }
        setIsModalOpen(false);
        setEditingService(null);
    };

    // Xử lý xóa
    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
            const success = serviceService.deleteService(id);
            if (success) {
                setServicesList(servicesList.filter(service => service.id !== id));
                toast.success('Xóa dịch vụ thành công!');
            }
        }
    };

    // Lọc dịch vụ theo từ khóa tìm kiếm
    const filteredServices = servicesList.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="admin-header">
                <h1>Quản lý Dịch vụ</h1>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm dịch vụ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                    style={{ maxWidth: '400px' }}
                />
            </div>

            <div className="admin-content">
                <div className="admin-cards">
                    {filteredServices.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            gridColumn: '1 / -1',
                            color: '#6b7280'
                        }}>
                            {searchTerm ? 'Không tìm thấy dịch vụ phù hợp' : 'Chưa có dịch vụ nào'}
                        </div>
                    ) : (
                        filteredServices.map((service) => {
                            return (
                                <div key={service.id} className="admin-card">
                                    <div className="card-header">
                                        <h3>{service.title}</h3>
                                    </div>
                                    <p className="card-description">{service.description}</p>

                                    {service.details && service.details.length > 0 && (
                                        <div className="card-details">
                                            <strong>Chi tiết:</strong>
                                            <ul>
                                                {service.details.slice(0, 3).map((detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                ))}
                                                {service.details.length > 3 && (
                                                    <li style={{ color: '#6b7280', fontStyle: 'italic' }}>
                                                        +{service.details.length - 3} mục khác...
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="admin-card-actions">
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => handleEdit(service)}
                                        >
                                            <FaEdit /> Chỉnh sửa
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(service.id)}
                                        >
                                            <FaTrash /> Xóa
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Statistics */}
                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ color: '#6b7280' }}>
                        Tổng số dịch vụ: <strong>{servicesList.length}</strong>
                        {searchTerm && ` | Kết quả tìm kiếm: ${filteredServices.length}`}
                    </div>
                </div>
            </div>

            {/* Modal thêm/sửa */}
            <ServiceFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                }}
                onSave={handleSave}
                editService={editingService}
            />
        </div>
    );
}

export default ServicesAdmin;