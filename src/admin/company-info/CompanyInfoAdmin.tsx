import React, { useState, useEffect } from 'react'
import { Card, Tabs, Form, Input, InputNumber, Button, Space, Typography, Divider, message } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { companyInfoService } from '../api/companyInfoService'
import { mockContactInfo, mockCompanyInfo } from '../../data/mockData'

const { TextArea } = Input
const { Title } = Typography

const CompanyInfoAdmin: React.FC = () => {
    const [contactForm] = Form.useForm()
    const [companyForm] = Form.useForm()
    const [contactInfo, setContactInfo] = useState(mockContactInfo)
    const [companyInfo, setCompanyInfo] = useState(mockCompanyInfo)

    useEffect(() => {
        companyInfoService.initializeContactInfo(mockContactInfo)
        companyInfoService.initializeCompanyInfo(mockCompanyInfo)
        contactForm.setFieldsValue(contactInfo)
        companyForm.setFieldsValue({
            ...companyInfo,
            values: companyInfo.values.join('\n')
        })
    }, [])

    const handleSaveContact = async (values: any) => {
        try {
            const updatedInfo = {
                ...values,
                coordinates: {
                    lat: values.lat,
                    lng: values.lng
                }
            }
            delete updatedInfo.lat
            delete updatedInfo.lng
            
            setContactInfo(updatedInfo)
            companyInfoService.updateContactInfo(updatedInfo)
            message.success('Cập nhật thông tin liên hệ thành công')
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật')
        }
    }

    const handleSaveCompany = async (values: any) => {
        try {
            const updatedInfo = {
                ...values,
                values: values.values.split('\n').filter((v: string) => v.trim())
            }
            
            setCompanyInfo(updatedInfo)
            companyInfoService.updateCompanyInfo(updatedInfo)
            message.success('Cập nhật thông tin công ty thành công')
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật')
        }
    }

    const contactTab = (
        <Card bordered={false}>
            <Form
                form={contactForm}
                layout="vertical"
                onFinish={handleSaveContact}
                initialValues={{
                    ...contactInfo,
                    lat: contactInfo.coordinates.lat,
                    lng: contactInfo.coordinates.lng
                }}
            >
                <Title level={4}>Thông Tin Liên Hệ</Title>
                <Divider />

                <Form.Item
                    label="Điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="0123 456 789" size="large" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="info@company.com" size="large" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Nhập địa chỉ công ty" size="large" />
                </Form.Item>

                <Form.Item
                    label="Giờ làm việc"
                    name="workingHours"
                    rules={[{ required: true, message: 'Vui lòng nhập giờ làm việc' }]}
                >
                    <Input prefix={<ClockCircleOutlined />} placeholder="8:00 - 17:00" size="large" />
                </Form.Item>

                <Form.Item
                    label="Link Zalo"
                    name="zaloLink"
                >
                    <Input placeholder="https://zalo.me/..." size="large" />
                </Form.Item>

                <Form.Item
                    label="Link Facebook"
                    name="facebookLink"
                >
                    <Input placeholder="https://facebook.com/..." size="large" />
                </Form.Item>

                <Form.Item
                    label="Google Maps Link"
                    name="googleMapsLink"
                >
                    <Input placeholder="https://maps.google.com/..." size="large" />
                </Form.Item>

                <Title level={5} style={{ marginTop: 24 }}>Tọa độ bản đồ</Title>
                <Space size="large" style={{ width: '100%' }}>
                    <Form.Item
                        label="Vĩ độ (Latitude)"
                        name="lat"
                        rules={[{ required: true, message: 'Vui lòng nhập vĩ độ' }]}
                        style={{ flex: 1, marginBottom: 0 }}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="21.0285"
                            step={0.000001}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Kinh độ (Longitude)"
                        name="lng"
                        rules={[{ required: true, message: 'Vui lòng nhập kinh độ' }]}
                        style={{ flex: 1, marginBottom: 0 }}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="105.8542"
                            step={0.000001}
                            size="large"
                        />
                    </Form.Item>
                </Space>

                <Divider />
                
                <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block>
                        Lưu thông tin liên hệ
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )

    const companyTab = (
        <Card bordered={false}>
            <Form
                form={companyForm}
                layout="vertical"
                onFinish={handleSaveCompany}
                initialValues={{
                    ...companyInfo,
                    values: companyInfo.values.join('\n')
                }}
            >
                <Title level={4}>Thông Tin Công Ty</Title>
                <Divider />

                <Form.Item
                    label="Tên công ty"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
                >
                    <Input placeholder="Tên viết tắt" size="large" />
                </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ' }]}
                >
                    <Input placeholder="Tên đầy đủ công ty" size="large" />
                </Form.Item>

                <Form.Item
                    label="Khẩu hiệu"
                    name="slogan"
                >
                    <Input placeholder="Slogan của công ty" size="large" />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Mô tả về công ty"
                        showCount
                        maxLength={500}
                    />
                </Form.Item>

                <Form.Item
                    label="Tầm nhìn"
                    name="vision"
                    rules={[{ required: true, message: 'Vui lòng nhập tầm nhìn' }]}
                >
                    <TextArea
                        rows={3}
                        placeholder="Tầm nhìn của công ty"
                        showCount
                        maxLength={300}
                    />
                </Form.Item>

                <Form.Item
                    label="Sứ mệnh"
                    name="mission"
                    rules={[{ required: true, message: 'Vui lòng nhập sứ mệnh' }]}
                >
                    <TextArea
                        rows={3}
                        placeholder="Sứ mệnh của công ty"
                        showCount
                        maxLength={300}
                    />
                </Form.Item>

                <Form.Item
                    label="Giá trị cốt lõi"
                    name="values"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị cốt lõi' }]}
                    extra="Mỗi dòng một giá trị"
                >
                    <TextArea
                        rows={5}
                        placeholder="Chất lượng&#10;Uy tín&#10;Trách nhiệm&#10;Sáng tạo"
                    />
                </Form.Item>

                <Divider />
                
                <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block>
                        Lưu thông tin công ty
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )

    const items = [
        {
            key: 'contact',
            label: 'Thông tin liên hệ',
            children: contactTab
        },
        {
            key: 'company',
            label: 'Thông tin công ty',
            children: companyTab
        }
    ]

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Card
                title={
                    <Title level={3} style={{ margin: 0 }}>
                        Quản Lý Thông Tin Công Ty
                    </Title>
                }
                style={{ margin: '0 auto' }}
            >
                <Tabs items={items} size="large" />
            </Card>
        </div>
    )
}

export default CompanyInfoAdmin