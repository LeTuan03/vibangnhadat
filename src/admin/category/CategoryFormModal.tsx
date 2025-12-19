import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Checkbox, message } from 'antd'
import { Category } from '../api/categoryService'

interface CategoryFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (cat: Category) => Promise<void>
    editCategory: Category | null | undefined
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, onSave, editCategory }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        if (editCategory && isOpen) {
            form.setFieldsValue({
                name: editCategory.name,
                description: editCategory.description || '',
                slug: editCategory.slug || '',
                target: editCategory.target || '/blog',
                showInMenu: !!editCategory.showInMenu,
            })
        } else if (isOpen) {
            form.resetFields()
            form.setFieldsValue({ target: '/blog', showInMenu: false })
        }
    }, [editCategory, isOpen, form])

    const handleFinish = async (values: any) => {
        setLoading(true)
        try {
            let basePayload: any = {
                name: (values.name || '').trim(),
                description: values.description || '',
                slug: values.slug || (values.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                target: values.target || '/blog',
                showInMenu: !!values.showInMenu,
            }

            // Only add id if updating (editCategory has id)
            const payload: Category = editCategory?.id
                ? { ...basePayload, id: editCategory.id }
                : basePayload as Category

            await onSave(payload)
            onClose()
        } catch (error) {
            console.error('Lỗi lưu danh mục:', error)
            message.error(`Lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Modal
            title={editCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            open={isOpen}
            onCancel={onClose}
            okText={editCategory ? 'Cập nhật' : 'Thêm mới'}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okButtonProps={{ disabled: loading }}
            cancelButtonProps={{ disabled: loading }}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                >
                    <Input placeholder="Nhập tên danh mục" />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea placeholder="Nhập mô tả danh mục" rows={3} />
                </Form.Item>

                <Form.Item name="slug" label="Slug">
                    <Input placeholder="URL slug (tự động tạo nếu để trống)" />
                </Form.Item>

                <Form.Item
                    name="target"
                    label="Gắn vào trang"
                    rules={[{ required: true, message: 'Vui lòng chọn trang' }]}
                >
                    <Select
                        options={[
                            { value: '/blog', label: '/blog' },
                            { value: '/documents', label: '/documents' },
                            { value: '/', label: '/' },
                            { value: '/qa', label: '/qa' },
                            { value: '/family-law', label: '/family-law' },
                        ]}
                    />
                </Form.Item>

                <Form.Item name="showInMenu" valuePropName="checked">
                    <Checkbox>Hiển thị trong menu client</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    )
}