import { useEffect } from 'react'
import '../styles/Toast.css'

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  )
}

export default Toast
