import type { Service, BlogPost, FAQ, LegalDocument, Testimonial, TeamMember, Statistic, ContactInfo, ServiceArea, FamilyLawQA, GalleryItem } from '../types';

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
    },
    {
        id: 'test-3',
        name: 'Anh Hoàng Minh',
        position: 'Giám đốc',
        company: 'Công ty TNHH ABC',
        content: 'Dịch vụ chuyên nghiệp, nhanh chóng. Đội ngũ thừa phát lại tận tâm, hỗ trợ nhiệt tình. Tôi rất hài lòng với chất lượng dịch vụ.',
        rating: 5,
        image: 'https://via.placeholder.com/100x100?text=Minh'
    },
    {
        id: 'test-4',
        name: 'Chị Lan Anh',
        position: 'Chủ doanh nghiệp',
        company: 'Cửa hàng XYZ',
        content: 'Văn phòng uy tín, giá cả hợp lý. Thủ tục lập vi bằng rất nhanh, chỉ mất 2 ngày. Tôi sẽ giới thiệu cho bạn bè.',
        rating: 5,
        image: 'https://via.placeholder.com/100x100?text=Lan'
    }
];

// Mock Data for Statistics
export const mockStatistics: Statistic[] = [
    {
        id: 'stat-1',
        label: 'Năm kinh nghiệm',
        value: 20,
        suffix: '+',
        icon: 'FaAward'
    },
    {
        id: 'stat-2',
        label: 'Khách hàng hài lòng',
        value: 2500,
        suffix: '+',
        icon: 'FaUsers'
    },
    {
        id: 'stat-3',
        label: 'Vi bằng đã lập',
        value: 8500,
        suffix: '+',
        icon: 'FaFileContract'
    },
    {
        id: 'stat-4',
        label: 'Vụ việc thành công',
        value: 99,
        suffix: '%',
        icon: 'FaCheckCircle'
    }
];

// Mock Data for Contact Info
export const mockContactInfo: ContactInfo = {
    phone: '0901234567',
    email: 'contact@thuaphatlaivn.com',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 - Thứ 6: 8:00 - 17:30 | Thứ 7: 8:00 - 12:00',
    zaloLink: 'https://zalo.me/0901234567',
    facebookLink: 'https://facebook.com/thuaphatlaivn',
    googleMapsLink: 'https://maps.app.goo.gl/uhYNBQh465eRWbyv5',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0099405506357!2d105.82155987531051!3d20.972552580662782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acf99c42598f%3A0xa9b0b7a6cbbebffd!2zNDQyIMSQLiBLaW0gR2lhbmcsIEtpbSBWxINuLCBIb8OabmcgTWFpLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1764762676258!5m2!1svi!2s',
    coordinates: {
        lat: 10.762622,
        lng: 106.660172
    }
};

// Mock Data for Company Info
export const mockCompanyInfo = {
    name: 'Văn phòng Thừa phát lại',
    fullName: 'Văn phòng Thừa phát lại Chuyên nghiệp',
    slogan: 'Uy tín - Chuyên nghiệp - Hiệu quả',
    description: 'Chúng tôi cung cấp các dịch vụ thừa phát lại chuyên nghiệp, đảm bảo quyền lợi hợp pháp của khách hàng theo đúng quy định pháp luật. Với hơn 20 năm kinh nghiệm, chúng tôi tự hào là một trong những văn phòng thừa phát lại uy tín nhất tại Việt Nam.',
    vision: 'Trở thành văn phòng thừa phát lại hàng đầu tại Việt Nam, được khách hàng tin tưởng và lựa chọn.',
    mission: 'Cung cấp dịch vụ thừa phát lại chất lượng cao, góp phần xây dựng hệ thống tư pháp minh bạch, công bằng.',
    values: [
        'Chuyên nghiệp trong mọi hoạt động',
        'Uy tín và trách nhiệm với khách hàng',
        'Tuân thủ nghiêm ngặt pháp luật',
        'Không ngừng học hỏi và phát triển'
    ]
};

// Mock Data for Service Areas
export const mockServiceAreas: ServiceArea[] = [
    {
        id: 'area-1',
        title: 'Tư Vấn Luật Đất Đai Chuyên Sâu: Giải Pháp Pháp Lý Toàn Diện',
        image: '/images/service-land-law.jpg',
        description: 'Dịch vụ tư vấn đất đai chuyên sâu'
    },
    {
        id: 'area-2',
        title: 'Dịch vụ quản lý và thu hồi nợ',
        image: '/images/service-debt-recovery.jpg',
        description: 'Giải pháp toàn diện cho thu hồi nợ'
    },
    {
        id: 'area-3',
        title: 'Dịch vụ tư vấn đầu tư',
        image: '/images/service-investment.jpg',
        description: 'Hỗ trợ tư vấn đầu tư kinh doanh'
    },
    {
        id: 'area-4',
        title: 'Dịch vụ mua bán, sáp nhập, tái cơ cấu doanh nghiệp',
        image: '/images/service-ma.jpg',
        description: 'M&A và tái cơ cấu doanh nghiệp'
    },
    {
        id: 'area-5',
        title: 'Dịch vụ đăng ký doanh nghiệp',
        image: '/images/service-registration.jpg',
        description: 'Thủ tục đăng ký doanh nghiệp'
    },
    {
        id: 'area-6',
        title: 'Dịch vụ giấy phép con',
        image: '/images/service-license.jpg',
        description: 'Cấp giấy phép con kinh doanh'
    },
    {
        id: 'area-7',
        title: 'Dịch vụ sở hữu trí tuệ',
        image: '/images/service-ip.jpg',
        description: 'Bảo vệ sở hữu trí tuệ'
    },
    {
        id: 'area-8',
        title: 'Dịch vụ pháp lý thường xuyên',
        image: '/images/service-legal-services.jpg',
        description: 'Tư vấn pháp lý thường xuyên'
    }
];

