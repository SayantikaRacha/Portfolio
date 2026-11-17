import React, { useRef, useState } from 'react'
import { Upload, FileText, Image as ImageIcon } from 'lucide-react'

interface Props {
  accept?: string
  maxSizeMB?: number
  onFile: (file: File) => void
  label?: string
  hint?: string
  preview?: string
  progress?: number
}

export function FileUpload({ accept = 'image/*,.pdf', maxSizeMB = 10, onFile, label = 'Upload file', hint, preview, progress }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`)
      return
    }
    onFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const isImage = preview && !preview.endsWith('.pdf') && (
    preview.includes('image') || /\.(jpg|jpeg|png|webp|gif)$/i.test(preview)
  )

  return (
    <div>
      {preview && (
        <div style={{ marginBottom: 12 }}>
          {isImage ? (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(237,234,245,0.12)' }}
            />
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px',
              background: 'rgba(65,105,225,0.08)',
              border: '1px solid rgba(65,105,225,0.2)',
              borderRadius: 8,
              color: '#5B82FF',
              fontSize: '0.875rem',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              <FileText size={18} />
              Current file uploaded
            </div>
          )}
        </div>
      )}

      <div
        className={`upload-zone${dragOver ? ' drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="upload-zone-icon">
          <Upload size={28} color="#A8AFC1" />
        </div>
        <p className="upload-zone-text">{label}</p>
        <p className="upload-zone-hint">{hint || `Drag & drop or click to browse. Max ${maxSizeMB}MB.`}</p>
      </div>

      {progress !== undefined && progress > 0 && progress < 100 && (
        <div className="progress-bar" style={{ marginTop: 10 }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: 6 }}>{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
