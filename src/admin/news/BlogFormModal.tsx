import React, { useEffect, useState } from 'react'
import { BlogPost } from "@/types"
import { Modal, Form, Input, Select, DatePicker, message } from 'antd'
import { getAllCategories } from '../../services'
import dayjs from 'dayjs'

interface BlogFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (post: Omit<BlogPost, 'id'> | BlogPost) => void
    editPost?: BlogPost | null
}

export const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, onSave, editPost }) => {
    const [form] = Form.useForm()
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await getAllCategories()
                setCategories((cats || []).map((c: any) => ({ id: c.id, name: c.name })))
            } catch (e) {
                console.error('Lỗi tải danh mục:', e)
                setCategories([])
            }
        }

        if (isOpen) {
            loadCategories()
        }
    }, [isOpen])

    useEffect(() => {
        if (editPost) {
            form.setFieldsValue({
                title: editPost.title,
                excerpt: editPost.excerpt,
                content: editPost.content,
                author: editPost.author,
                date: dayjs(editPost.date),
                category: editPost.category,
            })
        } else {
            form.resetFields()
            form.setFieldsValue({ date: dayjs() })
        }
    }, [editPost, isOpen, form])

    const handleFinish = (values: any) => {
        if (!values.title || !values.excerpt || !values.content || !values.author || !values.date || !values.category) {
            message.error('Vui lòng điền đầy đủ thông tin!')
            return
        }

        const payload: any = {
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            author: values.author,
            date: values.date.format ? values.date.format('YYYY-MM-DD') : values.date,
            category: values.category,
        }

        if (editPost) {
            onSave({ ...payload, id: editPost.id })
            message.success('Cập nhật bài viết thành công!')
        } else {
            onSave(payload)
            message.success('Thêm bài viết mới thành công!')
        }

        onClose()
    }

    return (
        <Modal title={editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'} open={isOpen} onCancel={onClose} okText={editPost ? 'Cập nhật' : 'Thêm mới'} onOk={() => form.submit()}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                    <Input placeholder="Nhập tiêu đề bài viết" />
                </Form.Item>

                <Form.Item name="excerpt" label="Mô tả ngắn" rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}>
                    <Input.TextArea rows={3} placeholder="Nhập mô tả ngắn về bài viết" />
                </Form.Item>

                <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                    <Input.TextArea rows={8} placeholder="Nhập nội dung chi tiết" />
                </Form.Item>

                <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tên tác giả' }]}>
                    <Input placeholder="Tên tác giả" />
                </Form.Item>

                <Form.Item name="date" label="Ngày đăng" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng' }]}>
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
                    <Select placeholder="Chọn danh mục">
                        {categories.map((c) => (
                            <Select.Option key={c.id} value={c.name}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}