/**
 * SEO Keyword Strategy & Content Hierarchy
 * Văn phòng Thừa phát lại - Full SEO Implementation
 */

export interface KeywordCluster {
  pillarKeyword: string;
  difficulty: 'easy' | 'medium' | 'hard';
  searchVolume: number;
  clusters: ClusterKeyword[];
}

export interface ClusterKeyword {
  keyword: string;
  searchVolume: number;
  intent: 'informational' | 'transactional' | 'navigational' | 'commercial';
  relatedPages: string[];
}

/**
 * PILLAR 1: THỪA PHÁT LẠI (Main Pillar)
 * Primary Keyword: "thừa phát lại"
 * Search Volume: 1,000-5,000/month
 */
export const pillarThuaPhatLai: KeywordCluster = {
  pillarKeyword: 'thừa phát lại',
  difficulty: 'medium',
  searchVolume: 3000,
  clusters: [
    {
      keyword: 'thừa phát lại là gì',
      searchVolume: 500,
      intent: 'informational',
      relatedPages: ['/blog/thua-phat-lai-la-gi', '/legal-knowledge/thua-phat-lai'],
    },
    {
      keyword: 'công ty thừa phát lại',
      searchVolume: 800,
      intent: 'commercial',
      relatedPages: ['/services', '/about'],
    },
    {
      keyword: 'dịch vụ thừa phát lại',
      searchVolume: 1200,
      intent: 'commercial',
      relatedPages: ['/services', '/blog/dich-vu-thua-phat-lai'],
    },
    {
      keyword: 'thừa phát lại tối thiểu',
      searchVolume: 300,
      intent: 'informational',
      relatedPages: ['/legal-knowledge', '/blog/thua-phat-lai-toi-thieu'],
    },
    {
      keyword: 'thừa phát lại khoá phòng',
      searchVolume: 400,
      intent: 'informational',
      relatedPages: ['/blog/khoa-phong', '/services'],
    },
    {
      keyword: 'văn phòng thừa phát lại',
      searchVolume: 2000,
      intent: 'commercial',
      relatedPages: ['/about', '/services', '/contact'],
    },
  ],
};

/**
 * PILLAR 2: LẬP VI BẰNG (Secondary Pillar)
 * Primary Keyword: "lập vi bằng"
 * Search Volume: 800-2,000/month
 */
export const pillarLapViBang: KeywordCluster = {
  pillarKeyword: 'lập vi bằng',
  difficulty: 'medium',
  searchVolume: 1500,
  clusters: [
    {
      keyword: 'lập vi bằng là gì',
      searchVolume: 400,
      intent: 'informational',
      relatedPages: ['/blog/lap-vi-bang-la-gi', '/legal-knowledge'],
    },
    {
      keyword: 'mẫu lập vi bằng',
      searchVolume: 600,
      intent: 'informational',
      relatedPages: ['/documents', '/blog/mau-lap-vi-bang'],
    },
    {
      keyword: 'quy trình lập vi bằng',
      searchVolume: 300,
      intent: 'informational',
      relatedPages: ['/blog/quy-trinh-lap-vi-bang', '/legal-knowledge'],
    },
    {
      keyword: 'dịch vụ lập vi bằng',
      searchVolume: 400,
      intent: 'commercial',
      relatedPages: ['/services', '/blog/dich-vu-lap-vi-bang'],
    },
    {
      keyword: 'lập vi bằng thi hành án',
      searchVolume: 250,
      intent: 'informational',
      relatedPages: ['/blog/lap-vi-bang-thi-hanh-an', '/documents'],
    },
  ],
};

/**
 * PILLAR 3: THI HÀNH ÁN (Tertiary Pillar)
 * Primary Keyword: "thi hành án"
 * Search Volume: 2,000-5,000/month
 */
