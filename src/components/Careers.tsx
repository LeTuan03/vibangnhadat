import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import './Careers.css';

interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
}

const jobPostings: JobPosting[] = [
    {
        id: 'job-1',
        title: 'Luật sư',
        department: 'Pháp lý',
        location: 'TP. Hồ Chí Minh',
        type: 'Full-time',
        salary: '15 - 30 triệu/tháng',
        description: 'Chúng tôi tìm kiếm luật sư có kinh nghiệm từ 3 năm trở lên, chuyên sâu về pháp luật doanh nghiệp, đất đai hoặc hình sự.',
        requirements: [
            'Bằng cấp luật sư có hiệu lực',
            'Kinh nghiệm từ 3 năm trở lên',
            'Chuyên môn sâu về một lĩnh vực',
            'Kỹ năng giao tiếp tốt',
            'Tính chuyên nghiệp cao',
        ],
        benefits: [
            'Mức lương cạnh tranh',
            'Thưởng hiệu suất hàng tháng',
            'Bảo hiểm xã hội, y tế, nhân thọ',
            'Cơ hội phát triển sự nghiệp',
            'Môi trường làm việc chuyên nghiệp',
        ],
    },
    {
        id: 'job-2',
        title: 'Trợ lý luật sư',
        department: 'Pháp lý',
        location: 'TP. Hồ Chí Minh',
        type: 'Full-time',
        salary: '8 - 12 triệu/tháng',
        description: 'Hỗ trợ luật sư trong các công việc pháp lý: soạn thảo văn bản, nghiên cứu pháp luật, hỗ trợ quản lý hộc sơ.',
        requirements: [
            'Tốt nghiệp Đại học Luật',
            'Kinh nghiệm từ 1 năm',
            'Thành thạo MS Office, Winlex',
            'Khả năng học hỏi nhanh',
            'Tính cẩn thận, chi tiết',
        ],
        benefits: [
            'Mức lương hợp lý',
            'Thưởng quý hàng 3 tháng',
            'Bảo hiểm xã hội đầy đủ',
            'Đào tạo kỹ năng thường xuyên',
            'Cơ hội được nâng tiến',
        ],
    },
    {
        id: 'job-3',
        title: 'Thực tập sinh pháp lý',
        department: 'Pháp lý',
        location: 'TP. Hồ Chí Minh',
        type: 'Thực tập 3-6 tháng',
        salary: 'Có lương',
        description: 'Cơ hội thực tập tại một văn phòng luật uy tín. Hỗ trợ luật sư trong các công tác pháp lý hàng ngày.',
        requirements: [
            'Sinh viên năm cuối chuyên ngành Luật',
            'Có kiến thức cơ bản về pháp luật',
            'Tích cực, chịu khó',
            'Khả năng làm việc nhóm tốt',
            'Tiếng Anh cơ bản',
        ],
        benefits: [
            'Được hưởng lương thực tập',
            'Được đào tạo từ luật sư kinh nghiệm',
            'Cơ hội làm việc toàn thời gian sau thực tập',
            'Chứng chỉ thực tập',
            'Tư vấn hướng nghiệp',
        ],
    },
    {
        id: 'job-4',
        title: 'Chuyên viên tư vấn',
        department: 'Kinh doanh',
        location: 'TP. Hồ Chí Minh',
        type: 'Full-time',
        salary: '10 - 15 triệu/tháng',
        description: 'Tư vấn khách hàng doanh nghiệp về các giải pháp pháp lý và hỗ trợ phát triển kinh doanh.',
        requirements: [
            'Tốt nghiệp Đại học Luật hoặc Kinh tế',
            'Kinh nghiệm từ 2 năm',
            'Kỹ năng bán hàng tốt',
            'Khả năng giao tiếp xuất sắc',
            'Ngoại hình chuyên nghiệp',
        ],
        benefits: [
            'Mức lương + hoa hồng',
            'Thưởng quý hàng quý',
            'Bảo hiểm đầy đủ',
            'Đào tạo thường xuyên',
            'Cơ hội quốc tế',
        ],
    },
];

interface SelectedJobProps {
    job: JobPosting;
    onClose: () => void;
}

const JobDetailModal: React.FC<SelectedJobProps> = ({ job, onClose }) => {
    return (
        <div className="job-modal" onClick={onClose}>
            <div className="job-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="job-modal-close" onClick={onClose}>×</button>
                <h2>{job.title}</h2>
                <div className="job-meta">
                    <span><FaBriefcase /> {job.department}</span>
                    <span><FaMapMarkerAlt /> {job.location}</span>
                    <span>{job.type}</span>
                    <span>{job.salary}</span>
                </div>
                <p>{job.description}</p>
                <h3>Yêu cầu</h3>
                <ul className="job-list">
                    {job.requirements.map((req, idx) => (
                        <li key={idx}><FaCheckCircle /> {req}</li>
                    ))}
                </ul>
                <h3>Quyền lợi</h3>
                <ul className="job-list">
                    {job.benefits.map((benefit, idx) => (
                        <li key={idx}><FaCheckCircle /> {benefit}</li>
                    ))}
                </ul>
                <a href="mailto:careers@thuaphatlaivn.com" className="btn btn-primary btn-lg">
                    Nộp đơn xin việc
                </a>
            </div>
        </div>
    );
};

const Careers: React.FC = () => {
    const [selectedJob, setSelectedJob] = React.useState<JobPosting | null>(null);

    return (
        <section id="careers" className="careers-section">
            <div className="container">
                <h2 className="section-title">Tuyển dụng</h2>
                <p className="section-subtitle">
                    Hãy gia nhập đội ngũ chuyên nghiệp của chúng tôi
                </p>

                <div className="careers-intro">
                    <p>
                        Chúng tôi luôn tìm kiếm những tài năng trẻ, có tâm huyết với ngành luật
                        để cùng phát triển. Nếu bạn có đam mê và lòng nhiệt huyết cho công tác pháp lý,
                        hãy gửi hồ sơ của bạn đến chúng tôi.
                    </p>
                </div>

                <div className="jobs-grid">
                    {jobPostings.map((job) => (
                        <div key={job.id} className="job-card">
                            <div className="job-header">
                                <h3>{job.title}</h3>
                                <span className="job-type">{job.type}</span>
                            </div>
                            <div className="job-info">
                                <p><FaBriefcase /> {job.department}</p>
                                <p><FaMapMarkerAlt /> {job.location}</p>
                                <p className="job-salary">{job.salary}</p>
                            </div>
                            <p className="job-desc">{job.description}</p>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setSelectedJob(job)}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>

                {selectedJob && (
                    <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
                )}
            </div>
        </section>
    );
};

export default Careers;
