import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  showSuccess: (msg: string) => void
  showError: (msg: string) => void
}

const ToastContext = createContext<ToastContextType>({
  showSuccess: () => {},
  showError: () => {},
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const showSuccess = useCallback((msg: string) => addToast(msg, 'success'), [addToast])
  const showError = useCallback((msg: string) => addToast(msg, 'error'), [addToast])

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
          >
            {toast.type === 'success'
              ? <CheckCircle size={18} />
              : <XCircle size={18} />
            }
            {toast.message}
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 8, display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
