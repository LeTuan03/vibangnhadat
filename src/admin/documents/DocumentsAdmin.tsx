import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, DatePicker } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { LegalDocument } from '../../types'
import { documentService } from '../api/documentService'
import dayjs from 'dayjs'

const DocumentsAdmin: React.FC = () => {
  const [docs, setDocs] = useState<LegalDocument[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<LegalDocument | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const documents = await documentService.getAllDocuments()
      setDocs(documents)
    } catch (error) {
      console.error('Lỗi tải tài liệu:', error)
      message.error('Không thể tải tài liệu')
    }
  }

  const openAdd = () => { setEditing(null); form.resetFields(); setIsModalOpen(true) }
  const openEdit = (d: LegalDocument) => {
    setEditing(d)
    form.setFieldsValue({
      title: d.title,
      description: d.description,
      category: d.category,
      publishDate: d.publishDate ? dayjs(d.publishDate) : undefined,
      fileUrl: d.fileUrl || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await documentService.deleteDocument(id)
      message.success('Xóa tài liệu thành công')
      load()
    } catch (error) {
      console.error('Lỗi xóa tài liệu:', error)
      message.error('Xóa thất bại')
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        title: values.title,
        description: values.description || '',
        category: values.category,
        publishDate: values.publishDate ? values.publishDate.format('YYYY-MM-DD') : '',
        fileUrl: values.fileUrl || ''
      }
      if (editing && editing.id) {
        await documentService.updateDocument(editing.id, { ...editing, ...payload })
        message.success('Cập nhật tài liệu thành công')
      } else {
        await documentService.createDocument(payload)
        message.success('Thêm tài liệu mới thành công')
      }
      setIsModalOpen(false)
      load()
    } catch (e) {
      console.error('Lỗi lưu tài liệu:', e)
      message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
    }
  }

  const filtered = docs.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Ngày phát hành', dataIndex: 'publishDate', key: 'publishDate', render: (date: string) => date ? new Date(date).toLocaleDateString('vi-VN') : '' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: LegalDocument) => (
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
        <h2>Quản lý Tài liệu Pháp luật</h2>
        <Space>
          <Input.Search placeholder="Tìm kiếm tài liệu..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
        </Space>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />

      <Modal title={editing ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng nhập danh mục' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="publishDate" label="Ngày phát hành">
            <DatePicker />
          </Form.Item>
          <Form.Item name="fileUrl" label="Link file">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DocumentsAdmin
