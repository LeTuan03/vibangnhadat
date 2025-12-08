import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Button, Space, Typography, Divider, Modal, message, Tag, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, LinkOutlined, DragOutlined } from '@ant-design/icons';
import { getAllNavigationItems, createNavigationItem, updateNavigationItem, deleteNavigationItem } from '../../services';

export interface NavItem {
    id?: string;
    label: string;
    href: string;
    children?: NavItem[];
    order?: number;
}

const { Title } = Typography;
const { Option } = Select;

const AdminMenuEditor: React.FC = () => {
    const [items, setItems] = useState<NavItem[]>([]);
    const [form] = Form.useForm();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<NavItem | null>(null);
    const [editForm] = Form.useForm();
    const [draggedItem, setDraggedItem] = useState<NavItem | null>(null);
    const [draggedOverItem, setDraggedOverItem] = useState<NavItem | null>(null);

    useEffect(() => {
        loadNavigation();
    }, []);

    const loadNavigation = async () => {
        try {
            const data = await getAllNavigationItems();
            if (data && data.length > 0) {
                // Initialize order field if missing
                const itemsWithOrder = data.map((item, index) => ({
                    ...item,
                    order: item.order ?? index
                }));
                setItems(itemsWithOrder);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Lỗi tải menu:', error);
            message.error('Không thể tải menu');
        }
    };

    // Drag and drop handlers
    const handleDragStart = (item: NavItem) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, item: NavItem) => {
        e.preventDefault();
        setDraggedOverItem(item);
    };

    const handleDragLeave = () => {
        setDraggedOverItem(null);
    };

    const handleDrop = async (e: React.DragEvent<HTMLTableRowElement>, targetItem: NavItem) => {
        e.preventDefault();
        setDraggedOverItem(null);

        if (!draggedItem || !draggedItem.id || !targetItem.id || draggedItem.id === targetItem.id) {
            setDraggedItem(null);
            return;
        }

        try {
            // Reorder items
            const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
            const targetIndex = items.findIndex(item => item.id === targetItem.id);

            if (draggedIndex === -1 || targetIndex === -1) {
                setDraggedItem(null);
                return;
            }

            const newItems = [...items];
            const [draggedItemData] = newItems.splice(draggedIndex, 1);
            newItems.splice(targetIndex, 0, draggedItemData);

            // Update order property
            newItems.forEach((item, index) => {
                item.order = index;
            });

            setItems(newItems);
            setDraggedItem(null);

            // Update all items in Firebase with new order
            for (let i = 0; i < newItems.length; i++) {
                await updateNavigationItem(newItems[i].id!, { order: i });
            }

            message.success('Cập nhật vị trí menu thành công');
        } catch (error) {
            console.error('Lỗi cập nhật vị trí:', error);
            message.error('Cập nhật vị trí thất bại');
            setDraggedItem(null);
            loadNavigation(); // Reload to sync with Firebase
        }
    };

    const handleAdd = async (values: any) => {
        try {
            const newItem: NavItem = {
                label: values.label.trim(),
                href: values.href.trim()
            };
            // Pass parent ID if selected, otherwise create as top-level
            if (values.parent) {
                await createNavigationItem(newItem, values.parent);
            } else {
                await createNavigationItem(newItem);
            }
            message.success('Thêm mục menu thành công');
            form.resetFields();
            loadNavigation();
        } catch (error) {
            console.error('Lỗi thêm menu:', error);
            message.error(`Lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
        }
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa mục menu này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    console.log('[menu] Deleting item:', id);

                    // Delete from Firebase first (wait for completion)
                    await deleteNavigationItem(id);
                    console.log('[menu] Item deleted from Firebase');

                    // Wait a moment for Firebase to sync
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Then reload to get fresh data from Firebase
                    await loadNavigation();

                    message.success('Xóa mục menu thành công');
                } catch (error) {
                    console.error('Lỗi xóa menu:', error);
                    message.error('Xóa thất bại');

                    // Still try to reload on error to sync with Firebase
                    try {
                        await loadNavigation();
                    } catch (e) {
                        console.error('Lỗi reload menu:', e);
                    }
                }
            }
        });
    };

    const showEditModal = (item: NavItem) => {
        setEditingItem(item);
        editForm.setFieldsValue({
            label: item.label,
            href: item.href
        });
        setEditModalVisible(true);
    };

    const handleEdit = async (values: any) => {
        if (!editingItem) return;
        try {
            await updateNavigationItem(editingItem.id!, {
                label: values.label,
                href: values.href
            });
            message.success('Cập nhật mục menu thành công');
            setEditModalVisible(false);
            setEditingItem(null);
            editForm.resetFields();
            loadNavigation();
        } catch (error) {
            console.error('Lỗi cập nhật menu:', error);
            message.error('Cập nhật thất bại');
        }
    };

    return (
        <div style={{ padding: '16px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Title level={3}>Quản lý Menu Client</Title>
            <Divider />

            <Card
                title={<span><PlusOutlined /> Thêm mục mới</span>}
                style={{ marginBottom: 24 }}
                type="inner"
            >
                <Form
                    form={form}
                    layout="inline"
                    onFinish={handleAdd}
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        name="label"
                        rules={[{ required: true, message: 'Vui lòng nhập nhãn' }]}
                        style={{ flex: 1, minWidth: 200 }}
                    >
                        <Input
                            placeholder="Nhãn (label)"
                            prefix={<MenuOutlined />}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="href"
                        rules={[{ required: true, message: 'Vui lòng nhập liên kết' }]}
                        style={{ flex: 1, minWidth: 200 }}
                    >
                        <Input
                            placeholder="Liên kết (href)"
                            prefix={<LinkOutlined />}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="parent"
                        style={{ minWidth: 200 }}
                    >
                        <Select
                            placeholder="-- Top level --"
                            allowClear
                            size="large"
                        >
                            {items.map((it) => (
                                <Option key={it.id} value={it.id}>
                                    {it.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            size="large"
                        >
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title="Danh sách menu" type="inner">
                {items.length === 0 ? (
                    <Empty description="Chưa có mục menu nào" />
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            border: '1px solid #d9d9d9'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #d9d9d9' }}>
                                    <th style={{ width: 30, padding: '8px', textAlign: 'center' }}></th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Nhãn</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Liên kết</th>
                                    <th style={{ width: 150, padding: '8px', textAlign: 'left' }}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <React.Fragment key={item.id}>
                                        {/* Parent item */}
                                        <tr
                                            draggable
                                            onDragStart={() => handleDragStart(item)}
                                            onDragOver={(e) => handleDragOver(e, item)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, item)}
                                            style={{
                                                borderBottom: '1px solid #d9d9d9',
                                                backgroundColor: draggedOverItem?.id === item.id ? '#e6f7ff' : 'transparent',
                                                opacity: draggedItem?.id === item.id ? 0.5 : 1,
                                                cursor: 'grab',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                                <DragOutlined style={{ color: '#bfbfbf', cursor: 'move' }} />
                                            </td>
                                            <td style={{ padding: '8px' }}>
                                                <Space>
                                                    <MenuOutlined style={{ color: '#1890ff' }} />
                                                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                                                    {item.children && item.children.length > 0 && (
                                                        <Tag color="blue">{item.children.length} mục con</Tag>
                                                    )}
                                                </Space>
                                            </td>
                                            <td style={{ padding: '8px', color: '#666' }}>
                                                <Space>
                                                    <LinkOutlined style={{ color: '#52c41a' }} />
                                                    <span>{item.href}</span>
                                                </Space>
                                            </td>
                                            <td style={{ padding: '8px' }}>
                                                <Space size="small">
                                                    <Button
                                                        type="link"
                                                        size="small"
                                                        icon={<EditOutlined />}
                                                        onClick={() => showEditModal(item)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        type="link"
                                                        size="small"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => item.id && handleDelete(item.id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </Space>
                                            </td>
                                        </tr>
                                        
                                        {/* Child items */}
                                        {item.children && item.children.map((child) => (
                                            <tr
                                                key={child.id}
                                                style={{
                                                    borderBottom: '1px solid #f0f0f0',
                                                    backgroundColor: '#fafafa'
                                                }}
                                            >
                                                <td style={{ padding: '8px', textAlign: 'center', color: '#999' }}>└─</td>
                                                <td style={{ padding: '8px', paddingLeft: '32px' }}>
                                                    <Space>
                                                        <MenuOutlined style={{ color: '#999', fontSize: '12px' }} />
                                                        <span style={{ color: '#666' }}>{child.label}</span>
                                                    </Space>
                                                </td>
                                                <td style={{ padding: '8px', color: '#999' }}>
                                                    <Space>
                                                        <LinkOutlined style={{ color: '#999', fontSize: '12px' }} />
                                                        <span>{child.href}</span>
                                                    </Space>
                                                </td>
                                                <td style={{ padding: '8px' }}>
                                                    <Space size="small">
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            icon={<EditOutlined />}
                                                            onClick={() => showEditModal(child)}
                                                        >
                                                            Sửa
                                                        </Button>
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => child.id && handleDelete(child.id)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Space>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <Modal
                title={<span><EditOutlined /> Chỉnh sửa mục menu</span>}
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setEditingItem(null);
                    editForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEdit}
                >
                    <Form.Item
                        label="Nhãn"
                        name="label"
                        rules={[{ required: true, message: 'Vui lòng nhập nhãn' }]}
                    >
                        <Input
                            placeholder="Nhãn (label)"
                            prefix={<MenuOutlined />}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Liên kết"
                        name="href"
                        rules={[{ required: true, message: 'Vui lòng nhập liên kết' }]}
                    >
                        <Input
                            placeholder="Liên kết (href)"
                            prefix={<LinkOutlined />}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => {
                                setEditModalVisible(false);
                                setEditingItem(null);
                                editForm.resetFields();
                            }}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                                Cập nhật
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminMenuEditor;