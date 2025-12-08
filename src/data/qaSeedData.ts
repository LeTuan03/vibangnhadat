/**
 * Comprehensive Q&A Seed Data
 * Bao gồm ví dụ thực tế, văn bản pháp luật, giải thích chi tiết
 */

import { FAQ } from '../types';

export const qaSeedData: FAQ[] = [
  // ============ CATEGORY: VI BẰNG ============
  {
    id: 'qa-viban-001',
    question: 'Vi bằng là gì? Có giá trị pháp lý không?',
    answer: 'Vi bằng là tài liệu pháp lý do Thừa phát lại lập ra, ghi lại các giao dịch dân sự có giá trị xác thực cao. Vi bằng có hiệu lực pháp lý tương đương với chứng chỉ xác thực của công chứng viên.',
    category: 'Vi Bằng',
    tags: ['vi bằng', 'tài liệu pháp lý', 'xác thực'],
    isImportant: true,
    helpfulCount: 145,
    views: 1240,
    detailedExplanation: `Vi bằng là một trong những loại tài liệu pháp lý quan trọng nhất trong hệ thống tư pháp Việt Nam. Theo Luật Thừa phát lại 2011, vi bằng được lập bởi Thừa phát lại được coi là chứng cứ có giá trị pháp lý rất cao, thậm chí cao hơn cả các tài liệu thông thường.
    
Giá trị pháp lý của vi bằng:
- Được công nhận bởi tất cả các Tòa án Việt Nam
- Có hiệu lực trong các tranh chấp dân sự, hành chính
- Được Sở Đăng ký Đất đai công nhận khi đăng ký giao dịch
- Có thể sử dụng làm chứng cứ trong tố tụng
- Có giá trị tương đương chứng chỉ công chứng trong nhiều trường hợp

Đặc điểm của vi bằng:
- Được lập trước 2 nhân chứng hoặc nhiều hơn
- Có chữ ký của Thừa phát lại
- Được đóng dấu của Phòng Thừa phát lại
- Được cấp số hiệu thứ tự
- Lưu giữ bản gốc tại Phòng Thừa phát lại`,
    relatedLaws: [
      'Luật Thừa phát lại 2011',
      'Nghị định 125/2013/NĐ-CP',
      'Thông tư 08/2014/TT-BTP',
      'Bộ luật Dân sự năm 2015'
    ],
    examples: [
      'Hợp đồng mua bán nhà đất được lập vi bằng có giá trị pháp lý cao khi đăng ký giao dịch',
      'Hợp đồng cho vay tiền có bảo đảm được lập vi bằng để bảo vệ quyền lợi của cho vay',
      'Hợp đồng chuyển nhượng quyền sử dụng đất cần vi bằng xác thực'
    ],
    caseStudies: [
      {
        title: 'Tranh chấp hợp đồng mua bán nhà',
        description: 'Trong vụ tranh chấp mua bán nhà số 123 Nguyễn Huệ, Hà Nội, Tòa án nhân dân TP.HCM đã chấp nhận vi bằng được Thừa phát lại lập ra là chứng cứ chính xác định quyền sở hữu của người mua.',
        context: 'Vụ án tranh chấp quyền sở hữu bất động sản năm 2022'
      },
      {
        title: 'Xác thực giao dịch vay tài chính',
        description: 'Ngân hàng Thương mại Cổ phần A sử dụng vi bằng để xác thực hợp đồng vay có thế chấp với khách hàng, giúp giảm rủi ro pháp lý.',
        context: 'Giao dịch tài chính thương mại'
      }
    ],
    references: [
      {
        title: 'Luật Thừa phát lại 2011',
        url: 'https://thuvienphapluat.vn',
        description: 'Văn bản pháp luật chứa quy định chi tiết về vi bằng'
      },
      {
        title: 'Hướng dẫn lập vi bằng của Bộ Tư pháp',
        description: 'Tài liệu hướng dẫn cụ thể cách lập vi bằng hợp pháp'
      }
    ],
    relatedTerms: ['xác thực pháp lý', 'tài liệu chứng thực', 'chứng chỉ pháp lý']
  },
  {
    id: 'qa-viban-002',
    question: 'Các loại vi bằng chính là gì?',
    answer: 'Các loại vi bằng chính bao gồm: vi bằng giao dịch dân sự, vi bằng thế chấp/cầm cố, vi bằng chuyển nhượng quyền sử dụng đất, vi bằng di chúc và thừa kế.',
    category: 'Vi Bằng',
    tags: ['loại vi bằng', 'phân loại', 'giao dịch'],
    helpfulCount: 98,
    views: 856,
    detailedExplanation: `Luật Thừa phát lại 2011 quy định các loại vi bằng có thể được lập:

1. VI BẰNG GIAO DỊCH DÂN SỰ
   - Hợp đồng mua bán động sản
   - Hợp đồng mua bán bất động sản (với giới hạn)
   - Hợp đồng trao đổi tài sản
   - Hợp đồng cho vay, mượn tiền
   - Hợp đồng dịch vụ
   - Hợp đồng thuê
   
2. VI BẰNG THẾ CHẤP VÀ CẦM CỐ
   - Hợp đồng thế chấp bất động sản (với tài sản cụ thể)
   - Hợp đồng thế chấp động sản
   - Hợp đồng cầm cố
   - Hợp đồng bảo đảm quyền tín dụng
   
3. VI BẰNG CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT
   - Hợp đồng chuyển nhượng quyền sử dụng đất
   - Hợp đồng chuyển nhượng tài sản gắn liền với đất
   
4. VI BẰNG DI CHÚC VÀ THỪA KẾ
   - Di chúc được lập trước Thừa phát lại
   - Giấy chứng nhận thừa kế
   - Hợp đồng chia di sản
   
5. VI BẰNG KHÁC
   - Xác nhận hiện trạng tài sản
   - Xác nhận tình trạng sức khỏe
   - Hỗ trợ các giao dịch khác theo quy định pháp luật`,
    relatedLaws: [
      'Luật Thừa phát lại 2011 - Điều 21',
      'Thông tư 08/2014/TT-BTP - Điều 12-25',
      'Quyết định 57/2013/QĐ-BTP'
    ],
    examples: [
      'Vi bằng mua bán nhà: Ông A và Ông B lập vi bằng để xác thực hợp đồng mua bán nhà số 45 Trần Phú, thành phố X',
      'Vi bằng thế chấp: Anh C cho vay 500 triệu đồng cho Anh D, với thế chấp một lô đất, được xác thực bằng vi bằng',
      'Vi bằng chuyển nhượng quyền sử dụng đất: Công ty E chuyển nhượng quyền sử dụng đất lô H-15 cho Công ty F'
    ],
    caseStudies: [
      {
        title: 'Thế chấp đất thành công nhờ vi bằng',
        description: 'Nông dân X thế chấp lô đất với vi bằng để vay tiền từ Hợp tác xã, quá trình giải quyết nhanh chóng và minh bạch',
        context: 'Tài chính nông thôn'
      }
    ],
    relatedTerms: ['thế chấp', 'cầm cố', 'giao dịch dân sự', 'tài sản']
  },
  {
    id: 'qa-viban-003',
    question: 'Chi phí lập vi bằng bao nhiêu? Thời gian bao lâu?',
    answer: 'Chi phí lập vi bằng theo quy định của Bộ Tư pháp, thường từ 100-200 nghìn đồng/trang tùy theo loại. Thời gian lập từ 1-3 ngày làm việc tùy theo độ phức tạp.',
    category: 'Vi Bằng',
    tags: ['chi phí', 'thời gian', 'lệ phí'],
    helpfulCount: 234,
    views: 2105,
    detailedExplanation: `CHI PHÍ LẬP VI BẰNG
    
Theo Thông tư 08/2014/TT-BTP về lệ phí Thừa phát lại:
- Vi bằng giao dịch dân sự: 150.000 - 200.000 đồng/trang (tùy theo giá trị giao dịch)
- Vi bằng thế chấp: 200.000 - 300.000 đồng (tùy theo giá trị tài sản)
- Vi bằng chuyển nhượng đất: 200.000 - 250.000 đồng
- Vi bằng di chúc: 100.000 - 150.000 đồng
- Vi bằng khác: 100.000 - 150.000 đồng

Các khoản chi phí có thể phát sinh:
- Phí xác thực chữ ký: 30.000 - 50.000 đồng/chữ ký
- Phí xác minh thông tin: 50.000 - 100.000 đồng
- Phí sao chép, cấp lại: 10.000 - 20.000 đồng/trang

THỜI GIAN LẬP VI BẰNG

- Vi bằng đơn giản (1-2 trang, giao dịch rõ ràng): 1 ngày
- Vi bằng trung bình (2-5 trang, yêu cầu xác minh): 2-3 ngày
- Vi bằng phức tạp (trên 5 trang, tranh chấp tiềm ẩn): 3-5 ngày

Quá trình chuẩn bị:
1. Chuẩn bị giấy tờ chứng minh: 2-3 ngày
2. Xác thực thông tin: 1-2 ngày
3. Lập và hoàn chỉnh vi bằng: 1-2 ngày`,
    relatedLaws: [
      'Thông tư 08/2014/TT-BTP - Phụ lục I',
      'Nghị định 125/2013/NĐ-CP - Điều 6',
      'Quyết định 57/2013/QĐ-BTP'
    ],
    examples: [
      'Vi bằng mua bán điện thoại: 150.000 đồng, hoàn thành 1 ngày',
      'Vi bằng thế chấp lô đất 1.000m²: 250.000 đồng, 2-3 ngày',
      'Vi bằng chuyển nhượng quyền sử dụng đất 500m²: 200.000 đồng, 3 ngày'
    ],
    references: [
      {
        title: 'Thông tư 08/2014/TT-BTP',
        description: 'Quy định về lệ phí Thừa phát lại'
      }
    ]
  },

  // ============ CATEGORY: TỐNG ĐẠT ============
  {
    id: 'qa-tongdat-001',
    question: 'Tống đạt văn bản tư pháp là gì?',
    answer: 'Tống đạt là quá trình Thừa phát lại gửi các văn bản pháp lý (lệnh, quyết định, yêu cầu, thông báo...) từ cơ quan Tòa án đến tay người nhận với xác nhận cụ thể của các bên.',
    category: 'Tống Đạt',
    tags: ['tống đạt', 'văn bản pháp lý', 'thông báo'],
    isImportant: true,
    helpfulCount: 167,
    views: 1456,
    detailedExplanation: `TỐNG ĐẠT VĂN BẢN TƯ PHÁP LÀ GÌ?

Tống đạt là hoạt động pháp lý của Thừa phát lại nhằm đưa các văn bản pháp lý từ cơ quan Tòa án đến tay người liên quan (được gọi là "bị tống đạt") một cách hợp pháp, có xác nhận cụ thể.

CÁC LOẠI VĂN BẢN CÓ THỂ TỐNG ĐẠT:
1. Lệnh, quyết định của Tòa án (lệnh tạm giữ, tạm cấm, quyết định phán xử...)
2. Trát gọi ra Tòa án
3. Các thông báo pháp lý của Tòa án
4. Yêu cầu cung cấp chứng cứ
5. Các văn bản khác theo yêu cầu của Tòa án

QUYỀN LỢI VÀ NGHĨA VỤ:
- Người nhận có quyền biết đầy đủ nội dung văn bản
- Người nhận phải ký nhận và xác nhận ngày nhận
- Nếu từ chối nhận, Thừa phát lại có quyền để lại văn bản tại địa điểm
- Thừa phát lại phải lập biên bản tống đạt

GIÁ TRỊ PHÁP LỤC:
- Văn bản được coi là đã tống đạt khi Thừa phát lại có xác nhận
- Thời hạn pháp lý bắt đầu tính từ ngày tống đạt
- Biên bản tống đạt có giá trị chứng cứ trong tố tụng`,
    relatedLaws: [
      'Luật Thừa phát lại 2011 - Chương II',
      'Thông tư 08/2014/TT-BTP - Chương II',
      'Bộ luật Tố tụng Dân sự 2015'
    ],
    examples: [
      'Tòa án gửi trát gọi qua Thừa phát lại để gọi bị đơn tới Tòa án',
      'Thừa phát lại tống đạt quyết định phán xử cho bị đơn',
      'Tòa án yêu cầu tống đạt yêu cầu cung cấp chứng cứ cho đương sự'
    ],
    caseStudies: [
      {
        title: 'Tống đạt đúng thời hạn',
        description: 'Trong vụ tranh chấp hợp đồng, Thừa phát lại tống đạt trát gọi cho bị đơn trong thời hạn yêu cầu, giúp đảm bảo quyền tố tụng công bằng',
        context: 'Vụ án tranh chấp hợp đồng năm 2023'
      }
    ],
    relatedTerms: ['trát gọi', 'quyết định', 'thông báo pháp lý']
  },
  {
    id: 'qa-tongdat-002',
    question: 'Chi phí tống đạt bao nhiêu?',
    answer: 'Chi phí tống đạt từ 100-150 nghìn đồng/lần tùy theo khoảng cách. Nếu tống đạt địa bàn khác, chi phí có thể cao hơn.',
    category: 'Tống Đạt',
    tags: ['chi phí', 'lệ phí', 'tống đạt'],
    helpfulCount: 112,
    views: 894,
    detailedExplanation: `CHI PHÍ TỐNG ĐẠT THEO QUY ĐỊNH HIỆN HÀNH

Theo Thông tư 08/2014/TT-BTP:

TẠI ĐỊA PHƯƠNG CỬ TRỊ:
- Tống đạt trong cùng xã/phường: 100.000 đồng
- Tống đạt trong cùng huyện/quận (khác xã): 120.000 đồng
- Tống đạt trong cùng tỉnh/TP (khác huyện): 150.000 đồng

TẠI KHÁC TỈNH/THÀNH PHỐ:
- Khác tỉnh, cùng vùng: 200.000 đồng
- Khác vùng, cùng nước: 300.000 đồng
- Nước ngoài: 500.000 - 1.000.000 đồng (tùy theo quốc gia)

TỐNG ĐẠT NHIỀU BÊN:
- Mỗi bên thêm: 50% chi phí cơ bản

TỐNG ĐẠT THAY ĐỔI:
- Người bị tống đạt chuyển địa chỉ, cần tống đạt lại: Thêm 50% chi phí`,
    relatedLaws: [
      'Thông tư 08/2014/TT-BTP - Phụ lục I',
      'Quyết định 57/2013/QĐ-BTP'
    ],
    examples: [
      'Tống đạt trát gọi trong Hà Nội: 100-150k tùy khoảng cách',
      'Tống đạt ở Tp.HCM: 200k cho ngoài huyện',
      'Tống đạt cho 3 bên: 100k + 50k + 50k = 200k'
    ]
  },

  // ============ CATEGORY: THỪA KẾ ============
  {
    id: 'qa-thuake-001',
    question: 'Thừa kế là gì? Ai có quyền thừa kế?',
    answer: 'Thừa kế là quá trình chuyển giao tài sản, quyền, nghĩa vụ của người đã chết cho những người sống sót theo quy định của pháp luật. Quyền thừa kế thuộc về thành viên gia đình trực tiếp và người được chỉ định trong di chúc.',
    category: 'Thừa Kế',
    tags: ['thừa kế', 'di sản', 'gia đình'],
    isImportant: true,
    helpfulCount: 198,
    views: 1823,
    detailedExplanation: `THỪA KẾ TRONG HỆ THỐNG PHÁP LUẬT VIỆT NAM

Thừa kế (hay di sản) là tập hợp quyền và nghĩa vụ (tài sản, bất động sản, tài chính) của người đã chết được chuyển giao cho người sống sót.

CÓ HAI LOẠI THỪA KẾ:

1. THỪA KẾ THEO PHÁP LUẬT
   - Áp dụng khi không có di chúc hợp pháp
   - Ưu tiên thứ tự:
     * Thứ 1: Con (hợp pháp, tổn hại, con nuôi), vợ/chồng, bố mẹ
     * Thứ 2: Anh, chị, em ruột, cụ, ông bà
     * Thứ 3: Cô, chú, bác, dì
   - Chia đều theo phần bằng nhau

2. THỪA KẾ THEO DI CHÚC
   - Người có quyền lập di chúc: người 18 tuổi trở lên, có năng lực hành vi đầy đủ
   - Di chúc phải viết rõ ràng, có chữ ký người lập
   - Có thể lập di chúc trước Thừa phát lại, công chứng, tòa án, hoặc viết tay

QUY TRÌNH THỪA KẾ:
1. Xác lập người có quyền thừa kế
2. Xác định tài sản di sản
3. Thanh toán nợ, thuế của người mất
4. Chia di sản theo luật hoặc di chúc
5. Cấp giấy chứng nhận thừa kế

MỘT SỐ NGUYÊN TẮC:
- Không ai bị bắt buộc thừa kế
- Có thể từ bỏ quyền thừa kế trong 3 tháng
- Người thừa kế chịu trách nhiệm nợ của người mất (trong phạm vi di sản)`,
    relatedLaws: [
      'Bộ luật Dân sự 2015 - Chương VII',
      'Luật Thừa phát lại 2011',
      'Thông tư 08/2014/TT-BTP'
    ],
    examples: [
      'Ông A mất, để lại con trai, con gái, vợ. Cả ba chia di sản bằng nhau',
      'Bà B lập di chúc trước Thừa phát lại, để lại tài sản cho con dâu',
      'Cô C từ bỏ quyền thừa kế trong 2 tháng sau khi bố mất'
    ],
    caseStudies: [
      {
        title: 'Tranh chấp di sản được giải quyết',
        description: 'Hai con trai tranh chấp di sản của cha. Tòa án áp dụng quy tắc thừa kế theo pháp luật, chia đều 50-50',
        context: 'Vụ tranh chấp di sản năm 2022'
      }
    ],
    references: [
      {
        title: 'Bộ luật Dân sự 2015',
        description: 'Quy định chi tiết về thừa kế tại Chương VII'
      }
    ],
    relatedTerms: ['di sản', 'di chúc', 'chia sẻ tài sản']
  },

  // ============ CATEGORY: TƯ VẤN PHÁP LỰ ============
  {
    id: 'qa-tuvan-001',
    question: 'Khi nào cần tìm Thừa phát lại?',
    answer: 'Bạn nên tìm Thừa phát lại khi lập vi bằng cho giao dịch quan trọng, cần tống đạt văn bản pháp lý, xác nhận quyền sở hữu, lập di chúc, hoặc cần xác minh giấy tờ pháp lý.',
    category: 'Tư Vấn Pháp Lý',
    tags: ['tư vấn', 'dịch vụ', 'hỗ trợ'],
    helpfulCount: 156,
    views: 1342,
    detailedExplanation: `NHỮNG TRƯỜNG HỢP CẦN TÌMTHỪA PHÁT LẠI

1. LẬP VI BẰNG CHO GIAO DỊCH QUAN TRỌNG
   - Mua bán bất động sản, đất đai
   - Cho vay tiền có bảo đảm
   - Thế chấp tài sản quan trọng
   - Lập hợp đồng dài hạn, giá trị lớn
   
   Lợi ích: Vi bằng có giá trị pháp lý cao, dễ được công nhận, giảm tranh chấp

2. TỐNG ĐẠT VĂN BẢN PH ÁP LỤC
   - Tòa án gửi trát gọi
   - Gửi quyết định phán xử
   - Thông báo pháp lý quan trọng
   
   Lợi ích: Đảm bảo đúng thời hạn, có xác nhận cụ thể, tránh tranh chấp về ngày nhận

3. XÁC THỰC GIẤY TỜ PH ÁP LỰ
   - Xác nhận chữ ký, chứng minh thư
   - Xác minh thông tin cá nhân
   - Xác nhận hiện trạng tài sản, sức khỏe
   
   Lợi ích: Tài liệu được công nhận, có giá trị chứng cứ

4. LẬP DI CHÚC
   - Lập di chúc trước Thừa phát lại (ngoài di chúc viết tay)
   - Xác nhận ý nguyện của người lập
   - Bảo vệ lợi ích của những người thừa kế
   
   Lợi ích: Di chúc có giá trị pháp lý cao, khó bị tranh chấp

5. HỖTRỢ GIAO DỊCH QUỐC TẾ
   - Xác thực tài liệu cho giao dịch nước ngoài
   - Cung cấp chứng chỉ hợp pháp hóa
   - Xác nhận giấy tờ pháp lý liên quốc tế
   
   Lợi ích: Tài liệu được công nhận quốc tế

6. TƯ VẤN PHÁP LỰ
   - Hướng dẫn quy trình pháp lý
   - Tư vấn về quyền và nghĩa vụ
   - Soạn thảo hợp đồng, di chúc`,
    relatedLaws: [
      'Luật Thừa phát lại 2011',
      'Nghị định 125/2013/NĐ-CP',
      'Thông tư 08/2014/TT-BTP'
    ],
    examples: [
      'Mua nhà: Nên lập vi bằng để bảo vệ quyền sở hữu',
      'Cho vay 100 triệu: Vi bằng thế chấp là công cụ bảo vệ tốt nhất',
      'Lập di chúc: Giúp con cái tránh tranh chấp sau này'
    ]
  },
  {
    id: 'qa-tuvan-002',
    question: 'Thừa phát lại có trách nhiệm gì? Có phải trung thực?',
    answer: 'Thừa phát lại phải trung thực, khách quan, bảo mật thông tin. Họ chịu trách nhiệm pháp lý, dân sự và hình sự nếu vi phạm. Thừa phát lại phải tuân thủ bộ quy tắc đạo đức nghề nghiệp.',
    category: 'Tư Vấn Pháp Lý',
    tags: ['trách nhiệm', 'đạo đức', 'chuyên nghiệp'],
    isImportant: true,
    helpfulCount: 89,
    views: 745,
    detailedExplanation: `TRÁCH NHIỆM CỦA THỪA PHÁT LẠI

TRÁCH NHIỆM PHÁP LỆ:

1. TRÁCH NHIỆM CHÍNH VỀ HOẠT ĐỘNG
   - Lập vi bằng đúng quy định
   - Tống đạt đúng cách, đúng thời hạn
   - Lưu giữ bản gốc bảo mật
   - Cung cấp bản sao chính xác
   
2. TRÁCH NHIỆM PHÁP LỤC
   - Phải xác thực đúng sự thật
   - Không được lập vi bằng cho giao dịch trái pháp luật
   - Phải từ chối nếu phát hiện dấu hiệu bất thường
   - Không được giúp việc cho giao dịch pháp luật không hợp lệ

3. TRÁCH NHIỆM DÂN SỰ
   - Bồi thường thiệt hại nếu vi bằng sai sự thật
   - Bồi thường nếu tống đạt không đúng thời hạn
   - Bồi thường thiệt hại do lỗi dân sự

4. TRÁCH NHIỆM HÌNH SỰ
   - Có thể bị truy cứu nếu lập vi bằng giả, làm tài liệu giả
   - Bị xử lý nếu tiết lộ bí mật giao dịch
   - Bị xử lý nếu không tuân thủ luật

BỘ QUY TẮC ĐẠO ĐỨC:

1. TRUNG THỰC VÀ KHÁCH QUAN
   - Phải xác thực đúng sự thật
   - Không được có định kiến
   - Không được phân biệt đối xử

2. BẢOMẬT
   - Giữ bí mật thông tin giao dịch
   - Không tiết lộ chi tiết giao dịch
   - Chỉ cung cấp thông tin theo yêu cầu pháp luật

3. CHUYÊN NGHIỆP
   - Cung cấp dịch vụ chất lượng cao
   - Tư vấn chính xác
   - Đúng thời hạn, đúng quy trình

4. ĐÔI SỰ CÔNG BẰNG
   - Đối xử bình đẳng với các bên
   - Không ưu tiên một bên

5. TỰ CHỦ
   - Độc lập trong quyết định
   - Không bị ảnh hưởng bởi áp lực bên ngoài`,
    relatedLaws: [
      'Luật Thừa phát lại 2011 - Chương III, IV',
      'Quyết định 57/2013/QĐ-BTP',
      'Thông tư 08/2014/TT-BTP'
    ],
    examples: [
      'Thừa phát lại phát hiện giao dịch mua bán không hợp pháp, phải từ chối lập vi bằng',
      'Vi bằng do sơ suất của Thừa phát lại gây tổn thất, Thừa phát lại phải bồi thường'
    ],
    references: [
      {
        title: 'Bộ Quy tắc Đạo đức Thừa phát lại',
        description: 'Quy định chuẩn mực hành vi chuyên nghiệp'
      }
    ]
  },

  // ============ CATEGORY: GIAO DỊCH ĐẤT ĐAI ============
  {
    id: 'qa-dat-001',
    question: 'Mua bán đất cần những gì? Thừa phát lại giúp như thế nào?',
    answer: 'Mua bán đất cần: giấy chứng thực quyền sử dụng, hợp đồng, hóa đơn GTGT, xác minh hiện trạng. Thừa phát lại giúp lập vi bằng, tông đạt, xác minh quyền sở hữu và hỗ trợ đăng ký thay đổi chủ.',
    category: 'Giao Dịch Đất Đai',
    tags: ['đất đai', 'mua bán', 'giao dịch'],
    isImportant: true,
    helpfulCount: 267,
    views: 2456,
    detailedExplanation: `QUY TRÌNH MUA BÁN ĐẤT ĐAI - VAI TRÒ CỦA THỪA PHÁT LẠI

BƯỚC 1: KHẢO SÁT PHÁP LỰ VỀ TÀI SẢN
- Kiểm tra giấy chứng thực quyền sử dụng
- Xác minh chủ sở hữu hiện tại
- Kiểm tra thế chấp, cấm vận
- Thừa phát lại giúp: Xác minh và xác thực thông tin

BƯỚC 2: THƯƠNG LƯỢNG VÀ ĐỒNG Ý GIÁ
- Hai bên thương lượng giá bán, hình thức thanh toán
- Xác định hạn chót hoàn tất giao dịch
- Thừa phát lại giúp: Tư vấn về điều khoản bảo vệ quyền lợi

BƯỚC 3: SOẠN THẢO HỢP ĐỒNG
- Lập hợp đồng mua bán với các điều khoản cụ thể
- Xác định quyền, nghĩa vụ của hai bên
- Nêu rõ thời gian, địa điểm, hình thức thanh toán
- Thừa phát lại giúp: Soạn thảo hoặc tư vấn hợp đồng

BƯỚC 4: LẬP VI BẰNG
- Hai bên ký kết hợp đồng trước Thừa phát lại
- Thừa phát lại xác minh thông tin, tính hợp pháp
- Lập vi bằng ghi nhận giao dịch
- Thừa phát lại: Đây là bước QUAN TRỌNG nhất

BƯỚC 5: THANH TOÁN
- Người mua thanh toán tiền cho người bán
- Hình thức: tiền mặt, chuyển khoản, séc...
- Thừa phát lại giúp: Chứng kiến, xác nhận thanh toán

BƯỚC 6: BÀN GIAO
- Người bán bàn giao tài sản cho người mua
- Lập biên bản bàn giao
- Thừa phát lại giúp: Xác thực biên bản bàn giao

BƯỚC 7: ĐĂNG KÝ THAY ĐỔI CHỦ SỬ DỤNG
- Chuẩn bị hồ sơ đăng ký
- Nộp hồ sơ tới Sở Đăng ký Đất đai
- Thanh toán lệ phí đăng ký
- Thừa phát lại giúp: Hỗ trợ chuẩn bị hồ sơ, xác thực vi bằng

VĂN BẢN CẦN CỦA NGƯỜI BÁN:
- Giấy chứng thực quyền sử dụng đất
- CMND/CCCD
- Sơ đồ vị trí, toàn bộ hồ sơ

VĂN BẢN CẦN CỦA NGƯỜI MUA:
- CMND/CCCD, hộ khẩu
- Chứng minh năng lực tài chính

CHI PHÍ TRONG GIAO DỊCH ĐẤT:
- Vi bằng mua bán: 200-300k
- Xác minh: 50-100k
- Đăng ký thay đổi chủ: 100-200k (tùy giá trị)
- Tư vấn, hỗ trợ: 300-500k`,
    relatedLaws: [
      'Luật Đất đai 2013',
      'Luật Thừa phát lại 2011',
      'Nghị định 43/2014/NĐ-CP',
      'Thông tư 08/2014/TT-BTP'
    ],
    examples: [
      'Anh A mua lô đất 500m² từ chị B. Lập vi bằng giúp bảo vệ quyền sở hữu',
      'Bà C bán nhà đất cho ông D, vi bằng giúp giao dịch minh bạch',
      'Gia đình E mua đất xây nhà, vi bằng là bước đầu để cấp giấy chứng chỉ'
    ],
    caseStudies: [
      {
        title: 'Giao dịch đất đai thành công',
        description: 'Anh Tâm mua lô đất 1000m² ở ngoại ô Hà Nội. Với sự hỗ trợ của Thừa phát lại, giao dịch hoàn tất trong 5 ngày mà không phát sinh tranh chấp',
        context: 'Giao dịch bất động sản thành công 2024'
      },
      {
        title: 'Tránh tranh chấp nhờ vi bằng',
        description: 'Cô Lan bán đất cho em gái. Nhờ vi bằng, gia đình tránh được tranh chấp pháp lý sau này',
        context: 'Giao dịch gia đình'
      }
    ],
    references: [
      {
        title: 'Luật Đất đai 2013',
        description: 'Quy định chi tiết về mua bán, chuyển nhượng quyền sử dụng đất'
      }
    ],
    relatedTerms: ['quyền sử dụng đất', 'giấy chứng thực', 'đăng ký']
  },
];