// Mock Data for Family Law Q&A
export const mockFamilyLawQAs: FamilyLawQA[] = [
    {
        id: 'faq-family-1',
        question: 'Các quy định pháp lý nào bảo vệ quyền lợi con cái, tài sản sau khi ly hôn?',
        image: '/images/family-qa-1.jpg',
        shortDescription: 'Quy định pháp lý bảo vệ con cái và tài sản'
    },
    {
        id: 'faq-family-2',
        question: 'Thủ tục ly hôn phương mới nhất: Điều kiện, Hộ số và Thời gian giải quyết',
        image: '/images/family-qa-2.jpg',
        shortDescription: 'Thủ tục ly hôn theo quy định mới nhất'
    },
    {
        id: 'faq-family-3',
        question: 'Thủ Tục Đăng Ký Kết Hôn Có Yêu Tố Nước Ngoài 2025',
        image: '/images/family-qa-3.jpg',
        shortDescription: 'Đăng ký kết hôn có yếu tố nước ngoài'
    },
    {
        id: 'faq-family-4',
        question: 'Chính phủ Đề Xuất Bổ Sung Trường Hợp Thu Hồi Đất',
        image: '/images/family-qa-4.jpg',
        shortDescription: 'Chính phủ đề xuất về thu hồi đất'
    },
    {
        id: 'faq-family-5',
        question: 'LỰ HÔN ĐƠN PHƯƠNG CẦN NHỮNG GIẤY TỜ, THỦ TỤC GÌ?',
        image: '/images/family-qa-5.jpg',
        shortDescription: 'Ly hôn đơn phương: thủ tục và giấy tờ'
    },
    {
        id: 'faq-family-6',
        question: 'Thay đổi họ cho con riêng',
        image: '/images/family-qa-6.jpg',
        shortDescription: 'Thay đổi họ cho con riêng - hướng dẫn'
    }
];

// Mock Data for Gallery
export const mockGalleryItems: GalleryItem[] = [
    {
        id: 'gallery-1',
        title: 'Hội thuyết truyền hình Tại sao dự án',
        type: 'image',
        thumbnail: '/images/gallery-1.jpg',
        description: 'Hội thuyết truyền hình'
    },
    {
        id: 'gallery-2',
        title: 'Hội thuyết truyền hình Giao đất cho thương',
        type: 'image',
        thumbnail: '/images/gallery-2.jpg',
        description: 'Giao đất cho thương mại'
    },
    {
        id: 'gallery-3',
        title: 'Hội thuyết truyền hình Một số vấn đề',
        type: 'image',
        thumbnail: '/images/gallery-3.jpg',
        description: 'Một số vấn đề pháp lý'
    },
    {
        id: 'gallery-4',
        title: 'Văn phòng Thừa phát lại',
        type: 'image',
        thumbnail: '/images/gallery-4.jpg',
        description: 'Không gian văn phòng'
    },
    {
        id: 'gallery-5',
        title: 'Luật sư chuyên viên',
        type: 'image',
        thumbnail: '/images/gallery-5.jpg',
        description: 'Đội ngũ chuyên viên'
    },
    {
        id: 'gallery-6',
        title: 'Văn phòng làm việc',
        type: 'image',
        thumbnail: '/images/gallery-6.jpg',
        description: 'Không gian làm việc hiện đại'
    },
    {
        id: 'gallery-7',
        title: 'Hợp thư truyền hình Tại sao dự án',
        type: 'video',
        thumbnail: '/images/video-1.jpg',
        videoId: 'dQw4w9WgXcQ',
        description: 'Video hợp thư truyền hình'
    },
    {
        id: 'gallery-8',
        title: 'Hợp thư truyền hình Giao đất',
        type: 'video',
        thumbnail: '/images/video-2.jpg',
        videoId: 'dQw4w9WgXcQ',
        description: 'Video giao đất'
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
    testimonials: mockTestimonials,
    statistics: mockStatistics,
    contactInfo: mockContactInfo,
    companyInfo: mockCompanyInfo,
    serviceAreas: mockServiceAreas,
    familyLawQAs: mockFamilyLawQAs,
    galleryItems: mockGalleryItems
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
