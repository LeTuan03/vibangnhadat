import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { LawExplanation } from '../../types'
import { getAllLawExplanations, createLawExplanation, updateLawExplanation, deleteLawExplanation } from '../../services'

const LawExplanationsAdmin: React.FC = () => {
    const [list, setList] = useState<LawExplanation[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<LawExplanation | null>(null)
    const [form] = Form.useForm()

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        try { setLoading(true); const items = await getAllLawExplanations(); setList(items) } catch (error) { console.error(error); message.error('Không thể tải dữ liệu') } finally { setLoading(false) }
    }

    const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
    const openEdit = (item: LawExplanation) => { setEditing(item); form.setFieldsValue(item); setIsModalOpen(true) }

    const handleDelete = async (id: string) => { try { await deleteLawExplanation(id); message.success('Xóa thành công'); await loadData() } catch (error) { console.error(error); message.error('Xóa thất bại') } }

    const handleSave = async (values: any) => {
        try {
            const payload = { ...values, relatedLaws: values.relatedLaws ? values.relatedLaws.split(',').map((s: string) => s.trim()) : [] }
            if (editing && editing.id) {
                await updateLawExplanation(editing.id, payload)
                message.success('Cập nhật thành công')
            } else {
                await createLawExplanation(payload)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false); setEditing(null); await loadData()
        } catch (error) { console.error(error); message.error('Lưu thất bại') }
    }

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Số hiệu', dataIndex: 'lawNumber', key: 'lawNumber' },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'Tác giả', dataIndex: 'author', key: 'author' },
        { title: 'Ngày', dataIndex: 'datePublished', key: 'datePublished', render: (d: string) => d ? new Date(d).toLocaleDateString('vi-VN') : '' },
        { title: 'Hành động', key: 'actions', render: (_: any, record: LawExplanation) => (
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
                <h2>Quản lý Giải thích văn bản pháp luật</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
            </div>

            <Card>
                <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
            </Card>

            <Modal title={editing ? 'Sửa' : 'Thêm mới'} open={isModalOpen} onCancel={() => { setIsModalOpen(false); setEditing(null) }} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{}}>
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="lawNumber" label="Số hiệu"><Input /></Form.Item>
                    <Form.Item name="category" label="Danh mục"><Input /></Form.Item>
                    <Form.Item name="author" label="Tác giả"><Input /></Form.Item>
                    <Form.Item name="datePublished" label="Ngày xuất bản" ><Input placeholder="YYYY-MM-DD" /></Form.Item>
                    <Form.Item name="relatedLaws" label="Văn bản liên quan" extra="Phân tách bởi dấu phẩy"> <Input /> </Form.Item>
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

export default LawExplanationsAdmin
