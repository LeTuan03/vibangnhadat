import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaClipboardList, FaGift } from 'react-icons/fa'
import VibanFirebaseService from '../services/VibanFirebaseService'
import LoadingSpinner from '../components/LoadingSpinner'
import type { Viban } from '../types'
import './VibanDetailPage.css'

const VibanDetailPage: React.FC = () => {
  const [viban, setViban] = useState<Viban | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const loadViban = async () => {
      try {
        setLoading(true)
        if (!id) {
          setNotFound(true)
          return
        }
        const data = await VibanFirebaseService.getVibanById(id)
        if (data) {
          setViban(data)
        } else {
          setNotFound(true)
        }
      } catch (err) {
        console.error('Error loading viban:', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    loadViban()
  }, [id])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!viban || notFound) {
    return (
      <main className="container">
        <h2>Không tìm thấy thông tin</h2>
        <p>Vi bằng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/">Quay lại trang chủ</Link>
      </main>
    )
  }

  return (
    <main className="viban-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Quay lại trang chủ
        </Link>

        <article className="viban-detail">
          <header className="viban-header">
            <h1>{viban.title}</h1>
            <p className="viban-description">{viban.description}</p>
            <div className="viban-fee">
              <span className="fee-label">Phí cấp:</span>
              <span className="fee-value">{viban.fees}</span>
            </div>
          </header>

          <div className="viban-content">
            {/* Requirements Section */}
            {viban.requirements && viban.requirements.length > 0 && (
              <section className="viban-section">
                <h2><FaClipboardList /> Yêu cầu cần chuẩn bị</h2>
                <ul className="requirements-list">
                  {viban.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Process Section */}
            {viban.process && viban.process.length > 0 && (
              <section className="viban-section">
                <h2><FaCheckCircle /> Quy trình thực hiện</h2>
                <div className="process-steps">
                  {viban.process.map((step, idx) => (
                    <div key={idx} className="process-item">
                      <div className="step-number">{idx + 1}</div>
                      <div className="step-content">
                        <p>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Benefits Section */}
            {viban.benefits && viban.benefits.length > 0 && (
              <section className="viban-section">
                <h2><FaGift /> Lợi ích</h2>
                <ul className="benefits-list">
                  {viban.benefits.map((benefit, idx) => (
                    <li key={idx}>✓ {benefit}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA Section */}
            <aside className="viban-cta">
              <div className="cta-content">
                <h3>Cần tư vấn về dịch vụ này?</h3>
                <p>Liên hệ với chúng tôi để được tư vấn miễn phí và hỗ trợ thực hiện dịch vụ {viban.title.toLowerCase()}</p>
                <Link to="/" className="btn btn-primary">
                  Liên hệ ngay
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  )
}

export default VibanDetailPage
