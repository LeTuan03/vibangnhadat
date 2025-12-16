import React from 'react'
import { Upload, Button, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

type Props = {
  value?: string | null
  onChange?: (v: string | null) => void
  accept?: string
  maxCount?: number
}

const readFileAsDataURL = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = reject
  reader.readAsDataURL(file)
})

const FileUploadBase64: React.FC<Props> = ({ value, onChange, accept = 'image/*', maxCount = 1 }) => {
  const beforeUpload = async (file: File) => {
    try {
      const dataUrl = await readFileAsDataURL(file)
      onChange && onChange(dataUrl)
    } catch (e) {
      console.error('Error reading file', e)
    }
    // prevent auto upload
    return false
  }

  const handleRemove = () => {
    onChange && onChange(null)
  }

  return (
    <div>
      {value ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Image src={value} width={120} />
          <Button onClick={handleRemove}>Xóa</Button>
        </div>
      ) : (
        <Upload beforeUpload={beforeUpload} accept={accept} showUploadList={false} maxCount={maxCount}>
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
      )}
    </div>
  )
}

export default FileUploadBase64
