
// ============================================
// SERVICE FORM MODAL COMPONENT

import { Service } from '@/types'
import { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Tag, Space, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

// ============================================
interface ServiceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Omit<Service, 'id'> | Service) => void;
    editService?: Service | null;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ isOpen, onClose, onSave, editService }) => {
    const [form] = Form.useForm()
    const [details, setDetails] = useState<string[]>([])
    const [detailInput, setDetailInput] = useState('')

    useEffect(() => {
        if (editService) {
            form.setFieldsValue({ title: editService.title, description: editService.description, icon: editService.icon })
            setDetails(editService.details || [])
        } else {
            form.resetFields()
            setDetails([])
        }
    }, [editService, isOpen, form])

    const addDetail = () => {
        if (detailInput.trim()) {
            setDetails((prev) => [...prev, detailInput.trim()])
            setDetailInput('')
        }
    }

    const removeDetail = (idx: number) => setDetails((prev) => prev.filter((_, i) => i !== idx))

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            if (!values.title || !values.description || !values.icon) {
                message.error('Vui lòng điền đầy đủ thông tin!')
                return
            }
            const payload: any = { ...values, details }
            if (editService) {
                onSave({ ...payload, id: editService.id })
                message.success('Cập nhật dịch vụ thành công!')
            } else {
                onSave(payload)
                message.success('Thêm dịch vụ mới thành công!')
            }
            onClose()
        } catch (e) {
            // validation failed
        }
    }

    return (
        <Modal title={editService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'} open={isOpen} onCancel={onClose} onOk={handleOk} okText={editService ? 'Cập nhật' : 'Thêm mới'}>
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
                    <Input placeholder="Ví dụ: Công chứng hợp đồng" />
                </Form.Item>

                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item name="icon" label="Icon (React Icons)">
                    <Input placeholder="Ví dụ: FaFileContract" />
                </Form.Item>

                <Form.Item label="Chi tiết dịch vụ">
                    <Space style={{ marginBottom: 8 }}>
                        <Input value={detailInput} onChange={(e) => setDetailInput(e.target.value)} onPressEnter={(e) => { e.preventDefault(); addDetail() }} placeholder="Nhập chi tiết và nhấn Enter" />
                        <Button onClick={addDetail}>Thêm</Button>
                    </Space>
                    <div>
                        {details.map((d, i) => (
                            <Tag key={i} closable onClose={() => removeDetail(i)} style={{ marginBottom: 8 }} icon={<DeleteOutlined />}>
                                {d}
                            </Tag>
                        ))}
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}