// Comprehensive Legal Knowledge Base
// Kiến thức pháp luật chi tiết liên quan đến thừa phát lại

export interface LegalArticle {
    id: string;
    title: string;
    category: string;
    content: string;
    relatedLaws: string[];
    datePublished: string;
    author?: string;
}

export interface LawExplanation {
    id: string;
    lawName: string;
    lawNumber: string;
    publishedDate: string;
    effectiveDate: string;
    mainPoints: string[];
    applicationScope: string;
    penalties?: string[];
}

export interface LegalTerm {
    id: string;
    term: string;
    definition: string;
    relatedLaws: string[];
    examples?: string[];
}

// Các bài viết pháp luật chi tiết
export const legalArticles: LegalArticle[] = [
    {
        id: 'article-1',
        title: 'Thừa Phát Lại Là Gì? Tìm Hiểu Chi Tiết Về Nghề Nghiệp',
        category: 'Tổng quan',
        content: `Thừa phát lại là những người được Bộ trưởng Bộ Tư pháp cấp Thẻ hành nghề để thực hiện các công việc liên quan đến lập vi bằng, tống đạt văn bản, xác minh điều kiện thi hành án và tổ chức thi hành án dân sự theo đúng quy định của Luật Thừa phát lại 2011.

Vai trò của Thừa phát lại trong hệ thống tư pháp Việt Nam:
- Bảo vệ quyền lợi hợp pháp của các bên trong các giao dịch dân sự
- Đảm bảo tính pháp lý và minh bạch trong các quá trình tư pháp
- Hỗ trợ Tòa án trong việc thi hành án dân sự
- Cung cấp dịch vụ pháp lý ở tầm cơ sở

Thừa phát lại phải có:
- Bằng cấp pháp lý (tối thiểu trung cấp)
- Kinh nghiệm và đủ điều kiện pháp lý
- Thẻ hành nghề được cấp bởi Bộ Tư pháp
- Cam kết tuân thủ quy tắc đạo đức nghề nghiệp`,
        relatedLaws: ['Luật Thừa phát lại 2011', 'Nghị định 125/2013/NĐ-CP', 'Thông tư 08/2014/TT-BTP'],
        datePublished: '2024-11-20',
        author: 'Luật sư Nguyễn Văn A'
    },
    {
        id: 'article-2',
        title: 'Vi Bằng - Chứng Chỉ Pháp Lý Quan Trọng Trong Giao Dịch Dân Sự',
        category: 'Vi Bằng',
        content: `Vi bằng là tài liệu do Thừa phát lại lập, ghi lại các giao dịch dân sự có giá trị pháp lý cao. Vi bằng được sử dụng như chứng cứ trong tố tụng dân sự, hành chính và được công nhận bởi pháp luật.

Các loại vi bằng chính:

1. Vi bằng giao dịch dân sự:
   - Hợp đồng mua bán, trao đổi tài sản
   - Hợp đồng cho vay, mượn
   - Hợp đồng dịch vụ
   - Các giao dịch khác có liên quan đến quyền dân sự

2. Vi bằng thế chấp và cầm cố:
   - Lập vi bằng cho các hợp đồng thế chấp bất động sản
   - Lập vi bằng cho hợp đồng cầm cố động sản
   - Đảm bảo quyền lợi của các bên trong các giao dịch bảo đảm

3. Vi bằng chuyển nhượng quyền sử dụng đất:
   - Lập vi bằng cho hợp đồng chuyển nhượng quyền sử dụng đất
   - Đảm bảo tính hợp pháp của giao dịch
   - Hỗ trợ đăng ký thay đổi chủ sở hữu

4. Vi bằng di chúc và thừa kế:
   - Lập vi bằng di chúc theo ý nguyện của người lập
   - Đảm bảo tính hợp pháp và không bị tranh chấp sau này

Giá trị pháp lý của vi bằng:
- Được công nhận bởi Tòa án
- Có hiệu lực chứng cứ trong tố tụng
- Được chính phủ và các cơ quan nhà nước công nhận
- Có thể sử dụng để đăng ký giao dịch`,
        relatedLaws: ['Luật Thừa phát lại 2011', 'Bộ luật Dân sự', 'Thông tư 08/2014/TT-BTP'],
        datePublished: '2024-11-15',
        author: 'Thừa phát lại Trần Thị B'
    },
    {
        id: 'article-3',
        title: 'Tống Đạt Văn Bản Tư Pháp - Quy Trình Và Yêu Cầu',
        category: 'Tống Đạt',
        content: `Tống đạt văn bản tư pháp là quá trình Thừa phát lại gửi các tài liệu pháp lý đến tay người nhận, với sự xác nhận của các bên liên quan.

Quy trình tống đạt:
1. Tiếp nhận yêu cầu từ cơ quan Tòa án hoặc khách hàng
2. Xác minh địa chỉ và thông tin người nhận
3. Thực hiện tống đạt trực tiếp hoặc qua các đơn vị tương ứng
4. Lập biên bản tống đạt với chữ ký xác nhận
5. Báo cáo kết quả tống đạt lại cho người yêu cầu

Các loại văn bản có thể tống đạt:
- Giấy mời, giấy thông báo từ Tòa án
- Quyết định, bản án của Tòa án
- Giấy triệu tập
- Thông báo về quyết định hành chính
- Các tài liệu pháp lý khác

Biên bản tống đạt cần ghi rõ:
- Thời gian, địa điểm tống đạt
- Tên, địa chỉ người nhận
- Nội dung văn bản tống đạt
- Phương thức tống đạt
- Chữ ký xác nhận của Thừa phát lại`,
        relatedLaws: ['Luật Thừa phát lại 2011', 'Luật Thi hành án dân sự 2008'],
        datePublished: '2024-11-10',
        author: 'Lê Văn C'
    },
    {
        id: 'article-4',
        title: 'Xác Minh Điều Kiện Thi Hành Án - Bước Quan Trọng Trong Tố Tụng',
        category: 'Thi Hành Án',
        content: `Xác minh điều kiện thi hành án là quá trình Thừa phát lại điều tra, kiểm chứng tài sản, thu nhập và các điều kiện khác của người phải thi hành án để hỗ trợ Tòa án trong quá trình thi hành án.

Nội dung xác minh:
1. Tài sản:
   - Tài sản động sản (ô tô, máy móc, đồ dùng có giá trị)
   - Tài sản bất động sản (nhà cửa, đất đai)
   - Tài sản khác (hàng hóa, chứng khoán)

2. Thu nhập:
   - Lương, thưởng từ nơi làm việc
   - Thu nhập từ kinh doanh
   - Thu nhập từ các hoạt động khác
   - Tài sản quản lý hộ

3. Địa chỉ:
   - Nơi cư trú hiện tại
   - Nơi làm việc
   - Nơi có tài sản

Quy trình xác minh:
- Tiếp nhận yêu cầu từ cơ quan thi hành án
- Thực hiện điều tra tại nơi cư trú, làm việc
- Thu thập thông tin từ cơ quan, doanh nghiệp liên quan
- Lập báo cáo xác minh chi tiết
- Gửi báo cáo cho cơ quan thi hành án

Quyền của Thừa phát lại khi xác minh:
- Được phép vào nơi cư trú, làm việc
- Được yêu cầu người khác cung cấp thông tin
- Được yêu cầu cơ quan có liên quan cung cấp tài liệu
- Lập biên bản về những gì phát hiện được`,
        relatedLaws: ['Luật Thi hành án dân sự 2008', 'Luật Thừa phát lại 2011'],
        datePublished: '2024-11-05',
        author: 'Võ Minh E'
    },
    {
        id: 'article-5',
        title: 'Tổ Chức Thi Hành Án Dân Sự - Quyền Và Nghĩa Vụ',
        category: 'Thi Hành Án',
        content: `Tổ chức thi hành án là quá trình Thừa phát lại giúp thực hiện các quyết định, bản án của Tòa án theo ủy quyền của cơ quan thi hành án.

Các hoạt động thi hành án:
1. Phong tỏa tài sản:
   - Phong tỏa tài sản động sản
   - Phong tỏa tài sản bất động sản
   - Lập biên bản phong tỏa

2. Kê biên tài sản:
   - Xác định tài sản có thể kê biên
   - Lập danh sách tài sản bị kê biên
   - Bảo quản tài sản kê biên

3. Tổ chức bán đấu giá:
   - Hỗ trợ chuẩn bị tài liệu
   - Quản lý quy trình bán đấu giá
   - Lập biên bản bán đấu giá

4. Giám sát thi hành án:
   - Đảm bảo quá trình thi hành án đúng quy định
   - Ghi lại tất cả những hành động trong quá trình thi hành
   - Báo cáo kết quả cho cơ quan thi hành án

Quyền của người được thi hành án:
- Được biết đủ thông tin về quá trình thi hành
- Có quyền khiếu nại về những hành động không đúng
- Được yêu cầu Thừa phát lại tuân thủ quy định pháp luật

Quyền của người phải thi hành án:
- Được biết lý do thi hành án
- Được yêu cầu hủy bỏ nếu không đúng thủ tục
- Được yêu cầu bảo vệ tài sản khỏi hư hỏng không cần thiết`,
        relatedLaws: ['Luật Thi hành án dân sự 2008', 'Luật Thừa phát lại 2011'],
        datePublished: '2024-10-28',
        author: 'Phạm Thị D'
    },
    {
        id: 'article-6',
        title: 'Quyền Và Trách Nhiệm Của Thừa Phát Lại',
        category: 'Quy Định Pháp Luật',
        content: `Luật Thừa phát lại 2011 quy định rõ quyền và trách nhiệm của những người hoạt động trong ngành nghề này.

Quyền của Thừa phát lại:
1. Được tiến hành các hoạt động nghề nghiệp:
   - Lập vi bằng theo yêu cầu hợp pháp
   - Tống đạt văn bản tư pháp
   - Xác minh điều kiện thi hành án
   - Tổ chức thi hành án theo ủy quyền

2. Được yêu cầu hợp tác từ các bên liên quan:
   - Được vào nơi cư trú, làm việc
   - Được yêu cầu cung cấp thông tin
   - Được cơ quan công an bảo vệ khi cần thiết

3. Được hưởng bảo vệ pháp lý:
   - Được bảo vệ thân thể khi thi hành công vụ
   - Được bảo vệ khỏi các hành động gây ức chế

Trách nhiệm của Thừa phát lại:
1. Tuân thủ pháp luật:
   - Thực hiện đúng theo quy định pháp luật
   - Không được vượt quá phạm vi ủy quyền
   - Bảo vệ bí mật thông tin cá nhân

2. Đảm bảo chất lượng:
   - Lập vi bằng đúng quy cách
   - Tống đạt đúng thời hạn
   - Lập báo cáo xác minh chính xác

3. Chịu trách nhiệm hành chính:
   - Nếu vi phạm được Bộ Tư pháp xử phạt
   - Có thể bị thu hồi Thẻ hành nghề
   - Bị xử lý hành chính theo quy định

4. Chịu trách nhiệm dân sự:
   - Nếu gây thiệt hại phải bồi thường
   - Nếu sai sót gây thiệt hại phải bồi thường`,
        relatedLaws: ['Luật Thừa phát lại 2011', 'Luật Xử lý vi phạm hành chính'],
        datePublished: '2024-10-15',
        author: 'Luật sư Nguyễn Văn A'
    },
    {
        id: 'article-7',
        title: 'Quy Trình Và Chi Phí Lập Vi Bằng Chi Tiết',
        category: 'Vi Bằng',
        content: `Quy trình lập vi bằng được quy định rõ ràng để đảm bảo tính pháp lý và minh bạch.

Quy trình lập vi bằng:

Bước 1: Chuẩn bị hồ sơ
- Khách hàng chuẩn bị các chứng thực cá nhân (CMND, CCCD)
- Chuẩn bị các tài liệu liên quan đến giao dịch
- Nếu cần có sự chứng kiến của người thứ ba

Bước 2: Tư vấn ban đầu
- Thừa phát lại tư vấn về loại vi bằng cần lập
- Giải thích quyền lợi và trách nhiệm của các bên
- Xác định giá trị giao dịch

Bước 3: Xác nhận ý nguyện
- Xác nhận tất cả bên liên quan đều đồng ý
- Xác nhận không có yếu tố cưỡng bức
- Ghi lại ý nguyện của các bên

Bước 4: Lập vi bằng
- Soạn thảo nội dung vi bằng theo quy định
- Đảm bảo đầy đủ thông tin pháp lý
- Tuân thủ quy cách và hình thức

Bước 5: Ký kết
- Các bên ký tên trên vi bằng
- Thừa phát lại ký tên, đóng dấu riêng
- Ghi ngày lập vi bằng

Bước 6: Bàn giao
- Bàn giao bản gốc cho khách hàng
- Cấp bản sao nếu cần
- Lưu trữ bản sao tại văn phòng

Chi phí lập vi bằng:
- Phí cơ bản: được quy định bởi Bộ Tư pháp
- Phí phụ thêm: nếu vi bằng phức tạp
- Phí ký kết lại: nếu sửa đổi
- Phí cấp bản sao: theo quy định

Các yếu tố ảnh hưởng đến chi phí:
- Loại vi bằng
- Giá trị giao dịch
- Độ phức tạp của nội dung
- Thời gian cấp cứu`,
        relatedLaws: ['Thông tư 08/2014/TT-BTP', 'Quyết định 1667/QĐ-BTP-2014'],
        datePublished: '2024-10-08',
        author: 'Lê Văn C'
    }
];

