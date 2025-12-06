import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../documents/Admin.css';
import { companyInfoService } from '../api/companyInfoService';
import { mockContactInfo, mockCompanyInfo } from '../../data/mockData';

const CompanyInfoAdmin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'contact' | 'company'>('contact');
    const [contactInfo, setContactInfo] = useState(mockContactInfo);
    const [companyInfo, setCompanyInfo] = useState(mockCompanyInfo);

    useEffect(() => {
        companyInfoService.initializeContactInfo(mockContactInfo);
        companyInfoService.initializeCompanyInfo(mockCompanyInfo);
    }, []);

    const handleContactChange = (field: string, value: string) => {
        setContactInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCompanyChange = (field: string, value: string | string[]) => {
        setCompanyInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveContact = () => {
        companyInfoService.updateContactInfo(contactInfo);
        toast.success('Cập nhật thông tin liên hệ thành công');
    };

    const handleSaveCompany = () => {
        companyInfoService.updateCompanyInfo(companyInfo);
        toast.success('Cập nhật thông tin công ty thành công');
    };

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2>Quản Lý Thông Tin Công Ty</h2>
            </div>

            <div className="about-tabs" style={{ marginBottom: '20px' }}>
                <button
                    className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                >
                    Thông tin liên hệ
                </button>
                <button
                    className={`tab-btn ${activeTab === 'company' ? 'active' : ''}`}
                    onClick={() => setActiveTab('company')}
                >
                    Thông tin công ty
                </button>
            </div>

            {activeTab === 'contact' && (
                <div className="form-section">
                    <h3>Thông Tin Liên Hệ</h3>
                    <div className="form-group">
                        <label>Điện thoại</label>
                        <input
                            type="text"
                            value={contactInfo.phone}
                            onChange={(e) => handleContactChange('phone', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            value={contactInfo.address}
                            onChange={(e) => handleContactChange('address', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giờ làm việc</label>
                        <input
                            type="text"
                            value={contactInfo.workingHours}
                            onChange={(e) => handleContactChange('workingHours', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Link Zalo</label>
                        <input
                            type="text"
                            value={contactInfo.zaloLink}
                            onChange={(e) => handleContactChange('zaloLink', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Link Facebook</label>
                        <input
                            type="text"
                            value={contactInfo.facebookLink || ''}
                            onChange={(e) => handleContactChange('facebookLink', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Google Maps Link</label>
                        <input
                            type="text"
                            value={contactInfo.googleMapsLink}
                            onChange={(e) => handleContactChange('googleMapsLink', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vĩ độ (Latitude)</label>
                        <input
                            type="number"
                            value={contactInfo.coordinates.lat}
                            onChange={(e) => setContactInfo(prev => ({
                                ...prev,
                                coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) }
                            }))}
                        />
                    </div>
                    <div className="form-group">
                        <label>Kinh độ (Longitude)</label>
                        <input
                            type="number"
                            value={contactInfo.coordinates.lng}
                            onChange={(e) => setContactInfo(prev => ({
                                ...prev,
                                coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) }
                            }))}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveContact}>
                        Lưu thông tin liên hệ
                    </button>
                </div>
            )}

            {activeTab === 'company' && (
                <div className="form-section">
                    <h3>Thông Tin Công Ty</h3>
                    <div className="form-group">
                        <label>Tên công ty</label>
                        <input
                            type="text"
                            value={companyInfo.name}
                            onChange={(e) => handleCompanyChange('name', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tên đầy đủ</label>
                        <input
                            type="text"
                            value={companyInfo.fullName}
                            onChange={(e) => handleCompanyChange('fullName', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Khẩu hiệu</label>
                        <input
                            type="text"
                            value={companyInfo.slogan}
                            onChange={(e) => handleCompanyChange('slogan', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mô tả</label>
                        <textarea
                            value={companyInfo.description}
                            onChange={(e) => handleCompanyChange('description', e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tầm nhìn</label>
                        <textarea
                            value={companyInfo.vision}
                            onChange={(e) => handleCompanyChange('vision', e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sứ mệnh</label>
                        <textarea
                            value={companyInfo.mission}
                            onChange={(e) => handleCompanyChange('mission', e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá trị cốt lõi (mỗi dòng một giá trị)</label>
                        <textarea
                            value={companyInfo.values.join('\n')}
                            onChange={(e) => handleCompanyChange('values', e.target.value.split('\n'))}
                            rows={4}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveCompany}>
                        Lưu thông tin công ty
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyInfoAdmin;
