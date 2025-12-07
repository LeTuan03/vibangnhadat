// src/pages/admin/ServicesAdmin.tsx

import { useState, useEffect } from 'react'
import { Table, Button, Input, Card, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Service } from '../../types'
import serviceService from '../api/serviceService'
import { ServiceFormModal } from './ServiceFormModal'

const { Search } = Input

function ServicesAdmin() {
    const [servicesList, setServicesList] = useState<Service[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = async () => {
        try {
            const allServices = await serviceService.getAllServices()
            setServicesList(allServices)
        } catch (error) {
            console.error('Lỗi tải dịch vụ:', error)
            message.error('Không thể tải dịch vụ')
        }
    }

    const handleAddNew = () => {
        setEditingService(null)
        setIsModalOpen(true)
    }

    const handleEdit = (service: Service) => {
        setEditingService(service)
        setIsModalOpen(true)
    }

    const handleSave = async (serviceData: Omit<Service, 'id'> | Service) => {
        try {
            if ('id' in serviceData) {
                const updated = await serviceService.updateService(serviceData.id, serviceData)
                if (updated) {
                    setServicesList((prev) => prev.map((s) => (s.id === serviceData.id ? updated : s)))
                    message.success('Cập nhật dịch vụ thành công!')
                }
            } else {
                const newService = await serviceService.createService(serviceData)
                setServicesList((prev) => [newService, ...prev])
                message.success('Thêm dịch vụ mới thành công!')
            }
            setIsModalOpen(false)
            setEditingService(null)
            // Reload to sync with Firebase
            await loadServices()
        } catch (error) {
            console.error('Lỗi lưu dịch vụ:', error)
            message.error('Không thể lưu dịch vụ')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await serviceService.deleteService(id)
            setServicesList((prev) => prev.filter((service) => service.id !== id))
            message.success('Xóa dịch vụ thành công!')
            // Reload to sync with Firebase
            await loadServices()
        } catch (error) {
            console.error('Lỗi xóa dịch vụ:', error)
            message.error('Xóa thất bại')
        }
    }

    const filteredServices = servicesList.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const columns = [
        { title: 'Tên dịch vụ', dataIndex: 'title', key: 'title' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', render: (d: string) => d.slice(0, 120) + (d.length > 120 ? '...' : '') },
        { title: 'Chi tiết (số)', dataIndex: 'details', key: 'details', render: (d: any[]) => d ? d.length : 0 },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: Service) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản lý Dịch vụ</h2>
                <Space>
                    <Search placeholder="Tìm kiếm dịch vụ..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 320 }} allowClear />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>Thêm mới</Button>
                </Space>
            </div>

            <Card>
                <Table dataSource={filteredServices} columns={columns} rowKey="id" locale={{ emptyText: searchTerm ? 'Không tìm thấy dịch vụ phù hợp' : 'Chưa có dịch vụ nào' }} />

                <div style={{ marginTop: 16, color: '#6b7280' }}>
                    Tổng số dịch vụ: <strong>{servicesList.length}</strong>
                    {searchTerm && ` | Kết quả tìm kiếm: ${filteredServices.length}`}
                </div>
            </Card>

            <ServiceFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingService(null) }} onSave={handleSave} editService={editingService} />
        </div>
    )
}

export default ServicesAdmin;