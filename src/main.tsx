import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <section style={{ display: "none" }}>
                <h1>Văn phòng Thừa phát lại Hoàng Mai</h1>
                <p>
                    Văn phòng Thừa phát lại Hoàng Mai chuyên cung cấp các dịch vụ:
                    lập vi bằng, tống đạt văn bản, xác minh điều kiện thi hành án
                    và tổ chức thi hành án theo quy định của pháp luật Việt Nam.
                </p>
            </section>

            <App />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </ErrorBoundary>
    </React.StrictMode>,
)
