import type { Service, BlogPost, FAQ, LegalDocument, Testimonial, TeamMember } from '../types';

// Mock Data for Blog Posts
export const mockBlogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'Hướng dẫn lập hợp đồng dân sự',
        excerpt: 'Những điều cần biết khi lập hợp đồng dân sự hợp lệ',
        content: 'Hợp đồng dân sự là một thỏa thuận pháp luật giữa hai hay nhiều bên...',
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-01-15',
        category: 'Luật dân sự',
        image: 'https://via.placeholder.com/400x300?text=Hop+Dong+Dan+Su'
    },
    {
        id: 'blog-2',
        title: 'Quy trình giải quyết tranh chấp lao động',
        excerpt: 'Cách giải quyết hiệu quả các tranh chấp lao động',
        content: 'Tranh chấp lao động là những bất đồng phát sinh giữa người lao động và người sử dụng lao động...',
        author: 'Luật sư Trần Thị B',
        date: '2024-01-10',
        category: 'Luật lao động',
        image: 'https://via.placeholder.com/400x300?text=Tranh+Chap+Lao+Dong'
    },
    {
        id: 'blog-3',
        title: 'Thủ tục ly hôn tại Việt Nam',
        excerpt: 'Các bước cần thiết để hoàn tất thủ tục ly hôn',
        content: 'Ly hôn là sự chấm dứt hôn nhân được công nhân bởi pháp luật...',
        author: 'Luật sư Phạm Văn C',
        date: '2024-01-05',
        category: 'Hôn nhân gia đình',
        image: 'https://via.placeholder.com/400x300?text=Ly+Hon'
    }
];

// Mock Data for Services
export const mockServices: Service[] = [
    {
        id: 'service-1',
        title: 'Luật Doanh Nghiệp',
        description: 'Tư vấn và hỗ trợ pháp lý về thành lập, quản lý doanh nghiệp',
        icon: 'FaBuilding',
        details: [
            'Thành lập và đăng ký doanh nghiệp',
            'Soạn thảo và xử lý hợp đồng',
            'Tư vấn về thuế và kế toán',
            'Giải quyết tranh chấp thương mại'
        ],
        benefits: [
            'Giảm rủi ro pháp lý',
            'Tối ưu hóa hoạt động kinh doanh',
            'Tuân thủ pháp luật',
            'Bảo vệ quyền lợi doanh nghiệp'
        ]
    },
    {
        id: 'service-2',
        title: 'Luật Đất Đai',
        description: 'Tư vấn về quyền sử dụng đất, mua bán, cho thuê bất động sản',
        icon: 'FaHome',
        details: [
            'Tư vấn về quyền sử dụng đất',
            'Xử lý thủ tục mua bán bất động sản',
            'Soạn thảo hợp đồng cho thuê',
            'Xử lý tranh chấp về đất đai'
        ],
        benefits: [
            'Đảm bảo pháp lý cho giao dịch',
            'Bảo vệ quyền sở hữu',
            'Giảm rủi ro trong giao dịch',
            'Hỗ trợ thủ tục hành chính'
        ]
    },
    {
        id: 'service-3',
        title: 'Luật Hôn Nhân Gia Đình',
        description: 'Tư vấn pháp luật về hôn nhân, gia đình, kế thừa',
        icon: 'FaHeart',
        details: [
            'Tư vấn về hôn nhân',
            'Xử lý thủ tục ly hôn',
            'Tư vấn về thừa kế',
            'Bảo vệ quyền lợi trẻ em'
        ],
        benefits: [
            'Bảo vệ quyền lợi các thành viên gia đình',
            'Hỗ trợ giải quyết tranh chấp',
            'Đảm bảo công bằng trong phân chia tài sản',
            'Bảo vệ quyền lợi trẻ em'
        ]
    },
    {
        id: 'service-4',
        title: 'Luật Lao Động',
        description: 'Tư vấn pháp luật về hợp đồng lao động, quyền lợi người lao động',
        icon: 'FaUsers',
        details: [
            'Soạn thảo hợp đồng lao động',
            'Tư vấn về quyền lợi người lao động',
            'Giải quyết tranh chấp lao động',
            'Tư vấn về tiền lương, bảo hiểm'
        ],
        benefits: [
            'Bảo vệ quyền lợi lao động',
            'Tuân thủ pháp luật lao động',
            'Giảm tranh chấp lao động',
            'Hỗ trợ đàm phán hợp đồng'
        ]
    }
];

