import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Tabs,
  Tag,
  Drawer,
  Divider,
  Select,
  Checkbox,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { FAQ } from '../../types';
import { qaService } from '../api/qaService';
import QAFirebaseService from '../../services/QAFirebaseService';
import './QAAdmin.css';

const QAAdmin: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewingFAQ, setViewingFAQ] = useState<FAQ | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFAQs();
    loadCategories();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const allFaqs = await qaService.getAllFAQs();
      setFaqs(allFaqs);
    } catch (error) {
      console.error('Lỗi tải FAQ:', error);
      message.error('Không thể tải FAQ');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await QAFirebaseService.getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Lỗi tải danh mục:', error);
    }
  };

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (f: FAQ) => {
    setEditing(f);
    form.setFieldsValue({
      question: f.question,
      answer: f.answer,
      category: f.category,
      detailedExplanation: f.detailedExplanation,
      relatedLaws: f.relatedLaws?.join('\n') || '',
      examples: f.examples?.join('\n') || '',
      tags: f.tags,
      isImportant: f.isImportant || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await qaService.deleteFAQ(id);
      message.success('Xóa câu hỏi thành công');
      loadFAQs();
    } catch (error) {
      console.error('Lỗi xóa FAQ:', error);
      message.error('Xóa thất bại');
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload: Partial<FAQ> = {
        question: values.question,
        answer: values.answer,
        category: values.category,
        detailedExplanation: values.detailedExplanation,
        relatedLaws: values.relatedLaws
          ? values.relatedLaws.split('\n').filter((l: string) => l.trim())
          : undefined,
        examples: values.examples
          ? values.examples.split('\n').filter((e: string) => e.trim())
          : undefined,
        tags: values.tags || undefined,
        isImportant: values.isImportant || false,
      };

      if (editing && editing.id) {
        await qaService.updateFAQ(editing.id, payload);
        message.success('Cập nhật câu hỏi thành công');
      } else {
        await qaService.createFAQ(payload as Omit<FAQ, 'id'>);
        message.success('Thêm câu hỏi mới thành công');
      }
      loadFAQs();
      setIsModalOpen(false);
    } catch (e) {
      console.error('Lỗi lưu FAQ:', e);
      message.error(
        `Lỗi lưu dữ liệu: ${e instanceof Error ? e.message : 'Lỗi không xác định'}`
      );
    }
  };

  const openViewer = (faq: FAQ) => {
    setViewingFAQ(faq);
    setViewerOpen(true);
  };

  const filteredFAQs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.detailedExplanation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || f.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Quan trọng',
      dataIndex: 'isImportant',
      key: 'isImportant',
      render: (isImportant: boolean) =>
        isImportant ? <Tag color="red">Quan trọng</Tag> : '',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      render: (views: number) => views || 0,
    },
    {
      title: 'Hữu ích',
      dataIndex: 'helpfulCount',
      key: 'helpfulCount',
      render: (count: number) => count || 0,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: '180px',
      render: (_: any, record: FAQ) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => openViewer(record)}
            title="Xem chi tiết"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
            title="Sửa"
          />
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} title="Xóa" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const stats = {
    total: faqs.length,
    important: faqs.filter((f) => f.isImportant).length,
    categories: categories.length,
    totalViews: faqs.reduce((sum, f) => sum + (f.views || 0), 0),
  };

  return (
    <div className="qa-admin-container">
      <Tabs
        items={[
          {
            key: 'manage',
            label: 'Quản lý FAQ',
            children: (
              <div>
                {/* Statistics */}
                <div className="stats-grid" style={{ marginBottom: 24 }}>
                  <div className="stat-card">
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Tổng câu hỏi</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.important}</div>
                    <div className="stat-label">Câu hỏi quan trọng</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.categories}</div>
                    <div className="stat-label">Danh mục</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.totalViews}</div>
                    <div className="stat-label">Tổng lượt xem</div>
                  </div>
                </div>

                <Divider />

                {/* Filters and Actions */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <Space>
                    <Input.Search
                      placeholder="Tìm kiếm câu hỏi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: 250 }}
                      allowClear
                    />
                    <Select
                      style={{ width: 200 }}
                      placeholder="Lọc danh mục"
                      value={categoryFilter}
                      onChange={setCategoryFilter}
                      options={[
                        { label: 'Tất cả danh mục', value: 'all' },
                        ...categories.map((cat) => ({
                          label: cat,
                          value: cat,
                        })),
                      ]}
                    />
                  </Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAdd}
                  >
                    Thêm mới
                  </Button>
                </div>

                {/* Table */}
                <Table
                  dataSource={filteredFAQs}
                  columns={columns}
                  rowKey={(r: any) => r.id}
                  loading={loading}
                  locale={{ emptyText: 'Không có dữ liệu' }}
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                />
              </div>
            ),
          },
          {
            key: 'stats',
            label: 'Thống kê & Phân tích',
            children: (
              <div>
                <h3>Câu hỏi được xem nhiều nhất</h3>
                {faqs
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 5)
                  .map((faq) => (
                    <div
                      key={faq.id}
                      style={{
                        padding: 8,
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      <div>{faq.question}</div>
                      <div style={{ color: '#999', fontSize: 12 }}>
                        Lượt xem: {faq.views || 0} | Hữu ích: {faq.helpfulCount || 0}
                      </div>
                    </div>
                  ))}

                <Divider />

                <h3>Phân bố theo danh mục</h3>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 8,
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <span>{cat}</span>
                    <span>{faqs.filter((f) => f.category === cat).length}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />

      {/* Edit/Add Modal */}
      <Modal
        title={editing ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditing(null);
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={900}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="question"
            label="Câu hỏi"
            rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
          >
            <Input placeholder="Nhập câu hỏi..." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select
              placeholder="Chọn danh mục..."
              options={categories.map((cat) => ({ label: cat, value: cat }))}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="answer"
            label="Câu trả lời (ngắn)"
            rules={[{ required: true, message: 'Vui lòng nhập câu trả lời' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập câu trả lời ngắn gọn..." />
          </Form.Item>

          <Form.Item
            name="detailedExplanation"
            label="Giải thích chi tiết"
          >
            <Input.TextArea
              rows={6}
              placeholder="Nhập giải thích chi tiết, chia thành các phần với newline..."
            />
          </Form.Item>

          <Form.Item
            name="relatedLaws"
            label="Văn bản pháp luật liên quan (mỗi dòng một văn bản)"
          >
            <Input.TextArea
              rows={4}
              placeholder="Ví dụ:
Luật Thừa phát lại 2011
Nghị định 125/2013/NĐ-CP
Thông tư 08/2014/TT-BTP"
            />
          </Form.Item>

          <Form.Item
            name="examples"
            label="Ví dụ thực tế (mỗi dòng một ví dụ)"
          >
            <Input.TextArea
              rows={4}
              placeholder="Ví dụ:
Ông A mua nhà và lập vi bằng để bảo vệ quyền
Chị B cho vay với thế chấp..."
            />
          </Form.Item>

          <Form.Item name="tags" label="Thẻ (Tags)" tooltip="Cách nhau bằng dấu phẩy">
            <Select
              mode="tags"
              placeholder="Nhập các thẻ..."
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item name="isImportant" valuePropName="checked">
            <Checkbox>Đánh dấu là câu hỏi quan trọng</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      {/* Viewer Drawer */}
      <Drawer
        title="Chi tiết câu hỏi"
        onClose={() => setViewerOpen(false)}
        open={viewerOpen}
        width={700}
      >
        {viewingFAQ && (
          <div className="faq-viewer">
            <div className="section">
              <h4>Câu hỏi</h4>
              <p style={{ fontSize: 16, fontWeight: 600 }}>{viewingFAQ.question}</p>
            </div>

            <div className="section">
              <h4>Danh mục & Thẻ</h4>
              <Tag color="blue">{viewingFAQ.category}</Tag>
              {viewingFAQ.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="section">
              <h4>Câu trả lời</h4>
              <p>{viewingFAQ.answer}</p>
            </div>

            {viewingFAQ.detailedExplanation && (
              <div className="section">
                <h4>Giải thích chi tiết</h4>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {viewingFAQ.detailedExplanation}
                </div>
              </div>
            )}

            {viewingFAQ.relatedLaws && viewingFAQ.relatedLaws.length > 0 && (
              <div className="section">
                <h4>Văn bản pháp luật liên quan</h4>
                <ul>
                  {viewingFAQ.relatedLaws.map((law, idx) => (
                    <li key={idx}>{law}</li>
                  ))}
                </ul>
              </div>
            )}

            {viewingFAQ.examples && viewingFAQ.examples.length > 0 && (
              <div className="section">
                <h4>Ví dụ thực tế</h4>
                <ul>
                  {viewingFAQ.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="section">
              <h4>Thống kê</h4>
              <p>Lượt xem: {viewingFAQ.views || 0}</p>
              <p>Lượt hữu ích: {viewingFAQ.helpfulCount || 0}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default QAAdmin;

