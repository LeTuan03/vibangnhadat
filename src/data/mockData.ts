import type { Service, BlogPost, FAQ, LegalDocument, Testimonial, TeamMember, Statistic, ContactInfo, ServiceArea, FamilyLawQA, GalleryItem } from '../types';

// Mock Data for Blog Posts
export const mockBlogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'Hướng dẫn chi tiết về lập hợp đồng dân sự hợp lệ',
        excerpt: 'Hợp đồng dân sự là nền tảng của mọi giao dịch. Bài viết này hướng dẫn các yếu tố bắt buộc để hợp đồng có hiệu lực pháp luật.',
        content: `Hợp đồng dân sự là thỏa thuận pháp luật giữa hai hay nhiều bên, được quy định tại Bộ Luật Dân sự 2015. Để hợp đồng có hiệu lực pháp luật, cần đáp ứng những điều kiện sau:

1. Các bên có năng lực hợp đồng (phải là người thành niên, có năng lực hành vi dân sự đầy đủ)
2. Sự đồng ý của các bên về nội dung hợp đồng
3. Nội dung hợp đồng phải hợp pháp, không vi phạm các quy định pháp luật
4. Hình thức lập hợp đồng phải đúng quy định (bằng văn bản, chứng thực hoặc công chứng nếu luật có quy định)
5. Hợp đồng phải có đối tượng xác định rõ ràng

Các loại hợp đồng dân sự phổ biến:
- Hợp đồng mua bán
- Hợp đồng cho thuê
- Hợp đồng tặng cho
- Hợp đồng vay
- Hợp đồng lao động

Để tránh tranh chấp, hợp đồng cần có những nội dung cụ thể như: quyền và nghĩa vụ của các bên, thời gian thực hiện, điều kiện thanh toán, những trường hợp vi phạm và hậu quả.

Nên tham khảo ý kiến của luật sư khi lập những hợp đồng có giá trị lớn hoặc liên quan đến tài sản quan trọng.`,
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-12-01',
        category: 'Luật dân sự',
        image: 'https://via.placeholder.com/800x400?text=Hop+Dong+Dan+Su',
        tags: ['hợp đồng', 'luật dân sự', 'tư vấn pháp luật'],
        featured: true,
        status: 'published',
        views: 245,
        readTime: 8
    },
    {
        id: 'blog-2',
        title: 'Quy trình giải quyết tranh chấp lao động theo pháp luật Việt Nam',
        excerpt: 'Tranh chấp lao động xảy ra thường xuyên. Bài viết này giới thiệu các bước giải quyết từ thương lượng đến tòa án.',
        content: `Tranh chấp lao động phát sinh khi có bất đồng giữa người sử dụng lao động và người lao động. Pháp luật Lao động 2012 quy định quy trình giải quyết gồm các bước:

1. THƯƠNG LƯỢNG TRỰ TIẾP (Bước 1)
- Hai bên tìm cách giải quyết thân thiện
- Thời gian: không quá 10 ngày
- Nên ghi chép lại kết quả thương lượng

2. KHIẾU NẠI (Bước 2)
- Gửi khiếu nại đến người sử dụng lao động
- Nếu chưa giải quyết, có thể khiếu nại đến người đại diện được ủy quyền
- Người sử dụng lao động phải giải quyết trong vòng 10 ngày

3. TỐ CÁO LÊN CƠ QUAN LÂCS (Bước 3)
- Nếu tranh chấp chưa giải quyết, gửi tố cáo lên Cơ quan Lâm bộ, Công đoàn cấp cơ sở
- Cơ quan này có trách nhiệm giải quyết trong 10 ngày
- Có thể hòa giải hoặc xác định lỗi của bên nào

4. TRỌNG TÀI LAO ĐỘNG (Bước 4)
- Nếu còn tranh chấp, các bên có thể đồng ý gửi hòa giải tại Hội đồng Trọng tài
- Hội đồng sẽ giải quyết trong thời gian quy định
- Quyết định của Hội đồng có tính chất bắt buộc

5. TÒA ÁN (Bước 5)
- Là bước giải quyết cuối cùng
- Tòa án có thể chấp nhận hoặc bác bỏ quyết định trọng tài
- Phán quyết của tòa án là cuối cùng

LƯU Ý QUAN TRỌNG:
- Người lao động không cần phải chi trả phí cho các bước 1-4
- Nên giữ giấy tờ, hợp đồng, chứng cứ để chứng minh tuyên bố
- Thời hiệu khiếu nại thường là 30 ngày kể từ khi tranh chấp phát sinh

Để bảo vệ quyền lợi của mình, người lao động nên tham khảo ý kiến của luật sư ngay khi phát sinh tranh chấp.`,
        author: 'Luật sư Trần Thị B',
        date: '2024-11-28',
        category: 'Luật lao động',
        image: 'https://via.placeholder.com/800x400?text=Tranh+Chap+Lao+Dong',
        tags: ['tranh chấp', 'lao động', 'giải quyết', 'quy trình'],
        featured: true,
        status: 'published',
        views: 312,
        readTime: 10
    },
    {
        id: 'blog-3',
        title: 'Thủ tục ly hôn tại Việt Nam: Từ ly hôn thỏa thuận đến tranh chấp',
        excerpt: 'Ly hôn có hai hình thức: thỏa thuận và tranh chấp. Bài viết hướng dẫn chi tiết từng quy trình.',
        content: `Ly hôn là sự chấm dứt hôn nhân được công nhân bởi pháp luật. Theo Luật Hôn nhân và Gia đình 2000, có hai hình thức ly hôn:

I. LY HÔN THỎA THUẬN (Đơn giản, nhanh chóng)
Điều kiện:
- Cả hai vợ chồng đồng ý ly hôn
- Có thỏa thuận về con cái (nuôi dạy, cấp dưỡng)
- Có thỏa thuận về tài sản và nợ chung
- Không có con nhỏ dưới 3 tuổi ngoài hôn nhân (trừ trường hợp cần thiết)

Thủ tục:
1. Chuẩn bị hồ sơ:
   - Giấy khai sinh của cặp vợ chồng
   - Giấy chứng thực hôn nhân
   - CMND/CCCD của cả hai
   - Nếu có con: giấy khai sinh con
   - Thỏa thuận bằng văn bản về con cái, tài sản, nợ chung

2. Nộp đơn tại Trung tâm Hành chính công:
   - Có thể nộp trực tiếp hoặc qua bưu điện
   - Phí: từ 500.000 - 750.000 đồng (tùy tỉnh)

3. Chờ xử lý:
   - Thời gian từ 3-5 ngày làm việc
   - Cơ quan hành chính sẽ gọi kiểm tra ý muốn của cả hai

4. Nhận giấy chứng thực:
   - Sau khi được cấp, hôn nhân chính thức chấm dứt
   - Đến Công an để cập nhật thông tin CMND/CCCD

II. LY HÔN TRANH CHẤP (Giải quyết tại tòa án)
Trường hợp:
- Một bên không đồng ý ly hôn
- Có tranh chấp về con cái hoặc tài sản

Thủ tục:
1. Lập đơn kiện ly hôn
2. Nộp đơn tại Tòa án nhân dân cấp huyện
3. Tòa án triệu tập các bên để hòa giải
4. Nếu không thành, tòa án mở phiên tòa
5. Phán quyết ly hôn (hoặc không)

Thời gian: 3-6 tháng

III. VẤN ĐỀ CON CÁI
- Người có năng lực nuôi dạy sẽ được nuôi con
- Bên kia phải cấp dưỡng cho con
- Mức cấp dưỡng: từ 15-30% lương của người bên kia
- Nếu có con nhỏ dưới 3 tuổi, mẹ ưu tiên được nuôi

IV. PHÂN CHIA TÀI SẢN
- Tài sản riêng của mỗi bên trước hôn nhân: thuộc quyền sở hữu riêng
- Tài sản chung trong hôn nhân: chia đôi (trừ khi có thỏa thuận khác)
- Nợ chung: hai bên cùng chịu trách nhiệm

LƯỚI Ý:
- Chuẩn bị hồ sơ đầy đủ để nhanh chóng
- Nên tham khảo luật sư nếu tranh chấp về con cái hoặc tài sản
- Bảo tồn bằng chứng về tài sản chung`,
        author: 'Luật sư Phạm Văn C',
        date: '2024-11-25',
        category: 'Hôn nhân gia đình',
        image: 'https://via.placeholder.com/800x400?text=Ly+Hon',
        tags: ['ly hôn', 'gia đình', 'thủ tục', 'con cái', 'tài sản'],
        featured: true,
        status: 'published',
        views: 458,
        readTime: 12
    },
    {
        id: 'blog-4',
        title: 'Những sai lầm phổ biến khi thành lập công ty và cách tránh',
        excerpt: 'Thành lập công ty không khó, nhưng nhiều người mắc phải những sai lầm có thể gây hậu quả lâu dài.',
        content: `Thành lập một công ty là quyết định quan trọng. Dưới đây là những sai lầm phổ biến mà các doanh nhân thường gặp:

1. KHÔNG LẬP GIẤY TỜ NỘI BỘ CÔNG TY
- Sai lầm: Thành lập công ty nhưng không có Điều lệ công ty rõ ràng
- Hậu quả: Khi có tranh chấp, khó xác định quyền hạn của cổ đông, lãnh đạo
- Cách tránh: Lập Điều lệ công ty chi tiết, rõ ràng trước khi đăng ký

2. KHÔNG PHÂN CHIA VỐN RÕ RÀNG
- Sai lầm: Không có hợp đồng góp vốn, chỉ nói lời
- Hậu quả: Tranh chấp về tỷ lệ cổ phần, quyền lợi
- Cách tránh: Lập hợp đồng góp vốn bằng văn bản, rõ ràng tỷ lệ, thời hạn

3. MIX TIỀN CÁ NHÂN VÀ TIỀN CÔNG TY
- Sai lầm: Sử dụng tài khoản cá nhân cho giao dịch công ty
- Hậu quả: Khó tính toán lợi nhuận, rủi ro về thuế, pháp lý
- Cách tránh: Mở tài khoản riêng cho công ty, phân tách hoàn toàn

4. KHÔNG CẬP NHẬT HỒ SƠ CÔNG TY
- Sai lầm: Không nộp báo cáo tài chính, báo cáo hàng năm
- Hậu quả: Bị phạt, công ty bị tước quyền
- Cách tránh: Cập nhật đầy đủ, đúng hạn tất cả các loại báo cáo

5. KHÔNG LÝ GIẢI RÕ RÀNG TRÁCH NHIỆM CỦA CỔ ĐÔNG
- Sai lầm: Không có biên bản họp cổ đông
- Hậu quả: Tranh chấp về quyết định kinh doanh
- Cách tránh: Tổ chức họp cổ đông định kỳ, lập biên bản ghi chép

6. KHÔNG CÓ HỢP ĐỒNG LƯƠNG CHO NHÂN VIÊN
- Sai lầm: Thuê nhân viên không có hợp đồng hoặc hợp đồng không chuẩn
- Hậu quả: Tranh chấp lao động, phạt hành chính
- Cách tránh: Ký hợp đồng lao động theo quy định, rõ ràng về lương, quyền lợi

7. KHÔNG KẾ TOÁN ĐỤC TẬP
- Sai lầm: Không ghi chép hóa đơn, chứng từ
- Hậu quả: Không thể chứng minh doanh thu, khó tính thuế
- Cách tránh: Ghi chép mọi giao dịch, lưu giữ hóa đơn, chứng từ

GIẢI PHÁP:
Hãy tham khảo ý kiến của luật sư để đảm bảo công ty được thành lập đúng quy định, và có thể tránh được những vấn đề pháp lý về sau.`,
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-11-20',
        category: 'Luật doanh nghiệp',
        image: 'https://via.placeholder.com/800x400?text=Thanh+Lap+Cong+Ty',
        tags: ['công ty', 'doanh nghiệp', 'sai lầm', 'pháp lý'],
        featured: false,
        status: 'published',
        views: 189,
        readTime: 9
    },
    {
        id: 'blog-5',
        title: 'Hướng dẫn mua bán nhà đất: Những điều cần biết để tránh rủi ro',
        excerpt: 'Mua bán bất động sản là giao dịch lớn. Bài viết này giúp bạn hiểu rõ quy trình và tránh những rủi ro.',
        content: `Mua bán nhà đất là một trong những giao dịch lớn nhất trong cuộc đời. Dưới đây là hướng dẫn chi tiết để bạn thực hiện giao dịch an toàn:

I. KIỂM TRA GIẤY TỜ BẤT ĐỘNG SẢN
Trước khi mua, cần kiểm tra:
1. Giấy chứng thực quyền sử dụng đất (GCNQSD)
2. Giấy chứng thực nhà ở (GCNNH)
3. Bản đồ địa chính
4. Hóa đơn, chứng thực về nguồn gốc

Kiểm tra:
- Tên người sở hữu có trùng với người bán không?
- Diện tích, vị trí có trùng khớp không?
- Giấy chứng thực còn hiệu lực?
- Có lệnh cấm giao dịch không?

II. KIỂM TRA TÌNH TRẠNG PHÁP LÝ
- Có tranh chấp đất đai với hàng xóm không?
- Có nợ tiền sử dụng đất?
- Có nợ thuế?
- Có ai khác nhất quyền trên bất động sản không?

III. THƯƠNG LƯỢNG GIÁ
- Tìm hiểu giá thị trường khu vực
- So sánh với những bất động sản tương tự
- Đừng vội, hãy thương lượng hợp lý

IV. LẬP HỢP ĐỒNG MUA BÁN
- Hợp đồng phải có bằng văn bản
- Ghi rõ:
  * Tên, CMND của cả hai bên
  * Mô tả chi tiết bất động sản
  * Giá, phương thức thanh toán
  * Thời gian giao nhận
  * Trách nhiệm nếu vi phạm
  * Ngày ký hợp đồng

V. XỬ LÝ HÀNH CHÍNH
1. Lập dự toán thuế, phí
2. Nộp hồ sơ tại Cục Đăng ký Đất đai
3. Trả thuế chuyển nhượng
4. Đợi cấp giấy chứng thực mới

VI. NHỮNG RỦI RO CẦN TRÁNH
- Không mua đất mà chủ sở hữu không rõ ràng
- Không mua đất đang có tranh chấp
- Không rút tiền trước khi nhận được giấy chứng thực
- Không để kẻ xấu lợi dụng

LƯU Ý QUAN TRỌNG:
- Nên kiểm tra giấy tờ tại Cục Đăng ký Đất đai
- Nên mời luật sư tham gia để đảm bảo quyền lợi
- Lưu giữ tất cả giấy tờ, hóa đơn
- Bảo hiểm giao dịch nếu có thể`,
        author: 'Luật sư Trần Thị B',
        date: '2024-11-18',
        category: 'Luật đất đai',
        image: 'https://via.placeholder.com/800x400?text=Mua+Ban+Dat+Dai',
        tags: ['đất đai', 'mua bán', 'bất động sản', 'pháp lý'],
        featured: false,
        status: 'published',
        views: 267,
        readTime: 11
    },
    {
        id: 'blog-6',
        title: 'Hợp đồng lao động: Những điều cần biết để bảo vệ quyền lợi của bạn',
        excerpt: 'Hợp đồng lao động là quyền và nghĩa vụ pháp lý. Bài viết này giúp bạn hiểu rõ quyền lợi của mình.',
        content: `Hợp đồng lao động là thỏa thuận pháp luật giữa người sử dụng lao động và người lao động. Đây là những điều bạn cần biết:

I. HỢP ĐỒNG LƯƠNG ĐỘNG PHẢI CÓ NHỮNG GÌ
Theo Luật Lao động 2012, hợp đồng phải ghi rõ:
1. Tên, địa chỉ của hai bên
2. Vị trí công việc
3. Nơi làm việc
4. Mức lương
5. Thời gian làm việc
6. Thời hạn hợp đồng (vô hạn hay có hạn)
7. Quyền và nghĩa vụ
8. Điều kiện làm việc
9. Bảo hiểm xã hội, bảo hiểm y tế

II. LOẠI HỢP ĐỒNG
1. Hợp đồng vô hạn định kỳ:
   - Không có ngày kết thúc
   - Ổn định nhất cho người lao động

2. Hợp đồng có hạn định kỳ:
   - Có ngày kết thúc rõ ràng (thường 1-3 năm)
   - Khi kết thúc, người sử dụng lao động có thể không gia hạn

3. Hợp đồng làm việc theo dự án:
   - Kết thúc khi dự án xong

III. QUYỀN CỦA NGƯỜI LAO ĐỘNG
- Được trả lương đầy đủ, đúng hạn
- Được hưởng bảo hiểm xã hội, bảo hiểm y tế
- Được nghỉ phép hàng năm (12-16 ngày tùy điều kiện)
- Được lao động trong điều kiện an toàn
- Được đình công nếu quyền lợi bị vi phạm

IV. NGHĨA VỤ CỦA NGƯỜI LAO ĐỘNG
- Làm việc đúng giờ, đúng chất lượng
- Tuân thủ nội quy công ty
- Bảo mật thông tin công ty
- Không tham gia hoạt động cạnh tranh với công ty

V. LƯƠNG VÀ CẤP DƯỠNG
- Lương tối thiểu hàng tháng được quy định bởi nhà nước
- Ngoài lương, có thể có trợ cấp ăn trưa, xăng xe
- Lương làm thêm giờ phải được trả thêm 150-300% tùy điều kiện

VI. KỲ NGHỈ VÀ NGÀY LỄ
- Ngày lễ Tết: 7 ngày
- Ngày quốc khánh: 1 ngày
- Những ngày lễ khác: tuỳ định
- Kỳ nghỉ hàng năm: 12-16 ngày (tùy năm làm việc)

VII. CHẤM DỨT HỢP ĐỒNG
Hợp đồng có thể kết thúc khi:
- Hết thời hạn (hợp đồng có hạn)
- Hai bên thỏa thuận
- Một bên đơn phương chấm dứt (phải có lý do chính đáng)
- Người sử dụng lao động phải trả tiền bồi thường nếu kết thúc không có lý do

LƯUI Ý:
- Đọc kỹ hợp đồng trước khi ký
- Yêu cầu một bản copy
- Lưu giữ hợp đồng thật
- Nếu hợp đồng không rõ ràng, tham khảo luật sư`,
        author: 'Luật sư Phạm Văn C',
        date: '2024-11-15',
        category: 'Luật lao động',
        image: 'https://via.placeholder.com/800x400?text=Hop+Dong+Lao+Dong',
        tags: ['lao động', 'hợp đồng', 'quyền lợi', 'lương'],
        featured: false,
        status: 'published',
        views: 334,
        readTime: 10
    },
    {
        id: 'blog-7',
        title: 'Quyền thừa kế và phân chia tài sản: Những gì bạn cần biết',
        excerpt: 'Thừa kế là quyền được hưởng tài sản của người đã chết. Bài viết này giải thích rõ quy tắc thừa kế.',
        content: `Thừa kế là quyền và nghĩa vụ của những người còn sống được hưởng tài sản của người đã chết. Dưới đây là những điều bạn cần biết:

I. NGUYÊN TẮC THỪA KẾ
- Người chết gọi là thụ hưởng
- Những người được hưởng tài sản gọi là người thừa kế
- Người thừa kế phải đáp ứng một số điều kiện nhất định
- Thừa kế có hai hình thức: thừa kế theo pháp luật hoặc theo di chúc

II. NGƯỜI CÓ QUYỀN THỪA KẾ
Thứ tự thừa kế theo pháp luật:

Hàng thứ nhất:
- Vợ/chồng
- Con cái (kể cả con nuôi, con riêng)
- Bố mẹ

Hàng thứ hai:
- Anh, chị, em ruột
- Ông bà
- Cháu ruột (con của anh em đã chết)

Hàng thứ ba:
- Bác, cô, chú, dì
- Cháu của những người này

Hàng thứ tư:
- Những người khác (có liên quan xa)

III. DI CHÚC
Di chúc là quyết định của người viết (người chết) về cách chia tài sản sau khi họ chết.

Điều kiện di chúc hợp lệ:
1. Được viết bằng văn bản hoặc ghi âm
2. Phải do chính tay người viết hoặc người khác viết theo yêu cầu
3. Phải có chữ ký hoặc điểm chỉ của người viết
4. Phải có 02 nhân chứng
5. Nếu như tài sản của người chết trong nước ngoài, có thể công chứng tại đó

IV. QUY TRÌNH THỪA KẾ
1. Xác định người chết (khai tử)
2. Xác định di chúc (nếu có)
3. Xác định những người thừa kế
4. Kiểm kê tài sản
5. Chia tài sản theo pháp luật hoặc di chúc
6. Cấp giấy chứng thực di sản

V. PHÂN CHIA TÀI SẢN
- Nếu có di chúc: tuân theo di chúc
- Nếu không có di chúc: tuân theo thứ tự thừa kế (hàng 1, 2, 3, 4)
- Những người cùng hàng chia đều nhau
- Nếu một người trong hàng đã chết, con của họ thừa kế thay (thừa kế cử chỉ định)

VI. NỢ CỦA NGƯỜI CHẾT
- Những người thừa kế phải chịu trách nhiệm trả nợ
- Nhưng chỉ trả tối đa bằng giá trị tài sản thừa kế

LƯUI Ý:
- Hãy viết di chúc rõ ràng khi còn sống
- Công chứng di chúc để tránh tranh chấp
- Tham khảo luật sư khi có tranh chấp thừa kế`,
        author: 'Luật sư Trần Thị B',
        date: '2024-11-10',
        category: 'Hôn nhân gia đình',
        image: 'https://via.placeholder.com/800x400?text=Thua+Ke',
        tags: ['thừa kế', 'di chúc', 'tài sản', 'gia đình'],
        featured: false,
        status: 'published',
        views: 156,
        readTime: 9
    },
    {
        id: 'blog-8',
        title: 'Bảo vệ quyền lợi trẻ em sau ly hôn: Hướng dẫn cho cha mẹ',
        excerpt: 'Sau ly hôn, trẻ em cần được bảo vệ. Bài viết này giải thích quyền lợi và trách nhiệm của cha mẹ.',
        content: `Sau ly hôn, quyền lợi của trẻ em là ưu tiên hàng đầu. Dưới đây là những điều bạn cần biết:

I. QUYỀN CỦA TRẺ EM SAU LY HÔN
- Được bên cha/mẹ có năng lực nuôi dạy tốt nhất
- Được cấp dưỡng từ cả hai bên cha mẹ
- Được học tập, chăm sóc sức khỏe
- Được tiếp xúc với bên cha/mẹ không được nuôi

II. QUYỀN NUÔI CON
- Người có năng lực nuôi dạy sẽ được nuôi con
- Luật lưu tâm tới lợi ích của trẻ
- Nếu có con nhỏ dưới 3 tuổi, mẹ được ưu tiên
- Trẻ từ 3-7 tuổi, có thể để với mẹ hoặc cha tùy tình hình
- Trẻ từ 7 tuổi trở lên, có thể có ý kiến của chính trẻ

III. TIỀN CẤP DƯỠNG
- Bên không được nuôi con phải trả tiền cấp dưỡng
- Mức cấp dưỡng: 15-30% thu nhập hàng tháng
- Tính từ khi ly hôn cho đến khi con trưởng thành (18 tuổi)
- Nếu con tiếp tục học tập, có thể kéo dài đến 30 tuổi

IV. QUYỀN TIẾP XÚC
- Bên không được nuôi con vẫn có quyền gặp gỡ con
- Lịch gặp gỡ được thỏa thuận hoặc do tòa án quy định
- Không thể từ chối bên kia gặp con nếu không có lý do chính đáng

V. LỢI ÍCH CỦA TRẺ
- Sống trong môi trường an toàn, yên tĩnh
- Được cố gắng gìn giữ quan hệ với cả hai bên cha mẹ
- Không bị ảnh hưởng bởi tranh chấp của cha mẹ

VI. NHỮNG LƯUI Ý QUAN TRỌNG
- Không bao giờ sử dụng trẻ em để tranh giành quyền lực
- Tôn trọng quyền gặp gỡ của bên kia
- Không nên nói xấu bên kia trước mặt con
- Cố gắng hòa giải để tránh tổn thương tâm lý cho con

GIẢI PHÁP TRANH CHẤP:
Nếu có tranh chấp, cách tốt nhất là:
1. Thương lượng hòa giải
2. Gửi hòa giải tại UBND xã
3. Gửi tòa án nếu vẫn chưa giải quyết`,
        author: 'Luật sư Nguyễn Văn A',
        date: '2024-11-08',
        category: 'Hôn nhân gia đình',
        image: 'https://via.placeholder.com/800x400?text=Quyen+Tre+Em',
        tags: ['trẻ em', 'gia đình', 'ly hôn', 'quyền lợi'],
        featured: false,
        status: 'published',
        views: 128,
        readTime: 8
    },
    {
        id: 'blog-9',
        title: 'Các loại hợp đồng phổ biến mà bạn nên biết',
        excerpt: 'Hiểu rõ các loại hợp đồng giúp bạn bảo vệ quyền lợi trong giao dịch kinh doanh.',
        content: `Có rất nhiều loại hợp đồng trong pháp luật dân sự. Dưới đây là những loại phổ biến nhất:

I. HỢP ĐỒNG MUA BÁN
- Bên bán: chuyển giao sản phẩm
- Bên mua: trả tiền theo giá đã thỏa thuận
- Rủi ro từ sản phẩm: chuyển cho bên mua từ lúc bàn giao

II. HỢP ĐỒNG CHO THUÊ
- Bên cho thuê: cho bên kia sử dụng tài sản
- Bên thuê: trả tiền theo thỏa thuận
- Thời gian thuê: được ghi rõ

III. HỢP ĐỒNG VAY
- Bên cho vay: cấp tiền hoặc hàng hóa
- Bên vay: trả lại số tiền/hàng hóa tương đương
- Có thể có lãi suất hoặc không

IV. HỢP ĐỒNG TẶNG CHO
- Bên tặng: chuyển giao tài sản
- Bên nhận: nhận tài sản không có lấy gì
- Có thể có điều kiện gắn liền

V. HỢP ĐỒNG HOÀN TRẢ
- Bên cho: chuyển giao tài sản
- Bên nhận: có quyền hoàn trả tài sản
- Thường dùng trong bán hàng

VI. HỢP ĐỒNG SỬA CHỮA
- Bên sửa: sửa chữa hàng hóa
- Bên giao hàng: trả tiền công sửa chữa

VII. HỢP ĐỒNG LÀM CÔNG VIỆC
- Bên nhận: thực hiện công việc theo yêu cầu
- Bên giao: trả tiền công
- Kết quả: tài sản kết quả từ công việc

VIII. HỢP ĐỒNG BẢO HIỂM
- Công ty bảo hiểm: bảo vệ rủi ro
- Bên mua: trả phí bảo hiểm
- Khi có rủi ro: công ty bảo hiểm đền bù

NHỮNG NGUYÊN TẮC CHUNG:
- Phải có sự đồng ý của cả hai bên
- Phải có bằng văn bản (nếu luật quy định)
- Nội dung phải hợp pháp
- Phải có hạn thanh toán rõ ràng

LỜI KHUYÊN:
Khi ký hợp đồng, hãy:
1. Đọc kỹ tất cả điều khoản
2. Hiểu rõ quyền và nghĩa vụ của bạn
3. Yêu cầu giải thích những điều không rõ
4. Tham khảo luật sư nếu cần`,
        author: 'Luật sư Phạm Văn C',
        date: '2024-11-05',
        category: 'Luật dân sự',
        image: 'https://via.placeholder.com/800x400?text=Hop+Dong+Pho+Bien',
        tags: ['hợp đồng', 'luật dân sự', 'các loại'],
        featured: false,
        status: 'published',
        views: 213,
        readTime: 7
    },
    {
        id: 'blog-10',
        title: 'Quyền và nghĩa vụ trong quan hệ thuê nhà: Hướng dẫn cho bên cho và bên thuê',
        excerpt: 'Hợp đồng thuê nhà cần rõ ràng để tránh tranh chấp. Bài viết này giải thích quyền lợi của cả hai bên.',
        content: `Thuê nhà là giao dịch phổ biến. Cả bên cho thuê và bên thuê cần hiểu rõ quyền và nghĩa vụ của mình:

I. QUYỀN CỦA BÊN CHO THUÊ
- Nhận tiền thuê đầy đủ, đúng hạn
- Kiểm tra, bảo trì bất động sản
- Vào nhà để kiểm tra (với thông báo trước)
- Thu hồi nhà khi hợp đồng kết thúc
- Giữ tiền cọc nếu bên thuê gây hư hại

II. NGHĨA VỤ CỦA BÊN CHO THUÊ
- Giao bất động sản trong tình trạng tốt
- Bảo vệ quyền sử dụng của bên thuê
- Thực hiện sửa chữa cần thiết
- Không can thiệp vào nhu cầu hợp lý của bên thuê
- Trả lại tiền cọc khi hợp đồng kết thúc

III. QUYỀN CỦA BÊN THUÊ
- Được sử dụng nhà theo đúng mục đích
- Được sửa chữa, cải tạo nếu được phép
- Được yên tĩnh, không bị kỳ thị
- Được lưu trữ hàng cá nhân
- Được cấu cảnh hợp lý

IV. NGHĨA VỤ CỦA BÊN THUÊ
- Trả tiền thuê đầy đủ, đúng hạn
- Bảo quản tốt bất động sản
- Không gây hư hại hoặc cọ xát
- Tuân thủ nội quy khu dân cư
- Trả lại bất động sản trong tình trạng tốt

V. HỢP ĐỒNG THUÊ NHÀ CẦN GHI RÕ
- Tên, CMND của cả hai bên
- Mô tả chi tiết bất động sản
- Mục đích sử dụng
- Thời gian thuê
- Giá tiền thuê hàng tháng
- Tiền cọc và cách trả lại
- Ai chịu trách nhiệm về tiền điện, nước, internet
- Điều kiện chấm dứt hợp đồng

VI. NHỮNG VẤN ĐỀ CẦN LƯU Ý
- Có giấy phép nếu cho thuê lâu dài
- Nên kiểm tra tình trạng bất động sản trước khi ký
- Ghi rõ những hư hại hiện có để không bị buộc trách nhiệm sau
- Nên chứng thực hợp đồng

VII. CHẤM DỨT HỢP ĐỒNG
- Hai bên có thể thỏa thuận chấm dứt
- Một bên có thể chấm dứt nếu bên kia vi phạm
- Cần thông báo trước 30-60 ngày
- Kiểm tra tình trạng, trả lại tiền cọc

LỜI KHUYÊN:
- Ký hợp đồng bằng văn bản
- Giữ bản copy cho mình
- Ghi chép tình trạng bất động sản (hình ảnh, video)
- Tham khảo luật sư nếu có tranh chấp`,
        author: 'Luật sư Trần Thị B',
        date: '2024-11-01',
        category: 'Luật đất đai',
        image: 'https://via.placeholder.com/800x400?text=Thue+Nha',
        tags: ['thuê nhà', 'bất động sản', 'hợp đồng'],
        featured: false,
        status: 'published',
        views: 195,
        readTime: 8
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
        question: 'Làm sao để bảo vệ quyền lợi người mua bất động sản?',
        answer: 'Cần kiểm tra giấy tờ pháp lý bất động sản, ký hợp đồng mua bán, thực hiện thủ tục chuyển nhượng tại cơ quan đăng ký đất đai và nhà nước.',
        category: 'Luật đất đai',
        views: 87
    },
    {
        id: 'faq-4',
        question: 'Nhân viên có quyền từ chối làm việc ngoài giờ không?',
        answer: 'Theo Luật Lao động, công ty chỉ được yêu cầu nhân viên làm thêm giờ trong những trường hợp cần thiết và phải thanh toán thù lao làm thêm giờ.',
        category: 'Luật lao động',
        views: 156
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

// Mock Data for Family Law Q&A
export const mockFamilyLawQAs: FamilyLawQA[] = [
    {
        id: 'faq-family-1',
        question: 'Các quy định pháp lý nào bảo vệ quyền lợi con cái, tài sản sau khi ly hôn?',
        image: '/images/family-qa-1.jpg',
        shortDescription: 'Quy định pháp lý bảo vệ con cái và tài sản',
        date: '2025-01-15'
    },
    {
        id: 'faq-family-2',
        question: 'Thủ tục ly hôn phương mới nhất: Điều kiện, Hộ số và Thời gian giải quyết',
        image: '/images/family-qa-2.jpg',
        shortDescription: 'Thủ tục ly hôn theo quy định mới nhất',
        date: '2025-01-10'
    },
    {
        id: 'faq-family-3',
        question: 'Thủ Tục Đăng Ký Kết Hôn Có Yêu Tố Nước Ngoài 2025',
        image: '/images/family-qa-3.jpg',
        shortDescription: 'Đăng ký kết hôn có yếu tố nước ngoài',
        date: '2025-01-08'
    },
    {
        id: 'faq-family-4',
        question: 'Chính phủ Đề Xuất Bổ Sung Trường Hợp Thu Hồi Đất',
        image: '/images/family-qa-4.jpg',
        shortDescription: 'Chính phủ đề xuất về thu hồi đất',
        date: '2025-01-05'
    },
    {
        id: 'faq-family-5',
        question: 'LỰ HÔN ĐƠN PHƯƠNG CẦN NHỮNG GIẤY TỜ, THỦ TỤC GÌ?',
        image: '/images/family-qa-5.jpg',
        shortDescription: 'Ly hôn đơn phương: thủ tục và giấy tờ',
        date: '2025-01-01'
    },
    {
        id: 'faq-family-6',
        question: 'Thay đổi họ cho con riêng',
        image: '/images/family-qa-6.jpg',
        shortDescription: 'Thay đổi họ cho con riêng - hướng dẫn',
        date: '2024-12-28'
    }
];

// Mock Data for Gallery
export const mockGalleryItems: GalleryItem[] = [
    {
        id: 'gallery-1',
        title: 'Hội thuyết truyền hình Tại sao dự án',
        type: 'image',
        thumbnail: '/images/gallery-1.jpg',
        description: 'Hội thuyết truyền hình',
        order: 1
    },
    {
        id: 'gallery-2',
        title: 'Hội thuyết truyền hình Giao đất cho thương',
        type: 'image',
        thumbnail: '/images/gallery-2.jpg',
        description: 'Giao đất cho thương mại',
        order: 2
    },
    {
        id: 'gallery-3',
        title: 'Hội thuyết truyền hình Một số vấn đề',
        type: 'image',
        thumbnail: '/images/gallery-3.jpg',
        description: 'Một số vấn đề pháp lý',
        order: 3
    },
    {
        id: 'gallery-4',
        title: 'Văn phòng Thừa phát lại',
        type: 'image',
        thumbnail: '/images/gallery-4.jpg',
        description: 'Không gian văn phòng',
        order: 4
    },
    {
        id: 'gallery-5',
        title: 'Luật sư chuyên viên',
        type: 'image',
        thumbnail: '/images/gallery-5.jpg',
        description: 'Đội ngũ chuyên viên',
        order: 5
    },
    {
        id: 'gallery-6',
        title: 'Văn phòng làm việc',
        type: 'image',
        thumbnail: '/images/gallery-6.jpg',
        description: 'Không gian làm việc hiện đại',
        order: 6
    },
    {
        id: 'gallery-7',
        title: 'Hợp thư truyền hình Tại sao dự án',
        type: 'video',
        thumbnail: '/images/video-1.jpg',
        videoId: 'dQw4w9WgXcQ',
        description: 'Video hợp thư truyền hình',
        order: 7
    },
    {
        id: 'gallery-8',
        title: 'Hợp thư truyền hình Giao đất',
        type: 'video',
        thumbnail: '/images/video-2.jpg',
        videoId: 'dQw4w9WgXcQ',
        description: 'Video giao đất',
        order: 8
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

// ============ Mock Legal Articles ============
export const mockLegalArticles = [
    {
        id: 'article-1',
        title: 'Các loại hợp đồng dân sự',
        category: 'Luật Dân Sự',
        content: 'Hợp đồng dân sự là thỏa thuận pháp luật giữa các bên...',
        datePublished: '2024-01-15',
        author: 'Luật sư A'
    }
];

// ============ Mock Law Explanations ============
export const mockLawExplanations = [
    {
        id: 'explanation-1',
        title: 'Giải thích Luật Dân Sự',
        content: 'Luật Dân Sự quy định về các quan hệ dân sự...',
        relatedLaws: ['Luật Dân Sự 2015'],
        datePublished: '2024-01-15',
        author: 'Luật sư B'
    }
];

// ============ Mock Legal Terms ============
export const mockLegalTerms = [
    {
        id: 'term-1',
        term: 'Hợp đồng',
        definition: 'Thỏa thuận pháp luật giữa hai hay nhiều bên',
        category: 'Luật Dân Sự',
        example: 'Hợp đồng mua bán, hợp đồng cho thuê...'
    }
];
