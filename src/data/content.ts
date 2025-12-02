import type { Service, TeamMember, BlogPost, FAQ, LegalDocument, Testimonial, ContactInfo, Statistic, NavItem } from '../types';

// Navigation Menu
export const navigationItems: NavItem[] = [
    {
        id: 'home',
        label: 'Trang Chủ',
        href: '#home',
    },
    {
        id: 'about',
        label: 'Giới Thiệu',
        href: '#about',
        children: [
            { id: 'about-overview', label: 'Giới thiệu chung', href: '#about-overview' },
            { id: 'about-philosophy', label: 'Triết lý & Văn hóa hành nghề', href: '#about-philosophy' },
            { id: 'about-partners', label: 'Đối tác', href: '#about-partners' },
            { id: 'about-privacy', label: 'Chính sách bảo mật', href: '#about-privacy' },
            { id: 'about-careers', label: 'Tuyển dụng', href: '#about-careers' },
        ],
    },
    {
        id: 'services',
        label: 'Dịch Vụ',
        href: '#services',
        children: [
            {
                id: 'svc-business',
                label: 'Luật Doanh nghiệp',
                href: '#',
                children: [
                    { id: 'svc-business-law', label: 'Pháp luật', href: '#service-doanh-nghiep-phap-luat' },
                    { id: 'svc-business-proc', label: 'Thủ tục pháp lý', href: '#service-doanh-nghiep-thu-tuc' },
                    { id: 'svc-business-adv', label: 'Tư vấn', href: '#service-doanh-nghiep-tu-van' },
                    { id: 'svc-business-rep', label: 'Đại diện ủy quyền', href: '#service-doanh-nghiep-dai-dien' },
                ],
            },
            {
                id: 'svc-land',
                label: 'Luật Đất đai',
                href: '#',
                children: [
                    { id: 'svc-land-law', label: 'Pháp luật', href: '#service-dat-dai-phap-luat' },
                    { id: 'svc-land-proc', label: 'Thủ tục pháp lý', href: '#service-dat-dai-thu-tuc' },
                    { id: 'svc-land-adv', label: 'Tư vấn', href: '#service-dat-dai-tu-van' },
                    { id: 'svc-land-rep', label: 'Đại diện ủy quyền', href: '#service-dat-dai-dai-dien' },
                ],
            },
            {
                id: 'svc-criminal',
                label: 'Luật Hình sự',
                href: '#',
                children: [
                    { id: 'svc-criminal-law', label: 'Pháp luật', href: '#service-hinh-su-phap-luat' },
                    { id: 'svc-criminal-proc', label: 'Thủ tục', href: '#service-hinh-su-thu-tuc' },
                    { id: 'svc-criminal-adv', label: 'Luật sư bào chữa', href: '#service-hinh-su-bao-chua' },
                    { id: 'svc-criminal-qa', label: 'Hỏi đáp – Tư vấn', href: '#service-hinh-su-hoi-dap' },
                ],
            },
            {
                id: 'svc-family',
                label: 'Hôn nhân – Gia đình',
                href: '#',
                children: [
                    { id: 'svc-family-law', label: 'Pháp luật', href: '#service-hon-nhan-phap-luat' },
                    { id: 'svc-family-proc', label: 'Thủ tục', href: '#service-hon-nhan-thu-tuc' },
                    { id: 'svc-family-adv', label: 'Tư vấn', href: '#service-hon-nhan-tu-van' },
                    { id: 'svc-family-rep', label: 'Đại diện ủy quyền', href: '#service-hon-nhan-dai-dien' },
                ],
            },
            {
                id: 'svc-debt',
                label: 'Thu hồi nợ',
                href: '#',
                children: [
                    { id: 'svc-debt-law', label: 'Pháp luật', href: '#service-thu-hoi-no-phap-luat' },
                    { id: 'svc-debt-proc', label: 'Thủ tục', href: '#service-thu-hoi-no-thu-tuc' },
                    { id: 'svc-debt-adv', label: 'Tư vấn', href: '#service-thu-hoi-no-tu-van' },
                    { id: 'svc-debt-rep', label: 'Đại diện ủy quyền', href: '#service-thu-hoi-no-dai-dien' },
                ],
            },
            {
                id: 'svc-arbitration',
                label: 'Trọng tài thương mại',
                href: '#',
                children: [
                    { id: 'svc-arb-law', label: 'Pháp luật', href: '#service-trong-tai-phap-luat' },
                    { id: 'svc-arb-proc', label: 'Thủ tục', href: '#service-trong-tai-thu-tuc' },
                    { id: 'svc-arb-adv', label: 'Tư vấn', href: '#service-trong-tai-tu-van' },
                    { id: 'svc-arb-rep', label: 'Đại diện', href: '#service-trong-tai-dai-dien' },
                ],
            },
            {
                id: 'svc-traffic',
                label: 'Luật Giao thông',
                href: '#',
                children: [
                    { id: 'svc-traffic-law', label: 'Pháp luật', href: '#service-giao-thong-phap-luat' },
                    { id: 'svc-traffic-proc', label: 'Thủ tục', href: '#service-giao-thong-thu-tuc' },
                    { id: 'svc-traffic-adv', label: 'Tư vấn', href: '#service-giao-thong-tu-van' },
                ],
            },
            {
                id: 'svc-immigration',
                label: 'Luật Di trú',
                href: '#',
                children: [
                    { id: 'svc-imm-law', label: 'Pháp luật', href: '#service-di-tru-phap-luat' },
                    { id: 'svc-imm-proc', label: 'Thủ tục', href: '#service-di-tru-thu-tuc' },
                    { id: 'svc-imm-adv', label: 'Tư vấn', href: '#service-di-tru-tu-van' },
                ],
            },
            {
                id: 'svc-ip',
                label: 'Sở hữu trí tuệ',
                href: '#',
                children: [
                    { id: 'svc-ip-law', label: 'Pháp luật', href: '#service-shtt-phap-luat' },
                    { id: 'svc-ip-proc', label: 'Thủ tục', href: '#service-shtt-thu-tuc' },
                    { id: 'svc-ip-adv', label: 'Tư vấn', href: '#service-shtt-tu-van' },
                ],
            },
        ],
    },
    {
        id: 'qa',
        label: 'Hỏi Đáp',
        href: '#qa',
    },
    {
        id: 'faq',
        label: 'Câu hỏi thường gặp',
        href: '#faq',
    },
    {
        id: 'news',
        label: 'Tin Tức',
        href: '#news',
        children: [
            { id: 'news-press', label: 'Tin báo chí', href: '#news-press' },
            { id: 'news-legal', label: 'Tin pháp luật', href: '#news-legal' },
            { id: 'news-general', label: 'Tin tổng hợp', href: '#news-general' },
        ],
    },
    {
        id: 'laws',
        label: 'Văn bản pháp luật',
        href: '#laws',
    },
    {
        id: 'contact',
        label: 'Liên Hệ',
        href: '#contact',
    },
    {
        id: 'booking',
        label: 'Đặt lịch',
        href: '#booking',
    },
    {
        id: 'careers',
        label: 'Tuyển dụng',
        href: '#careers',
    },
];

