import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  dangerous?: boolean
}

export function ConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel, dangerous = false }: Props) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
          {dangerous && (
            <div style={{ width: 40, height: 40, background: 'rgba(220,38,38,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={20} color="#EF4444" />
            </div>
          )}
          <div>
            <h3 className="dialog-title">{title}</h3>
            <p className="dialog-message">{message}</p>
          </div>
        </div>
        <div className="dialog-actions">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button
            className={dangerous ? 'btn btn-danger' : 'btn btn-primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
