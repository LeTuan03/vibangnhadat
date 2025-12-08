import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { LegalArticle } from '../../types'
import { getAllLegalArticles, createLegalArticle, updateLegalArticle, deleteLegalArticle } from '../../services'

const LegalArticlesAdmin: React.FC = () => {
    const [list, setList] = useState<LegalArticle[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<LegalArticle | null>(null)
    const [form] = Form.useForm()

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const items = await getAllLegalArticles()
            setList(items)
        } catch (error) {
            console.error('Lỗi tải legal articles:', error)
            message.error('Không thể tải dữ liệu')
        } finally { setLoading(false) }
    }

    const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
    const openEdit = (item: LegalArticle) => { setEditing(item); form.setFieldsValue({ ...item, datePublished: item.datePublished ?? undefined }); setIsModalOpen(true) }

    const handleDelete = async (id: string) => {
        try { await deleteLegalArticle(id); message.success('Xóa thành công'); await loadData() } catch (error) { console.error(error); message.error('Xóa thất bại') }
    }

    const handleSave = async (values: any) => {
        try {
            const payload = { ...values, datePublished: values.datePublished ? values.datePublished.toISOString() : undefined }
            if (editing && editing.id) {
                await updateLegalArticle(editing.id, payload)
                message.success('Cập nhật thành công')
            } else {
                await createLegalArticle(payload)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false); setEditing(null); await loadData()
        } catch (error) { console.error('Lỗi lưu article:', error); message.error('Lưu thất bại') }
    }

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'Tác giả', dataIndex: 'author', key: 'author' },
        { title: 'Ngày', dataIndex: 'datePublished', key: 'datePublished', render: (d: string) => d ? new Date(d).toLocaleDateString('vi-VN') : '' },
        { title: 'Hành động', key: 'actions', render: (_: any, record: LegalArticle) => (
            <Space>
                <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
                <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id!)} okText="Xóa" cancelText="Hủy">
                    <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        ) }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản lý Bài viết pháp luật</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
            </div>

            <Card>
                <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
            </Card>

            <Modal title={editing ? 'Sửa bài viết' : 'Thêm bài viết'} open={isModalOpen} onCancel={() => { setIsModalOpen(false); setEditing(null) }} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{}}>
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="category" label="Danh mục"><Input /></Form.Item>
                    <Form.Item name="author" label="Tác giả"><Input /></Form.Item>
                    <Form.Item name="datePublished" label="Ngày xuất bản" extra="Định dạng YYYY-MM-DD hoặc để trống">
                        <Input placeholder="2025-01-15" />
                    </Form.Item>
                    <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}><Input.TextArea rows={6} /></Form.Item>

                    <Form.Item style={{ marginTop: 16 }}>
                        <Space>
                            <Button htmlType="submit" type="primary">Lưu</Button>
                            <Button onClick={() => { setIsModalOpen(false); setEditing(null) }}>Hủy</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LegalArticlesAdmin
