import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, Switch, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { Reference } from '../../types'
import { getAllReferences, createReference, updateReference, deleteReference } from '../../services'

const ReferencesAdmin: React.FC = () => {
    const [list, setList] = useState<Reference[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<Reference | null>(null)
    const [form] = Form.useForm()

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        try { setLoading(true); const items = await getAllReferences(); setList(items) } catch (error) { console.error(error); message.error('Không thể tải dữ liệu') } finally { setLoading(false) }
    }

    const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
    const openEdit = (item: Reference) => { setEditing(item); form.setFieldsValue(item); setIsModalOpen(true) }

    const handleDelete = async (id: string) => { try { await deleteReference(id); message.success('Xóa thành công'); await loadData() } catch (error) { console.error(error); message.error('Xóa thất bại') } }

    const handleSave = async (values: any) => {
        try {
            if (editing && editing.id) {
                await updateReference(editing.id, values)
                message.success('Cập nhật thành công')
            } else {
                await createReference(values)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false); setEditing(null); await loadData()
        } catch (error) { console.error(error); message.error('Lưu thất bại') }
    }

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'URL', dataIndex: 'url', key: 'url', render: (u: string) => u ? <a href={u} target="_blank" rel="noreferrer">{u}</a> : '' },
        { title: 'Xác minh', dataIndex: 'verified', key: 'verified', render: (v: boolean) => v ? 'Có' : 'Không' },
        { title: 'Hành động', key: 'actions', render: (_: any, record: Reference) => (
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
                <h2>Quản lý Tài liệu tham khảo</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
            </div>

            <Card>
                <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
            </Card>

            <Modal title={editing ? 'Sửa' : 'Thêm mới'} open={isModalOpen} onCancel={() => { setIsModalOpen(false); setEditing(null) }} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ verified: false }}>
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="category" label="Danh mục"><Input /></Form.Item>
                    <Form.Item name="url" label="URL"><Input /></Form.Item>
                    <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} /></Form.Item>
                    <Form.Item name="verified" label="Xác minh" valuePropName="checked"><Switch /></Form.Item>

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

export default ReferencesAdmin