// Mock Data for Categories
export const mockCategories = [
    { id: 'cat-1', name: 'Luật dân sự', description: 'Các vấn đề liên quan luật dân sự', slug: 'luat-dan-su', target: '/blog', showInMenu: false },
    { id: 'cat-2', name: 'Luật lao động', description: 'Các vấn đề liên quan luật lao động', slug: 'luat-lao-dong', target: '/blog', showInMenu: false },
    { id: 'cat-3', name: 'Hôn nhân gia đình', description: 'Các vấn đề hôn nhân gia đình', slug: 'hon-nhan-gia-dinh', target: '/family-law', showInMenu: true },
    { id: 'cat-4', name: 'Luật đất đai', description: 'Các vấn đề luật đất đai', slug: 'luat-dat-dai', target: '/blog', showInMenu: false },
    { id: 'cat-5', name: 'Luật thương mại', description: 'Các vấn đề luật thương mại', slug: 'luat-thuong-mai', target: '/blog', showInMenu: false }
];

// Mock Data for Legal Documents
export const mockLegalDocuments: LegalDocument[] = [
    {
        id: 'doc-1',
        title: 'Luật Hôn nhân và Gia đình năm 2000',
        description: 'Luật Hôn nhân và Gia đình được sửa đổi, bổ sung năm 2000 của Việt Nam',
        category: 'Hôn nhân gia đình',
        publishDate: '2000-06-01',
        fileUrl: '#'
    },
    {
        id: 'doc-2',
        title: 'Bộ Luật Dân sự năm 2015',
        description: 'Bộ Luật Dân sự của Cộng hòa Xã hội chủ nghĩa Việt Nam',
        category: 'Luật dân sự',
        publishDate: '2015-01-01',
        fileUrl: '#'
    },
    {
        id: 'doc-3',
        title: 'Luật Lao động năm 2012',
        description: 'Luật Lao động của Cộng hòa Xã hội chủ nghĩa Việt Nam',
        category: 'Luật lao động',
        publishDate: '2012-06-18',
        fileUrl: '#'
    }
];

// Mock Data for FAQs (QA)
export const mockFAQs: FAQ[] = [
    {
        id: 'faq-1',
        question: 'Hợp đồng lao động phải có những gì?',
        answer: 'Hợp đồng lao động phải có các thông tin cơ bản về hai bên (người sử dụng lao động và người lao động), vị trí việc làm, mức lương, thời gian làm việc, quyền và nghĩa vụ của hai bên.',
        category: 'Luật lao động'
    },
    {
        id: 'faq-2',
        question: 'Thủ tục ly hôn bao lâu?',
        answer: 'Thủ tục ly hôn thường mất từ 1-3 tháng nếu là ly hôn thỏa thuận, hoặc từ 3-6 tháng nếu là ly hôn tranh chấp tại tòa án.',
        category: 'Hôn nhân gia đình'
    },
    {
        id: 'faq-3',
        question: 'Làm sao để bảo vệ quyền lợi người mua bất động sản?',
        answer: 'Cần kiểm tra giấy tờ pháp lý bất động sản, ký hợp đồng mua bán, thực hiện thủ tục chuyển nhượng tại cơ quan đăng ký đất đai và nhà nước.',
        category: 'Luật đất đai'
    },
    {
        id: 'faq-4',
        question: 'Nhân viên có quyền từ chối làm việc ngoài giờ không?',
        answer: 'Theo Luật Lao động, công ty chỉ được yêu cầu nhân viên làm thêm giờ trong những trường hợp cần thiết và phải thanh toán thù lao làm thêm giờ.',
        category: 'Luật lao động'
    }
];

