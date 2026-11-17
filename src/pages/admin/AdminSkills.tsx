import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Tag } from 'lucide-react'
import { adminApi } from '../../lib/api'
import type { Skill, SkillCategory } from '../../lib/supabase'
import { useToast } from '../../components/admin/Toast'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const proficiencyOptions = ['Beginner', 'Introductory', 'Foundational', 'Intermediate', 'Advanced', 'Familiar with', 'Exploring']

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const { showSuccess, showError } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const [sk, cats] = await Promise.all([adminApi.getAllSkills(), adminApi.getSkillCategories()])
    setSkills(sk)
    setCategories(cats)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    if (!editingSkill?.name) { showError('Skill name is required.'); return }
    setSaving(true)
    const { error } = await adminApi.upsertSkill(editingSkill)
    setSaving(false)
    if (error) { showError(`Failed to save: ${error.message}`); return }
    showSuccess(editingSkill.id ? 'Skill updated!' : 'Skill added!')
    setEditingSkill(null)
    load()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await adminApi.deleteSkill(deleteId)
    if (error) { showError(`Delete failed: ${error.message}`); return }
    showSuccess('Skill deleted.')
    setDeleteId(null)
    load()
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    const { error } = await adminApi.upsertSkillCategory({ name: newCategoryName.trim(), display_order: categories.length + 1 })
    if (error) { showError('Failed to add category.'); return }
    setNewCategoryName('')
    showSuccess('Category added!')
    load()
  }

  const toggleVisibility = async (skill: Skill) => {
    const { error } = await adminApi.upsertSkill({ ...skill, is_visible: !skill.is_visible })
    if (error) { showError('Failed to update visibility.'); return }
    load()
  }

  const proficiencyColor: Record<string, string> = {
    'Advanced': '#4ade80', 'Intermediate': '#4169E1', 'Foundational': '#a78bfa',
    'Introductory': '#A8AFC1', 'Familiar with': '#A8AFC1', 'Exploring': '#fbbf24', 'Beginner': '#A8AFC1'
  }

  // Group by category
  const grouped: Record<string, { category: SkillCategory | null; skills: Skill[] }> = {}
  const uncategorized: Skill[] = []

  skills.forEach(skill => {
    const cat = categories.find(c => c.id === skill.category_id)
    if (cat) {
      if (!grouped[cat.id]) grouped[cat.id] = { category: cat, skills: [] }
      grouped[cat.id].skills.push(skill)
    } else {
      uncategorized.push(skill)
    }
  })

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Skills</h1>
          <p className="admin-page-subtitle">Manage your confirmed personal skills. Keep this accurate — only add skills you actually have.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setEditingSkill({ name: '', proficiency_label: 'Familiar with', is_visible: true, display_order: skills.length + 1 })}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Add category row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, alignItems: 'center' }}>
        <input
          className="form-input"
          style={{ maxWidth: 260 }}
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
          placeholder="New category name..."
          onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
        />
        <button className="btn btn-outline btn-sm" onClick={handleAddCategory}>
          <Plus size={14} /> Add Category
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {Object.values(grouped).map(({ category, skills: catSkills }) => (
            <div key={category?.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Tag size={14} color="#4169E1" />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#A8AFC1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {category?.name}
                </h2>
                <span style={{ color: '#A8AFC1', fontSize: '0.75rem' }}>({catSkills.length})</span>
              </div>
              <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 12, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th>Proficiency</th>
                      <th>Description</th>
                      <th>Order</th>
                      <th>Visible</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catSkills.map(skill => (
                      <tr key={skill.id}>
                        <td style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{skill.name}</td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.825rem', color: proficiencyColor[skill.proficiency_label] || '#A8AFC1' }}>
                            <span style={{ width: 6, height: 6, background: proficiencyColor[skill.proficiency_label] || '#A8AFC1', borderRadius: '50%' }} />
                            {skill.proficiency_label}
                          </span>
                        </td>
                        <td style={{ color: '#A8AFC1', fontSize: '0.825rem', maxWidth: 200 }}>
                          {skill.description ? skill.description.substring(0, 60) + (skill.description.length > 60 ? '...' : '') : '—'}
                        </td>
                        <td style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>{skill.display_order}</td>
                        <td>
                          <button onClick={() => toggleVisibility(skill)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: skill.is_visible ? '#4ade80' : '#A8AFC1', display: 'flex', alignItems: 'center' }}>
                            {skill.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                        </td>
                        <td>
                          <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => setEditingSkill({ ...skill })}><Edit2 size={14} /></button>
                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(skill.id)}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {uncategorized.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#A8AFC1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Uncategorized</h2>
              <div style={{ background: '#171D2A', border: '1px solid rgba(237,234,245,0.08)', borderRadius: 12, overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead><tr><th>Skill</th><th>Proficiency</th><th>Order</th><th>Visible</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {uncategorized.map(skill => (
                      <tr key={skill.id}>
                        <td style={{ color: '#EDEAF5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>{skill.name}</td>
                        <td><span style={{ color: proficiencyColor[skill.proficiency_label] || '#A8AFC1', fontSize: '0.825rem' }}>{skill.proficiency_label}</span></td>
                        <td style={{ color: '#A8AFC1', fontSize: '0.875rem' }}>{skill.display_order}</td>
                        <td><button onClick={() => toggleVisibility(skill)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: skill.is_visible ? '#4ade80' : '#A8AFC1', display: 'flex', alignItems: 'center' }}>{skill.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}</button></td>
                        <td><div className="admin-actions" style={{ justifyContent: 'flex-end' }}><button className="btn btn-ghost btn-sm" onClick={() => setEditingSkill({ ...skill })}><Edit2 size={14} /></button><button className="btn btn-danger btn-sm" onClick={() => setDeleteId(skill.id)}><Trash2 size={14} /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {skills.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: '#A8AFC1', fontFamily: 'Space Grotesk, sans-serif' }}>
              No skills yet. Add your confirmed skills!
            </div>
          )}
        </div>
      )}

      {/* Edit/Add Dialog */}
      {editingSkill && (
        <div className="dialog-overlay">
          <div style={{ background: '#111622', border: '1px solid rgba(237,234,245,0.1)', borderRadius: 20, width: '100%', maxWidth: 520, margin: 24, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#EDEAF5' }}>
                {editingSkill.id ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={() => setEditingSkill(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8AFC1', display: 'flex', alignItems: 'center' }}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label className="form-label">Skill Name *</label>
              <input className="form-input" value={editingSkill.name || ''} onChange={e => setEditingSkill(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Python" />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={editingSkill.category_id || ''} onChange={e => setEditingSkill(p => ({ ...p, category_id: e.target.value || null }))}>
                <option value="">No category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Proficiency Level</label>
              <select className="form-select" value={editingSkill.proficiency_label || 'Familiar with'} onChange={e => setEditingSkill(p => ({ ...p, proficiency_label: e.target.value }))}>
                {proficiencyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <textarea className="form-textarea" style={{ minHeight: 80 }} value={editingSkill.description || ''} onChange={e => setEditingSkill(p => ({ ...p, description: e.target.value }))} placeholder="Brief note about this skill..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input className="form-input" type="number" value={editingSkill.display_order || 0} onChange={e => setEditingSkill(p => ({ ...p, display_order: parseInt(e.target.value) }))} />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDEAF5' }}>
                  <input type="checkbox" checked={editingSkill.is_visible !== false} onChange={e => setEditingSkill(p => ({ ...p, is_visible: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#4169E1' }} />
                  Visible on portfolio
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setEditingSkill(null)} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Skill'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Skill"
          message="Are you sure you want to delete this skill?"
          confirmLabel="Delete"
          dangerous
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
