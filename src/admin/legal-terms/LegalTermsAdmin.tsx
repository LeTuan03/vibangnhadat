import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { LegalTerm } from '../../types'
import { getAllLegalTerms, createLegalTerm, updateLegalTerm, deleteLegalTerm } from '../../services'

const LegalTermsAdmin: React.FC = () => {
    const [list, setList] = useState<LegalTerm[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<LegalTerm | null>(null)
    const [form] = Form.useForm()

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        try { setLoading(true); const items = await getAllLegalTerms(); setList(items) } catch (error) { console.error(error); message.error('Không thể tải dữ liệu') } finally { setLoading(false) }
    }

    const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
    const openEdit = (t: LegalTerm) => { setEditing(t); form.setFieldsValue(t); setIsModalOpen(true) }

    const handleDelete = async (id: string) => { try { await deleteLegalTerm(id); message.success('Xóa thành công'); await loadData() } catch (error) { console.error(error); message.error('Xóa thất bại') } }

    const handleSave = async (values: any) => {
        try {
            if (editing && editing.id) {
                await updateLegalTerm(editing.id, values)
                message.success('Cập nhật thành công')
            } else {
                await createLegalTerm(values)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false); setEditing(null); await loadData()
        } catch (error) { console.error(error); message.error('Lưu thất bại') }
    }

    const columns = [
        { title: 'Thuật ngữ', dataIndex: 'term', key: 'term' },
        { title: 'Định nghĩa', dataIndex: 'definition', key: 'definition', render: (d: string) => d ? d.slice(0, 100) + (d.length > 100 ? '...' : '') : '' },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'Ví dụ', dataIndex: 'example', key: 'example' },
        { title: 'Hành động', key: 'actions', render: (_: any, record: LegalTerm) => (
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
                <h2>Quản lý Thuật ngữ pháp luật</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
            </div>

            <Card>
                <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
            </Card>

            <Modal title={editing ? 'Sửa thuật ngữ' : 'Thêm thuật ngữ'} open={isModalOpen} onCancel={() => { setIsModalOpen(false); setEditing(null) }} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{}}>
                    <Form.Item name="term" label="Thuật ngữ" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="definition" label="Định nghĩa" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
                    <Form.Item name="category" label="Danh mục"><Input /></Form.Item>
                    <Form.Item name="example" label="Ví dụ"><Input.TextArea rows={2} /></Form.Item>

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

export default LegalTermsAdmin
