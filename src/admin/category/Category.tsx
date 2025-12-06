import { blogPosts } from "@/data/content";
import { BlogPost } from "@/types";
import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { CategoryFormModal } from "./CategoryFormModal";
import { blogService } from "../api/blogService";
import { toast } from "react-toastify";

function Category() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Khởi tạo dữ liệu khi component mount
    useEffect(() => {
        blogService.initializePosts(blogPosts);
        loadPosts();
    }, []);

    // Load danh sách bài viết
    const loadPosts = () => {
        const allPosts = blogService.getAllPosts();
        setPosts(allPosts);
    };

    // Xử lý thêm mới
    const handleAddNew = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    // Xử lý chỉnh sửa
    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    // Xử lý lưu (thêm mới hoặc cập nhật)
    const handleSave = (postData: Omit<BlogPost, 'id'> | BlogPost) => {
        if ('id' in postData) {
            // Cập nhật
            const updated = blogService.updatePost(postData.id, postData);
            if (updated) {
                setPosts(posts.map(p => p.id === postData.id ? updated : p));
                toast.success('Cập nhật bài viết thành công!');
            }
        } else {
            // Thêm mới
            const newPost = blogService.createPost(postData);
            setPosts([newPost, ...posts]);
            toast.success('Thêm bài viết mới thành công!');
        }
        setIsModalOpen(false);
        setEditingPost(null);
    };

    // Xử lý xóa
    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            const success = blogService.deletePost(id);
            if (success) {
                setPosts(posts.filter(post => post.id !== id));
                toast.success('Xóa bài viết thành công!');
            }
        }
    };

    // Lọc bài viết theo từ khóa tìm kiếm
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="admin-header">
                <h1>Quản lý Tin tức & Blog</h1>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    <FaPlus /> Thêm mới
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề, tác giả, danh mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                    style={{ maxWidth: '400px' }}
                />
            </div>

            <div className="admin-content">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Tên danh mục</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                        {searchTerm ? 'Không tìm thấy bài viết phù hợp' : 'Chưa có bài viết nào'}
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td>
                                            <strong>{post.title}</strong>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-icon btn-edit"
                                                    title="Sửa"
                                                    onClick={() => handleEdit(post)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn-icon btn-delete"
                                                    title="Xóa"
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Statistics */}
                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ color: '#6b7280' }}>
                        Tổng số bài viết: <strong>{posts.length}</strong>
                        {searchTerm && ` | Kết quả tìm kiếm: ${filteredPosts.length}`}
                    </div>
                </div>
            </div>

            {/* Modal thêm/sửa */}
            {<CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingPost(null);
                }}
                onSave={handleSave}
                editPost={editingPost}
            />}
        </div>
    );
}

export default Category;