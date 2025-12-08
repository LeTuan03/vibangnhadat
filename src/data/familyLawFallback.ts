import type { FamilyLawQA } from '../types';

export const familyLawFallback: Record<string, FamilyLawQA> = {
  'faq-family-1': {
    id: 'faq-family-1',
    question: 'Cách Lập Hợp Đồng Hôn Nhân',
    image: '/images/family-qa-1.jpg',
    shortDescription: 'Hướng dẫn lập hợp đồng hôn nhân hợp lệ',
    date: '2025-01-15',

    overview:
      'Giải thích tổng quan về mục đích, nội dung và ý nghĩa pháp lý của hợp đồng hôn nhân trước hoặc trong thời kỳ hôn nhân.',
    definition:
      'Hợp đồng hôn nhân là thỏa thuận bằng văn bản giữa vợ và chồng về chế độ tài sản trước, trong hoặc sau hôn nhân, được lập theo quy định của Luật Hôn nhân và Gia đình.',
    fullDescription:
      'Hợp đồng hôn nhân giúp vợ chồng chủ động thỏa thuận về tài sản chung, tài sản riêng, cách quản lý và phân chia tài sản khi ly hôn hoặc khi một bên mất. Để có giá trị pháp lý, hợp đồng phải được lập thành văn bản, có công chứng hoặc chứng thực và không được trái pháp luật, đạo đức xã hội.',

    processSteps: [
      {
        title: 'Bước 1: Xác định phạm vi thỏa thuận',
        description:
          'Hai bên trao đổi với nhau về những tài sản hiện có, tài sản sẽ hình thành trong tương lai và cách quản lý/chia khi ly hôn hoặc khi một bên mất.',
      },
      {
        title: 'Bước 2: Soạn thảo nội dung hợp đồng',
        description:
          'Lập bản dự thảo hợp đồng hôn nhân, ghi rõ thông tin hai bên, danh mục tài sản, nguyên tắc quản lý tài sản, nghĩa vụ tài chính và điều khoản sửa đổi, chấm dứt.',
      },
      {
        title: 'Bước 3: Công chứng/chứng thực hợp đồng',
        description:
          'Hai bên mang dự thảo hợp đồng cùng giấy tờ tùy thân, giấy tờ chứng minh tài sản đến tổ chức hành nghề công chứng để được tư vấn và công chứng hợp đồng.',
      },
      {
        title: 'Bước 4: Lưu giữ và thực hiện hợp đồng',
        description:
          'Sau khi công chứng, mỗi bên giữ một bản; thực hiện đúng cam kết trong hợp đồng trong suốt thời kỳ hôn nhân.',
      },
    ],

    relatedLaws: [
      'Luật Hôn nhân và Gia đình 2014 – Chương III về chế độ tài sản vợ chồng',
      'Bộ luật Dân sự 2015 về giao dịch dân sự và hợp đồng',
      'Luật Công chứng 2014 về hình thức công chứng hợp đồng',
    ],

    tips: [
      'Nên trao đổi thẳng thắn, tránh giấu tài sản để hạn chế tranh chấp về sau.',
      'Nên nhờ luật sư hoặc công chứng viên tư vấn trước khi ký.',
      'Không sử dụng điều khoản trái pháp luật hoặc nhằm trốn tránh nghĩa vụ đối với người thứ ba.',
    ],
  },
};

export default familyLawFallback;
