import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, Typography, Divider, Modal, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, LinkOutlined } from '@ant-design/icons';
import { getAllNavigationItems, createNavigationItem, updateNavigationItem, deleteNavigationItem } from '../../services';

export interface NavItem {
    id?: string;
    label: string;
    href: string;
    children?: NavItem[];
}

const { Title } = Typography;
const { Option } = Select;

const generateId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

const AdminMenuEditor: React.FC = () => {
    const [items, setItems] = useState<NavItem[]>([]);
    const [form] = Form.useForm();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [editForm] = Form.useForm();    useEffect(() => {
        loadNavigation();
    }, []);

    const loadNavigation = async () => {
        try {
            const data = await getAllNavigationItems();
            setItems(data || []);
        } catch (error) {
            console.error('Lỗi tải menu:', error);
            message.error('Không thể tải menu');
        }
    };

    const handleAdd = async (values: any) => {
        try {
            const newItem: NavItem = {
                id: generateId(values.label),
                label: values.label.trim(),
                href: values.href.trim()
            };
            await createNavigationItem(newItem);
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

    const mainColumns = [
        {
            title: 'Nhãn',
            dataIndex: 'label',
            key: 'label',
            render: (text: string, record: NavItem) => (
                <Space>
                    <MenuOutlined style={{ color: '#1890ff' }} />
                    <span style={{ fontWeight: 600 }}>{text}</span>
                    {record.children && record.children.length > 0 && (
                        <Tag color="blue">{record.children.length} mục con</Tag>
                    )}
                </Space>
            )
        },
        {
            title: 'Liên kết',
            dataIndex: 'href',
            key: 'href',
            render: (text: string) => (
                <Space>
                    <LinkOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#666' }}>{text}</span>
                </Space>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_: any, record: NavItem) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => record.id && handleDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            )
        }
    ];

    const childColumns = [
        {
            title: 'Nhãn',
            dataIndex: 'label',
            key: 'label',
            render: (text: string) => (
                <Space style={{ paddingLeft: 24 }}>
                    <span style={{ color: '#999' }}>└─</span>
                    <span>{text}</span>
                </Space>
            )
        },
        {
            title: 'Liên kết',
            dataIndex: 'href',
            key: 'href',
            render: (text: string) => (
                <Space>
                    <LinkOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#666' }}>{text}</span>
                </Space>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_: any, record: NavItem) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => record.id && handleDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Card style={{ maxWidth: 1400, margin: '0 auto' }}>
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
                    <Table
                        columns={mainColumns}
                        dataSource={items}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />

                    {items.map((it) => it.children && it.children.length > 0 && (
                        <div key={it.id} style={{ marginTop: 24 }}>
                            <Title level={5}>
                                <Tag color="blue">Mục con của: {it.label}</Tag>
                            </Title>
                            <Table
                                columns={childColumns}
                                dataSource={it.children}
                                rowKey="id"
                                pagination={false}
                                bordered
                                size="small"
                            />
                        </div>
                    ))}
                </Card>
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