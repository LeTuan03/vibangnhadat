import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Image } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FamilyLawQA } from '../../types'
import { familyLawService } from '../api/familyLawService'

const FamilyLawAdmin: React.FC = () => {
  const [laws, setLaws] = useState<FamilyLawQA[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<FamilyLawQA | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const allLaws = await familyLawService.getAllFamilyLaws()
      setLaws(allLaws)
    } catch (error) {
      console.error('Lỗi tải family law:', error)
      message.error('Không thể tải family law')
    }
  }

  const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
  const openEdit = (l: FamilyLawQA) => { setEditing(l); form.setFieldsValue({ question: l.question, shortDescription: l.shortDescription, image: l.image }); setIsModalOpen(true) }

  const handleDelete = async (id: string) => {
    try {
      const ok = await familyLawService.deleteFamilyLaw(id)
      if (ok) {
        message.success('Xóa thành công')
        load()
      } else {
        message.error('Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi xóa family law:', error)
      message.error('Xóa thất bại')
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = { question: values.question, shortDescription: values.shortDescription || '', image: values.image || '' }
      if (editing && editing.id) {
        await familyLawService.updateFamilyLaw(editing.id, payload)
        message.success('Cập nhật thành công')
      } else {
        await familyLawService.createFamilyLaw(payload)
        message.success('Thêm mới thành công')
      }
      setIsModalOpen(false)
      load()
    } catch (e) {
      console.error('Lỗi lưu family law:', e)
      message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
    }
  }

  const filtered = laws.filter(l => l.question.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { title: 'Câu hỏi', dataIndex: 'question', key: 'question' },
    { title: 'Mô tả ngắn', dataIndex: 'shortDescription', key: 'shortDescription' },
    { title: 'Hình ảnh', dataIndex: 'image', key: 'image', render: (src: string) => src ? <Image src={src} alt="thumb" width={80} /> : null },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: FamilyLawQA) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Quản Lý Hôn Nhân - Gia Đình</h2>
        <Space>
          <Input.Search placeholder="Tìm kiếm..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
        </Space>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />

      <Modal title={editing ? 'Sửa Hôn Nhân - Gia Đình' : 'Thêm Hôn Nhân - Gia Đình'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical">
          <Form.Item name="question" label="Câu hỏi" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="shortDescription" label="Mô tả ngắn">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="image" label="URL Hình ảnh">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FamilyLawAdmin