// Services Data
export const services: Service[] = [
    {
        id: 'service-1',
        title: 'Lập Vi bằng',
        description: 'Dịch vụ lập vi bằng chuyên nghiệp, nhanh chóng và chính xác theo quy định pháp luật.',
        icon: 'FaFileContract',
        details: [
            'Lập vi bằng giao dịch dân sự',
            'Lập vi bằng thế chấp, cầm cố',
            'Lập vi bằng chuyển nhượng quyền sử dụng đất',
            'Lập vi bằng di chúc, thừa kế',
            'Lập vi bằng hợp đồng kinh tế',
        ],
        benefits: [
            'Có giá trị pháp lý cao',
            'Bảo vệ quyền lợi các bên',
            'Phục vụ trong tố tụng',
            'Thủ tục nhanh gọn',
        ],
    },
    {
        id: 'service-2',
        title: 'Tống đạt Văn bản',
        description: 'Tống đạt văn bản tư pháp đảm bảo đúng thời hạn và quy trình theo luật định.',
        icon: 'FaEnvelopeOpenText',
        details: [
            'Tống đạt giấy tờ, tài liệu trong tố tụng dân sự',
            'Tống đạt quyết định, bản án của Tòa án',
            'Tống đạt văn bản hành chính',
            'Tống đạt thông báo, giấy mời',
            'Lập biên bản tống đạt',
        ],
        benefits: [
            'Đảm bảo tính pháp lý',
            'Có biên bản xác nhận',
            'Đúng thời hạn quy định',
            'Chuyên nghiệp, uy tín',
        ],
    },
    {
        id: 'service-3',
        title: 'Xác minh Điều kiện Thi hành án',
        description: 'Xác minh tài sản, thu nhập và điều kiện thi hành án của người phải thi hành án.',
        icon: 'FaSearchDollar',
        details: [
            'Xác minh tài sản của người phải thi hành án',
            'Xác minh thu nhập, nguồn thu',
            'Xác minh nơi cư trú, làm việc',
            'Lập báo cáo xác minh chi tiết',
            'Cung cấp thông tin cho cơ quan thi hành án',
        ],
        benefits: [
            'Thông tin chính xác',
            'Hỗ trợ thi hành án hiệu quả',
            'Tiết kiệm thời gian',
            'Bảo mật thông tin',
        ],
    },
    {
        id: 'service-4',
        title: 'Tổ chức Thi hành án',
        description: 'Hỗ trợ tổ chức thi hành án dân sự theo ủy quyền của cơ quan thi hành án.',
        icon: 'FaGavel',
        details: [
            'Tổ chức cưỡng chế thi hành án',
            'Phong tỏa, kê biên tài sản',
            'Bán đấu giá tài sản',
            'Giám sát việc thi hành án',
            'Lập biên bản thi hành án',
        ],
        benefits: [
            'Tuân thủ đúng pháp luật',
            'Hiệu quả cao',
            'Bảo vệ quyền lợi đương sự',
            'Minh bạch, công khai',
        ],
    },
    // {
    //     id: 'service-5',
    //     title: 'Tư vấn Pháp lý',
    //     description: 'Cung cấp tư vấn pháp lý chuyên sâu về các vấn đề liên quan đến dân sự và thi hành án.',
    //     icon: 'FaGraduationCap',
    //     details: [
    //         'Tư vấn về vi bằng và lập vi bằng',
    //         'Tư vấn về thi hành án dân sự',
    //         'Tư vấn về hợp đồng giao dịch',
    //         'Soạn thảo và rà soát văn bản pháp lý',
    //         'Tư vấn về quyền lợi hợp pháp',
    //     ],
    //     benefits: [
    //         'Nắm rõ quyền lợi từ pháp luật',
    //         'Giảm rủi ro pháp lý',
    //         'Đảm bảo giao dịch hợp pháp',
    //         'Hỗ trợ chuyên sâu từ chuyên gia',
    //     ],
    // },
    // {
    //     id: 'service-6',
    //     title: 'Soạn thảo Văn bản',
    //     description: 'Soạn thảo các văn bản pháp lý theo yêu cầu của khách hàng với đúng quy định pháp luật.',
    //     icon: 'FaFileAlt',
    //     details: [
    //         'Soạn thảo hợp đồng dân sự',
    //         'Soạn thảo hợp đồng thương mại',
    //         'Soạn thảo di chúc, tương thác',
    //         'Soạn thảo giấy ủy quyền',
    //         'Rà soát, sửa chữa văn bản pháp lý',
    //     ],
    //     benefits: [
    //         'Đúng quy cách pháp lý',
    //         'Bảo vệ quyền lợi các bên',
    //         'Giảm tranh chấp sau này',
    //         'Chuyên nghiệp, an toàn',
    //     ],
    // },
];

