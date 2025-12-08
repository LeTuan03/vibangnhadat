import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Table, Button, Space, Popconfirm, Card, Typography, ConfigProvider } from 'antd'
import { blogService } from './api/blogService'
import type { BlogPost } from '../types'
import CategoryAdmin from './category/CategoryAdmin'
import TestimonialsAdmin from './testimonials/TestimonialsAdmin'
import LegalArticlesAdmin from './legal-articles/LegalArticlesAdmin'
import LegalTermsAdmin from './legal-terms/LegalTermsAdmin'
import LawExplanationsAdmin from './law-explanations/LawExplanationsAdmin'
import ReferencesAdmin from './references/ReferencesAdmin'

const { Sider, Content } = Layout
const { Title, Text } = Typography

// Red theme configuration
const redTheme = {
    token: {
        colorPrimary: '#d32f2f',
        colorSuccess: '#d32f2f',
        colorWarning: '#ff9800',
        colorError: '#d32f2f',
        borderRadius: 6,
    },
}

interface AdminDashboardProps {
    onLogout: () => void
}

type AdminTab = 'news' | 'category' | 'services' | 'viban' | 'statistics' | 'serviceAreas' | 'familyLaw' | 'gallery' | 'team' | 'company' | 'testimonials'
    | 'legalArticles' | 'legalTerms' | 'lawExplanations' | 'references'

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('news')
    const [posts, setPosts] = useState<BlogPost[]>([])

    React.useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        try {
            const allPosts = await blogService.getAllPosts()
            setPosts(allPosts)
        } catch (error) {
            console.error('Lỗi tải bài viết:', error)
        }
    }

    const handleDeletePost = (id: string) => {
        setPosts(posts.filter((post) => post.id !== id))
    }

    const menuItems = [
        { key: 'news', label: 'Tin tức & Blog' },
            { key: 'category', label: 'Danh mục' },
        { key: 'services', label: 'Dịch vụ' },
        { key: 'viban', label: 'Vi bằng' },
        { key: 'statistics', label: 'Thống kê' },
        { key: 'serviceAreas', label: 'Lĩnh vực dịch vụ' },
        { key: 'familyLaw', label: 'Hôn nhân - Gia đình' },
        { key: 'gallery', label: 'Thư viện' },
        { key: 'testimonials', label: 'Lời chứng thực' },
        { key: 'legalArticles', label: 'Bài viết pháp luật' },
        { key: 'legalTerms', label: 'Thuật ngữ pháp luật' },
        { key: 'lawExplanations', label: 'Giải thích văn bản' },
        { key: 'references', label: 'Tài liệu tham khảo' },
        { key: 'team', label: 'Đội ngũ' },
        { key: 'company', label: 'Thông tin công ty' },
    ]

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Tác giả', dataIndex: 'author', key: 'author' },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            key: 'date',
            render: (d: string) => new Date(d).toLocaleDateString('vi-VN'),
        },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: BlogPost) => (
                <Space>
                    <Button type="default">Sửa</Button>
                    <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDeletePost(record.id)} okText="Xóa" cancelText="Hủy">
                        <Button danger> Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <ConfigProvider theme={redTheme}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={240} style={{ background: '#d32f2f', borderRight: '1px solid #b71c1c' }}>
                    <div style={{ padding: 16, textAlign: 'center' }}>
                        <Title level={4} style={{ margin: 0, color: '#fff' }}>
                            Admin Panel
                        </Title>
                        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Văn phòng Thừa phát lại</Text>
                    </div>

                    <Menu 
                        mode="inline" 
                        selectedKeys={[activeTab]} 
                        onClick={(e) => setActiveTab(e.key as AdminTab)} 
                        items={menuItems}
                        style={{ border: 'none', background: '#d32f2f', color: '#fff' }}
                        theme="dark"
                    />

                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Link to="/" style={{ color: '#fff' }}>Về trang chủ</Link>
                        <Button block onClick={onLogout} danger style={{ background: '#b71c1c', borderColor: '#b71c1c' }}>
                            Đăng xuất
                        </Button>
                    </Space>
                </div>
            </Sider>

            <Layout>
                <Content style={{ padding: 24, background: '#f5f5f5' }}>
                    {activeTab === 'news' && (
                        <>
                            <Title level={4} style={{ margin: 0, marginBottom: 16, color: '#d32f2f' }}>
                                Quản lý Tin tức & Blog
                            </Title>
                            <Card>
                                <Table dataSource={posts} columns={columns} rowKey="id" />
                            </Card>
                        </>
                    )}

                    {activeTab === 'category' && (
                        <CategoryAdmin />
                    )}

                    {activeTab === 'testimonials' && (
                        <TestimonialsAdmin />
                    )}

                    {activeTab === 'legalArticles' && (
                        <LegalArticlesAdmin />
                    )}

                    {activeTab === 'legalTerms' && (
                        <LegalTermsAdmin />
                    )}

                    {activeTab === 'lawExplanations' && (
                        <LawExplanationsAdmin />
                    )}

                    {activeTab === 'references' && (
                        <ReferencesAdmin />
                    )}

                    {activeTab !== 'news' && activeTab !== 'category' && (
                        <Card>
                            <Text>Chức năng quản lý cho mục "{activeTab}" đang chờ triển khai.</Text>
                        </Card>
                    )}
                </Content>
            </Layout>
        </Layout>
        </ConfigProvider>
    )
}

export default AdminDashboard
