import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Category } from '../api/categoryService';
import navigationService from '../api/navigationService';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (cat: Category) => void;
    editCategory?: Category | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, onSave, editCategory }) => {
    const [formData, setFormData] = useState<Partial<Category>>({
        name: '',
        description: '',
        slug: '',
        target: '/blog',
        showInMenu: false,
        menuItemId: undefined,
    });

    useEffect(() => {
        if (editCategory) {
            setFormData(editCategory);
        } else {
            setFormData({ name: '', description: '', slug: '', target: '/blog', showInMenu: false });
        }
    }, [editCategory, isOpen]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error('Tên danh mục là bắt buộc');
            return;
        }

        const payload: Category = {
            id: editCategory?.id ?? `cat-${Date.now()}`,
            name: (formData.name || '').trim(),
            description: formData.description || '',
            slug: formData.slug || (formData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            target: formData.target || '/blog',
            showInMenu: !!formData.showInMenu,
            menuItemId: formData.menuItemId,
        };

        // If showInMenu and no menuItemId, create a nav item under 'news' parent
        if (payload.showInMenu && !payload.menuItemId) {
            // create under news parent if exists
            const navItems = navigationService.getAll();
            const newsParent = navItems.find(n => n.id === 'news');
            const newNav = {
                id: `nav-${Date.now()}`,
                label: payload.name,
                href: payload.target || '/blog'
            } as any;
            navigationService.create(newNav, newsParent ? newsParent.id : undefined);
            // find newly created id by label (simple)
            const created = navigationService.getAll().flatMap(i => [i, ...(i.children ?? [])]).find(x => x.label === payload.name);
            if (created) payload.menuItemId = created.id;
        }

        onSave(payload);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = target.name;
        const isCheckbox = (target as HTMLInputElement).type === 'checkbox';
        const value = isCheckbox ? (target as HTMLInputElement).checked : target.value;
        setFormData({ ...formData, [name]: value });
    };

    if (!isOpen) return null;

    const navItems = navigationService.getAll();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label htmlFor="name">Tên danh mục *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Nhập tên danh mục"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input type="text" id="slug" name="slug" value={formData.slug || ''} onChange={handleChange} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="target">Gắn vào trang</label>
                            <select id="target" name="target" value={formData.target || '/blog'} onChange={handleChange} className="form-control">
                                <option value="/blog">/blog</option>
                                <option value="/documents">/documents</option>
                                <option value="/">/</option>
                                <option value="/qa">/qa</option>
                                <option value="/family-law">/family-law</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="showInMenu" checked={!!formData.showInMenu} onChange={handleChange} />{' '}
                            Hiển thị trong menu client
                        </label>
                    </div>

                    {formData.showInMenu && (
                        <div className="form-group">
                            <label>Chọn vị trí trong menu (tùy chọn)</label>
                            <select name="menuItemId" value={formData.menuItemId || ''} onChange={handleChange} className="form-control">
                                <option value="">-- Không chọn (đặt dưới Tin Tức) --</option>
                                {navItems.map(n => (
                                    <option key={n.id} value={n.id}>{n.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Hủy
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        {editCategory ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};