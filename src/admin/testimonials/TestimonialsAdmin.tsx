import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, InputNumber, Switch, message } from 'antd'
import FileUploadBase64 from '../components/FileUploadBase64'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { Testimonial } from '../../types'
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services'

const TestimonialsAdmin: React.FC = () => {
    const [list, setList] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<Testimonial | null>(null)
    const [form] = Form.useForm()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const items = await getAllTestimonials()
            setList(items)
        } catch (error) {
            console.error('Lỗi tải testimonials:', error)
            message.error('Không thể tải testimonials')
        } finally {
            setLoading(false)
        }
    }

    const openAdd = () => {
        setEditing(null)
        form.resetFields()
        setIsModalOpen(true)
    }

    const openEdit = (t: Testimonial) => {
        setEditing(t)
        form.setFieldsValue(t)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTestimonial(id)
            message.success('Xóa thành công')
            await loadData()
        } catch (error) {
            console.error('Lỗi xóa testimonial:', error)
            message.error('Xóa thất bại')
        }
    }

    const handleSave = async (values: any) => {
        try {
            if (editing && editing.id) {
                await updateTestimonial(editing.id, values)
                message.success('Cập nhật thành công')
            } else {
                await createTestimonial(values)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false)
            setEditing(null)
            await loadData()
        } catch (error) {
            console.error('Lỗi lưu testimonial:', error)
            message.error('Lưu thất bại')
        }
    }

    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
        { title: 'Công ty', dataIndex: 'company', key: 'company' },
        { title: 'Nội dung', dataIndex: 'content', key: 'content', render: (c: string) => c ? c.slice(0, 80) + (c.length > 80 ? '...' : '') : '' },
        { title: 'Rating', dataIndex: 'rating', key: 'rating' },
        { title: 'Nổi bật', dataIndex: 'featured', key: 'featured', render: (v: boolean) => v ? 'Có' : 'Không' },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: Testimonial) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id!)} okText="Xóa" cancelText="Hủy">
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản lý Lời chứng thực</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
            </div>

            <Card>
                <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
            </Card>

            <Modal title={editing ? 'Sửa lời chứng thực' : 'Thêm lời chứng thực'} open={isModalOpen} onCancel={() => { setIsModalOpen(false); setEditing(null) }} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ rating: 5, featured: false }}>
                    <Form.Item name="name" label="Tên" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Form.Item name="position" label="Chức vụ"> <Input /> </Form.Item>
                    <Form.Item name="company" label="Công ty"> <Input /> </Form.Item>
                    <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}> <Input.TextArea rows={4} /> </Form.Item>
                    <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}><InputNumber min={1} max={5} /></Form.Item>
                    <Form.Item name="featured" label="Nổi bật" valuePropName="checked"> <Switch /> </Form.Item>
                    <Form.Item name="image" label="Ảnh"> <FileUploadBase64 /> </Form.Item>

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

export default TestimonialsAdmin