// Các luật và quy định chính
export const mainLaws: LawExplanation[] = [
    {
        id: 'law-1',
        lawName: 'Luật Thừa Phát Lại',
        lawNumber: 'Luật 2011',
        publishedDate: '2011-06-17',
        effectiveDate: '2012-01-01',
        mainPoints: [
            'Quy định tổ chức và hoạt động của Thừa phát lại',
            'Quy định điều kiện cấp Thẻ hành nghề',
            'Quy định quyền và trách nhiệm của Thừa phát lại',
            'Quy định các hoạt động lập vi bằng, tống đạt, xác minh, tổ chức thi hành án',
            'Quy định về kỷ luật và xử phạt hành chính'
        ],
        applicationScope: 'Áp dụng trên toàn bộ lãnh thổ Việt Nam',
        penalties: [
            'Cảnh cáo hoặc phạt tiền từ 5-20 triệu đồng',
            'Thu hồi Thẻ hành nghề nếu vi phạm nghiêm trọng',
            'Xử phạt hành chính khi vi phạm quyền hạn'
        ]
    },
    {
        id: 'law-2',
        lawName: 'Nghị Định Quy Định Chi Tiết Thi Hành',
        lawNumber: 'Nghị định 125/2013/NĐ-CP',
        publishedDate: '2013-09-27',
        effectiveDate: '2013-11-01',
        mainPoints: [
            'Quy định chi tiết về đăng ký, quản lý Thừa phát lại',
            'Quy định về tổ chức, hoạt động của Sở Tư pháp',
            'Quy định về quản lý, giám sát Thừa phát lại',
            'Quy định về kỷ luật, xử phạt hành chính'
        ],
        applicationScope: 'Áp dụng toàn quốc'
    },
    {
        id: 'law-3',
        lawName: 'Thông Tư Hướng Dẫn Lập Vi Bằng',
        lawNumber: 'Thông tư 08/2014/TT-BTP',
        publishedDate: '2014-06-25',
        effectiveDate: '2014-07-15',
        mainPoints: [
            'Hướng dẫn chi tiết về lập vi bằng',
            'Quy định nội dung, hình thức vi bằng',
            'Quy định về chứng thực có điều kiện',
            'Quy định lưu trữ, cấp bản sao vi bằng'
        ],
        applicationScope: 'Áp dụng toàn quốc'
    },
    {
        id: 'law-4',
        lawName: 'Luật Thi Hành Án Dân Sự',
        lawNumber: 'Luật 2008',
        publishedDate: '2008-11-14',
        effectiveDate: '2009-01-01',
        mainPoints: [
            'Quy định về tổ chức thi hành án',
            'Quy định quyền và trách nhiệm của cơ quan thi hành án',
            'Quy định về các biện pháp thi hành án',
            'Quy định về quyền của người được thi hành án và người phải thi hành án'
        ],
        applicationScope: 'Áp dụng toàn quốc'
    },
    {
        id: 'law-5',
        lawName: 'Bộ Luật Dân Sự',
        lawNumber: 'Bộ Luật 2015',
        publishedDate: '2015-11-24',
        effectiveDate: '2017-01-01',
        mainPoints: [
            'Quy định về nhân thân, gia đình, thừa kế',
            'Quy định về quyền sở hữu và các quyền khác liên quan đến tài sản',
            'Quy định về giao dịch dân sự',
            'Quy định về xác định người thực hiện giao dịch pháp luật'
        ],
        applicationScope: 'Áp dụng toàn quốc'
    },
    {
        id: 'law-6',
        lawName: 'Quyết Định Quy Định Mức Phí Lập Vi Bằng',
        lawNumber: 'Quyết định 1667/QĐ-BTP-2014',
        publishedDate: '2014-09-30',
        effectiveDate: '2014-10-15',
        mainPoints: [
            'Quy định mức phí lập vi bằng giao dịch dân sự',
            'Quy định mức phí lập vi bằng thế chấp, cầm cố',
            'Quy định mức phí lập vi bằng chuyển nhượng quyền sử dụng đất',
            'Quy định mức phí khác'
        ],
        applicationScope: 'Áp dụng toàn quốc'
    }
];

