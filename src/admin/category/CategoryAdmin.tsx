import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { CategoryFormModal } from './CategoryFormModal';
import { categoryService, Category } from '../api/categoryService';
import { toast } from 'react-toastify';

const CategoryAdmin: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCat, setEditingCat] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // initialize categories if not already
        categoryService.initializeCategories([] as any);
        const update = () => setCategories(categoryService.getAllCategories());
        update();
        const unsub = categoryService.subscribe(update);
        return () => unsub();
    }, []);

    const handleAddNew = () => {
        setEditingCat(null);
        setIsModalOpen(true);
    };

    const handleEdit = (cat: Category) => {
        setEditingCat(cat);
        setIsModalOpen(true);
    };

    const handleSave = (cat: Category) => {
        if (cat.id && categoryService.getCategoryById(cat.id)) {
            const updated = categoryService.updateCategory(cat.id, cat as any);
            if (updated) {
                toast.success('Cập nhật danh mục thành công');
            }
        } else {
            const created = categoryService.createCategory({ ...cat } as any);
            if (created) {
                toast.success('Thêm danh mục thành công');
            }
        }
    };

    const handleDelete = (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;
        const ok = categoryService.deleteCategory(id);
        if (ok) toast.success('Đã xóa danh mục');
    };

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="admin-header">
                <h1>Quản lý Danh mục</h1>
                <button className="btn btn-primary" onClick={handleAddNew}><FaPlus /> Thêm mới</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Tìm kiếm danh mục..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control" style={{ maxWidth: 400 }} />
            </div>

            <div className="admin-content">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Slug</th>
                                <th>Gắn trang</th>
                                <th>Hiển thị menu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>{searchTerm ? 'Không tìm thấy' : 'Chưa có danh mục nào'}</td></tr>
                            ) : (
                                filtered.map(cat => (
                                    <tr key={cat.id}>
                                        <td>{cat.name}</td>
                                        <td>{cat.description}</td>
                                        <td>{cat.slug}</td>
                                        <td>{cat.target}</td>
                                        <td>{cat.showInMenu ? 'Có' : 'Không'}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon btn-edit" onClick={() => handleEdit(cat)} title="Sửa"><FaEdit /></button>
                                                <button className="btn-icon btn-delete" onClick={() => handleDelete(cat.id)} title="Xóa"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CategoryFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingCat(null); }} onSave={handleSave} editCategory={editingCat} />
        </div>
    );
};

export default CategoryAdmin;