// Team Members
export const teamMembers: TeamMember[] = [
    {
        id: 'team-1',
        name: 'Luật sư Nguyễn Văn A',
        position: 'Giám đốc Văn phòng',
        bio: 'Hơn 15 năm kinh nghiệm trong lĩnh vực pháp lý và thừa phát lại. Tốt nghiệp Đại học Luật Hà Nội.',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
    },
    {
        id: 'team-2',
        name: 'Thừa phát lại Trần Thị B',
        position: 'Thừa phát lại chính',
        bio: 'Chứng chỉ hành nghề Thừa phát lại. Chuyên về lập vi bằng và tống đạt văn bản.',
        email: 'tranthib@example.com',
        phone: '0902345678',
    },
    {
        id: 'team-3',
        name: 'Lê Văn C',
        position: 'Thừa phát lại viên',
        bio: '8 năm kinh nghiệm trong thi hành án dân sự và xác minh điều kiện thi hành án.',
        email: 'levanc@example.com',
        phone: '0903456789',
    },
    {
        id: 'team-4',
        name: 'Phạm Thị D',
        position: 'Chuyên viên pháp lý',
        bio: 'Hỗ trợ tư vấn pháp luật và soạn thảo văn bản pháp lý cho khách hàng.',
        email: 'phamthid@example.com',
        phone: '0904567890',
    },
    {
        id: 'team-5',
        name: 'Võ Minh E',
        position: 'Thừa phát lại viên',
        bio: 'Chuyên trách các vụ việc tống đạt văn bản tư pháp và xác minh điều kiện.',
        email: 'vominhe@example.com',
        phone: '0905678901',
    },
    {
        id: 'team-6',
        name: 'Đỗ Thanh F',
        position: 'Nhân viên hành chính',
        bio: 'Hỗ trợ công tác hành chính, tiếp nhận hồ sơ và theo dõi tiến độ công việc.',
        email: 'dotanhf@example.com',
        phone: '0906789012',
    },
    {
        id: 'team-7',
        name: 'Nguyễn Hồng G',
        position: 'Chuyên viên kiểm soát chất lượng',
        bio: 'Đảm bảo chất lượng các dịch vụ và tuân thủ đúng quy định pháp luật.',
        email: 'nguyenhongg@example.com',
        phone: '0907890123',
    },
];

