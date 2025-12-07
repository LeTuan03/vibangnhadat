import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Table, Button, Input, Card, Space, Popconfirm, message, Modal, Form } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getAllVibans, createViban, updateViban, deleteViban } from '../../services'

const { Search } = Input

interface Viban {
	id?: string
	title: string
	description: string
	requirements: string[]
	process: string[]
	fees: string
}

const VibanAdmin: FC = () => {
	const [vibans, setVibans] = useState<Viban[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editing, setEditing] = useState<Viban | null>(null)
	const [form] = Form.useForm()
	const [_loading, setLoading] = useState(false)

	useEffect(() => {
		loadVibans()
	}, [])

	const loadVibans = async () => {
		try {
			setLoading(true)
			const data = await getAllVibans()
			setVibans(data)
		} catch (error) {
			console.error('Lỗi tải vi bằng:', error)
			message.error('Không thể tải dữ liệu vi bằng')
		} finally {
			setLoading(false)
		}
	}

	const openAdd = () => {
		setEditing(null)
		form.resetFields()
		setIsModalOpen(true)
	}

	const openEdit = (v: Viban) => {
		setEditing(v)
		form.setFieldsValue({
			...v,
			requirements: v.requirements?.join(', ') ?? '',
			process: v.process?.join(', ') ?? '',
		})
		setIsModalOpen(true)
	}

	const handleDelete = async (id?: string) => {
		if (!id) return
		try {
			await deleteViban(id)
			message.success('Xóa vi bằng thành công')
			loadVibans()
		} catch (error) {
			console.error('Lỗi xóa vi bằng:', error)
			message.error('Xóa thất bại')
		}
	}

	const handleSave = async () => {
		try {
			const values = await form.validateFields()
			const payload: any = {
				title: values.title,
				description: values.description,
				requirements: (values.requirements || '').split(',').map((s: string) => s.trim()).filter(Boolean),
				process: (values.process || '').split(',').map((s: string) => s.trim()).filter(Boolean),
				fees: values.fees || '',
			}

			if (editing && editing.id) {
				await updateViban(editing.id, payload)
				message.success('Cập nhật vi bằng thành công')
			} else {
				await createViban(payload)
				message.success('Thêm vi bằng mới thành công')
			}

			setIsModalOpen(false)
			form.resetFields()
			setEditing(null)
			loadVibans()
		} catch (err) {
			console.error('Lỗi lưu vi bằng:', err)
			message.error(`Lỗi lưu dữ liệu: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`)
		}
	}

	const filtered = vibans.filter((v) =>
		(v.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
		(v.description || '').toLowerCase().includes(searchTerm.toLowerCase())
	)

	const columns = [
		{ title: 'Tên', dataIndex: 'title', key: 'title' },
		{ title: 'Mô tả', dataIndex: 'description', key: 'description', render: (d: string) => (d ? (d.length > 120 ? d.slice(0, 120) + '...' : d) : '') },
		{ title: 'Phí', dataIndex: 'fees', key: 'fees' },
		{
			title: 'Hành động',
			key: 'actions',
			render: (_: any, record: Viban) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
					<Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
						<Button danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<h2>Quản lý Vi bằng</h2>
				<Space>
					<Search placeholder="Tìm kiếm vi bằng..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 320 }} allowClear />
					<Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
				</Space>
			</div>

			<Card>
				<Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />
			</Card>

			<Modal title={editing ? 'Chỉnh sửa Vi bằng' : 'Thêm Vi bằng'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
				<Form form={form} layout="vertical">
					<Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Mô tả">
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item name="requirements" label="Yêu cầu (phân cách bằng dấu phẩy)">
						<Input />
					</Form.Item>
					<Form.Item name="process" label="Quy trình (phân cách bằng dấu phẩy)">
						<Input />
					</Form.Item>
					<Form.Item name="fees" label="Phí">
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default VibanAdmin
