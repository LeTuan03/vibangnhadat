import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Table, Button, Input, Card, Space, Popconfirm, message, Modal, Form } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import VibanFirebaseService from '../../services/VibanFirebaseService'
import type { Viban } from '../../types'

const { Search } = Input

const VibanAdmin: FC = () => {
	const [vibans, setVibans] = useState<Viban[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editing, setEditing] = useState<Viban | null>(null)
	const [form] = Form.useForm()
	const [_loading, setLoading] = useState(false)
	const [requirements, setRequirements] = useState<string[]>([])
	const [process, setProcess] = useState<string[]>([])
	const [benefits, setBenefits] = useState<string[]>([])

	useEffect(() => {
		loadVibans()
	}, [])

	const loadVibans = async () => {
		try {
			setLoading(true)
			const data = await VibanFirebaseService.getAllVibans()
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
		setRequirements([])
		setProcess([])
		setBenefits([])
		setIsModalOpen(true)
	}

	const openEdit = (v: Viban) => {
		setEditing(v)
		form.setFieldsValue({
			title: v.title,
			description: v.description,
			fees: v.fees,
			image: v.image,
		})
		setRequirements(v.requirements || [])
		setProcess(v.process || [])
		setBenefits(v.benefits || [])
		setIsModalOpen(true)
	}

	const handleDelete = async (id?: string) => {
		if (!id) return
		try {
			await VibanFirebaseService.deleteViban(id)
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
			const payload: Partial<Viban> = {
				title: values.title,
				description: values.description,
				fees: values.fees,
				image: values.image || '',
				requirements,
				process,
				benefits,
			}

			if (editing && editing.id) {
				await VibanFirebaseService.updateViban(editing.id, payload)
				message.success('Cập nhật vi bằng thành công')
			} else {
				await VibanFirebaseService.createViban(payload as Omit<Viban, 'id'>)
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
				<h2>Quản lý Vi bằng (Lập Công Chứng)</h2>
				<Space>
					<Search placeholder="Tìm kiếm vi bằng..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 320 }} allowClear />
					<Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
				</Space>
			</div>

			<Card>
				<Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />
			</Card>

			<Modal title={editing ? 'Chỉnh sửa Vi bằng' : 'Thêm Vi bằng'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy" width={700}>
				<Form form={form} layout="vertical">
					<Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
						<Input placeholder="VD: Vi bằng Dân sự, Vi bằng Hợp đồng Mua bán Bất động sản" />
					</Form.Item>
					<Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
						<Input.TextArea rows={3} placeholder="Mô tả chi tiết về loại vi bằng này" />
					</Form.Item>
					<Form.Item name="fees" label="Phí cấp vi bằng" rules={[{ required: true, message: 'Vui lòng nhập phí' }]}>
						<Input placeholder="VD: 200.000đ - 500.000đ" />
					</Form.Item>
					<Form.Item name="image" label="URL Hình ảnh">
						<Input placeholder="https://example.com/image.jpg" />
					</Form.Item>
					<Form.Item label="Yêu cầu (mỗi dòng một yêu cầu)">
						<Input.TextArea
							rows={4}
							value={requirements.join('\n')}
							onChange={(e) => setRequirements(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
							placeholder="Giấy CMND/CCCD của các bên liên quan&#10;Chứng chỉ khai sinh&#10;Hóa đơn điện, nước"
						/>
					</Form.Item>
					<Form.Item label="Quy trình (mỗi dòng một bước)">
						<Input.TextArea
							rows={4}
							value={process.join('\n')}
							onChange={(e) => setProcess(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
							placeholder="Nộp hồ sơ đầy đủ tại cơ quan thừa phát lại&#10;Kiểm tra và làm rõ thông tin&#10;Tiếp xúc xác nhận ý nguyện các bên&#10;Cấp vi bằng"
						/>
					</Form.Item>
					<Form.Item label="Lợi ích (mỗi dòng một lợi ích)">
						<Input.TextArea
							rows={3}
							value={benefits.join('\n')}
							onChange={(e) => setBenefits(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
							placeholder="Xác thực pháp lý&#10;Tiết kiệm thời gian&#10;Bảo vệ quyền lợi"
						/>
					</Form.Item>
					<div style={{ marginTop: 16, color: '#666' }}>
						<p><strong>Yêu cầu:</strong> {requirements.length} mục | <strong>Quy trình:</strong> {process.length} bước | <strong>Lợi ích:</strong> {benefits.length} mục</p>
					</div>
				</Form>
			</Modal>
		</div>
	)
}

export default VibanAdmin