export const pillarThiHanhAn: KeywordCluster = {
  pillarKeyword: 'thi hành án',
  difficulty: 'medium',
  searchVolume: 3500,
  clusters: [
    {
      keyword: 'thi hành án là gì',
      searchVolume: 800,
      intent: 'informational',
      relatedPages: ['/blog/thi-hanh-an-la-gi', '/legal-knowledge'],
    },
    {
      keyword: 'quy trình thi hành án',
      searchVolume: 600,
      intent: 'informational',
      relatedPages: ['/blog/quy-trinh-thi-hanh-an', '/legal-knowledge'],
    },
    {
      keyword: 'thi hành án dân sự',
      searchVolume: 900,
      intent: 'informational',
      relatedPages: ['/blog/thi-hanh-an-dan-su', '/legal-knowledge'],
    },
    {
      keyword: 'dịch vụ thi hành án',
      searchVolume: 700,
      intent: 'commercial',
      relatedPages: ['/services', '/blog/dich-vu-thi-hanh-an'],
    },
    {
      keyword: 'xác minh điều kiện thi hành án',
      searchVolume: 400,
      intent: 'informational',
      relatedPages: ['/blog/xac-minh-dieu-kien', '/services'],
    },
    {
      keyword: 'thi hành án ngoài thương phẩm',
      searchVolume: 300,
      intent: 'informational',
      relatedPages: ['/blog/thi-hanh-an-ngoai-thuong', '/legal-knowledge'],
    },
  ],
};

/**
 * PILLAR 4: TỐNG ĐẠT VĂN BẢN (Functional Pillar)
 * Primary Keyword: "tống đạt văn bản"
 * Search Volume: 500-1,500/month
 */
export const pillarTongDatVanBan: KeywordCluster = {
  pillarKeyword: 'tống đạt văn bản',
  difficulty: 'easy',
  searchVolume: 1000,
  clusters: [
    {
      keyword: 'tống đạt văn bản là gì',
      searchVolume: 300,
      intent: 'informational',
      relatedPages: ['/blog/tong-dat-van-ban-la-gi', '/legal-knowledge'],
    },
    {
      keyword: 'quy trình tống đạt văn bản',
      searchVolume: 250,
      intent: 'informational',
      relatedPages: ['/blog/quy-trinh-tong-dat', '/legal-knowledge'],
    },
    {
      keyword: 'dịch vụ tống đạt',
      searchVolume: 400,
      intent: 'commercial',
      relatedPages: ['/services', '/blog/dich-vu-tong-dat'],
    },
    {
      keyword: 'phí tống đạt văn bản',
      searchVolume: 150,
      intent: 'informational',
      relatedPages: ['/blog/phi-tong-dat', '/legal-knowledge'],
    },
  ],
};

/**
 * PILLAR 5: HÔN NHÂN & GIA ĐÌNH (Content Pillar)
 * Primary Keyword: "luật hôn nhân gia đình"
 * Search Volume: 3,000-8,000/month
 */
export const pillarHonNhanGiaDinh: KeywordCluster = {
  pillarKeyword: 'luật hôn nhân gia đình',
  difficulty: 'hard',
  searchVolume: 5500,
  clusters: [
    {
      keyword: 'hôn nhân',
      searchVolume: 3000,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/hon-nhan'],
    },
    {
      keyword: 'ly hôn',
      searchVolume: 2000,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/ly-hon', '/blog/ly-hon-co-con'],
    },
    {
      keyword: 'chia tài sản',
      searchVolume: 1500,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/chia-tai-san'],
    },
    {
      keyword: 'quyền nuôi con',
      searchVolume: 1000,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/quyen-nuoi-con'],
    },
    {
      keyword: 'cấp dưỡng',
      searchVolume: 800,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/cap-duong'],
    },
    {
      keyword: 'di chúc',
      searchVolume: 1200,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/di-chuc'],
    },
    {
      keyword: 'thừa kế',
      searchVolume: 1500,
      intent: 'informational',
      relatedPages: ['/family-law', '/blog/thua-ke'],
    },
  ],
};

/**
 * Content Page Mapping
 * Maps keywords to actual pages that need to be created
 */
