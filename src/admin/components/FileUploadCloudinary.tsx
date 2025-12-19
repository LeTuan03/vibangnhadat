import React, { useState } from 'react'
import { Upload, Button, Image, message, Progress } from 'antd'
import { UploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'

type Props = {
    value?: string | null
    onChange?: (v: string | null) => void
    accept?: string
    maxCount?: number
    folder?: string
}

const FileUploadCloudinary: React.FC<Props> = ({
    value,
    onChange,
    accept = 'image/*',
    maxCount = 1,
    folder = 'uploads'
}) => {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dmm6n8un0'; // Fallback or template
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'vibangnhadat'; // Fallback or template

    const handleUpload = async (file: File) => {
        if (!cloudName || !uploadPreset) {
            message.error('Chưa cấu hình Cloudinary (Cloud Name hoặc Upload Preset)')
            return false
        }

        setUploading(true)
        setProgress(0)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', uploadPreset)
            formData.append('folder', folder)

            const xhr = new XMLHttpRequest()
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true)

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const p = Math.round((event.loaded / event.total) * 100)
                    setProgress(p)
                }
            }

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText)
                    onChange && onChange(response.secure_url)
                    message.success('Tải ảnh lên thành công')
                } else {
                    console.error('Cloudinary error:', xhr.responseText)
                    message.error('Lỗi khi tải ảnh lên Cloudinary')
                }
                setUploading(false)
            }

            xhr.onerror = () => {
                message.error('Lỗi mạng khi tải ảnh')
                setUploading(false)
            }

            xhr.send(formData)
        } catch (e) {
            console.error('Error in handleUpload:', e)
            message.error('Lỗi xử lý file')
            setUploading(false)
        }

        return false // Prevent antd default upload
    }

    const handleRemove = () => {
        onChange && onChange(null)
    }

    return (
        <div style={{ width: '100%' }}>
            {value ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <Image
                            src={value}
                            width={150}
                            style={{ borderRadius: 8, border: '1px solid #d9d9d9', objectFit: 'cover' }}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={handleRemove}
                            style={{ position: 'absolute', top: -10, right: -10 }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: 4, wordBreak: 'break-all' }}>
                            URL: <a href={value} target="_blank" rel="noreferrer">{value}</a>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ maxWidth: 300 }}>
                    <Upload
                        beforeUpload={handleUpload}
                        accept={accept}
                        showUploadList={false}
                        maxCount={maxCount}
                        disabled={uploading}
                    >
                        <Button
                            icon={uploading ? <LoadingOutlined /> : <UploadOutlined />}
                            loading={uploading}
                            disabled={uploading}
                            block
                        >
                            {uploading ? 'Đang tải lên...' : 'Tải ảnh lên (Cloudinary)'}
                        </Button>
                    </Upload>
                    {uploading && (
                        <Progress
                            percent={progress}
                            size="small"
                            status="active"
                            style={{ marginTop: 8 }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default FileUploadCloudinary
