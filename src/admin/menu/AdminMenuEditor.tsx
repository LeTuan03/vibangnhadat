import React, { useEffect, useState } from 'react';
import navigationService, { NavItem } from '../api/navigationService';
// Admin styles are loaded centrally in AdminLayout

const generateId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

const AdminMenuEditor: React.FC = () => {
    const [items, setItems] = useState<NavItem[]>([]);
    const [label, setLabel] = useState('');
    const [href, setHref] = useState('');
    const [parent, setParent] = useState<string | undefined>(undefined);

    useEffect(() => {
        navigationService.initialize();
        const update = () => setItems(navigationService.getAll());
        update();
        const unsub = navigationService.subscribe(update);
        return () => unsub();
    }, []);

    const handleAdd = () => {
        if (!label || !href) return;
        const newItem: NavItem = { id: generateId(label), label: label.trim(), href: href.trim() };
        navigationService.create(newItem, parent);
        setLabel('');
        setHref('');
        setParent(undefined);
    };

    const handleDelete = (id: string) => {
        if (!confirm('Xác nhận xóa mục menu này?')) return;
        navigationService.delete(id);
    };

    const handleEdit = (id: string) => {
        const it = navigationService.findById(id);
        if (!it) return;
        const newLabel = prompt('Nhập nhãn mới', it.label) ?? it.label;
        const newHref = prompt('Nhập liên kết mới', it.href) ?? it.href;
        navigationService.update(id, { label: newLabel, href: newHref });
    };

    return (
        <div className="admin-page admin-menu-editor">
            <h2>Quản lý Menu Client</h2>

            <section style={{ marginBottom: '1rem' }}>
                <h4>Thêm mục mới</h4>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input placeholder="Nhãn (label)" value={label} onChange={(e) => setLabel(e.target.value)} />
                    <input placeholder="Liên kết (href)" value={href} onChange={(e) => setHref(e.target.value)} />
                    <select value={parent ?? ''} onChange={(e) => setParent(e.target.value || undefined)}>
                        <option value="">-- Top level --</option>
                        {items.map((it) => (
                            <option key={it.id} value={it.id}>{it.label}</option>
                        ))}
                    </select>
                    <button onClick={handleAdd}>Thêm</button>
                </div>
            </section>

            <section>
                <h4>Danh sách menu</h4>
                <div className="admin-table">
                    <div className="admin-table-row admin-table-header">
                        <div>Nhãn</div>
                        <div>Liên kết</div>
                        <div>Hành động</div>
                    </div>
                    {items.map((it) => (
                        <div key={it.id} className="admin-table-row">
                            <div style={{ fontWeight: 600 }}>{it.label}</div>
                            <div>{it.href}</div>
                            <div>
                                <button onClick={() => handleEdit(it.id)}>Sửa</button>
                                <button onClick={() => handleDelete(it.id)} style={{ marginLeft: '0.5rem' }}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* children display */}
                {items.map((it) => it.children && it.children.length > 0 && (
                    <div key={it.id} style={{ marginTop: '0.75rem' }}>
                        <h5>Con của: {it.label}</h5>
                        <div className="admin-table">
                            <div className="admin-table-row admin-table-header">
                                <div>Nhãn</div>
                                <div>Liên kết</div>
                                <div>Hành động</div>
                            </div>
                            {it.children!.map((ch) => (
                                <div key={ch.id} className="admin-table-row">
                                    <div>{ch.label}</div>
                                    <div>{ch.href}</div>
                                    <div>
                                        <button onClick={() => handleEdit(ch.id)}>Sửa</button>
                                        <button onClick={() => handleDelete(ch.id)} style={{ marginLeft: '0.5rem' }}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AdminMenuEditor;
