import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FAQ } from '../../types'
import { qaService } from '../api/qaService'

const QAAdmin: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const allFaqs = await qaService.getAllFAQs()
      setFaqs(allFaqs)
    } catch (error) {
      console.error('Lỗi tải FAQ:', error)
      message.error('Không thể tải FAQ')
    }
  }

  const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
  const openEdit = (f: FAQ) => { setEditing(f); form.setFieldsValue({ question: f.question, answer: f.answer, category: f.category }); setIsModalOpen(true) }

  const handleDelete = async (id: string) => {
    try {
      await qaService.deleteFAQ(id)
      message.success('Xóa câu hỏi thành công')
      load()
    } catch (error) {
      console.error('Lỗi xóa FAQ:', error)
      message.error('Xóa thất bại')
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = { question: values.question, answer: values.answer, category: values.category }
      if (editing && editing.id) {
        await qaService.updateFAQ(editing.id, { ...editing, ...payload })
        message.success('Cập nhật câu hỏi thành công')
      } else {
        await qaService.createFAQ(payload)
        message.success('Thêm câu hỏi mới thành công')
      }
      load()
      setIsModalOpen(false)
    } catch (e) {
      console.error('Lỗi lưu FAQ:', e)
      message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
    }
  }

  const filtered = faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.category.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { title: 'Câu hỏi', dataIndex: 'question', key: 'question' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    {
      title: 'Hành động', key: 'actions', render: (_: any, record: FAQ) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Quản lý Hỏi & Đáp</h2>
        <Space>
          <Input.Search placeholder="Tìm kiếm câu hỏi..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
        </Space>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />

      <Modal title={editing ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical">
          <Form.Item name="question" label="Câu hỏi" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="answer" label="Trả lời" rules={[{ required: true, message: 'Vui lòng nhập trả lời' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng nhập danh mục' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default QAAdmin