export const contentPageMapping = [
  // PILLAR PAGES (Main content hubs)
  {
    url: '/',
    title: 'Văn phòng Thừa phát lại - Dịch vụ Pháp luật Chuyên nghiệp',
    description: 'Dịch vụ thừa phát lại, lập vi bằng, thi hành án và tư vấn pháp luật uy tín tại TP.HCM',
    keywords: ['thừa phát lại', 'lập vi bằng', 'thi hành án', 'pháp luật'],
    type: 'pillar',
  },
  {
    url: '/legal-knowledge',
    title: 'Kiến thức Pháp luật - Thừa phát lại, Thi hành án, Lập vi bằng',
    description: 'Kiến thức pháp luật chi tiết về thừa phát lại, thi hành án, lập vi bằng, tống đạt văn bản',
    keywords: ['kiến thức pháp luật', 'thừa phát lại', 'thi hành án'],
    type: 'pillar',
  },
  {
    url: '/blog',
    title: 'Thư viện Bài viết Pháp luật - Hướng dẫn Chi tiết',
    description: 'Bài viết pháp luật chi tiết về thừa phát lại, lập vi bằng, hôn nhân gia đình và luật dân sự',
    keywords: ['bài viết pháp luật', 'hướng dẫn', 'tư vấn pháp luật'],
    type: 'pillar',
  },
  {
    url: '/family-law',
    title: 'Luật Hôn nhân & Gia đình - Hướng dẫn Chi tiết',
    description: 'Tư vấn chi tiết về ly hôn, chia tài sản, quyền nuôi con, cấp dưỡng, di chúc và thừa kế',
    keywords: ['hôn nhân', 'ly hôn', 'gia đình', 'chia tài sản'],
    type: 'pillar',
  },
  {
    url: '/documents',
    title: 'Văn bản Pháp luật & Mẫu - Tài liệu Pháp luật Chuyên nghiệp',
    description: 'Mẫu hợp đồng, hóa đơn, biên bản, đơn kiến nghị và các văn bản pháp luật chuẩn',
    keywords: ['mẫu hợp đồng', 'văn bản pháp luật', 'tài liệu'],
    type: 'pillar',
  },
  {
    url: '/qa',
    title: 'Hỏi Đáp Pháp luật - Câu hỏi & Đáp về Thừa phát lại',
    description: 'Câu hỏi và đáp về thừa phát lại, thi hành án, lập vi bằng và pháp luật dân sự',
    keywords: ['hỏi đáp', 'câu hỏi pháp luật', 'tư vấn'],
    type: 'pillar',
  },

  // CLUSTER PAGES (Topic clusters)
  {
    url: '/blog/thua-phat-lai-la-gi',
    title: 'Thừa phát lại là gì? - Khái niệm & Vai trò Chi tiết',
    description: 'Giải thích chi tiết thừa phát lại là gì, vai trò, nhiệm vụ của thừa phát lại trong thi hành án',
    keywords: ['thừa phát lại là gì', 'khái niệm', 'vai trò'],
    type: 'cluster',
    parent: '/legal-knowledge',
  },
  {
    url: '/blog/lap-vi-bang-la-gi',
    title: 'Lập Vi Bằng là gì? - Định nghĩa & Quy trình Chi tiết',
    description: 'Lập vi bằng là gì, định nghĩa, tác dụng, quy trình lập vi bằng trong thi hành án',
    keywords: ['lập vi bằng', 'lập vi bằng là gì', 'định nghĩa'],
    type: 'cluster',
    parent: '/legal-knowledge',
  },
  {
    url: '/blog/thi-hanh-an-la-gi',
    title: 'Thi Hành Án là gì? - Quy trình & Cơ chế Chi tiết',
    description: 'Thi hành án là gì, quy trình thi hành án dân sự, vai trò thừa phát lại',
    keywords: ['thi hành án', 'thi hành án là gì', 'quy trình'],
    type: 'cluster',
    parent: '/legal-knowledge',
  },
  {
    url: '/blog/tong-dat-van-ban-la-gi',
    title: 'Tống Đạt Văn Bản là gì? - Định nghĩa & Quy trình',
    description: 'Tống đạt văn bản là gì, phương pháp tống đạt, yêu cầu pháp lý',
    keywords: ['tống đạt', 'tống đạt văn bản', 'định nghĩa'],
    type: 'cluster',
    parent: '/legal-knowledge',
  },

  // LONG-TAIL PAGES
  {
    url: '/blog/mau-lap-vi-bang',
    title: 'Mẫu Lập Vi Bằng Chuẩn - Tải Miễn Phí PDF',
    description: 'Mẫu lập vi bằng chuẩn pháp luật, có giá trị thi hành, tải miễn phí PDF',
    keywords: ['mẫu lập vi bằng', 'lập vi bằng mẫu'],
    type: 'long-tail',
    parent: '/blog/lap-vi-bang-la-gi',
  },
  {
    url: '/blog/quy-trinh-thi-hanh-an',
    title: 'Quy Trình Thi Hành Án - Từng Bước Chi Tiết',
    description: 'Quy trình thi hành án dân sự chi tiết từ đơn khởi kiện đến hoàn thành thi hành',
    keywords: ['quy trình thi hành án', 'bước thi hành án'],
    type: 'long-tail',
    parent: '/blog/thi-hanh-an-la-gi',
  },
  {
    url: '/family-law/ly-hon',
    title: 'Ly Hôn - Thủ tục & Chia Tài Sản Chi Tiết',
    description: 'Hướng dẫn chi tiết về ly hôn, thủ tục, chia tài sản, quyền nuôi con',
    keywords: ['ly hôn', 'thủ tục ly hôn', 'chia tài sản'],
    type: 'cluster',
    parent: '/family-law',
  },
  {
    url: '/family-law/chia-tai-san',
    title: 'Chia Tài Sản Sau Ly Hôn - Quy Định & Thủ Tục',
    description: 'Chia tài sản sau ly hôn theo luật pháp, quy tắc chia, tranh chấp tài sản',
    keywords: ['chia tài sản', 'chia tài sản sau ly hôn'],
    type: 'cluster',
    parent: '/family-law',
  },
];

