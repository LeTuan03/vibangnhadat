// src/admin/news/NewAdmin.tsx (refactored to use Ant Design)

import { useEffect, useState } from 'react'
import { BlogPost } from '@/types'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Input, Card, Space, Popconfirm, message } from 'antd'
import { BlogFormModal } from './BlogFormModal'
import { blogService } from '../api/blogService'
import { mockBlogPosts } from '@/data/mockData'

const { Search } = Input

function NewsAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        blogService.initializePosts(mockBlogPosts)
        loadPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadPosts = () => {
        const allPosts = blogService.getAllPosts()
        setPosts(allPosts)
    }

    const handleAddNew = () => {
        setEditingPost(null)
        setIsModalOpen(true)
    }

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post)
        setIsModalOpen(true)
    }

    const handleSave = (postData: Omit<BlogPost, 'id'> | BlogPost) => {
        if ('id' in postData) {
            const updated = blogService.updatePost(postData.id, postData)
            if (updated) {
                setPosts((prev) => prev.map((p) => (p.id === postData.id ? updated : p)))
                message.success('Cập nhật bài viết thành công!')
            }
        } else {
            const newPost = blogService.createPost(postData)
            setPosts((prev) => [newPost, ...prev])
            message.success('Thêm bài viết mới thành công!')
        }
        setIsModalOpen(false)
        setEditingPost(null)
    }

    const handleDelete = (id: string) => {
        const success = blogService.deletePost(id)
        if (success) {
            setPosts((prev) => prev.filter((post) => post.id !== id))
            message.success('Xóa bài viết thành công!')
        } else {
            message.error('Xóa thất bại')
        }
    }

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: BlogPost) => (
                <div style={{ maxWidth: 400 }}>
                    <strong>{text}</strong>
                    <div style={{ color: '#6b7280', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{record.excerpt}</div>
                </div>
            ),
        },
        { title: 'Tác giả', dataIndex: 'author', key: 'author' },
        { title: 'Ngày đăng', dataIndex: 'date', key: 'date', render: (d: string) => new Date(d).toLocaleDateString('vi-VN') },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: BlogPost) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Bạn có chắc muốn xóa bài viết này?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Quản lý Tin tức & Blog</h2>
                <div>
                    <Space>
                        <Search placeholder="Tìm kiếm theo tiêu đề, tác giả, danh mục..." onSearch={(v) => setSearchTerm(v)} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 320 }} allowClear />
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
            </div>

            <Card>
                <Table dataSource={filteredPosts} columns={columns} rowKey="id" locale={{ emptyText: searchTerm ? 'Không tìm thấy bài viết phù hợp' : 'Chưa có bài viết nào' }} />

                <div style={{ marginTop: 16, color: '#6b7280' }}>
                    Tổng số bài viết: <strong>{posts.length}</strong>
                    {searchTerm && ` | Kết quả tìm kiếm: ${filteredPosts.length}`}
                </div>
            </Card>

            <BlogFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingPost(null); }} onSave={handleSave} editPost={editingPost} />
        </div>
    )
}

export default NewsAdmin