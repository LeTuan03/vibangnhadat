// src/admin/news/NewAdmin.tsx (Improved admin management with advanced features)

import { useEffect, useState, useMemo } from 'react'
import { BlogPost } from '@/types'
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import { Table, Button, Input, Card, Space, Popconfirm, message, Tag, Select, Statistic, Row, Col, Badge, Tooltip } from 'antd'
import { BlogFormModal } from './BlogFormModal'
import { blogService } from '../api/blogService'

function NewsAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('date-desc')

    useEffect(() => {
        loadPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadPosts = async () => {
        try {
            const allPosts = await blogService.getAllPosts()
            setPosts(allPosts)
        } catch (error) {
            console.error('Lỗi tải bài viết:', error)
            message.error('Không thể tải bài viết')
        }
    }

    const handleAddNew = () => {
        setEditingPost(null)
        setIsModalOpen(true)
    }

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post)
        setIsModalOpen(true)
    }

    const handleSave = async (postData: Omit<BlogPost, 'id'> | BlogPost) => {
        try {
            if ('id' in postData) {
                const updated = await blogService.updatePost(postData.id, postData)
                setPosts((prev) => prev.map((p) => (p.id === postData.id ? updated : p)))
                message.success('Cập nhật bài viết thành công!')
            } else {
                const newPost = await blogService.createPost(postData)
                setPosts((prev) => [newPost, ...prev])
                message.success('Thêm bài viết mới thành công!')
            }
            setIsModalOpen(false)
            setEditingPost(null)
            // Reload to sync with Firebase
            await loadPosts()
        } catch (error: any) {
            console.error('Lỗi lưu bài viết:', error)
            const errorMessage = error.message || 'Lỗi không xác định';
            message.error(`Không thể lưu bài viết: ${errorMessage}`);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await blogService.deletePost(id)
            setPosts((prev) => prev.filter((post) => post.id !== id))
            message.success('Xóa bài viết thành công!')
        } catch (error) {
            console.error('Lỗi xóa bài viết:', error)
            message.error('Xóa thất bại')
        }
    }

    const handleToggleFeatured = async (post: BlogPost) => {
        try {
            const updated = await blogService.updatePost(post.id, {
                ...post,
                featured: !post.featured
            })
            setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)))
            message.success(`${!post.featured ? 'Đánh dấu' : 'Bỏ dấu'} bài viết nổi bật thành công`)
        } catch (error) {
            console.error('Lỗi cập nhật bài viết:', error)
            message.error('Cập nhật thất bại')
        }
    }

    const handleUpdateStatus = async (post: BlogPost, status: 'draft' | 'published' | 'archived') => {
        try {
            const updated = await blogService.updatePost(post.id, {
                ...post,
                status
            })
            setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)))
            message.success(`Cập nhật trạng thái thành công`)
        } catch (error) {
            console.error('Lỗi cập nhật bài viết:', error)
            message.error('Cập nhật thất bại')
        }
    }

    // Get unique categories
    const categories = useMemo(
        () => ['all', ...new Set(posts.map((p) => p.category))],
        [posts]
    )

    // Filter posts
    const filteredPosts = useMemo(() => {
        let result = posts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) || false)

            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
            const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus

            return matchesSearch && matchesCategory && matchesStatus
        })

        // Sort
        result = result.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                case 'date-asc':
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                case 'views-desc':
                    return (b.views || 0) - (a.views || 0)
                case 'title-asc':
                    return a.title.localeCompare(b.title)
                default:
                    return 0
            }
        })

        return result
    }, [posts, searchTerm, selectedCategory, selectedStatus, sortBy])

    // Stats
    const stats = useMemo(() => ({
        total: posts.length,
        published: posts.filter(p => p.status === 'published').length,
        draft: posts.filter(p => p.status === 'draft').length,
        featured: posts.filter(p => p.featured).length,
    }), [posts])

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            render: (text: string, record: BlogPost) => (
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        {record.featured && <StarFilled style={{ color: '#faad14', marginRight: 8 }} />}
                        {text}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {record.excerpt}
                    </div>
                </div>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            width: 120,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: 120,
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string | undefined, record: BlogPost) => {
                const statusVal = (status || 'published') as 'draft' | 'published' | 'archived';
                return (
                    <Select
                        value={statusVal}
                        style={{ width: '100%' }}
                        onChange={(val: 'draft' | 'published' | 'archived') => handleUpdateStatus(record, val)}
                        options={[
                            { label: 'Đã xuất bản', value: 'published' },
                            { label: 'Nháp', value: 'draft' },
                            { label: 'Lưu trữ', value: 'archived' },
                        ]}
                    />
                );
            },
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
            sorter: (a: BlogPost, b: BlogPost) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            key: 'views',
            width: 80,
            render: (views: number) => (
                <Badge count={views || 0} style={{ backgroundColor: '#52c41a' }} />
            ),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            render: (tags: string[]) => (
                <Space size={0} wrap>
                    {(tags || []).slice(0, 2).map((tag) => (
                        <Tag key={tag} color="cyan" style={{ fontSize: '11px' }}>{tag}</Tag>
                    ))}
                    {(tags || []).length > 2 && <span style={{ fontSize: '11px' }}>+{(tags || []).length - 2}</span>}
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 140,
            fixed: 'right' as const,
            render: (_: any, record: BlogPost) => (
                <Space size="small">
                    <Tooltip title={record.featured ? 'Bỏ dấu nổi bật' : 'Đánh dấu nổi bật'}>
                        <Button
                            type="text"
                            size="small"
                            icon={record.featured ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                            onClick={() => handleToggleFeatured(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa bài viết này?"
                        description="Hành động này không thể hoàn tác"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger type="text" size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h2>Quản lý Tin tức & Blog</h2>
            </div>

            {/* Statistics */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng bài viết"
                            value={stats.total}
                            suffix="bài"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Đã xuất bản"
                            value={stats.published}
                            suffix="bài"
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Nháp"
                            value={stats.draft}
                            suffix="bài"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Nổi bật"
                            value={stats.featured}
                            suffix="bài"
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Filters */}
            <Card style={{ marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginBottom: 12 }}>
                    <Input.Search
                        placeholder="Tìm kiếm theo tiêu đề, tác giả, tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                    <Select
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        options={[
                            { label: 'Tất cả danh mục', value: 'all' },
                            ...categories.filter(c => c !== 'all').map(cat => ({ label: cat, value: cat }))
                        ]}
                    />
                    <Select
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={[
                            { label: 'Tất cả trạng thái', value: 'all' },
                            { label: 'Đã xuất bản', value: 'published' },
                            { label: 'Nháp', value: 'draft' },
                            { label: 'Lưu trữ', value: 'archived' },
                        ]}
                    />
                    <Select
                        value={sortBy}
                        onChange={setSortBy}
                        options={[
                            { label: 'Mới nhất', value: 'date-desc' },
                            { label: 'Cũ nhất', value: 'date-asc' },
                            { label: 'Lượt xem nhiều', value: 'views-desc' },
                            { label: 'Tiêu đề A-Z', value: 'title-asc' },
                        ]}
                    />
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
                    Thêm bài viết mới
                </Button>
            </Card>

            {/* Posts Table */}
            <Card>
                <Table
                    dataSource={filteredPosts}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1200 }}
                    locale={{
                        emptyText: searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                            ? 'Không tìm thấy bài viết phù hợp'
                            : 'Chưa có bài viết nào'
                    }}
                    size="small"
                />
                <div style={{ marginTop: 16, color: '#6b7280', fontSize: '12px' }}>
                    Hiển thị <strong>{filteredPosts.length}</strong> / <strong>{posts.length}</strong> bài viết
                </div>
            </Card>

            <BlogFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingPost(null)
                }}
                onSave={handleSave}
                editPost={editingPost}
            />
        </div>
    )
}

export default NewsAdmin