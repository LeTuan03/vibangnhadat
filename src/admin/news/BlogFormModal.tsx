import React, { useEffect, useState } from 'react'
import { BlogPost } from "@/types"
import { Modal, Form, Input, Select, DatePicker, message, Switch, InputNumber, Divider } from 'antd'
import FileUploadBase64 from '../components/FileUploadBase64'
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
                image: editPost.image,
                tags: editPost.tags || [],
                featured: editPost.featured || false,
                status: editPost.status || 'published',
                views: editPost.views || 0,
                readTime: editPost.readTime || 5,
            })
        } else {
            form.resetFields()
            form.setFieldsValue({ 
                date: dayjs(),
                featured: false,
                status: 'published',
                views: 0,
                readTime: 5,
            })
        }
    }, [editPost, isOpen, form])

    const handleFinish = (values: any) => {
        if (!values.title || !values.excerpt || !values.content || !values.author || !values.date || !values.category) {
            message.error('Vui lòng điền đầy đủ thông tin bắt buộc!')
            return
        }

        const payload: any = {
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            author: values.author,
            date: values.date.format ? values.date.format('YYYY-MM-DD') : values.date,
            category: values.category,
            image: values.image || '',
            tags: values.tags || [],
            featured: values.featured || false,
            status: values.status || 'published',
            views: values.views || 0,
            readTime: values.readTime || 5,
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
        <Modal 
            title={editPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'} 
            open={isOpen} 
            onCancel={onClose} 
            okText={editPost ? 'Cập nhật' : 'Thêm mới'} 
            onOk={() => form.submit()}
            width={800}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                {/* Main Content */}
                <Divider>Thông tin chính</Divider>
                
                <Form.Item name="title" label="Tiêu đề *" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                    <Input placeholder="Nhập tiêu đề bài viết" />
                </Form.Item>

                <Form.Item name="excerpt" label="Mô tả ngắn *" rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}>
                    <Input.TextArea rows={3} placeholder="Nhập mô tả ngắn về bài viết (sẽ hiển thị trên danh sách)" />
                </Form.Item>

                <Form.Item name="content" label="Nội dung *" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                    <Input.TextArea rows={10} placeholder="Nhập nội dung chi tiết của bài viết" />
                </Form.Item>

                {/* Meta Information */}
                <Divider>Thông tin bài viết</Divider>

                <Form.Item name="author" label="Tác giả *" rules={[{ required: true, message: 'Vui lòng nhập tên tác giả' }]}>
                    <Input placeholder="Tên tác giả (Luật sư/Chuyên gia)" />
                </Form.Item>

                <Form.Item name="date" label="Ngày đăng *" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng' }]}>
                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày đăng" />
                </Form.Item>

                <Form.Item name="category" label="Danh mục *" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
                    <Select placeholder="Chọn danh mục">
                        {categories.map((c) => (
                            <Select.Option key={c.id} value={c.name}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="image" label="Ảnh đại diện">
                    <FileUploadBase64 />
                </Form.Item>

                {/* Additional Fields */}
                <Divider>Tùy chọn nâng cao</Divider>

                <Form.Item name="tags" label="Thẻ (Tags)">
                    <Select 
                        mode="tags" 
                        placeholder="Nhập các thẻ để phân loại bài viết"
                        tokenSeparators={[',']}
                    />
                </Form.Item>

                <Form.Item name="readTime" label="Thời gian đọc (phút)" initialValue={5}>
                    <InputNumber min={1} max={60} placeholder="Ước tính thời gian đọc" />
                </Form.Item>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item name="featured" label="Bài viết nổi bật?" valuePropName="checked" initialValue={false}>
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái" initialValue="published">
                        <Select>
                            <Select.Option value="draft">Nháp</Select.Option>
                            <Select.Option value="published">Đã xuất bản</Select.Option>
                            <Select.Option value="archived">Lưu trữ</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item name="views" label="Lượt xem" initialValue={0}>
                    <InputNumber min={0} placeholder="Số lượt xem" />
                </Form.Item>
            </Form>
        </Modal>
    )
}