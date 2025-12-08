import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Image, Tabs, TabsProps } from 'antd'
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

  const openAdd = () => { 
    setEditing(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEdit = (l: FamilyLawQA) => { 
    setEditing(l)
    form.setFieldsValue({
      question: l.question,
      shortDescription: l.shortDescription,
      image: l.image,
      fullDescription: l.fullDescription || '',
      overview: l.overview || '',
      definition: l.definition || '',
      relatedLaws: l.relatedLaws?.join('\n') || '',
      processSteps: l.processSteps?.map(s => `${s.title}\n${s.description}`).join('\n---\n') || '',
      tips: l.tips?.join('\n') || '',
    })
    setIsModalOpen(true)
  }

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
      
      // Parse process steps
      const processSteps = values.processSteps
        ?.split('---')
        .filter((s: string) => s.trim())
        .map((s: string) => {
          const [title, ...descParts] = s.trim().split('\n')
          return {
            title: title?.trim() || '',
            description: descParts.join('\n').trim() || ''
          }
        }) || []

      const payload = {
        question: values.question,
        shortDescription: values.shortDescription || '',
        image: values.image || '',
        fullDescription: values.fullDescription || '',
        overview: values.overview || '',
        definition: values.definition || '',
        relatedLaws: values.relatedLaws
          ?.split('\n')
          .filter((l: string) => l.trim())
          .map((l: string) => l.trim()) || [],
        processSteps,
        tips: values.tips
          ?.split('\n')
          .filter((t: string) => t.trim())
          .map((t: string) => t.trim()) || [],
      }

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
    { title: 'Câu hỏi', dataIndex: 'question', key: 'question', width: '40%' },
    { title: 'Mô tả ngắn', dataIndex: 'shortDescription', key: 'shortDescription', width: '35%', render: (text: string) => text?.substring(0, 50) + '...' },
    { title: 'Hình ảnh', dataIndex: 'image', key: 'image', width: '15%', render: (src: string) => src ? <Image src={src} alt="thumb" width={80} /> : '-' },
    {
      title: 'Hành động',
      key: 'actions',
      width: '10%',
      render: (_: any, record: FamilyLawQA) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin cơ bản',
      children: (
        <>
          <Form.Item name="question" label="Câu hỏi *" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
            <Input placeholder="VD: Thủ tục ly hôn như thế nào?" />
          </Form.Item>
          <Form.Item name="shortDescription" label="Mô tả ngắn *" rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}>
            <Input.TextArea rows={3} placeholder="Mô tả ngắn gọn về câu hỏi" />
          </Form.Item>
          <Form.Item name="image" label="URL Hình ảnh">
            <Input placeholder="https://..." />
          </Form.Item>
        </>
      ),
    },
    {
      key: '2',
      label: 'Nội dung chi tiết',
      children: (
        <>
          <Form.Item name="overview" label="Tổng quan vấn đề">
            <Input.TextArea rows={4} placeholder="Giải thích tổng quát về vấn đề" />
          </Form.Item>
          <Form.Item name="definition" label="Khái niệm & định nghĩa">
            <Input.TextArea rows={4} placeholder="Định nghĩa pháp lý chi tiết" />
          </Form.Item>
          <Form.Item name="relatedLaws" label="Quy định pháp luật liên quan (mỗi dòng 1 quy định)">
            <Input.TextArea rows={4} placeholder={"Bộ Luật Dân sự năm 2015\nLuật Hôn nhân và Gia đình năm 2000\nCác quyết định hướng dẫn của Tòa án Tối cao"} />
          </Form.Item>
        </>
      ),
    },
    {
      key: '3',
      label: 'Hướng dẫn & Lời khuyên',
      children: (
        <>
          <Form.Item name="processSteps" label="Hướng dẫn từng bước (ngăn cách mỗi bước bằng ---)">
            <Input.TextArea 
              rows={6} 
              placeholder={"Bước 1: Chuẩn bị giấy tờ\nChuẩn bị đầy đủ các chứng chỉ, hợp đồng...\n---\nBước 2: Tư vấn với luật sư\nGặp luật sư để được tư vấn cụ thể..."} 
            />
          </Form.Item>
          <Form.Item name="tips" label="Lưu ý quan trọng (mỗi dòng 1 lưu ý)">
            <Input.TextArea 
              rows={4} 
              placeholder={"Chuẩn bị đầy đủ giấy tờ trước khi làm thủ tục\nLiên hệ cơ quan có thẩm quyền để xác nhận\nSe hết, hãy lưu giữ tất cả chứng chỉ"} 
            />
          </Form.Item>
          <Form.Item name="fullDescription" label="Nội dung chi tiết (tổng hợp)">
            <Input.TextArea rows={8} placeholder="Nội dung chi tiết full mô tả (nếu muốn hiển thị tất cả nội dung trong 1 trường)" />
          </Form.Item>
        </>
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

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} pagination={{ pageSize: 10 }} />

      <Modal 
        title={editing ? 'Chỉnh sửa: Hôn Nhân - Gia Đình' : 'Thêm mới: Hôn Nhân - Gia Đình'} 
        open={isModalOpen} 
        onOk={handleSave} 
        onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} 
        okText="Lưu" 
        cancelText="Hủy"
        width={900}
      >
        <Form form={form} layout="vertical">
          <Tabs items={tabItems} />
        </Form>
      </Modal>
    </div>
  )
}

export default FamilyLawAdmin
