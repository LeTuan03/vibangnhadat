import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Image } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ServiceArea } from '../../types'
import { serviceAreaService } from '../api/serviceAreaService'
import { mockServiceAreas } from '../../data/mockData'

const ServiceAreasAdmin: React.FC = () => {
  const [areas, setAreas] = useState<ServiceArea[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceArea | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    serviceAreaService.initialize(mockServiceAreas)
    load()
  }, [])

  const load = () => setAreas(serviceAreaService.getAllServiceAreas())

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEdit = (a: ServiceArea) => {
    setEditing(a)
    form.setFieldsValue({ title: a.title, description: a.description, image: a.image })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    const ok = serviceAreaService.deleteServiceArea(id)
    if (ok) {
      message.success('Xóa thành công')
      load()
    } else message.error('Xóa thất bại')
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = { title: values.title, description: values.description || '', image: values.image || '' }
      if (editing && editing.id) {
        serviceAreaService.updateServiceArea(editing.id, payload)
        message.success('Cập nhật thành công')
      } else {
        serviceAreaService.createServiceArea(payload)
        message.success('Thêm mới thành công')
      }
      setIsModalOpen(false)
      load()
    } catch (e) {}
  }

  const filtered = areas.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Hình ảnh', dataIndex: 'image', key: 'image', render: (src: string) => src ? <Image src={src} alt="thumb" width={80} /> : null },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: ServiceArea) => (
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
        <h2>Quản Lý Lĩnh Vực Dịch Vụ</h2>
        <Space>
          <Input.Search placeholder="Tìm kiếm..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
        </Space>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />

      <Modal title={editing ? 'Sửa Lĩnh Vực Dịch Vụ' : 'Thêm Lĩnh Vực Dịch Vụ'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="URL hình ảnh">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ServiceAreasAdmin