// Mock Data for Team/Lawyer
export const mockTeamMembers: TeamMember[] = [
    {
        id: 'lawyer-1',
        name: 'Luật sư Nguyễn Văn A',
        position: 'Luật sư chuyên viên Luật Doanh nghiệp',
        bio: 'Hơn 15 năm kinh nghiệm trong lĩnh vực Luật Doanh nghiệp',
        email: 'nguyenvana@viban.vn',
        phone: '0901234567'
    },
    {
        id: 'lawyer-2',
        name: 'Luật sư Trần Thị B',
        position: 'Luật sư chuyên viên Luật Lao động',
        bio: 'Chuyên gia trong giải quyết tranh chấp lao động',
        email: 'tranthib@viban.vn',
        phone: '0902345678'
    }
];

// Mock Data for Viban (Vi bằng)
export const mockVibans = [
    {
        id: 'viban-1',
        name: 'Vi bằng Pháp lý số 001',
        description: 'Vi bằng xác nhận tư cách pháp lý của cá nhân',
        category: 'Xác nhận tư cách',
        status: 'active',
        createdDate: '2024-01-01'
    },
    {
        id: 'viban-2',
        name: 'Vi bằng Hợp đồng số 002',
        description: 'Vi bằng chứng thực hợp đồng mua bán bất động sản',
        category: 'Chứng thực',
        status: 'active',
        createdDate: '2024-01-02'
    }
];

// Mock Data for Testimonials
export const mockTestimonials: Testimonial[] = [
    {
        id: 'test-1',
        name: 'Ông Nguyễn Văn Kiên',
        position: 'Giám đốc công ty ABC',
        company: 'Công ty ABC',
        content: 'Dịch vụ pháp lý của Văn phòng rất chuyên nghiệp và tận tình. Các vấn đề pháp lý của công ty được giải quyết nhanh chóng.',
        rating: 5,
        image: 'https://via.placeholder.com/100x100?text=Kien'
    },
    {
        id: 'test-2',
        name: 'Bà Trần Thị Hương',
        position: 'Chủ tịch HĐQT công ty XYZ',
        company: 'Công ty XYZ',
        content: 'Tôi rất hài lòng với chất lượng tư vấn pháp lý. Các luật sư rất am hiểu luật pháp và tác phong chuyên nghiệp.',
        rating: 5,
        image: 'https://via.placeholder.com/100x100?text=Huong'
    }
];

// Export all mock data
export const mockDataStore = {
    blogPosts: mockBlogPosts,
    services: mockServices,
    categories: mockCategories,
    documents: mockLegalDocuments,
    faqs: mockFAQs,
    teamMembers: mockTeamMembers,
    vibans: mockVibans,
    testimonials: mockTestimonials
};

// Mock Navigation Menu (client menu) - initial copy from content navigation
export const mockNavigation = [
    {
        id: 'home',
        label: 'Trang Chủ',
        href: '/',
    },
    {
        id: 'about',
        label: 'Giới Thiệu',
        href: '#about',
        children: [
            { id: 'about-overview', label: 'Giới thiệu chung', href: '#about' },
            { id: 'about-philosophy', label: 'Đội ngũ', href: '#about' },
            { id: 'about-partners', label: 'Tầm nhìn và xứ mệnh', href: '#about' },
            { id: 'about-careers', label: 'Tuyển dụng', href: '#about' },
        ],
    },
    {
        id: 'services',
        label: 'Dịch Vụ',
        href: '#services',
    },
    {
        id: 'news',
        label: 'Tin Tức & Blog',
        href: '/blog',
        children: [
            { id: 'news-blog', label: 'Thư viện bài viết', href: '/blog' },
            { id: 'news-legal-docs', label: 'Văn bản pháp luật', href: '/documents' },
            { id: 'family-law', label: 'Hôn nhân - Gia đình', href: '/family-law' },
        ],
    },
    {
        id: 'qa',
        label: 'Hỏi Đáp',
        href: '/qa',
    },
];