/**
 * SEO Rules for Content Generation
 */
export const seoContentRules = {
  titleLength: { min: 50, max: 60 },
  descriptionLength: { min: 150, max: 160 },
  headingRatio: { h1: 1, h2: 3, h3: 5 },
  contentLength: { min: 1000, max: null }, // words
  internalLinks: { min: 3, max: 10 },
  keywords: {
    h1: 1, // appear once in main heading
    mainContent: 3, // appear 3+ times in content
    ratio: 1, // 1% keyword density optimal
  },
};

/**
 * Navigation Structure for SEO
 */
export const seoNavigation = {
  // Breadcrumb trails
  breadcrumbs: {
    '/blog/thua-phat-lai-la-gi': [
      { text: 'Trang chủ', url: '/' },
      { text: 'Kiến thức pháp luật', url: '/legal-knowledge' },
      { text: 'Thừa phát lại là gì', url: '/blog/thua-phat-lai-la-gi' },
    ],
    '/family-law/ly-hon': [
      { text: 'Trang chủ', url: '/' },
      { text: 'Hôn nhân & Gia đình', url: '/family-law' },
      { text: 'Ly hôn', url: '/family-law/ly-hon' },
    ],
  },

  // Related content suggestions
  relatedArticles: {
    '/blog/thua-phat-lai-la-gi': [
      '/blog/lap-vi-bang-la-gi',
      '/blog/thi-hanh-an-la-gi',
      '/blog/quy-trinh-thi-hanh-an',
    ],
    '/blog/lap-vi-bang-la-gi': [
      '/blog/thua-phat-lai-la-gi',
      '/blog/mau-lap-vi-bang',
      '/blog/thi-hanh-an-la-gi',
    ],
  },
};

export default {
  pillarThuaPhatLai,
  pillarLapViBang,
  pillarThiHanhAn,
  pillarTongDatVanBan,
  pillarHonNhanGiaDinh,
  contentPageMapping,
  seoContentRules,
  seoNavigation,
};