// Blog Posts
export const blogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'Vai trò của Thừa phát lại trong hệ thống tư pháp Việt Nam',
        excerpt: 'Tìm hiểu về vai trò, chức năng và tầm quan trọng của Thừa phát lại trong việc bảo vệ quyền và lợi ích hợp pháp của công dân.',
        content: 'Nội dung chi tiết về vai trò của Thừa phát lại...',
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-11-15',
        category: 'Kiến thức pháp luật',
    },
    {
        id: 'blog-2',
        title: 'Quy trình lập vi bằng - Những điều cần biết',
        excerpt: 'Hướng dẫn chi tiết về quy trình, thủ tục và hồ sơ cần thiết khi lập vi bằng tại Văn phòng Thừa phát lại.',
        content: 'Nội dung chi tiết về quy trình lập vi bằng...',
        author: 'Thừa phát lại Trần Thị B',
        date: '2024-11-10',
        category: 'Hướng dẫn',
    },
    {
        id: 'blog-3',
        title: 'Thi hành án dân sự: Quyền và nghĩa vụ của các bên',
        excerpt: 'Phân tích quyền và nghĩa vụ của người được thi hành án và người phải thi hành án trong quá trình thi hành án dân sự.',
        content: 'Nội dung chi tiết về thi hành án dân sự...',
        author: 'Lê Văn C',
        date: '2024-11-05',
        category: 'Kiến thức pháp luật',
    },
    {
        id: 'blog-4',
        title: 'Những sai lầm thường gặp khi lập vi bằng',
        excerpt: 'Tìm hiểu những sai lầm phổ biến mà khách hàng hay gặp phải khi lập vi bằng và cách tránh chúng.',
        content: 'Nội dung chi tiết về những sai lầm phổ biến...',
        author: 'Phạm Thị D',
        date: '2024-10-28',
        category: 'Hướng dẫn',
    },
    {
        id: 'blog-5',
        title: 'Xác minh điều kiện thi hành án - Quyền của người được thi hành án',
        excerpt: 'Giải thích chi tiết về quy trình xác minh điều kiện thi hành án và những quyền mà người được thi hành án có thể sử dụng.',
        content: 'Nội dung chi tiết về xác minh điều kiện thi hành án...',
        author: 'Võ Minh E',
        date: '2024-10-20',
        category: 'Kiến thức pháp luật',
    },
    {
        id: 'blog-6',
        title: 'Luật Thừa phát lại mới 2024 - Những điểm thay đổi quan trọng',
        excerpt: 'Tổng hợp những quy định mới trong Luật Thừa phát lại năm 2024 và tác động đến hoạt động nghề nghiệp.',
        content: 'Nội dung chi tiết về những thay đổi trong luật mới...',
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-10-15',
        category: 'Cập nhật pháp luật',
    },
];

