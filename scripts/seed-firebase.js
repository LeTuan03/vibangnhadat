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
    { id: 'area-1', name: 'Quận 1', description: 'Dịch vụ tại Quận 1', district: 'Quận 1', city: 'TP.HCM' },
    { id: 'area-2', name: 'Quận 2', description: 'Dịch vụ tại Quận 2', district: 'Quận 2', city: 'TP.HCM' },
    { id: 'area-3', name: 'Quận 3', description: 'Dịch vụ tại Quận 3', district: 'Quận 3', city: 'TP.HCM' },
    { id: 'area-4', name: 'Quận 4', description: 'Dịch vụ tại Quận 4', district: 'Quận 4', city: 'TP.HCM' },
    { id: 'area-5', name: 'Quận 5', description: 'Dịch vụ tại Quận 5', district: 'Quận 5', city: 'TP.HCM' },
    { id: 'area-6', name: 'Quận 6', description: 'Dịch vụ tại Quận 6', district: 'Quận 6', city: 'TP.HCM' },
    { id: 'area-7', name: 'Quận 7', description: 'Dịch vụ tại Quận 7', district: 'Quận 7', city: 'TP.HCM' },
    { id: 'area-8', name: 'Quận 8', description: 'Dịch vụ tại Quận 8', district: 'Quận 8', city: 'TP.HCM' }
];

const mockFamilyLawQAs = [
    { id: 'faq-family-1', question: 'Cách Lập Hợp Đồng Hôn Nhân', image: '/images/family-qa-1.jpg', shortDescription: 'Hướng dẫn lập hợp đồng hôn nhân hợp lệ', date: '2025-01-15' },
    { id: 'faq-family-2', question: 'Quy Trình Chia Tài Sản Chung', image: '/images/family-qa-2.jpg', shortDescription: 'Các bước chia tài sản chung sau ly hôn', date: '2025-01-10' },
    { id: 'faq-family-3', question: 'Thủ Tục Đăng Ký Kết Hôn Có Yêu Tố Nước Ngoài 2025', image: '/images/family-qa-3.jpg', shortDescription: 'Đăng ký kết hôn có yếu tố nước ngoài', date: '2025-01-08' },
    { id: 'faq-family-4', question: 'Chính phủ Đề Xuất Bổ Sung Trường Hợp Thu Hồi Đất', image: '/images/family-qa-4.jpg', shortDescription: 'Chính phủ đề xuất về thu hồi đất', date: '2025-01-05' },
    { id: 'faq-family-5', question: 'LỰ HÔN ĐƠN PHƯƠNG CẦN NHỮNG GIẤY TỜ, THỦ TỤC GÌ?', image: '/images/family-qa-5.jpg', shortDescription: 'Các giấy tờ cần thiết cho lỵ hôn đơn phương', date: '2025-01-01' },
    { id: 'faq-family-6', question: 'Cấu Thành Của Tội Ấu Dâm Và Xử Phạt', image: '/images/family-qa-6.jpg', shortDescription: 'Các thành phần cấu thành tội ấu dâm', date: '2024-12-28' }
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
    },
    {
        id: 'about',
        label: 'Giới Thiệu',
        href: '#about',
        children: [
            { id: 'about-overview', label: 'Giới thiệu chung', href: '#about' },
            { id: 'about-philosophy', label: 'Đội ngũ', href: '#about' },
        ]
    },
    {
        id: 'services',
        label: 'Dịch Vụ',
        href: '#services',
        children: [
            { id: 'service-viban', label: 'Vi bằng', href: '#services' },
            { id: 'service-legal', label: 'Tư vấn pháp lý', href: '#services' },
        ]
    },
    {
        id: 'news',
        label: 'Tin Tức',
        href: '#news',
        children: [
            { id: 'news-blog', label: 'Blog', href: '/blog' },
            { id: 'news-legal-docs', label: 'Tài liệu pháp lý', href: '/documents' },
        ]
    },
    {
        id: 'qa',
        label: 'Hỏi Đáp',
        href: '#qa',
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