// Các thuật ngữ pháp luật
export const legalTerms: LegalTerm[] = [
    {
        id: 'term-1',
        term: 'Vi Bằng',
        definition: 'Tài liệu do Thừa phát lại lập, ghi lại các giao dịch dân sự, có giá trị pháp lý cao và được công nhận bởi pháp luật.',
        relatedLaws: ['Luật Thừa phát lại 2011', 'Bộ luật Dân sự 2015'],
        examples: ['Vi bằng mua bán tài sản', 'Vi bằng thế chấp bất động sản']
    },
    {
        id: 'term-2',
        term: 'Tống Đạt',
        definition: 'Quá trình gửi các tài liệu pháp lý đến tay người nhận, với sự xác nhận của Thừa phát lại hoặc các bên liên quan.',
        relatedLaws: ['Luật Thừa phát lại 2011', 'Luật Thi hành án dân sự 2008'],
        examples: ['Tống đạt giấy mời từ Tòa án', 'Tống đạt quyết định hành chính']
    },
    {
        id: 'term-3',
        term: 'Biên Bản',
        definition: 'Tài liệu ghi lại các sự kiện, việc làm, hoặc kết quả của một quá trình nào đó, được ký xác nhận bởi các bên liên quan.',
        relatedLaws: ['Luật Thừa phát lại 2011'],
        examples: ['Biên bản tống đạt', 'Biên bản xác minh', 'Biên bản thi hành án']
    },
    {
        id: 'term-4',
        term: 'Chứng Thực',
        definition: 'Hành động của Thừa phát lại xác nhận tính chân thực của chữ ký hoặc dấu của người ký kết trên tài liệu.',
        relatedLaws: ['Luật Thừa phát lại 2011', 'Thông tư 08/2014/TT-BTP'],
        examples: ['Chứng thực chữ ký trên hợp đồng', 'Chứng thực di chúc']
    },
    {
        id: 'term-5',
        term: 'Thế Chấp',
        definition: 'Hình thức bảo đảm một khoản nợ bằng cách tặng quyền sử dụng một tài sản cho chủ nợ, cho đến khi nợ được thanh toán.',
        relatedLaws: ['Bộ luật Dân sự 2015'],
        examples: ['Thế chấp nhà cửa để vay tiền', 'Thế chấp đất để vay kinh doanh']
    },
    {
        id: 'term-6',
        term: 'Cầm Cố',
        definition: 'Hình thức bảo đảm một khoản nợ bằng cách bàn giao một tài sản động sản cho chủ nợ.',
        relatedLaws: ['Bộ luật Dân sự 2015'],
        examples: ['Cầm cố xe máy để vay tiền', 'Cầm cố trang sức']
    },
    {
        id: 'term-7',
        term: 'Thi Hành Án',
        definition: 'Quá trình thực hiện các quyết định, bản án của Tòa án bằng cách buộc người phải thi hành án thực hiện các nghĩa vụ của họ.',
        relatedLaws: ['Luật Thi hành án dân sự 2008'],
        examples: ['Thi hành án yêu cầu thanh toán tiền', 'Thi hành án yêu cầu trả lại tài sản']
    },
    {
        id: 'term-8',
        term: 'Kê Biên',
        definition: 'Biện pháp thi hành án bằng cách tạm giữ tài sản của người phải thi hành án để chuẩn bị bán đấu giá.',
        relatedLaws: ['Luật Thi hành án dân sự 2008'],
        examples: ['Kê biên bất động sản', 'Kê biên xe cộ']
    },
    {
        id: 'term-9',
        term: 'Phong Tỏa',
        definition: 'Biện pháp thi hành án bằng cách cấm người phải thi hành án sử dụng hoặc chuyển nhượng tài sản bị phong tỏa.',
        relatedLaws: ['Luật Thi hành án dân sự 2008'],
        examples: ['Phong tỏa tài khoản ngân hàng', 'Phong tỏa bất động sản']
    },
    {
        id: 'term-10',
        term: 'Giao Dịch Dân Sự',
        definition: 'Hành động của các chủ thể nhằm thực hiện, thay đổi hoặc chấm dứt các quyền và trách nhiệm dân sự.',
        relatedLaws: ['Bộ luật Dân sự 2015'],
        examples: ['Mua bán tài sản', 'Ký hợp đồng cho vay', 'Làm hợp đồng dịch vụ']
    }
];