// FAQs
export const faqs: FAQ[] = [
    {
        id: 'faq-1',
        question: 'Thừa phát lại là gì?',
        answer: 'Thừa phát lại là người được Bộ trưởng Bộ Tư pháp cấp Thẻ Thừa phát lại để thực hiện các hoạt động nghề nghiệp theo quy định của Luật Thừa phát lại, bao gồm: lập vi bằng, tống đạt văn bản tư pháp, xác minh điều kiện thi hành án dân sự và tổ chức thi hành án dân sự.',
        category: 'Tổng quan',
    },
    {
        id: 'faq-2',
        question: 'Vi bằng có giá trị pháp lý như thế nào?',
        answer: 'Vi bằng do Thừa phát lại lập có giá trị pháp lý cao, được sử dụng làm chứng cứ trong tố tụng dân sự, hành chính và có thể được sử dụng để đăng ký giao dịch bảo đảm, chuyển nhượng quyền sử dụng đất, v.v.',
        category: 'Lập vi bằng',
    },
    {
        id: 'faq-3',
        question: 'Thời gian lập vi bằng mất bao lâu?',
        answer: 'Thời gian lập vi bằng thông thường từ 1-3 ngày làm việc tùy thuộc vào độ phức tạp của giao dịch. Trong trường hợp khẩn cấp, chúng tôi có thể xử lý trong ngày.',
        category: 'Lập vi bằng',
    },
    {
        id: 'faq-4',
        question: 'Chi phí dịch vụ được tính như thế nào?',
        answer: 'Chi phí dịch vụ được tính theo quy định của Bộ Tư pháp và phụ thuộc vào loại dịch vụ, giá trị giao dịch. Chúng tôi cam kết niêm yết công khai và minh bạch mức phí.',
        category: 'Chi phí',
    },
    {
        id: 'faq-5',
        question: 'Cần chuẩn bị những giấy tờ gì khi lập vi bằng?',
        answer: 'Tùy loại vi bằng mà hồ sơ khác nhau. Thông thường cần: CMND/CCCD, giấy tờ liên quan đến giao dịch (hợp đồng, giấy chứng nhận quyền sử dụng đất, v.v.). Vui lòng liên hệ để được tư vấn cụ thể.',
        category: 'Lập vi bằng',
    },
    {
        id: 'faq-6',
        question: 'Làm cách nào để tống đạt văn bản cho người ở xa?',
        answer: 'Thừa phát lại có thể tống đạt văn bản cho người ở bất kỳ đâu thông qua các đơn vị tương ứng. Chúng tôi sẽ lập biên bản tống đạt và gửi kết quả cho khách hàng.',
        category: 'Tống đạt văn bản',
    },
    {
        id: 'faq-7',
        question: 'Quy trình xác minh điều kiện thi hành án như thế nào?',
        answer: 'Quá trình xác minh bao gồm: tiếp nhận yêu cầu, xác minh tại nơi công việc/cư trú, kiểm tra tài sản, thu nhập, sau đó lập báo cáo chi tiết và gửi cho cơ quan thi hành án.',
        category: 'Xác minh điều kiện',
    },
    {
        id: 'faq-8',
        question: 'Có thể cấp nhanh chứng chỉ hành nghề Thừa phát lại không?',
        answer: 'Chứng chỉ hành nghề Thừa phát lại do Bộ Tư pháp cấp theo đúng thủ tục pháp luật. Thời gian thường từ 2-4 tuần tùy thuộc vào hồ sơ. Chúng tôi có thể hỗ trợ tư vấn trong quá trình chuẩn bị hồ sơ.',
        category: 'Cấp phép hành nghề',
    },
    {
        id: 'faq-9',
        question: 'Làm sao để biết vi bằng đã được lập chính thức?',
        answer: 'Vi bằng chính thức được lập khi Thừa phát lại ký tên, dấu riêng, ghi ngày lập và có các thông tin đầy đủ như nêu trong Luật. Bạn sẽ nhận được bản gốc hoặc bản sao theo yêu cầu.',
        category: 'Lập vi bằng',
    },
    {
        id: 'faq-10',
        question: 'Cần làm gì nếu không đồng ý với kết quả xác minh?',
        answer: 'Nếu khách hàng có ý kiến không đồng ý, có thể yêu cầu thực hiện xác minh lại hoặc khiếu nại theo quy định pháp luật. Chúng tôi sẵn sàng trao đổi và giải thích chi tiết.',
        category: 'Dịch vụ khác',
    },
];

