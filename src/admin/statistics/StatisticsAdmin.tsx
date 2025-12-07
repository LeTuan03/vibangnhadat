import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Statistic } from '../../types'
import { statisticsService } from '../api/statisticsService'

const StatisticsAdmin: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<Statistic | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const allStatistics = await statisticsService.getAllStatistics()
      setStatistics(allStatistics)
    } catch (error) {
      console.error('Lỗi tải statistics:', error)
      message.error('Không thể tải statistics')
    }
  }

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEdit = (s: Statistic) => {
    setEditing(s)
    form.setFieldsValue({ label: s.label, value: s.value, suffix: s.suffix, icon: s.icon })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const ok = await statisticsService.deleteStatistic(id)
      if (ok) {
        message.success('Xóa thành công')
        load()
      } else {
        message.error('Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi xóa statistics:', error)
      message.error('Xóa thất bại')
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = { label: values.label, value: values.value, suffix: values.suffix || '', icon: values.icon || '' }
      if (editing && editing.id) {
        await statisticsService.updateStatistic(editing.id, payload)
        message.success('Cập nhật thành công')
      } else {
        await statisticsService.createStatistic(payload)
        message.success('Thêm mới thành công')
      }
      setIsModalOpen(false)
      load()
    } catch (e) {
      console.error('Lỗi lưu statistics:', e)
      message.error(`Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`)
    }
  }

  const filtered = statistics.filter((s) => s.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'label', key: 'label' },
    { title: 'Giá trị', dataIndex: 'value', key: 'value' },
    { title: 'Hậu tố', dataIndex: 'suffix', key: 'suffix' },
    { title: 'Biểu tượng', dataIndex: 'icon', key: 'icon' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Statistic) => (
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
        <h2>Quản Lý Thống Kê</h2>
        <Space>
          <Input.Search placeholder="Tìm kiếm..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 300 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm mới</Button>
        </Space>
      </div>

      <Table dataSource={filtered} columns={columns} rowKey={(r: any) => r.id} locale={{ emptyText: 'Không có dữ liệu' }} />

      <Modal title={editing ? 'Sửa Thống Kê' : 'Thêm Thống Kê'} open={isModalOpen} onOk={handleSave} onCancel={() => { setIsModalOpen(false); form.resetFields(); setEditing(null) }} okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical">
          <Form.Item name="label" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="value" label="Giá trị" rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="suffix" label="Hậu tố">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="Biểu tượng">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default StatisticsAdmin;