// Các liên kết tham khảo hữu ích
export const usefulReferences = [
    {
        id: 'ref-1',
        name: 'Cổng Thông Tin Pháp Luật Việt Nam',
        url: 'https://thuvienphapluat.vn/',
        description: 'Cơ sở dữ liệu lưu trữ các văn bản pháp luật, nghị định, thông tư của Việt Nam',
        category: 'Tài liệu Pháp luật'
    },
    {
        id: 'ref-2',
        name: 'Bộ Tư Pháp - Trang Chính Thức',
        url: 'https://moj.gov.vn/',
        description: 'Trang chính thức của Bộ Tư pháp Việt Nam, cung cấp thông tin về luật pháp, Thừa phát lại',
        category: 'Cơ Quan Chính Phủ'
    },
    {
        id: 'ref-3',
        name: 'Luật Việt Nam',
        url: 'https://luatvietnam.vn/',
        description: 'Cổng thông tin hàng đầu về pháp luật Việt Nam, có bảng giải thích luật',
        category: 'Tài liệu Pháp luật'
    },
    {
        id: 'ref-4',
        name: 'Luật Sư Hạ Thành',
        url: 'https://luatsuhathanh.com/',
        description: 'Trang chuyên cung cấp thông tin pháp luật, tư vấn pháp lý trực tuyến',
        category: 'Tư Vấn Pháp Lý'
    },
    {
        id: 'ref-5',
        name: 'Tòa Án Nhân Dân Tối Cao',
        url: 'https://tandtc.vn/',
        description: 'Trang chính thức của Tòa án Nhân dân Tối cao, cung cấp thông tin về thi hành án',
        category: 'Tòa Án'
    },
    {
        id: 'ref-6',
        name: 'Hệ Thống Thông Tin Pháp Luật Quốc Gia',
        url: 'https://vbpl.vn/',
        description: 'Hệ thống thông tin pháp luật chính thức của Quốc hội Việt Nam',
        category: 'Tài liệu Pháp luật'
    },
    {
        id: 'ref-7',
        name: 'Trang Chính Thức Quốc Hội Việt Nam',
        url: 'https://quochoi.vn/',
        description: 'Trang chính thức của Quốc hội Việt Nam, công bố các luật mới',
        category: 'Cơ Quan Chính Phủ'
    },
    {
        id: 'ref-8',
        name: 'Cổng Giao Dịch Điện Tử Công Quốc Gia',
        url: 'https://egov.danang.gov.vn/',
        description: 'Cổng giao dịch điện tử công phục vụ cấp phép, thủ tục hành chính',
        category: 'Dịch Vụ Công'
    }
];

