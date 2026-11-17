import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Star, StarOff, ExternalLink, X, Clock } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { Project } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

type VisibilityType = 'draft' | 'published' | 'unlisted'

const emptyProject: Partial<Project> = {
  title: '', slug: '', short_description: '', full_description: '',
  problem_statement: '', motivation: '', approach: '',
  features_implemented: [], technologies: [],
  category: '', current_status: 'In Progress',
  github_url: '', live_demo_url: '', cover_image_url: '',
  is_featured: false, display_order: 0, visibility: 'draft'
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await adminApi.getAllProjects()
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    if (!editingProject?.title) { showError('Project title is required.'); return }
    if (!editingProject?.slug) { showError('Project slug is required.'); return }
    setSaving(true)
    const { error } = await adminApi.upsertProject(editingProject)
    setSaving(false)
    if (error) { showError(`Failed to save: ${error.message}`); return }
    showSuccess(editingProject.id ? 'Project updated!' : 'Project created!')
    setEditingProject(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteProject(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Project deleted.')
    setDeleteId(null)
    load()
  }

  const updateField = (field: keyof Project, value: any) => {
    setEditingProject(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'title' && !prev?.id) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  const visibilityBadge = (v: VisibilityType) => {
    const map: Record<VisibilityType, { label: string; cls: string }> = {
      published: { label: 'Published', cls: 'badge-green' },
      draft: { label: 'Draft', cls: 'badge-yellow' },
      unlisted: { label: 'Unlisted', cls: 'badge-muted' }
    }
    const info = map[v] || map.draft
    return <span className={`badge ${info.cls}`}>{info.label}</span>
  }

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Manage your portfolio projects. Changes go live when you publish.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditingProject({ ...emptyProject })}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{
          background: '#171D2A',
          border: '1px solid rgba(237,234,245,0.08)',
          borderRadius: 12,
          overflow: 'auto'
        }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Featured</th>
                <th>Order</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#A8AFC1', padding: 40 }}>
                    No projects yet. Add your first project!
                  </td>
                </tr>
              )}
              {projects.map(project => (
                <tr key={project.id}>
                  <td>
                    <div>
                      <p style={{ color: '#EDEAF5', fontWeight: 500, fontFamily: 'Space Grotesk, sans-serif' }}>
                        {project.title}
                      </p>
                      <p style={{ color: '#A8AFC1', fontSize: '0.75rem' }}>/{project.slug}</p>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>{project.category || '—'}</span>
                  </td>
                  <td>
                    <span style={{ color: '#A8AFC1', fontSize: '0.8rem' }}>{project.current_status}</span>
                  </td>
                  <td>{visibilityBadge(project.visibility as VisibilityType)}</td>
                  <td>
                    {project.is_featured
                      ? <Star size={16} color="#fbbf24" fill="#fbbf24" />
                      : <StarOff size={16} color="#A8AFC1" />
                    }
                  </td>
                  <td>
                    <span style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>{project.display_order}</span>
                  </td>
                  <td>
                    <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                      {project.live_demo_url && (
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#A8AFC1', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                          title="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setEditingProject({
                          ...project,
                          features_implemented: project.features_implemented || [],
                          technologies: project.technologies || []
                        })}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteId(project.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / Add Panel */}
      {editingProject && (
        <div className="dialog-overlay">
          <div style={{
            background: '#111622',
            border: '1px solid rgba(237,234,245,0.1)',
            borderRadius: 20,
            width: '100%',
            maxWidth: 700,
            maxHeight: '90vh',
            overflow: 'auto',
            margin: 24,
            padding: 40
          }}>
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#EDEAF5' }}>
                {editingProject.id ? 'Edit Project' : 'Add Project'}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex', alignItems: 'center' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Title — full width */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Project Title *</label>
                <input
                  className="form-input"
                  value={editingProject.title || ''}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="e.g. Lumière"
                />
              </div>

              {/* Slug */}
              <div className="form-group">
                <label className="form-label">Slug *</label>
                <input
                  className="form-input"
                  value={editingProject.slug || ''}
                  onChange={e => updateField('slug', e.target.value)}
                  placeholder="e.g. lumiere"
                />
                <p className="form-hint">URL path: /#/projects/{editingProject.slug || 'slug'}</p>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  className="form-input"
                  value={editingProject.category || ''}
                  onChange={e => updateField('category', e.target.value)}
                  placeholder="e.g. Creative Web Development"
                />
              </div>

              {/* Current status */}
              <div className="form-group">
                <label className="form-label">Current Status</label>
                <input
                  className="form-input"
                  value={editingProject.current_status || ''}
                  onChange={e => updateField('current_status', e.target.value)}
                  placeholder="e.g. Completed, In Progress"
                />
              </div>

              {/* Visibility */}
              <div className="form-group">
                <label className="form-label">Visibility</label>
                <select
                  className="form-select"
                  value={editingProject.visibility || 'draft'}
                  onChange={e => updateField('visibility', e.target.value as VisibilityType)}
                >
                  <option value="draft">Draft (private)</option>
                  <option value="published">Published (public)</option>
                  <option value="unlisted">Unlisted</option>
                </select>
              </div>

              {/* Short description */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: 70 }}
                  value={editingProject.short_description || ''}
                  onChange={e => updateField('short_description', e.target.value)}
                  placeholder="One to two sentences describing the project."
                />
              </div>

              {/* Full description */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Full Description / Overview</label>
                <textarea
                  className="form-textarea"
                  value={editingProject.full_description || ''}
                  onChange={e => updateField('full_description', e.target.value)}
                  placeholder="Detailed project overview..."
                />
              </div>

              {/* Problem statement */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Problem Statement</label>
                <textarea
                  className="form-textarea"
                  value={editingProject.problem_statement || ''}
                  onChange={e => updateField('problem_statement', e.target.value)}
                  placeholder="What problem does this project address?"
                />
              </div>

              {/* Motivation */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Motivation</label>
                <textarea
                  className="form-textarea"
                  value={editingProject.motivation || ''}
                  onChange={e => updateField('motivation', e.target.value)}
                  placeholder="Why did you build this?"
                />
              </div>

              {/* Approach */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Approach</label>
                <textarea
                  className="form-textarea"
                  value={editingProject.approach || ''}
                  onChange={e => updateField('approach', e.target.value)}
                  placeholder="How did you approach building this?"
                />
              </div>

              {/* Features */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Features Implemented</label>
                <textarea
                  className="form-textarea"
                  value={(editingProject.features_implemented || []).join('\n')}
                  onChange={e => updateField('features_implemented', e.target.value.split('\n').filter(Boolean))}
                  placeholder="One feature per line"
                />
                <p className="form-hint">Enter one feature per line.</p>
              </div>

              {/* Technologies */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Technologies Used</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: 70 }}
                  value={(editingProject.technologies || []).join('\n')}
                  onChange={e => updateField('technologies', e.target.value.split('\n').filter(Boolean))}
                  placeholder="One technology per line (e.g. Python, React, Supabase)"
                />
                <p className="form-hint">These are the project's technologies — not your personal skills.</p>
              </div>

              {/* GitHub URL */}
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  className="form-input"
                  value={editingProject.github_url || ''}
                  onChange={e => updateField('github_url', e.target.value)}
                  placeholder="https://github.com/..."
                  type="url"
                />
              </div>

              {/* Live demo URL */}
              <div className="form-group">
                <label className="form-label">Live Demo URL</label>
                <input
                  className="form-input"
                  value={editingProject.live_demo_url || ''}
                  onChange={e => updateField('live_demo_url', e.target.value)}
                  placeholder="https://..."
                  type="url"
                />
              </div>

              {/* Limitations */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Limitations</label>
                <textarea
                  className="form-textarea"
                  value={(editingProject as any).limitations || ''}
                  onChange={e => updateField('limitations' as keyof Project, e.target.value)}
                  placeholder="Current limitations of this project..."
                />
              </div>

              {/* Future scope */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Future Scope</label>
                <textarea
                  className="form-textarea"
                  value={(editingProject as any).future_scope || ''}
                  onChange={e => updateField('future_scope' as keyof Project, e.target.value)}
                  placeholder="Planned future improvements..."
                />
              </div>

              {/* Display order */}
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input
                  className="form-input"
                  type="number"
                  value={editingProject.display_order || 0}
                  onChange={e => updateField('display_order', parseInt(e.target.value))}
                />
              </div>

              {/* Featured toggle */}
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 24 }}>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.9rem',
                  color: '#EDEAF5'
                }}>
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured || false}
                    onChange={e => updateField('is_featured', e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#4169E1' }}
                  />
                  Featured project
                </label>
              </div>
            </div>

            {/* Panel footer */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end' }}>
              <button
                className="btn btn-outline"
                onClick={() => setEditingProject(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving...</>
                  : 'Save Project'
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <ConfirmDialog
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
          confirmLabel="Delete"
          dangerous
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