// Legal Documents
export const legalDocuments: LegalDocument[] = [
    {
        id: 'doc-1',
        title: 'Luật Thừa phát lại 2011',
        description: 'Văn bản quy định về tổ chức và hoạt động của Thừa phát lại tại Việt Nam.',
        category: 'Luật',
        publishDate: '2011-06-17',
    },
    {
        id: 'doc-2',
        title: 'Nghị định 125/2013/NĐ-CP',
        description: 'Quy định chi tiết thi hành một số điều của Luật Thừa phát lại.',
        category: 'Nghị định',
        publishDate: '2013-09-27',
    },
    {
        id: 'doc-3',
        title: 'Thông tư 08/2014/TT-BTP',
        description: 'Hướng dẫn về lập vi bằng của Thừa phát lại.',
        category: 'Thông tư',
        publishDate: '2014-06-25',
    },
    {
        id: 'doc-4',
        title: 'Luật Thi hành án dân sự 2008',
        description: 'Quy định về tổ chức và hoạt động thi hành án dân sự.',
        category: 'Luật',
        publishDate: '2008-11-14',
    },
    {
        id: 'doc-5',
        title: 'Quyết định 1667/QĐ-BTP-2014',
        description: 'Quy định chi tiết về mức phí lập vi bằng và tống đạt văn bản.',
        category: 'Quyết định',
        publishDate: '2014-09-30',
    },
    {
        id: 'doc-6',
        title: 'Thông tư 04/2014/TT-BTP',
        description: 'Hướng dẫn thi hành một số quy định của Luật Thừa phát lại.',
        category: 'Thông tư',
        publishDate: '2014-02-20',
    },
    {
        id: 'doc-7',
        title: 'Nghị định 70/2015/NĐ-CP',
        description: 'Sửa đổi, bổ sung một số quy định về thi hành án dân sự.',
        category: 'Nghị định',
        publishDate: '2015-07-10',
    },
    {
        id: 'doc-8',
        title: 'Luật Sửa đổi, bổ sung Luật Thừa phát lại 2015',
        description: 'Các sửa đổi, bổ sung quan trọng đối với Luật Thừa phát lại.',
        category: 'Luật',
        publishDate: '2015-09-15',
    },
];

