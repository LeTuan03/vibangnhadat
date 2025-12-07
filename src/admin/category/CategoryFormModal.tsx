import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Checkbox, Button, message } from 'antd'
import { Category } from '../api/categoryService'
import navigationService from '../api/navigationService'

interface CategoryFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (cat: Category) => void
    editCategory?: Category | null
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, onSave, editCategory }) => {
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<Partial<Category>>({
        name: '',
        description: '',
        slug: '',
        target: '/blog',
        showInMenu: false,
        menuItemId: undefined,
    })

    useEffect(() => {
        if (editCategory) {
            setFormData(editCategory)
            form.setFieldsValue(editCategory)
        } else {
            setFormData({ name: '', description: '', slug: '', target: '/blog', showInMenu: false })
            form.resetFields()
        }
    }, [editCategory, isOpen, form])

    const handleSubmit = () => {
        if (!formData.name) {
            message.error('Tên danh mục là bắt buộc')
            return
        }

        const payload: Category = {
            id: editCategory?.id ?? `cat-${Date.now()}`,
            name: (formData.name || '').trim(),
            description: formData.description || '',
            slug: formData.slug || (formData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            target: formData.target || '/blog',
            showInMenu: !!formData.showInMenu,
            menuItemId: formData.menuItemId,
        }

        // If showInMenu and no menuItemId, create a nav item under 'news' parent
        if (payload.showInMenu && !payload.menuItemId) {
            const navItems = navigationService.getAll()
            const newsParent = navItems.find(n => n.id === 'news')
            const newNav = {
                id: `nav-${Date.now()}`,
                label: payload.name,
                href: payload.target || '/blog',
            } as any
            navigationService.create(newNav, newsParent ? newsParent.id : undefined)
            const created = navigationService.getAll().flatMap(i => [i, ...(i.children ?? [])]).find(x => x.label === payload.name)
            if (created) payload.menuItemId = created.id
        }

        onSave(payload)
        onClose()
    }

    const handleChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value })
    }

    const navItems = navigationService.getAll()

    return (
        <Modal
            title={editCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {editCategory ? 'Cập nhật' : 'Thêm mới'}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Tên danh mục *" required>
                    <Input
                        placeholder="Nhập tên danh mục"
                        value={formData.name || ''}
                        onChange={e => handleChange('name', e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input.TextArea
                        placeholder="Nhập mô tả danh mục"
                        value={formData.description || ''}
                        onChange={e => handleChange('description', e.target.value)}
                        rows={3}
                    />
                </Form.Item>

                <Form.Item label="Slug">
                    <Input
                        placeholder="URL slug (tự động tạo nếu để trống)"
                        value={formData.slug || ''}
                        onChange={e => handleChange('slug', e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Gắn vào trang">
                    <Select
                        value={formData.target || '/blog'}
                        onChange={value => handleChange('target', value)}
                        options={[
                            { value: '/blog', label: '/blog' },
                            { value: '/documents', label: '/documents' },
                            { value: '/', label: '/' },
                            { value: '/qa', label: '/qa' },
                            { value: '/family-law', label: '/family-law' },
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        checked={!!formData.showInMenu}
                        onChange={e => handleChange('showInMenu', e.target.checked)}
                    >
                        Hiển thị trong menu client
                    </Checkbox>
                </Form.Item>

                {formData.showInMenu && (
                    <Form.Item label="Chọn vị trí trong menu (tùy chọn)">
                        <Select
                            value={formData.menuItemId || ''}
                            onChange={value => handleChange('menuItemId', value)}
                            placeholder="-- Không chọn (đặt dưới Tin Tức) --"
                            options={[
                                { value: '', label: '-- Không chọn (đặt dưới Tin Tức) --' },
                                ...navItems.map(n => ({ value: n.id, label: n.label })),
                            ]}
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}