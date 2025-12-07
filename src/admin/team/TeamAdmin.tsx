import { useState, useEffect } from 'react'
import { Table, Button, Input, Card, Modal, Form, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { TeamMember } from '../../types'
import { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../services'

const { Search } = Input

const TeamAdmin: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [form] = Form.useForm()
    const [_loading, setLoading] = useState(false)

    useEffect(() => {
        loadTeamMembers()
    }, [])

    const loadTeamMembers = async () => {
        try {
            setLoading(true)
            const data = await getAllTeamMembers()
            setMembers(data)
        } catch (error) {
            console.error('Lỗi tải thành viên đội ngũ:', error)
            message.error('Không thể tải dữ liệu thành viên đội ngũ')
        } finally {
            setLoading(false)
        }
    }

    const handleAddNew = () => {
        setEditingId(null)
        form.resetFields()
        setIsModalOpen(true)
    }

    const handleEdit = (member: TeamMember) => {
        setEditingId(member.id)
        form.setFieldsValue({ name: member.name, position: member.position, email: member.email, phone: member.phone, bio: member.bio })
        setIsModalOpen(true)
    }

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            if (editingId) {
                await updateTeamMember(editingId, values)
                message.success('Cập nhật thành công')
            } else {
                await createTeamMember(values)
                message.success('Thêm mới thành công')
            }
            setIsModalOpen(false)
            loadTeamMembers()
        } catch (err) {
            console.error('Lỗi lưu thành viên đội ngũ:', err)
            message.error(`Lỗi lưu dữ liệu: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTeamMember(id)
            message.success('Xóa thành công')
            loadTeamMembers()
        } catch (error) {
            console.error('Lỗi xóa thành viên:', error)
            message.error('Xóa thất bại')
        }
    }

    const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
        { title: 'Email', dataIndex: 'email', key: 'email', render: (e: string) => e || '-' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (p: string) => p || '-' },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: TeamMember) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Bạn chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản Lý Đội Ngũ</h2>
                <Space>
                    <Search placeholder="Tìm kiếm..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 240 }} allowClear />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>Thêm mới</Button>
                </Space>
            </div>

            <Card>
                <Table dataSource={filteredMembers} columns={columns} rowKey="id" />
            </Card>

            <Modal title={editingId ? 'Sửa Thành Viên Đội Ngũ' : 'Thêm Thành Viên Đội Ngũ'} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleSave} okText="Lưu">
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng nhập chức vụ' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Điện thoại">
                        <Input />
                    </Form.Item>
                    <Form.Item name="bio" label="Tiểu sử">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TeamAdmin;