// FAQ chi tiết về pháp luật
export const legalFAQs = [
    {
        id: 'legal-faq-1',
        question: 'Vi bằng được công nhận ở nước ngoài không?',
        answer: 'Vi bằng do Thừa phát lại Việt Nam lập được công nhận tại một số nước theo các điều ước quốc tế hoặc theo nguyên tắc tương hỗ. Để sử dụng vi bằng ở nước ngoài, cần phải xin cấp bản sao xác thực (apostille) tại Bộ Tư pháp.'
    },
    {
        id: 'legal-faq-2',
        question: 'Vi bằng có thể bị thách thức ở Tòa án không?',
        answer: 'Có thể. Nếu người khác cho rằng vi bằng không hợp pháp, họ có thể khiếu nại hoặc kiện tại Tòa án. Tòa án sẽ kiểm tra xem vi bằng có được lập đúng theo quy định pháp luật không.'
    },
    {
        id: 'legal-faq-3',
        question: 'Thừa phát lại có thể từ chối lập vi bằng không?',
        answer: 'Có. Thừa phát lại có thể từ chối lập vi bằng nếu: (1) Giao dịch không hợp pháp, (2) Một bên bị cưỡng bức, (3) Thiếu năng lực hành vi, (4) Vi phạm luật pháp.'
    },
    {
        id: 'legal-faq-4',
        question: 'Chi phí lập vi bằng được tính như thế nào?',
        answer: 'Chi phí dựa trên: (1) Loại vi bằng, (2) Giá trị giao dịch, (3) Độ phức tạp. Bộ Tư pháp quy định mức phí tối đa. Thừa phát lại phải công khai mức phí trước khi lập.'
    },
    {
        id: 'legal-faq-5',
        question: 'Làm sao để khiếu nại nếu Thừa phát lại lập vi bằng sai?',
        answer: 'Bạn có thể: (1) Yêu cầu sửa chữa vi bằng, (2) Khiếu nại với Sở Tư pháp, (3) Khởi kiện Thừa phát lại tại Tòa án yêu cầu bồi thường thiệt hại.'
    }
];
