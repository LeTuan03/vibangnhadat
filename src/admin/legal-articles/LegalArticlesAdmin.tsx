import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Space, Popconfirm, Modal, Form, Input, message, Checkbox, InputNumber, DatePicker, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
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
        } finally {
            setLoading(false)
        }
    }

    const openAdd = () => {
        setEditing(null)
        form.resetFields()
        setIsModalOpen(true)
    }

    const openEdit = (item: LegalArticle) => {
        setEditing(item)
        form.setFieldsValue({
            ...item,
            datePublished: item.datePublished ? dayjs(item.datePublished) : undefined,
            tags: item.tags ? (item.tags as any).join(', ') : '',
            relatedLaws: item.relatedLaws ? (item.relatedLaws as any).join(', ') : '',
            featured: !!item.featured,
            readTime: item.readTime ?? undefined,
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteLegalArticle(id)
            message.success('Xóa thành công')
            await loadData()
        } catch (error) {
            console.error(error)
            message.error('Xóa thất bại')
        }
    }

    const handleSave = async (values: any) => {
        try {
            const payload = {
                ...values,
                datePublished: values.datePublished ? values.datePublished.format('YYYY-MM-DD') : undefined,
                tags: values.tags ? values.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [],
                relatedLaws: values.relatedLaws ? values.relatedLaws.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [],
            }
            if (editing && editing.id) {
                await updateLegalArticle(editing.id, payload)
                message.success('Cập nhật thành công')
            } else {
                await createLegalArticle(payload)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false)
            setEditing(null)
            await loadData()
        } catch (error) {
            console.error('Lỗi lưu article:', error)
            message.error('Lưu thất bại')
        }
    }

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '25%'
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: '12%'
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            width: '12%'
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: '15%',
            render: (tags: string[] = []) => (
                <>
                    {(tags || []).map((tag, idx) => (
                        <Tag color="blue" key={idx} style={{ marginBottom: 4 }}>
                            {tag}
                        </Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Nổi bật',
            dataIndex: 'featured',
            key: 'featured',
            width: '8%',
            align: 'center' as const,
            render: (f: boolean) => f ? <Tag color="gold">Nổi bật</Tag> : <span style={{ color: '#999' }}>—</span>
        },
        {
            title: 'Ngày xuất bản',
            dataIndex: 'datePublished',
            key: 'datePublished',
            width: '12%',
            render: (d: string) => d ? dayjs(d).format('DD/MM/YYYY') : <span style={{ color: '#999' }}>—</span>
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '10%',
            align: 'center' as const,
            render: (_: any, record: LegalArticle) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openEdit(record)}
                        size="small"
                    />
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc muốn xóa bài viết này?"
                        onConfirm={() => handleDelete(record.id!)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản lý Bài viết pháp luật</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                    Thêm mới
                </Button>
            </div>

            <Card>
                <Table
                    dataSource={list}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng ${total} bài viết`
                    }}
                />
            </Card>

            <Modal
                title={
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                        {editing ? '✏️ Chỉnh sửa bài viết' : '➕ Thêm bài viết mới'}
                    </div>
                }
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false)
                    setEditing(null)
                }}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{}}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input placeholder="Nhập tiêu đề bài viết" size="large" />
                    </Form.Item>

                    <Space style={{ width: '100%' }} size="large">
                        <Form.Item name="category" label="Danh mục" style={{ width: 200 }}>
                            <Input placeholder="VD: Hôn nhân" />
                        </Form.Item>
                        <Form.Item name="author" label="Tác giả" style={{ width: 200 }}>
                            <Input placeholder="Tên tác giả" />
                        </Form.Item>
                    </Space>

                    <Space style={{ width: '100%' }} size="large">
                        <Form.Item name="datePublished" label="Ngày xuất bản" style={{ width: 200 }}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                placeholder="Chọn ngày"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item name="readTime" label="Thời gian đọc (phút)" style={{ width: 200 }}>
                            <InputNumber
                                min={0}
                                placeholder="VD: 5"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Space>

                    <Form.Item name="featured" valuePropName="checked">
                        <Checkbox>⭐ Đánh dấu là bài viết nổi bật</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="tags"
                        label="Tags"
                        extra="Ngăn cách bởi dấu phẩy (,)"
                    >
                        <Input placeholder="hôn nhân, thừa phát lại, tư vấn pháp luật" />
                    </Form.Item>

                    <Form.Item
                        name="relatedLaws"
                        label="Văn bản liên quan"
                        extra="Ngăn cách bởi dấu phẩy (,)"
                    >
                        <Input placeholder="Nghị định 123/2020, Luật dân sự 2015" />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <Input.TextArea
                            rows={8}
                            placeholder="Nhập nội dung chi tiết của bài viết..."
                            showCount
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                        <Space>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                icon={<PlusOutlined />}
                            >
                                {editing ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                            <Button
                                size="large"
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setEditing(null)
                                }}
                            >
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LegalArticlesAdmin