// Testimonials
export const testimonials: Testimonial[] = [
    {
        id: 'testimonial-1',
        name: 'Anh Hoàng Minh',
        position: 'Giám đốc',
        company: 'Công ty TNHH ABC',
        content: 'Dịch vụ chuyên nghiệp, nhanh chóng. Đội ngũ thừa phát lại tận tâm, hỗ trợ nhiệt tình. Tôi rất hài lòng với chất lượng dịch vụ.',
        rating: 5,
    },
    {
        id: 'testimonial-2',
        name: 'Chị Lan Anh',
        position: 'Chủ doanh nghiệp',
        company: 'Cửa hàng XYZ',
        content: 'Văn phòng uy tín, giá cả hợp lý. Thủ tục lập vi bằng rất nhanh, chỉ mất 2 ngày. Tôi sẽ giới thiệu cho bạn bè.',
        rating: 5,
    },
    {
        id: 'testimonial-3',
        name: 'Ông Tuấn Anh',
        position: 'Cá nhân',
        company: '',
        content: 'Cảm ơn văn phòng đã hỗ trợ tôi trong việc thi hành án. Mọi thứ được giải quyết suôn sẻ và đúng pháp luật.',
        rating: 5,
    },
    {
        id: 'testimonial-4',
        name: 'Luật sư Trần Đông',
        position: 'Luật sư tư vấn',
        company: 'Công ty Luật ABC',
        content: 'Tôi thường xuyên hợp tác với văn phòng này. Họ chuyên nghiệp, đáng tin cậy và luôn có thể hoàn thành công việc đúng hạn.',
        rating: 5,
    },
    {
        id: 'testimonial-5',
        name: 'Bà Phương Nhi',
        position: 'Quản lý doanh nghiệp',
        company: 'Tập đoàn XYZ',
        content: 'Chúng tôi sử dụng dịch vụ tư vấn và lập vi bằng thường xuyên. Mức phí cạnh tranh, chất lượng cao. Rất hài lòng với dịch vụ.',
        rating: 5,
    },
    {
        id: 'testimonial-6',
        name: 'Ông Kiên',
        position: 'Chủ doanh nghiệp nhỏ',
        company: 'Shop thời trang',
        content: 'Lần đầu tiên sử dụng dịch vụ lập vi bằng, được hỗ trợ rất kỹ lưỡng. Nhân viên phòng rất nhiệt tình giải đáp các câu hỏi của tôi.',
        rating: 5,
    },
];

// Statistics
export const statistics: Statistic[] = [
    {
        id: 'stat-1',
        label: 'Năm kinh nghiệm',
        value: 20,
        suffix: '+',
        icon: 'FaAward',
    },
    {
        id: 'stat-2',
        label: 'Khách hàng hài lòng',
        value: 2500,
        suffix: '+',
        icon: 'FaUsers',
    },
    {
        id: 'stat-3',
        label: 'Vi bằng đã lập',
        value: 8500,
        suffix: '+',
        icon: 'FaFileContract',
    },
    {
        id: 'stat-4',
        label: 'Vụ việc thành công',
        value: 99,
        suffix: '%',
        icon: 'FaCheckCircle',
    },
];

// Contact Information
export const contactInfo: ContactInfo = {
    phone: '0901234567',
    email: 'contact@thuaphatlaivn.com',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 - Thứ 6: 8:00 - 17:30 | Thứ 7: 8:00 - 12:00',
    zaloLink: 'https://zalo.me/0901234567',
    facebookLink: 'https://facebook.com/thuaphatlaivn',
    googleMapsLink: 'https://maps.google.com/?q=10.762622,106.660172',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326570829814!2d106.65771831533427!3d10.762622192330137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s',
    coordinates: {
        lat: 10.762622,
        lng: 106.660172,
    },
};

// Company Information
export const companyInfo = {
    name: 'Văn phòng Thừa phát lại',
    fullName: 'Văn phòng Thừa phát lại Chuyên nghiệp',
    slogan: 'Uy tín - Chuyên nghiệp - Hiệu quả',
    description: 'Chúng tôi cung cấp các dịch vụ thừa phát lại chuyên nghiệp, đảm bảo quyền lợi hợp pháp của khách hàng theo đúng quy định pháp luật. Với hơn 20 năm kinh nghiệm, chúng tôi tự hào là một trong những văn phòng thừa phát lại uy tín nhất tại Việt Nam.',
    vision: 'Trở thành văn phòng thừa phát lại hàng đầu tại Việt Nam, được khách hàng tin tưởng và lựa chọn. Hoàn thiện hệ thống dịch vụ và luôn đổi mới để phục vụ tốt nhất cho khách hàng.',
    mission: 'Cung cấp dịch vụ thừa phát lại chất lượng cao, góp phần xây dựng hệ thống tư pháp minh bạch, công bằng. Bảo vệ quyền lợi hợp pháp của khách hàng một cách tận tâm và chuyên nghiệp.',
    values: [
        'Chuyên nghiệp trong mọi hoạt động',
        'Uy tín và trách nhiệm với khách hàng',
        'Tuân thủ nghiêm ngặt pháp luật',
        'Không ngừng học hỏi và phát triển',
        'Minh bạch, công khai trong mọi giao dịch',
        'Tôn trọng quyền lợi hợp pháp của mọi bên',
    ],
};
