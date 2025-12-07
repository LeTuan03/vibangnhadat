import React from 'react'
import 'antd/dist/reset.css'
import '../documents/Admin.css'
import './AdminLayout.css'
import { FaFileContract, FaNewspaper, FaUsers, FaQuestionCircle, FaList, FaBook, FaTrophy, FaMapMarkerAlt, FaImage, FaInfo, FaHeart } from 'react-icons/fa'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Space, Button, Typography } from 'antd'

const { Sider, Content } = Layout
const { Title, Text } = Typography

interface LayoutProps {
    children?: React.ReactNode
    onLogout?: () => void
}

const menuConfig: Array<{ key: string; path: string; label: string; icon: React.ReactNode }> = [
    { key: 'news', path: '/admin/news', label: 'Tin tức & Blog', icon: <FaNewspaper /> },
    { key: 'services', path: '/admin/services', label: 'Dịch vụ', icon: <FaFileContract /> },
    { key: 'viban', path: '/admin/viban', label: 'Vi bằng', icon: <FaUsers /> },
    { key: 'category', path: '/admin/category', label: 'Danh mục', icon: <FaList /> },
    { key: 'documents', path: '/admin/documents', label: 'Tài liệu', icon: <FaBook /> },
    { key: 'qa', path: '/admin/qa', label: 'Hỏi & Đáp', icon: <FaQuestionCircle /> },
    { key: 'statistics', path: '/admin/statistics', label: 'Thống kê', icon: <FaTrophy /> },
    { key: 'service-areas', path: '/admin/service-areas', label: 'Lĩnh vực dịch vụ', icon: <FaMapMarkerAlt /> },
    { key: 'family-law', path: '/admin/family-law', label: 'Hôn nhân - Gia đình', icon: <FaHeart /> },
    { key: 'gallery', path: '/admin/gallery', label: 'Thư viện ảnh & Video', icon: <FaImage /> },
    { key: 'team', path: '/admin/team', label: 'Đội ngũ', icon: <FaUsers /> },
    { key: 'company-info', path: '/admin/company-info', label: 'Thông tin công ty', icon: <FaInfo /> },
    { key: 'menu', path: '/admin/menu', label: 'Menu Client', icon: <FaList /> },
]

const AdminLayout: React.FC<LayoutProps> = ({ children, onLogout }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const getSelectedKey = () => {
        const found = menuConfig.find((m) => location.pathname.startsWith(m.path))
        return found ? found.key : 'news'
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={240} className="custom-admin-sider" style={{ background: 'linear-gradient(180deg, #b91c1c, #7f1d1d)', borderRight: 'none' }}>
                <div style={{ padding: 16, textAlign: 'center', borderBottom: "1px solid white" }}>
                    <Title level={4} style={{ margin: 0, color: '#fff' }}>
                        Admin Panel
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Văn phòng Thừa phát lại</Text>
                </div>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[getSelectedKey()]}
                    style={{ border: 'none', background: 'transparent', color: '#fff' }}
                    onClick={(info) => {
                        const item = menuConfig.find(m => m.key === String(info.key))
                        if (item) navigate(item.path)
                    }}
                    items={menuConfig.map(m => ({ key: m.key, icon: m.icon, label: m.label }))}
                />

                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Button type="link" style={{ color: 'rgba(255,255,255,0.95)' }} onClick={() => navigate('/')}>Về trang chủ</Button>
                        <Button block onClick={onLogout} style={{ background: '#fff', color: '#b91c1c', borderRadius: 6 }}>Đăng xuất</Button>
                    </Space>
                </div>
            </Sider>

            <Layout>
                <Content style={{ padding: 24, height: '100vh', backgroundColor: '#f3f4f6', overflow: 'auto' }}>
                    {children ?? <Outlet />}
                </Content>
            </Layout>
        </Layout >
    )
}

export default AdminLayout