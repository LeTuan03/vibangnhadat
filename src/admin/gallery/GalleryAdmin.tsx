import { useEffect, useState } from 'react'
import { Table, Button, Input, Card, Modal, Form, Select, Image, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { GalleryItem } from '../../types'
import { galleryService } from '../api/galleryService'

const { Search } = Input

const GalleryAdmin: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [form] = Form.useForm()

    useEffect(() => {
        loadGallery()
    }, [])

    const loadGallery = async () => {
        try {
            const allItems = await galleryService.getAllGalleryItems()
            setItems(allItems)
        } catch (error) {
            console.error('Lỗi tải gallery:', error)
            message.error('Không thể tải gallery')
        }
    }

    const handleAddNew = () => {
        setEditingId(null)
        form.resetFields()
        setIsModalOpen(true)
    }

    const handleEdit = (item: GalleryItem) => {
        setEditingId(item.id)
        form.setFieldsValue({
            title: item.title,
            type: item.type,
            thumbnail: item.thumbnail,
            videoId: item.videoId,
            description: item.description,
        })
        setIsModalOpen(true)
    }

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            if (editingId) {
                await galleryService.updateGalleryItem(editingId, values)
                message.success('Cập nhật thành công')
            } else {
                await galleryService.createGalleryItem(values)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false)
            loadGallery()
        } catch (e) {
            console.error('Lỗi lưu gallery item:', e)
            message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const success = await galleryService.deleteGalleryItem(id)
            if (success) {
                message.success('Xóa thành công')
                loadGallery()
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error) {
            console.error('Lỗi xóa gallery item:', error)
            message.error('Xóa thất bại')
        }
    }

    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Loại', dataIndex: 'type', key: 'type', render: (t: string) => (t === 'image' ? '📷 Hình' : '🎥 Video') },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Thumbnail', dataIndex: 'thumbnail', key: 'thumbnail', render: (src: string) => <Image src={src} width={60} /> },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: GalleryItem) => (
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
                <h2>Quản Lý Thư Viện Hình Ảnh & Video</h2>
                <Space>
                    <Search placeholder="Tìm kiếm..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 240 }} allowClear />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>Thêm mới</Button>
                </Space>
            </div>

            <Card>
                <Table dataSource={filteredItems} columns={columns} rowKey="id" />
            </Card>

            <Modal title={editingId ? 'Sửa Hình Ảnh/Video' : 'Thêm Hình Ảnh/Video'} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSave} okText="Lưu">
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="type" label="Loại" initialValue="image" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="image">Hình ảnh</Select.Option>
                            <Select.Option value="video">Video</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="thumbnail" label="URL Thumbnail" rules={[{ required: true, message: 'Vui lòng nhập URL thumbnail' }]}>
                        <Input placeholder="VD: /images/gallery-1.jpg" />
                    </Form.Item>

                    <Form.Item name="videoId" label="ID Video (YouTube)">
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default GalleryAdmin
