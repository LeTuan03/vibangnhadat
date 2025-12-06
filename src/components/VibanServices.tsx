import React, { useState } from 'react';
import { FaFileContract, FaHome, FaHandshake, FaLandmark, FaFileSignature, FaBuilding } from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { scrollToElement } from '../utils/helpers';
import './VibanServices.css';

interface VibangType {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    requirements: string[];
    process: string[];
    fees: string;
}

export const vibangTypes: VibangType[] = [
    {
        id: 'vb-danssu',
        title: 'Vi bằng Giao dịch Dân sự',
        icon: <FaHandshake />,
        description: 'Lập vi bằng cho các giao dịch dân sự như mua bán, cho thuê, tặng cho tài sản.',
        requirements: [
            'CMND/CCCD của các bên',
            'Giấy tờ liên quan đến tài sản',
            'Hợp đồng/thỏa thuận (nếu có)',
        ],
        process: [
            'Tiếp nhận hồ sơ và kiểm tra',
            'Soạn thảo nội dung vi bằng',
            'Các bên ký xác nhận',
            'Thừa phát lại ký và đóng dấu',
            'Bàn giao vi bằng',
        ],
        fees: 'Theo quy định của Bộ Tư pháp',
    },
    {
        id: 'vb-nhadat',
        title: 'Vi bằng Chuyển nhượng Quyền sử dụng đất',
        icon: <FaLandmark />,
        description: 'Lập vi bằng chuyển nhượng quyền sử dụng đất, nhà ở.',
        requirements: [
            'Giấy chứng nhận quyền sử dụng đất',
            'CMND/CCCD của bên chuyển nhượng và nhận chuyển nhượng',
            'Hợp đồng chuyển nhượng',
            'Giấy tờ liên quan khác',
        ],
        process: [
            'Kiểm tra pháp lý tài sản',
            'Xác minh thông tin các bên',
            'Soạn thảo vi bằng',
            'Ký kết vi bằng',
            'Hướng dẫn làm thủ tục sang tên',
        ],
        fees: 'Tính theo giá trị giao dịch',
    },
    {
        id: 'vb-thechap',
        title: 'Vi bằng Thế chấp, Cầm cố',
        icon: <FaFileSignature />,
        description: 'Lập vi bằng thế chấp tài sản để vay vốn ngân hàng hoặc cá nhân.',
        requirements: [
            'Giấy tờ chứng minh quyền sở hữu tài sản',
            'CMND/CCCD của bên thế chấp và bên nhận thế chấp',
            'Hợp đồng vay/thế chấp',
        ],
        process: [
            'Thẩm định tài sản thế chấp',
            'Soạn thảo vi bằng thế chấp',
            'Các bên ký kết',
            'Đăng ký thế chấp (nếu cần)',
            'Bàn giao vi bằng',
        ],
        fees: 'Theo thỏa thuận và quy định',
    },
    {
        id: 'vb-dichuc',
        title: 'Vi bằng Di chúc',
        icon: <FaFileContract />,
        description: 'Lập vi bằng di chúc để phân chia tài sản theo ý nguyện.',
        requirements: [
            'CMND/CCCD của người lập di chúc',
            'Giấy tờ chứng minh quyền sở hữu tài sản',
            'Danh sách người thừa kế (nếu có)',
        ],
        process: [
            'Tư vấn về quyền lập di chúc',
            'Soạn thảo nội dung di chúc',
            'Người lập di chúc ký xác nhận',
            'Thừa phát lại chứng thực',
            'Lưu trữ và bàn giao',
        ],
        fees: 'Phí cố định theo quy định',
    },
    {
        id: 'vb-kinhdoanh',
        title: 'Vi bằng Hợp đồng Kinh tế',
        icon: <FaBuilding />,
        description: 'Lập vi bằng cho các hợp đồng kinh tế, thương mại.',
        requirements: [
            'Giấy phép kinh doanh',
            'Giấy tờ đại diện pháp nhân',
            'Hợp đồng kinh tế',
            'Tài liệu liên quan',
        ],
        process: [
            'Kiểm tra tư cách pháp nhân',
            'Thẩm định hợp đồng',
            'Soạn thảo vi bằng',
            'Đại diện các bên ký kết',
            'Bàn giao vi bằng có giá trị pháp lý',
        ],
        fees: 'Tính theo giá trị hợp đồng',
    },
    {
        id: 'vb-nhadat-cho',
        title: 'Vi bằng Cho thuê Nhà đất',
        icon: <FaHome />,
        description: 'Lập vi bằng hợp đồng cho thuê nhà, đất.',
        requirements: [
            'Giấy chứng nhận quyền sở hữu/sử dụng',
            'CMND/CCCD bên cho thuê và thuê',
            'Hợp đồng cho thuê',
        ],
        process: [
            'Xác minh quyền cho thuê',
            'Soạn thảo vi bằng cho thuê',
            'Các bên ký kết',
            'Thừa phát lại xác nhận',
            'Bàn giao vi bằng',
        ],
        fees: 'Phí cố định hoặc theo thời hạn thuê',
    },
];

const VibanServices: React.FC = () => {
    const [selectedType, setSelectedType] = useState<VibangType | null>(null);
    const [ref] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

    return (
        <section id="viban-services" className="section">
            <div className="container">
                <h2 className="section-title">Dịch Vụ Lập Vi Bằng</h2>
                <p className="section-subtitle">
                    Chúng tôi cung cấp đầy đủ các loại vi bằng theo quy định pháp luật
                </p>

                <div ref={ref} className={`viban-grid`}>
                    {vibangTypes.map((type, index) => (
                        <div
                            key={type.id}
                            className="viban-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedType(type)}
                        >
                            <div className="viban-icon">{type.icon}</div>
                            <h3>{type.title}</h3>
                            <p>{type.description}</p>
                            <button className="viban-btn">Xem chi tiết →</button>
                        </div>
                    ))}
                </div>

                {/* Detail Modal */}
                {selectedType && (
                    <div className="viban-modal-overlay" onClick={() => setSelectedType(null)}>
                        <div className="viban-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedType(null)}>×</button>

                            <div className="modal-header">
                                <div className="modal-icon">{selectedType.icon}</div>
                                <h2>{selectedType.title}</h2>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">{selectedType.description}</p>

                                <div className="modal-section">
                                    <h3>Hồ sơ cần thiết:</h3>
                                    <ul>
                                        {selectedType.requirements.map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="modal-section">
                                    <h3>Quy trình thực hiện:</h3>
                                    <ol>
                                        {selectedType.process.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="modal-section">
                                    <h3>Phí dịch vụ:</h3>
                                    <p className="fee-info">{selectedType.fees}</p>
                                </div>

                                <button className="btn btn-primary btn-lg" onClick={() => {
                                    setSelectedType(null);
                                    scrollToElement('contact');
                                }}>
                                    Liên hệ tư vấn
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default VibanServices;
