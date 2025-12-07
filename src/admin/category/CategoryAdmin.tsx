import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Input, Card, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { CategoryFormModal } from './CategoryFormModal'
import { categoryService, Category } from '../api/categoryService'

const CategoryAdmin: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCat, setEditingCat] = useState<Category | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        try {
            const data = categoryService.getAllCategories()
            setCategories(data)
        } catch (error) {
            console.error('Lỗi tải danh mục:', error)
            message.error('Không thể tải dữ liệu danh mục')
        }
    }

    const handleAddNew = () => {
        setEditingCat(null)
        setIsModalOpen(true)
    }

    const handleEdit = (cat: Category) => {
        setEditingCat(cat)
        setIsModalOpen(true)
    }

    const handleSave = (cat: Category) => {
        try {
            if (cat.id) {
                categoryService.updateCategory(cat.id, cat)
                message.success('Cập nhật danh mục thành công')
            } else {
                categoryService.createCategory(cat as Omit<Category, 'id'>)
                message.success('Thêm danh mục thành công')
            }
            loadCategories()
        } catch (error) {
            console.error('Lỗi lưu danh mục:', error)
            message.error(`Lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`)
        }
    }

    const handleDelete = (id: string) => {
        try {
            categoryService.deleteCategory(id)
            message.success('Đã xóa danh mục')
            loadCategories()
        } catch (error) {
            console.error('Lỗi xóa danh mục:', error)
            message.error('Xóa thất bại')
        }
    }

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Slug', dataIndex: 'slug', key: 'slug' },
        { title: 'Gắn trang', dataIndex: 'target', key: 'target' },
        {
            title: 'Hiển thị menu',
            dataIndex: 'showInMenu',
            key: 'showInMenu',
            render: (val: boolean) => val ? 'Có' : 'Không',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: Category) => (
                <Space>
                    <Button type="default" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    </Button>
                    <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => handleDelete(record.id || '')}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="default" danger size="small" icon={<DeleteOutlined />}>
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2>Quản lý Danh mục</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
                    Thêm mới
                </Button>
            </div>

            <Card style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="Tìm kiếm danh mục..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ maxWidth: 300 }}
                />
            </Card>

            <Card>
                <Table dataSource={filtered} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>

            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingCat(null)
                }}
                onSave={handleSave}
                editCategory={editingCat}
            />
        </div>
    )
}

export default CategoryAdmin