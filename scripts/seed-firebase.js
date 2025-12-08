/**
 * Script to seed Firebase Firestore with mock data
 * Usage: npm run seed
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
};

// Validate config
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.error('❌ Missing Firebase configuration. Check .env.local file.');
    process.exit(1);
}

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock data
const mockBlogPosts = [
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

const mockServices = [
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
    }
];

const mockCategories = [
    { id: 'cat-1', name: 'Luật dân sự', description: 'Các vấn đề liên quan luật dân sự', slug: 'luat-dan-su', target: '/blog', showInMenu: false },
    { id: 'cat-2', name: 'Luật lao động', description: 'Các vấn đề liên quan luật lao động', slug: 'luat-lao-dong', target: '/blog', showInMenu: false },
    { id: 'cat-3', name: 'Hôn nhân gia đình', description: 'Các vấn đề hôn nhân gia đình', slug: 'hon-nhan-gia-dinh', target: '/family-law', showInMenu: true },
];

const mockVibans = [
    {
        id: 'viban-1',
        title: 'Vi bằng Dân sự',
        description: 'Vi bằng xác nhận tư cách pháp lý của cá nhân trong các vụ việc dân sự',
        requirements: [
            'Giấy CMND/CCCD của các bên liên quan',
            'Chứng chỉ khai sinh',
            'Hóa đơn điện, nước hoặc giấy tờ chứng minh địa chỉ',
            'Giấy tờ liên quan đến vụ việc'
        ],
        process: [
            'Nộp hồ sơ đầy đủ tại cơ quan thừa phát lại',
            'Kiểm tra và làm rõ thông tin',
            'Tiếp xúc với các bên liên quan nếu cần',
            'Cấp vi bằng'
        ],
        fees: '200.000đ - 500.000đ'
    },
    {
        id: 'viban-2',
        title: 'Vi bằng Hợp đồng Mua bán Bất động sản',
        description: 'Vi bằng chứng thực hợp đồng mua bán bất động sản và quyền sử dụng đất',
        requirements: [
            'Giấy CMND/CCCD của người mua và người bán',
            'Sổ đỏ hoặc giấy chứng nhận quyền sử dụng đất',
            'Hóa đơn điện, nước hoặc giấy tờ chứng minh địa chỉ',
            'Bản vẽ hoặc hình ảnh bất động sản'
        ],
        process: [
            'Tư vấn và soạn thảo hợp đồng',
            'Kiểm tra pháp lý bất động sản',
            'Tiếp xúc xác nhận ý nguyện các bên',
            'Cấp vi bằng chứng thực'
        ],
        fees: '1.000.000đ - 2.500.000đ'
    }
];

const mockFAQs = [
    {
        id: 'faq-1',
        question: 'Hợp đồng lao động phải có những gì?',
        answer: 'Hợp đồng lao động phải có các thông tin cơ bản về hai bên (người sử dụng lao động và người lao động), vị trí việc làm, mức lương, thời gian làm việc, quyền và nghĩa vụ của hai bên.',
        category: 'Luật lao động',
        views: 125
    },
    {
        id: 'faq-2',
        question: 'Thủ tục ly hôn bao lâu?',
        answer: 'Thủ tục ly hôn thường mất từ 1-3 tháng nếu là ly hôn thỏa thuận, hoặc từ 3-6 tháng nếu là ly hôn tranh chấp tại tòa án.',
        category: 'Hôn nhân gia đình',
        views: 98
    },
    {
        id: 'faq-3',
        question: 'Vi bằng là gì?',
        answer: 'Vi bằng là giấy tờ do thừa phát lại cấp để chứng thực các sự kiện, pháp lý nhằm xác lập quyền, nghĩa vụ của cá nhân hoặc tổ chức.',
        category: 'Vi bằng',
        views: 76
    },
    {
        id: 'faq-4',
        question: 'Phí cấp vi bằng bao nhiêu?',
        answer: 'Phí cấp vi bằng tùy thuộc vào loại vi bằng, thường từ 200.000đ đến 2.500.000đ tùy vào độ phức tạp của vụ việc.',
        category: 'Vi bằng',
        views: 156
    }
];

const mockTestimonials = [
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
        content: 'Các dịch vụ notary của Văn phòng rất nhanh chóng và đáng tin cậy. Tôi đã sử dụng dịch vụ nhiều lần.',
        rating: 4,
        image: 'https://via.placeholder.com/100x100?text=Minh'
    },
    {
        id: 'test-4',
        name: 'Chị Ngô Thị Lan',
        position: 'Phó Giám đốc',
        company: 'Công ty XYZ',
        content: 'Rất thoả mãn với dịch vụ chứng thực hợp đồng. Nhân viên tư vấn rất kiên nhẫn và chuyên nghiệp.',
        rating: 5,
        image: 'https://via.placeholder.com/100x100?text=Lan'
    }
];

const mockLegalDocuments = [
    {
        id: 'doc-1',
        title: 'Bộ Luật Dân sự năm 2015',
        description: 'Bộ Luật Dân sự của Cộng hòa Xã hội chủ nghĩa Việt Nam',
        category: 'Luật dân sự',
        publishDate: '2015-01-01',
        fileUrl: '#'
    },
    {
        id: 'doc-2',
        title: 'Luật Hôn nhân và Gia đình năm 2000',
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

const mockTeamMembers = [
    {
        id: 'team-1',
        name: 'Luật sư Nguyễn Văn A',
        position: 'Trưởng Văn phòng',
        experience: '20+ năm',
        specialization: 'Luật dân sự',
        image: 'https://via.placeholder.com/250x300?text=Luatsu+A'
    },
    {
        id: 'team-2',
        name: 'Luật sư Trần Thị B',
        position: 'Luật sư',
        experience: '15+ năm',
        specialization: 'Luật lao động',
        image: 'https://via.placeholder.com/250x300?text=Luatsu+B'
    }
];

const mockStatistics = [
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

const mockContactInfo = {
    phone: '0901234567',
    email: 'contact@thuaphatlaivn.com',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    workingHours: 'Thứ 2 - Thứ 6: 8:00 - 17:30 | Thứ 7: 8:00 - 12:00',
    zaloLink: 'https://zalo.me/0901234567',
    facebookLink: 'https://facebook.com/thuaphatlaivn',
    googleMapsLink: 'https://maps.app.goo.gl/uhYNBQh465eRWbyv5',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1234567!2d106.6601720!3d10.7626220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    coordinates: {
        lat: 10.762622,
        lng: 106.660172
    }
};

const mockCompanyInfo = {
    name: 'Văn phòng Thừa phát lại',
    fullName: 'Văn phòng Thừa phát lại Chuyên nghiệp',
    slogan: 'Uy tín - Chuyên nghiệp - Hiệu quả',
    description: 'Chúng tôi cung cấp các dịch vụ thừa phát lại chuyên nghiệp, đảm bảo quyền lợi hợp pháp của khách hàng theo đúng quy định pháp luật. Với hơn 20 năm kinh nghiệm, chúng tôi tự hào là một trong những văn phòng thừa phát lại uy tín nhất tại Việt Nam.',
    vision: 'Trở thành văn phòng thừa phát lại hàng đầu tại Việt Nam, được khách hàng tin tưởng và lựa chọn.',
    mission: 'Cung cấp dịch vụ chứng thực chất lượng cao, bảo vệ quyền lợi pháp lý của khách hàng, góp phần xây dựng một xã hội pháp luật lành mạnh.',
    values: ['Uy tín', 'Chuyên nghiệp', 'Trách nhiệm', 'Sáng tạo']
};

const mockServiceAreas = [
    {
        id: 'area-1',
        title: 'Tư Vấn Luật Đất Đai Chuyên Sâu: Giải Pháp Pháp Lý Toàn Diện',
        image: '/images/service-land-law.jpg',
        description: 'Dịch vụ tư vấn đất đai chuyên sâu, hỗ trợ kiểm tra pháp lý, chuyển nhượng và giải quyết tranh chấp.',
        details: [
            'Tư vấn quyền sử dụng đất và hồ sơ pháp lý',
            'Kiểm tra sổ đỏ, giấy tờ liên quan',
            'Soạn thảo và kiểm tra hợp đồng chuyển nhượng',
            'Hỗ trợ giải quyết tranh chấp đất đai tại cơ quan và tòa án'
        ],
        servicesOffered: [
            { title: 'Kiểm tra pháp lý bất động sản', description: 'Xác minh nguồn gốc, hạn chế và rủi ro pháp lý.' },
            { title: 'Soạn thảo hợp đồng mua bán', description: 'Soạn thảo hợp đồng bảo đảm tính pháp lý và quyền lợi khách hàng.' },
            { title: 'Hỗ trợ chuyển nhượng', description: 'Thực hiện thủ tục chuyển nhượng tại cơ quan đăng ký đất đai.' }
        ],
        processSteps: [
            'Tiếp nhận yêu cầu và hồ sơ khách hàng',
            'Kiểm tra tài liệu và đánh giá pháp lý',
            'Soạn thảo/hoàn thiện hồ sơ',
            'Nộp hồ sơ và theo dõi tại cơ quan có thẩm quyền'
        ],
        benefits: [
            'Giảm rủi ro giao dịch',
            'Thủ tục nhanh chóng, chính xác',
            'Hỗ trợ pháp lý toàn diện từ A-Z'
        ],
        contactCTA: { phone: '0901234567', email: 'datdai@viban.vn', ctaText: 'Tư vấn đất đai miễn phí' }
    },
    {
        id: 'area-2',
        title: 'Dịch vụ quản lý và thu hồi nợ',
        image: '/images/service-debt-recovery.jpg',
        description: 'Giải pháp toàn diện cho thu hồi nợ, từ thương lượng đến kiện tụng.',
        details: [
            'Thẩm định khả năng thu hồi nợ',
            'Soạn thảo yêu cầu thanh toán và hợp đồng bảo đảm',
            'Đàm phán, thương lượng với con nợ',
            'Thực hiện thủ tục khởi kiện khi cần thiết'
        ],
        servicesOffered: [
            { title: 'Đánh giá nợ và khả năng thu hồi', description: 'Đánh giá thực tế và đề xuất phương án.' },
            { title: 'Thương lượng và hòa giải', description: 'Đại diện thương lượng để thu hồi tối đa.' },
            { title: 'Khởi kiện, thi hành án', description: 'Hỗ trợ thủ tục tố tụng và thi hành án.' }
        ],
        processSteps: [
            'Thu thập hồ sơ và bằng chứng nợ',
            'Gửi thông báo và yêu cầu thanh toán',
            'Thương lượng/đàm phán',
            'Khởi kiện và theo dõi thi hành án (nếu cần)'
        ],
        benefits: [
            'Tăng tỉ lệ thu hồi nợ',
            'Tiết kiệm thời gian cho doanh nghiệp',
            'Hạn chế rủi ro pháp lý khi xử lý nợ'
        ],
        contactCTA: { phone: '0902345678', email: 'thuno@viban.vn', ctaText: 'Yêu cầu thu hồi nợ' }
    },
    {
        id: 'area-3',
        title: 'Dịch vụ tư vấn đầu tư',
        image: '/images/service-investment.jpg',
        description: 'Hỗ trợ tư vấn đầu tư kinh doanh, thành lập công ty và thực hiện thủ tục pháp lý.',
        details: [
            'Tư vấn cấu trúc đầu tư',
            'Phân tích rủi ro pháp lý',
            'Chuẩn bị hồ sơ thành lập doanh nghiệp',
            'Hỗ trợ đàm phán hợp đồng đầu tư'
        ],
        servicesOffered: [
            { title: 'Tư vấn thành lập doanh nghiệp', description: 'Hướng dẫn lựa chọn loại hình và thủ tục.' },
            { title: 'Tư vấn đầu tư nước ngoài', description: 'Hỗ trợ thủ tục, giấy phép và tuân thủ.' },
            { title: 'Soạn thảo hợp đồng đầu tư', description: 'Bảo vệ quyền lợi nhà đầu tư và doanh nghiệp.' }
        ],
        processSteps: [
            'Thu thập thông tin dự án',
            'Đánh giá pháp lý và rủi ro',
            'Soạn thảo hồ sơ và hợp đồng',
            'Hỗ trợ xin phép và triển khai thủ tục' 
        ],
        benefits: [
            'Giảm rủi ro pháp lý cho dự án',
            'Tối ưu cấu trúc đầu tư',
            'Hỗ trợ nhanh và chuyên nghiệp'
        ],
        contactCTA: { phone: '0903456789', email: 'dautu@viban.vn', ctaText: 'Nhận tư vấn đầu tư' }
    },
    {
        id: 'area-4',
        title: 'Dịch vụ mua bán, sáp nhập, tái cơ cấu doanh nghiệp',
        image: '/images/service-ma.jpg',
        description: 'Hỗ trợ M&A, mua bán và tái cấu trúc doanh nghiệp toàn diện.',
        details: [
            'Thẩm định pháp lý (Legal Due Diligence)',
            'Soạn thảo và đàm phán hợp đồng M&A',
            'Tư vấn cấu trúc giao dịch',
            'Hỗ trợ hậu giao dịch và tái cấu trúc'
        ],
        servicesOffered: [
            { title: 'Due Diligence', description: 'Kiểm tra toàn diện hồ sơ pháp lý và rủi ro.' },
            { title: 'Soạn thảo hợp đồng M&A', description: 'Chuẩn hoá điều khoản bảo vệ bên mua/bên bán.' },
            { title: 'Hỗ trợ hậu M&A', description: 'Tư vấn tái cấu trúc tổ chức và pháp lý.' }
        ],
        processSteps: [
            'Khảo sát ban đầu và thu thập tài liệu',
            'Thực hiện due diligence',
            'Đàm phán điều khoản và ký kết hợp đồng',
            'Hoàn thiện thủ tục chuyển nhượng và điều chỉnh nội bộ'
        ],
        benefits: [
            'Bảo đảm giao dịch an toàn pháp lý',
            'Tối ưu giá trị thương vụ',
            'Hỗ trợ thực thi và tái cấu trúc sau giao dịch'
        ],
        contactCTA: { phone: '0904567890', email: 'ma@viban.vn', ctaText: 'Liên hệ chuyên viên M&A' }
    },
    {
        id: 'area-5',
        title: 'Dịch vụ đăng ký doanh nghiệp',
        image: '/images/service-registration.jpg',
        description: 'Thủ tục đăng ký kinh doanh, thay đổi giấy phép và đăng ký chi nhánh.',
        details: [
            'Tư vấn loại hình doanh nghiệp phù hợp',
            'Soạn hồ sơ thành lập và nộp hồ sơ',
            'Đăng ký mã số thuế và con dấu',
            'Hướng dẫn thủ tục sau đăng ký'
        ],
        servicesOffered: [
            { title: 'Thành lập công ty', description: 'Hoàn thiện hồ sơ & nộp cơ quan đăng ký.' },
            { title: 'Đăng ký thay đổi giấy phép', description: 'Hỗ trợ thay đổi giấy phép, vốn, trụ sở.' },
            { title: 'Đăng ký mã số thuế', description: 'Hướng dẫn hoàn thiện nghĩa vụ thuế ban đầu.' }
        ],
        processSteps: [
            'Tư vấn lựa chọn loại hình và chuẩn bị hồ sơ',
            'Nộp hồ sơ và theo dõi',
            'Nhận giấy chứng nhận và hoàn tất thủ tục sau đăng ký'
        ],
        benefits: [
            'Tiết kiệm thời gian thủ tục',
            'Hướng dẫn cụ thể cho bước tiếp theo',
            'Cam kết hồ sơ chính xác, hợp lệ'
        ],
        contactCTA: { phone: '0905678901', email: 'dangky@viban.vn', ctaText: 'Bắt đầu thành lập doanh nghiệp' }
    },
    {
        id: 'area-6',
        title: 'Dịch vụ giấy phép con',
        image: '/images/service-license.jpg',
        description: 'Hỗ trợ xin các giấy phép chuyên ngành (giấy phép con) cho hoạt động kinh doanh.',
        details: [
            'Đánh giá giấy phép cần thiết cho ngành nghề',
            'Chuẩn bị và nộp hồ sơ xin cấp phép',
            'Theo dõi tiến trình cấp phép',
            'Hỗ trợ trả lời yêu cầu bổ sung từ cơ quan cấp phép'
        ],
        servicesOffered: [
            { title: 'Tư vấn giấy phép chuyên ngành', description: 'Xác định giấy phép cần thiết theo ngành nghề.' },
            { title: 'Nộp hồ sơ xin phép', description: 'Soạn thảo và đại diện nộp hồ sơ tại cơ quan nhà nước.' }
        ],
        processSteps: [
            'Khảo sát yêu cầu pháp lý theo ngành',
            'Chuẩn bị hồ sơ và giấy tờ liên quan',
            'Nộp hồ sơ và theo dõi',
            'Nhận và bàn giao giấy phép'
        ],
        benefits: [
            'Giảm sai sót hồ sơ',
            'Tiết kiệm thời gian xử lý',
            'Đảm bảo tuân thủ quy định chuyên ngành'
        ],
        contactCTA: { phone: '0906789012', email: 'giayphep@viban.vn', ctaText: 'Yêu cầu xin phép' }
    },
    {
        id: 'area-7',
        title: 'Dịch vụ sở hữu trí tuệ',
        image: '/images/service-ip.jpg',
        description: 'Bảo vệ sở hữu trí tuệ: đăng ký thương hiệu, sáng chế, bản quyền và xử lý xâm phạm.',
        details: [
            'Đăng ký nhãn hiệu và bảo hộ thương hiệu',
            'Tư vấn sáng chế và giải pháp kỹ thuật',
            'Bảo vệ bản quyền tác giả và nội dung',
            'Xử lý xâm phạm quyền sở hữu trí tuệ'
        ],
        servicesOffered: [
            { title: 'Đăng ký nhãn hiệu', description: 'Hỗ trợ tra cứu, nộp đơn và bảo hộ nhãn hiệu.' },
            { title: 'Bảo vệ bản quyền', description: 'Tư vấn đăng ký quyền tác giả và nội dung.' },
            { title: 'Xử lý xâm phạm', description: 'Đại diện khiếu nại và khởi kiện hành vi xâm phạm.' }
        ],
        processSteps: [
            'Tra cứu khả năng bảo hộ',
            'Chuẩn bị tài liệu và nộp đơn',
            'Theo dõi thẩm định và hoàn tất bảo hộ',
            'Xử lý khi có tranh chấp hoặc xâm phạm'
        ],
        benefits: [
            'Bảo vệ quyền sáng tạo và thương hiệu',
            'Giảm rủi ro xâm phạm',
            'Hỗ trợ bảo vệ thị trường và giá trị thương mại'
        ],
        contactCTA: { phone: '0907890123', email: 'sothuutri tue@viban.vn', ctaText: 'Bảo hộ thương hiệu' }
    },
    {
        id: 'area-8',
        title: 'Dịch vụ pháp lý thường xuyên',
        image: '/images/service-legal-services.jpg',
        description: 'Tư vấn pháp lý thường xuyên cho doanh nghiệp và cá nhân, gói dịch vụ thuê luật sư cố định.',
        details: [
            'Tư vấn pháp lý định kỳ theo gói',
            'Soạn thảo và rà soát hợp đồng hàng tháng',
            'Hỗ trợ giải quyết tranh chấp phát sinh',
            'Đào tạo nội bộ và soạn thảo quy định công ty'
        ],
        servicesOffered: [
            { title: 'Gói tư vấn định kỳ', description: 'Dịch vụ tư vấn pháp lý theo tháng/quý.' },
            { title: 'Rà soát hợp đồng định kỳ', description: 'Bảo đảm hợp đồng phù hợp pháp luật.' }
        ],
        processSteps: [
            'Ký hợp đồng dịch vụ pháp lý',
            'Thiết lập kênh liên lạc và lịch tư vấn',
            'Thực hiện tư vấn và hỗ trợ theo yêu cầu',
            'Đánh giá định kỳ và điều chỉnh hợp đồng'
        ],
        benefits: [
            'Tiếp cận tư vấn nhanh chóng',
            'Chi phí hợp lý cho dịch vụ dài hạn',
            'Ưu tiên hỗ trợ khi có tranh chấp'
        ],
        contactCTA: { phone: '0908901234', email: 'phaply@viban.vn', ctaText: 'Đăng ký gói pháp lý' }
    }
];

const mockFamilyLawQAs = [
    {
        id: 'faq-family-1',
        question: 'Cách Lập Hợp Đồng Hôn Nhân',
        image: '/images/family-qa-1.jpg',
        shortDescription: 'Hướng dẫn lập hợp đồng hôn nhân hợp lệ',
        date: '2025-01-15',

        overview: 'Giải thích tổng quan về mục đích, nội dung và ý nghĩa pháp lý của hợp đồng hôn nhân trước hoặc trong thời kỳ hôn nhân.',
        definition: 'Hợp đồng hôn nhân là thỏa thuận bằng văn bản giữa vợ và chồng về chế độ tài sản trước, trong hoặc sau hôn nhân, được lập theo quy định của Luật Hôn nhân và Gia đình.',
        fullDescription:
            'Hợp đồng hôn nhân giúp vợ chồng chủ động thỏa thuận về tài sản chung, tài sản riêng, cách quản lý và phân chia tài sản khi ly hôn hoặc khi một bên mất. Để có giá trị pháp lý, hợp đồng phải được lập thành văn bản, có công chứng hoặc chứng thực và không được trái pháp luật, đạo đức xã hội.',

        processSteps: [
            {
                title: 'Bước 1: Xác định phạm vi thỏa thuận',
                description:
                    'Hai bên trao đổi với nhau về những tài sản hiện có, tài sản sẽ hình thành trong tương lai và cách quản lý/chia khi ly hôn hoặc khi một bên mất.'
            },
            {
                title: 'Bước 2: Soạn thảo nội dung hợp đồng',
                description:
                    'Lập bản dự thảo hợp đồng hôn nhân, ghi rõ thông tin hai bên, danh mục tài sản, nguyên tắc quản lý tài sản, nghĩa vụ tài chính và điều khoản sửa đổi, chấm dứt.'
            },
            {
                title: 'Bước 3: Công chứng/chứng thực hợp đồng',
                description:
                    'Hai bên mang dự thảo hợp đồng cùng giấy tờ tùy thân, giấy tờ chứng minh tài sản đến tổ chức hành nghề công chứng để được tư vấn và công chứng hợp đồng.'
            },
            {
                title: 'Bước 4: Lưu giữ và thực hiện hợp đồng',
                description:
                    'Sau khi công chứng, mỗi bên giữ một bản; thực hiện đúng cam kết trong hợp đồng trong suốt thời kỳ hôn nhân.'
            }
        ],

        relatedLaws: [
            'Luật Hôn nhân và Gia đình 2014 – Chương III về chế độ tài sản vợ chồng',
            'Bộ luật Dân sự 2015 về giao dịch dân sự và hợp đồng',
            'Luật Công chứng 2014 về hình thức công chứng hợp đồng'
        ],

        tips: [
            'Nên trao đổi thẳng thắn, tránh giấu tài sản để hạn chế tranh chấp về sau.',
            'Nên nhờ luật sư hoặc công chứng viên tư vấn trước khi ký.',
            'Không sử dụng điều khoản trái pháp luật hoặc nhằm trốn tránh nghĩa vụ đối với người thứ ba.'
        ],

        updatedAt: '2025-01-15T00:00:00+07:00'
    },
    {
        id: 'faq-family-2',
        question: 'Quy Trình Chia Tài Sản Chung',
        image: '/images/family-qa-2.jpg',
        shortDescription: 'Các bước chia tài sản chung sau ly hôn',
        date: '2025-01-10',

        overview: 'Tóm tắt trình tự thực hiện việc chia tài sản chung của vợ chồng khi ly hôn hoặc trong thời kỳ hôn nhân.',
        definition:
            'Chia tài sản chung là việc xác định phần giá trị tài sản thuộc về mỗi bên vợ, chồng theo thỏa thuận hoặc theo quyết định của Tòa án.',
        fullDescription:
            'Việc chia tài sản chung có thể được thực hiện trong thời kỳ hôn nhân hoặc khi ly hôn. Nguyên tắc chung là chia đôi nhưng có tính đến công sức đóng góp của mỗi bên, hoàn cảnh gia đình, lỗi của mỗi bên và bảo vệ quyền lợi của con chưa thành niên.',

        processSteps: [
            {
                title: 'Bước 1: Thống kê tài sản chung và nợ chung',
                description:
                    'Liệt kê toàn bộ nhà đất, xe, tiền, cổ phần, tài khoản ngân hàng, nợ vay… được xác định là tài sản chung của vợ chồng.'
            },
            {
                title: 'Bước 2: Thỏa thuận chia tài sản',
                description:
                    'Hai bên có thể tự thỏa thuận về giá trị và phần được hưởng; nếu đạt được thỏa thuận thì lập văn bản và có thể yêu cầu công chứng.'
            },
            {
                title: 'Bước 3: Yêu cầu Tòa án giải quyết (nếu không thỏa thuận được)',
                description:
                    'Một trong hai bên nộp đơn yêu cầu Tòa án chia tài sản chung; Tòa án sẽ xác minh, định giá tài sản và ra bản án/quyết định phân chia.'
            },
            {
                title: 'Bước 4: Thi hành bản án, quyết định',
                description:
                    'Hai bên tự nguyện thực hiện hoặc yêu cầu cơ quan thi hành án hỗ trợ nếu bên kia không thực hiện đúng.'
            }
        ],

        relatedLaws: [
            'Luật Hôn nhân và Gia đình 2014 – Điều 33, 38, 59 về tài sản chung và nguyên tắc chia tài sản',
            'Bộ luật Tố tụng dân sự 2015 về thủ tục yêu cầu chia tài sản',
            'Luật Thi hành án dân sự 2008 (sửa đổi, bổ sung) về thi hành bản án'
        ],

        tips: [
            'Ưu tiên thỏa thuận để tiết kiệm thời gian và chi phí.',
            'Giữ lại chứng cứ về nguồn gốc tài sản để bảo vệ quyền lợi của mình.',
            'Chú ý quyền lợi về chỗ ở và sinh hoạt ổn định cho con chưa thành niên.'
        ],

        updatedAt: '2025-01-10T00:00:00+07:00'
    },
    {
        id: 'faq-family-3',
        question: 'Thủ Tục Đăng Ký Kết Hôn Có Yêu Tố Nước Ngoài 2025',
        image: '/images/family-qa-3.jpg',
        shortDescription: 'Đăng ký kết hôn có yếu tố nước ngoài',
        date: '2025-01-08',

        overview:
            'Hướng dẫn thủ tục đăng ký kết hôn giữa công dân Việt Nam với người nước ngoài hoặc người Việt Nam định cư ở nước ngoài.',
        definition:
            'Kết hôn có yếu tố nước ngoài là việc kết hôn giữa công dân Việt Nam với người nước ngoài; giữa người Việt Nam định cư ở nước ngoài với nhau; hoặc các trường hợp khác theo quy định pháp luật.',
        fullDescription:
            'Đăng ký kết hôn có yếu tố nước ngoài phải thực hiện tại cơ quan có thẩm quyền (thường là UBND cấp huyện hoặc cơ quan đại diện Việt Nam ở nước ngoài), đảm bảo điều kiện kết hôn theo pháp luật Việt Nam và pháp luật nước ngoài (nếu có). Hồ sơ, trình tự, thời hạn giải quyết được quy định khá chặt chẽ.',

        processSteps: [
            {
                title: 'Bước 1: Kiểm tra điều kiện kết hôn',
                description:
                    'Hai bên đủ tuổi kết hôn, tự nguyện, không bị mất năng lực hành vi dân sự, không thuộc trường hợp cấm kết hôn.'
            },
            {
                title: 'Bước 2: Chuẩn bị hồ sơ',
                description:
                    'Hộ chiếu/CMND, giấy xác nhận tình trạng hôn nhân, giấy khám sức khỏe kết hôn, bản sao sổ hộ khẩu/tạm trú, giấy tờ chứng minh nhân thân của bên nước ngoài (đã hợp pháp hóa lãnh sự và dịch thuật).'
            },
            {
                title: 'Bước 3: Nộp hồ sơ tại cơ quan có thẩm quyền',
                description:
                    'Nộp hồ sơ tại UBND cấp huyện nơi cư trú của công dân Việt Nam hoặc tại Cơ quan đại diện Việt Nam ở nước ngoài (tùy trường hợp).'
            },
            {
                title: 'Bước 4: Phỏng vấn và đăng ký kết hôn',
                description:
                    'Cơ quan đăng ký có thể phỏng vấn để kiểm tra sự tự nguyện, mục đích kết hôn; nếu đủ điều kiện sẽ ghi vào sổ và cấp Giấy chứng nhận kết hôn.'
            }
        ],

        relatedLaws: [
            'Luật Hôn nhân và Gia đình 2014 – Điều 126 về kết hôn có yếu tố nước ngoài',
            'Luật Hộ tịch 2014 và các văn bản hướng dẫn',
            'Nghị định hướng dẫn đăng ký hộ tịch có yếu tố nước ngoài'
        ],

        tips: [
            'Chuẩn bị hồ sơ sớm vì nhiều giấy tờ cần hợp pháp hóa lãnh sự và dịch thuật công chứng.',
            'Nên kiểm tra trước quy định của nước sở tại nếu dự định sinh sống ở nước ngoài.',
            'Giữ liên lạc rõ ràng với cơ quan tiếp nhận hồ sơ để bổ sung kịp thời nếu thiếu giấy tờ.'
        ],

        updatedAt: '2025-01-08T00:00:00+07:00'
    },
    {
        id: 'faq-family-4',
        question: 'Chính phủ Đề Xuất Bổ Sung Trường Hợp Thu Hồi Đất',
        image: '/images/family-qa-4.jpg',
        shortDescription: 'Chính phủ đề xuất về thu hồi đất',
        date: '2025-01-05',

        overview:
            'Tóm tắt nội dung đề xuất của Chính phủ về việc bổ sung các trường hợp Nhà nước thu hồi đất và ảnh hưởng đến quyền lợi của người sử dụng đất.',
        definition:
            'Thu hồi đất là việc Nhà nước quyết định thu lại quyền sử dụng đất của người đang sử dụng theo quy định của pháp luật về đất đai.',
        fullDescription:
            'Đề xuất bổ sung trường hợp thu hồi đất thường nhằm phục vụ mục đích quốc phòng, an ninh, phát triển kinh tế – xã hội vì lợi ích quốc gia, công cộng hoặc xử lý các trường hợp vi phạm pháp luật đất đai. Người sử dụng đất có thể được bồi thường, hỗ trợ, tái định cư tùy trường hợp.',

        processSteps: [
            {
                title: 'Bước 1: Công bố chủ trương, dự án liên quan đến thu hồi đất',
                description:
                    'Cơ quan nhà nước có thẩm quyền thông báo chủ trương, phạm vi thu hồi đất và đối tượng bị ảnh hưởng.'
            },
            {
                title: 'Bước 2: Kiểm kê, đo đạc và lập phương án bồi thường',
                description:
                    'Tổ chức được giao nhiệm vụ phối hợp với người sử dụng đất để xác định hiện trạng đất, tài sản gắn liền với đất và lập phương án bồi thường, hỗ trợ, tái định cư.'
            },
            {
                title: 'Bước 3: Lấy ý kiến và ban hành quyết định thu hồi đất',
                description:
                    'Người dân được quyền góp ý; sau khi hoàn thiện phương án, cơ quan có thẩm quyền ra quyết định thu hồi đất và phê duyệt phương án bồi thường.'
            },
            {
                title: 'Bước 4: Thực hiện chi trả và bàn giao mặt bằng',
                description:
                    'Tiến hành chi trả bồi thường, bố trí tái định cư (nếu có) và tổ chức bàn giao mặt bằng cho dự án.'
            }
        ],

        relatedLaws: [
            'Luật Đất đai hiện hành và dự thảo sửa đổi',
            'Các nghị định về bồi thường, hỗ trợ và tái định cư khi Nhà nước thu hồi đất'
        ],

        tips: [
            'Người dân nên đọc kỹ thông báo, quyết định thu hồi đất và phương án bồi thường.',
            'Có thể yêu cầu đối thoại hoặc khiếu nại nếu cho rằng phương án bồi thường chưa thỏa đáng.',
            'Lưu giữ đầy đủ giấy tờ về quyền sử dụng đất để bảo vệ quyền lợi.'
        ],

        updatedAt: '2025-01-05T00:00:00+07:00'
    },
    {
        id: 'faq-family-5',
        question: 'LỰ HÔN ĐƠN PHƯƠNG CẦN NHỮNG GIẤY TỜ, THỦ TỤC GÌ?',
        image: '/images/family-qa-5.jpg',
        shortDescription: 'Các giấy tờ cần thiết cho lỵ hôn đơn phương',
        date: '2025-01-01',

        overview:
            'Liệt kê hồ sơ, tài liệu và trình tự cần thiết khi một bên vợ hoặc chồng đơn phương yêu cầu Tòa án giải quyết ly hôn.',
        definition:
            'Ly hôn đơn phương (ly hôn theo yêu cầu của một bên) là việc một bên vợ hoặc chồng yêu cầu Tòa án chấm dứt quan hệ hôn nhân theo quy định của pháp luật.',
        fullDescription:
            'Trong ly hôn đơn phương, Tòa án xem xét căn cứ ly hôn (mâu thuẫn trầm trọng, đời sống chung không thể kéo dài, mục đích hôn nhân không đạt được). Hồ sơ cần chuẩn bị bao gồm giấy tờ nhân thân, giấy chứng nhận kết hôn, giấy khai sinh con, tài liệu về tài sản, nợ chung và chứng cứ về mâu thuẫn.',

        processSteps: [
            {
                title: 'Bước 1: Chuẩn bị hồ sơ ly hôn',
                description:
                    'Đơn khởi kiện ly hôn; bản chính Giấy chứng nhận kết hôn; bản sao chứng thực CMND/CCCD, hộ khẩu; giấy khai sinh của con; tài liệu về tài sản, nợ chung và chứng cứ chứng minh mâu thuẫn.'
            },
            {
                title: 'Bước 2: Nộp đơn tại Tòa án có thẩm quyền',
                description:
                    'Thường là Tòa án nhân dân cấp huyện nơi bị đơn cư trú hoặc làm việc; trong một số trường hợp có thể lựa chọn theo thỏa thuận.'
            },
            {
                title: 'Bước 3: Thụ lý vụ án và hòa giải',
                description:
                    'Sau khi thụ lý, Tòa án tiến hành hòa giải; nếu hòa giải không thành sẽ đưa vụ án ra xét xử.'
            },
            {
                title: 'Bước 4: Xét xử và ra bản án ly hôn',
                description:
                    'Tòa án giải quyết các vấn đề về chấm dứt hôn nhân, quyền nuôi con, cấp dưỡng, phân chia tài sản và nghĩa vụ tài chính khác.'
            }
        ],

        relatedLaws: [
            'Luật Hôn nhân và Gia đình 2014 – Điều 51, 56 về quyền yêu cầu ly hôn và căn cứ ly hôn',
            'Bộ luật Tố tụng dân sự 2015 về thủ tục khởi kiện và giải quyết vụ án ly hôn'
        ],

        tips: [
            'Chuẩn bị chứng cứ rõ ràng về tình trạng hôn nhân (bạo lực gia đình, ngoại tình, bỏ bê…) nếu có.',
            'Cân nhắc quyền lợi của con nhỏ về chỗ ở, học tập và tâm lý.',
            'Nên tham khảo ý kiến luật sư để lựa chọn phương án nuôi con, chia tài sản phù hợp.'
        ],

        updatedAt: '2025-01-01T00:00:00+07:00'
    },
    {
        id: 'faq-family-6',
        question: 'Cấu Thành Của Tội Ấu Dâm Và Xử Phạt',
        image: '/images/family-qa-6.jpg',
        shortDescription: 'Các thành phần cấu thành tội ấu dâm',
        date: '2024-12-28',

        overview:
            'Giải thích các yếu tố cấu thành tội phạm liên quan đến hành vi xâm hại tình dục trẻ em và mức hình phạt tương ứng.',
        definition:
            'Tội ấu dâm (xâm hại tình dục trẻ em) là hành vi dùng vũ lực, đe dọa dùng vũ lực, lợi dụng tình trạng không thể tự vệ hoặc thủ đoạn khác để thực hiện hành vi dâm ô, giao cấu hoặc hành vi tình dục khác với người dưới độ tuổi luật định.',
        fullDescription:
            'Pháp luật hình sự quy định rất nghiêm khắc đối với hành vi xâm hại tình dục trẻ em. Cấu thành tội phạm bao gồm: chủ thể (người đủ tuổi chịu trách nhiệm hình sự), khách thể (quyền bất khả xâm phạm về thân thể, danh dự, nhân phẩm trẻ em), mặt chủ quan (lỗi cố ý), mặt khách quan (hành vi dâm ô, giao cấu hoặc hành vi tình dục khác với người dưới độ tuổi nhất định). Mức hình phạt có thể từ tù có thời hạn đến tù chung thân tùy tính chất, mức độ.',

        processSteps: [
            {
                title: 'Bước 1: Tiếp nhận và tố giác hành vi',
                description:
                    'Người bị hại, gia đình hoặc người chứng kiến cần tố giác ngay với Cơ quan cảnh sát điều tra, Viện kiểm sát hoặc UBND cấp xã.'
            },
            {
                title: 'Bước 2: Thu thập chứng cứ và bảo vệ người bị hại',
                description:
                    'Cơ quan tiến hành tố tụng thu thập chứng cứ, giám định thương tích, giám định tâm lý; áp dụng biện pháp bảo vệ trẻ em và người thân nếu cần.'
            },
            {
                title: 'Bước 3: Khởi tố, điều tra và truy tố',
                description:
                    'Sau khi có căn cứ, cơ quan điều tra khởi tố vụ án, khởi tố bị can; Viện kiểm sát truy tố; Tòa án xét xử theo thủ tục hình sự.'
            },
            {
                title: 'Bước 4: Xử lý hình sự và bồi thường thiệt hại',
                description:
                    'Tòa án tuyên mức hình phạt phù hợp; đồng thời buộc bồi thường thiệt hại về vật chất, tinh thần cho người bị hại (nếu có yêu cầu).'
            }
        ],

        relatedLaws: [
            'Bộ luật Hình sự hiện hành – các điều khoản về tội xâm hại tình dục người dưới 18 tuổi',
            'Luật Trẻ em và các văn bản hướng dẫn về bảo vệ trẻ em',
            'Bộ luật Tố tụng hình sự về trình tự, thủ tục giải quyết vụ án hình sự'
        ],

        tips: [
            'Gia đình cần bình tĩnh, tránh để trẻ bị tổn thương thêm về tâm lý khi khai báo.',
            'Không tự ý hòa giải hoặc thỏa thuận bồi thường để bỏ qua xử lý hình sự.',
            'Nên tìm hỗ trợ từ luật sư và các tổ chức bảo vệ trẻ em để đảm bảo quyền lợi cho trẻ.'
        ],

        updatedAt: '2024-12-28T00:00:00+07:00'
    }
];


const mockGalleryItems = [
    { id: 'gallery-1', title: 'Văn phòng làm việc', type: 'image', thumbnail: '/images/gallery-1.jpg', description: 'Không gian văn phòng', order: 1 },
    { id: 'gallery-2', title: 'Phòng họp', type: 'image', thumbnail: '/images/gallery-2.jpg', description: 'Phòng họp chuyên dụng', order: 2 },
    { id: 'gallery-3', title: 'Phòng chờ', type: 'image', thumbnail: '/images/gallery-3.jpg', description: 'Không gian chờ thoải mái', order: 3 },
    { id: 'gallery-4', title: 'Sự kiện 1', type: 'image', thumbnail: '/images/gallery-4.jpg', description: 'Hình ảnh sự kiện', order: 4 },
    { id: 'gallery-5', title: 'Sự kiện 2', type: 'image', thumbnail: '/images/gallery-5.jpg', description: 'Hoạt động công ty', order: 5 },
    { id: 'gallery-6', title: 'Sự kiện 3', type: 'image', thumbnail: '/images/gallery-6.jpg', description: 'Gặp gỡ khách hàng', order: 6 },
    { id: 'gallery-7', title: 'Video hội thảo', type: 'video', thumbnail: '/images/video-1.jpg', videoId: 'dQw4w9WgXcQ', description: 'Hội thảo pháp lý', order: 7 },
    { id: 'gallery-8', title: 'Video tư vấn', type: 'video', thumbnail: '/images/video-2.jpg', videoId: 'dQw4w9WgXcQ', description: 'Tư vấn trực tuyến', order: 8 }
];

const mockNavigation = [
    {
        id: 'home',
        label: 'Trang Chủ',
        href: '/',
        order: 0
    },
    {
        id: 'about',
        label: 'Giới Thiệu',
        href: '#about',
        order: 1,
        children: [
            { id: 'about-overview', label: 'Giới thiệu chung', href: '#about' },
            { id: 'about-philosophy', label: 'Đội ngũ', href: '#about' },
        ]
    },
    {
        id: 'services',
        label: 'Dịch Vụ',
        href: '#services',
        order: 2,
        children: [
            { id: 'service-viban', label: 'Vi bằng', href: '#services' },
            { id: 'service-legal', label: 'Tư vấn pháp lý', href: '#services' },
        ]
    },
    {
        id: 'news',
        label: 'Tin Tức',
        href: '#news',
        order: 3,
        children: [
            { id: 'news-blog', label: 'Blog', href: '/blog' },
            { id: 'news-legal-docs', label: 'Tài liệu pháp lý', href: '/documents' },
        ]
    },
    {
        id: 'qa',
        label: 'Hỏi Đáp',
        href: '#qa',
        order: 4,
        children: [
            { id: 'qa-family-law', label: 'Hôn nhân gia đình', href: '/family-law' },
        ]
    }
];

// Helper function to seed a collection
async function seedCollection(collectionName, data) {
    try {
        console.log(`\n🌱 Seeding collection: ${collectionName}`);

        const batch = writeBatch(db);

        // Handle special case for contactInfo and companyInfo (single documents)
        if (collectionName === 'contactInfo' || collectionName === 'companyInfo') {
            const docRef = doc(db, collectionName, 'main');
            batch.set(docRef, data);
        } else {
            // Handle array of documents
            const dataArray = Array.isArray(data) ? data : [data];
            for (const item of dataArray) {
                const docRef = doc(db, collectionName, item.id);
                batch.set(docRef, item);
            }
        }

        await batch.commit();

        // Log count based on type
        if (collectionName === 'contactInfo' || collectionName === 'companyInfo') {
            console.log(`✅ Successfully seeded 1 document to ${collectionName}`);
        } else {
            const count = Array.isArray(data) ? data.length : 1;
            console.log(`✅ Successfully seeded ${count} documents to ${collectionName}`);
        }
    } catch (error) {
        console.error(`❌ Error seeding ${collectionName}:`, error);
        throw error;
    }
}

// Main seed function
async function seedFirebase() {
    try {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║  Firebase Firestore Seeding Script    ║');
        console.log('╚════════════════════════════════════════╝');
        console.log(`\n📍 Project ID: ${firebaseConfig.projectId}`);

        // Seed all collections
        await seedCollection('blogPosts', mockBlogPosts);
        await seedCollection('services', mockServices);
        await seedCollection('categories', mockCategories);
        await seedCollection('vibans', mockVibans);
        await seedCollection('faqs', mockFAQs);
        await seedCollection('testimonials', mockTestimonials);
        await seedCollection('legalDocuments', mockLegalDocuments);
        await seedCollection('teamMembers', mockTeamMembers);
        await seedCollection('statistics', mockStatistics);
        await seedCollection('contactInfo', mockContactInfo);
        await seedCollection('companyInfo', mockCompanyInfo);
        await seedCollection('serviceAreas', mockServiceAreas);
        await seedCollection('familyLawQAs', mockFamilyLawQAs);
        await seedCollection('gallery', mockGalleryItems);
        await seedCollection('navigation', mockNavigation);

        console.log('\n╔════════════════════════════════════════╗');
        console.log('║  ✅ All collections seeded successfully! ║');
        console.log('╚════════════════════════════════════════╝\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}

// Run the seed function
seedFirebase();
