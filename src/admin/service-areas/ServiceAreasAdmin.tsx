import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Image } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ServiceArea } from '../../types'
import { serviceAreaService } from '../api/serviceAreaService'

const ServiceAreasAdmin: React.FC = () => {
  const [areas, setAreas] = useState<ServiceArea[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceArea | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()
  const [detailsText, setDetailsText] = useState('')
  const [benefitsText, setBenefitsText] = useState('')
  const [servicesText, setServicesText] = useState('')
  const [processText, setProcessText] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const allAreas = await serviceAreaService.getAllServiceAreas()
      setAreas(allAreas)
    } catch (error) {
      console.error('Lỗi tải service areas:', error)
      message.error('Không thể tải service areas')
    }
  }

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setDetailsText('')
    setBenefitsText('')
    setServicesText('')
    setProcessText('')
    setContactPhone('')
    setContactEmail('')
    setIsModalOpen(true)
  }

  const openEdit = (a: ServiceArea) => {
    setEditing(a)
    form.setFieldsValue({ title: a.title, description: a.description, image: a.image })
    setDetailsText((a.details || []).join('\n'))
    setBenefitsText(((a as any).benefits || []).join('\n'))
    // servicesOffered stored as array of { title, description }
    if ((a as any).servicesOffered) {
      setServicesText(((a as any).servicesOffered as any[]).map(s => `${s.title}|${s.description || ''}`).join('\n'))
    } else {
      setServicesText('')
    }
    setProcessText(((a as any).processSteps || []).join('\n'))
    setContactPhone(((a as any).contactCTA && (a as any).contactCTA.phone) || '')
    setContactEmail(((a as any).contactCTA && (a as any).contactCTA.email) || '')
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const ok = await serviceAreaService.deleteServiceArea(id)
      if (ok) {
        message.success('Xóa thành công')
        load()
      } else {
        message.error('Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi xóa service area:', error)
      message.error('Xóa thất bại')
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      
      // Parse details
      const details = detailsText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
      
      // Parse benefits
      const benefits = benefitsText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
      
      // Parse services text lines into objects
      const servicesOffered = servicesText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map(l => {
          const [title, desc] = l.split('|')
          return { title: (title || '').trim(), description: (desc || '').trim() }
        })
      
      // Parse process steps
      const processSteps = processText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)

      const payload = {
        title: values.title,
        description: values.description || '',
        image: values.image || '',
        details,
        benefits,
        servicesOffered,
        processSteps,
        contactCTA: { phone: contactPhone || '', email: contactEmail || '' },
      }
      
      if (editing && editing.id) {
        await serviceAreaService.updateServiceArea(editing.id, payload)
        message.success('Cập nhật thành công')
      } else {
        await serviceAreaService.createServiceArea(payload)
        message.success('Thêm mới thành công')
      }
      setIsModalOpen(false)
      load()
    } catch (e) {
      console.error('Lỗi lưu service area:', e)
      message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
    }
  }

  const filtered = areas.filter((a) => (a.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()))

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

      <Modal title={editing ? 'Sửa Lĩnh Vực Dịch Vụ' : 'Thêm Lĩnh Vực Dịch Vụ'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy" width={700}>
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
          <Form.Item label="Chi tiết (mỗi dòng 1 mục)">
            <Input.TextArea 
              rows={3} 
              value={detailsText} 
              onChange={(e) => setDetailsText(e.target.value)}
              placeholder="Nhập mỗi chi tiết trên một dòng"
            />
          </Form.Item>
          <Form.Item label="Lợi ích (mỗi dòng 1 mục)">
            <Input.TextArea 
              rows={3} 
              value={benefitsText} 
              onChange={(e) => setBenefitsText(e.target.value)}
              placeholder="Nhập mỗi lợi ích trên một dòng"
            />
          </Form.Item>
          <Form.Item label="Dịch vụ chính (mỗi dòng: Tiêu đề|Mô tả)">
            <Input.TextArea 
              rows={4} 
              value={servicesText} 
              onChange={(e) => setServicesText(e.target.value)} 
              placeholder="Ví dụ: Tư vấn|Tư vấn chi tiết..."
            />
          </Form.Item>
          <Form.Item label="Quy trình (mỗi dòng 1 bước)">
            <Input.TextArea 
              rows={3} 
              value={processText} 
              onChange={(e) => setProcessText(e.target.value)}
              placeholder="Nhập mỗi bước trên một dòng"
            />
          </Form.Item>
          <Form.Item label="Liên hệ (sẽ hiển thị ở CTA)">
            <Input placeholder="Số điện thoại" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} style={{ marginBottom: 8 }} />
            <Input placeholder="Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ServiceAreasAdmin