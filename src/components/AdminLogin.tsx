import React from 'react'
import { Form, Input, Button, Typography, Alert, Card, ConfigProvider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

// Red theme configuration
const redTheme = {
    token: {
        colorPrimary: '#d32f2f',
    },
}

interface AdminLoginProps {
    onLogin: (username: string, password: string) => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [form] = Form.useForm()
    const [error, setError] = React.useState<string | null>(null)

    const handleFinish = (values: { username: string; password: string }) => {
        setError(null)
        const { username, password } = values
        if (username === 'admin' && password === 'admin123') {
            onLogin(username, password)
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng!')
        }
    }

    return (
        <ConfigProvider theme={redTheme}>
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' }}>
                <Card style={{ width: 420, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Title level={3} style={{ color: '#d32f2f', margin: 0 }}>Quản Trị Hệ Thống</Title>
                        <Text type="secondary">Văn phòng Thừa phát lại</Text>
                    </div>

                    {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

                    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ username: 'admin', password: 'admin123' }}>
                        <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                            <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
                        </Form.Item>

                        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                        <Text type="secondary"><strong>Demo:</strong> admin / admin123</Text>
                        <div style={{ marginTop: 6 }}>
                            <Link to="/">Sang Landing page</Link>
                        </div>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    )
}

export default AdminLogin
