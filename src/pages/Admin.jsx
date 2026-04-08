import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, saveProjects } from '../data/projects'

const EMPTY_PROJECT = {
  id: '',
  title: '',
  subtitle: '',
  eyebrow: '',
  description: '',
  url: '',
  year: '',
  tags: [],
  challenge: { heading: 'The Challenge', body: '', bullets: [] },
  features: [],
  story: '',
  journey: [],
  outcomes: [],
  brand: { name: '', initials: '', tagline: '' },
}

const s = {
  wrap: { minHeight:'100vh', background:'#000', color:'var(--white)', fontFamily:'var(--font)' },
  nav: {
    position:'sticky', top:0, zIndex:200, height:48, display:'flex', alignItems:'center',
    justifyContent:'space-between', padding:'0 22px',
    background:'rgba(0,0,0,0.85)', backdropFilter:'saturate(180%) blur(20px)',
    borderBottom:'.5px solid var(--border)',
  },
  navBack: { display:'flex', alignItems:'center', gap:5, fontSize:14, color:'var(--g400)', textDecoration:'none', letterSpacing:'-.01em' },
  navTitle: { fontSize:13, color:'var(--g600)', letterSpacing:'-.01em' },
  layout: { display:'grid', gridTemplateColumns:'280px 1fr', minHeight:'calc(100vh - 48px)' },
  sidebar: { borderRight:'.5px solid var(--border)', padding:'24px 16px', display:'flex', flexDirection:'column', gap:8 },
  sideHeader: { fontSize:11, letterSpacing:'.1em', color:'var(--teal)', textTransform:'uppercase', fontWeight:500, padding:'0 8px', marginBottom:8 },
  sideItem: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, cursor:'pointer', transition:'background .2s', border:'.5px solid transparent' },
  sideItemTitle: { fontSize:13, fontWeight:500, letterSpacing:'-.01em', color:'#fff', marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:160 },
  sideItemSub: { fontSize:11, color:'var(--g600)', letterSpacing:'-.01em' },
  addBtn: {
    display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:10,
    background:'var(--teal-dim)', border:'.5px solid rgba(46,202,139,.25)',
    cursor:'pointer', fontSize:13, color:'var(--teal)', fontWeight:500, letterSpacing:'-.01em',
    marginTop:8, transition:'background .2s',
  },
  main: { padding:'32px 40px', overflowY:'auto' },
  empty: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:12, color:'var(--g600)' },
  formTitle: { fontSize:22, fontWeight:600, letterSpacing:'-.04em', color:'#fff', marginBottom:4 },
  formSub: { fontSize:13, color:'var(--g600)', marginBottom:32 },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 },
  field: { display:'flex', flexDirection:'column', gap:6, marginBottom:16 },
  label: { fontSize:11, letterSpacing:'.08em', color:'var(--teal)', textTransform:'uppercase', fontWeight:500 },
  input: {
    background:'rgba(255,255,255,.04)', border:'.5px solid var(--border)',
    borderRadius:10, padding:'10px 14px', fontSize:13, color:'var(--white)',
    fontFamily:'var(--font)', outline:'none', transition:'border-color .2s',
    width:'100%',
  },
  textarea: {
    background:'rgba(255,255,255,.04)', border:'.5px solid var(--border)',
    borderRadius:10, padding:'10px 14px', fontSize:13, color:'var(--white)',
    fontFamily:'var(--font)', outline:'none', transition:'border-color .2s',
    width:'100%', resize:'vertical', minHeight:80,
  },
  section: { marginBottom:32 },
  sectionTitle: { fontSize:13, fontWeight:600, color:'#fff', letterSpacing:'-.02em', marginBottom:16, paddingBottom:10, borderBottom:'.5px solid var(--border)' },
  listItem: { display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 },
  removeBtn: { flexShrink:0, width:28, height:28, borderRadius:7, background:'rgba(255,60,60,.1)', border:'.5px solid rgba(255,60,60,.2)', color:'#ff6b6b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, marginTop:2 },
  addItemBtn: { display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--teal)', background:'none', border:'.5px solid rgba(46,202,139,.2)', borderRadius:8, padding:'6px 12px', cursor:'pointer', transition:'background .2s' },
  tagInput: { display:'flex', gap:8, alignItems:'center' },
  tagRow: { display:'flex', flexWrap:'wrap', gap:6, marginTop:8 },
  tagChip: { display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--g400)', background:'rgba(255,255,255,.04)', border:'.5px solid rgba(255,255,255,.09)', padding:'4px 10px', borderRadius:980 },
  tagRemove: { cursor:'pointer', color:'var(--g600)', fontSize:14, lineHeight:1 },
  actionsRow: { display:'flex', gap:12, marginTop:32, paddingTop:24, borderTop:'.5px solid var(--border)' },
  saveBtn: { padding:'11px 28px', background:'var(--teal)', border:'none', borderRadius:10, fontSize:13, fontWeight:600, color:'#000', cursor:'pointer', letterSpacing:'-.01em', transition:'opacity .2s' },
  deleteBtn: { padding:'11px 20px', background:'rgba(255,60,60,.1)', border:'.5px solid rgba(255,60,60,.25)', borderRadius:10, fontSize:13, color:'#ff6b6b', cursor:'pointer', letterSpacing:'-.01em' },
  previewBtn: { padding:'11px 20px', background:'none', border:'.5px solid var(--border)', borderRadius:10, fontSize:13, color:'var(--g400)', cursor:'pointer', letterSpacing:'-.01em', textDecoration:'none', display:'inline-flex', alignItems:'center' },
  toast: { position:'fixed', bottom:24, right:24, background:'var(--teal)', color:'#000', padding:'10px 20px', borderRadius:10, fontSize:13, fontWeight:600, zIndex:9999, transition:'opacity .3s' },
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={s.input}
        onFocus={e => e.target.style.borderColor = 'rgba(46,202,139,.4)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={s.textarea}
        onFocus={e => e.target.style.borderColor = 'rgba(46,202,139,.4)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}

function TagsField({ tags, onChange }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (v && !tags.includes(v)) { onChange([...tags, v]); setInput('') }
  }
  return (
    <div style={s.field}>
      <label style={s.label}>Tags / Technologies</label>
      <div style={s.tagInput}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Type a tag and press Enter"
          style={s.input}
          onFocus={e => e.target.style.borderColor = 'rgba(46,202,139,.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button type="button" onClick={add} style={{...s.addItemBtn, flexShrink:0}}>Add</button>
      </div>
      <div style={s.tagRow}>
        {tags.map(t => (
          <span key={t} style={s.tagChip}>
            {t}
            <span style={s.tagRemove} onClick={() => onChange(tags.filter(x => x !== t))}>×</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function BulletsField({ label, items, onChange, placeholder }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      {items.map((item, i) => (
        <div key={i} style={s.listItem}>
          <input
            value={item}
            onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n) }}
            placeholder={placeholder}
            style={s.input}
            onFocus={e => e.target.style.borderColor = 'rgba(46,202,139,.4)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button type="button" style={s.removeBtn} onClick={() => onChange(items.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <button type="button" style={s.addItemBtn} onClick={() => onChange([...items, ''])}>
        + Add item
      </button>
    </div>
  )
}

const ICON_OPTIONS = ['grid','globe','shield','chart','cube','cart','users','rocket','brand','mail','search']

function FeaturesField({ features, onChange }) {
  const add = () => onChange([...features, { icon: 'grid', title: '', desc: '' }])
  const remove = (i) => onChange(features.filter((_, j) => j !== i))
  const update = (i, key, val) => { const n = [...features]; n[i] = { ...n[i], [key]: val }; onChange(n) }

  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>Key Features</div>
      {features.map((f, i) => (
        <div key={i} style={{background:'rgba(255,255,255,.02)',border:'.5px solid var(--border)',borderRadius:12,padding:'16px',marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:12,color:'var(--g600)'}}>Feature {i + 1}</span>
            <button type="button" style={s.removeBtn} onClick={() => remove(i)}>×</button>
          </div>
          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Icon</label>
              <select
                value={f.icon}
                onChange={e => update(i, 'icon', e.target.value)}
                style={{...s.input, cursor:'pointer'}}
              >
                {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <Field label="Title" value={f.title} onChange={v => update(i, 'title', v)} placeholder="Feature title" />
          </div>
          <TextArea label="Description" value={f.desc} onChange={v => update(i, 'desc', v)} placeholder="Short description" rows={2} />
        </div>
      ))}
      <button type="button" style={s.addItemBtn} onClick={add}>+ Add Feature</button>
    </div>
  )
}

function JourneyField({ journey, onChange }) {
  const add = () => onChange([...journey, { phase: '', title: '', desc: '', done: false }])
  const remove = (i) => onChange(journey.filter((_, j) => j !== i))
  const update = (i, key, val) => { const n = [...journey]; n[i] = { ...n[i], [key]: val }; onChange(n) }

  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>Journey / Process Steps</div>
      {journey.map((step, i) => (
        <div key={i} style={{background:'rgba(255,255,255,.02)',border:'.5px solid var(--border)',borderRadius:12,padding:'16px',marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:12,color:'var(--g600)'}}>Step {i + 1}</span>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--g400)',cursor:'pointer'}}>
                <input type="checkbox" checked={step.done} onChange={e => update(i, 'done', e.target.checked)} />
                Completed
              </label>
              <button type="button" style={s.removeBtn} onClick={() => remove(i)}>×</button>
            </div>
          </div>
          <div style={s.grid2}>
            <Field label="Phase Label" value={step.phase} onChange={v => update(i, 'phase', v)} placeholder="e.g. Research · Discovery" />
            <Field label="Step Title" value={step.title} onChange={v => update(i, 'title', v)} placeholder="e.g. Understanding the Problem" />
          </div>
          <TextArea label="Description" value={step.desc} onChange={v => update(i, 'desc', v)} placeholder="What happened in this step" rows={2} />
        </div>
      ))}
      <button type="button" style={s.addItemBtn} onClick={add}>+ Add Step</button>
    </div>
  )
}

function ProjectForm({ project, onSave, onDelete, isNew }) {
  const [form, setForm] = useState(() => JSON.parse(JSON.stringify(project)))
  const set = (path, val) => {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = val
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.id.trim()) { alert('Project ID is required (used in URL)'); return }
    if (!form.title.trim()) { alert('Title is required'); return }
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={s.formTitle}>{isNew ? 'Add New Project' : 'Edit Project'}</div>
      <div style={s.formSub}>{isNew ? 'Fill in the details below to add a new project to your portfolio.' : `Editing: ${form.title}`}</div>

      {/* Basic Info */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Basic Info</div>
        <div style={s.grid2}>
          <Field label="Project ID (URL slug)" value={form.id} onChange={v => set('id', v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))} placeholder="e.g. my-project" />
          <Field label="Year / Period" value={form.year} onChange={v => set('year', v)} placeholder="e.g. 2024 – Present" />
        </div>
        <Field label="Title" value={form.title} onChange={v => set('title', v)} placeholder="Project title — Subtitle" />
        <Field label="Subtitle / Role" value={form.subtitle} onChange={v => set('subtitle', v)} placeholder="e.g. Full-Stack Developer" />
        <Field label="Eyebrow (categories)" value={form.eyebrow} onChange={v => set('eyebrow', v)} placeholder="e.g. Web · Full-Stack · SEO" />
        <TextArea label="Short Description" value={form.description} onChange={v => set('description', v)} placeholder="One paragraph overview shown on the portfolio homepage and project hero" rows={3} />
        <Field label="Live URL (optional)" value={form.url} onChange={v => set('url', v)} placeholder="https://your-project.com" type="url" />
        <TagsField tags={form.tags} onChange={v => set('tags', v)} />
      </div>

      {/* Brand */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Brand / Showcase</div>
        <div style={s.grid2}>
          <Field label="Brand Name" value={form.brand.name} onChange={v => set('brand.name', v)} placeholder="YourBrand" />
          <Field label="Initials (2-3 chars)" value={form.brand.initials} onChange={v => set('brand.initials', v)} placeholder="YB" />
        </div>
        <Field label="Tagline" value={form.brand.tagline} onChange={v => set('brand.tagline', v)} placeholder="Short catchy tagline" />
      </div>

      {/* Challenge */}
      <div style={s.section}>
        <div style={s.sectionTitle}>The Challenge</div>
        <Field label="Heading" value={form.challenge.heading} onChange={v => set('challenge.heading', v)} placeholder="The Challenge" />
        <TextArea label="Challenge Body" value={form.challenge.body} onChange={v => set('challenge.body', v)} placeholder="Describe the core problem you were solving" rows={4} />
        <BulletsField label="Challenge Bullets" items={form.challenge.bullets} onChange={v => set('challenge.bullets', v)} placeholder="A specific pain point or challenge" />
      </div>

      {/* Features */}
      <FeaturesField features={form.features} onChange={v => set('features', v)} />

      {/* Story */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Full Story</div>
        <TextArea
          label="Story (supports <em>text</em> for emphasis)"
          value={form.story}
          onChange={v => set('story', v)}
          placeholder="Tell the full story. Wrap key phrases in <em>...</em> for teal emphasis."
          rows={6}
        />
      </div>

      {/* Journey */}
      <JourneyField journey={form.journey} onChange={v => set('journey', v)} />

      {/* Outcomes */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Outcomes / Results</div>
        <BulletsField label="Result Bullets" items={form.outcomes} onChange={v => set('outcomes', v)} placeholder="A measurable or meaningful outcome" />
      </div>

      {/* Actions */}
      <div style={s.actionsRow}>
        <button type="submit" style={s.saveBtn}
          onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >
          {isNew ? 'Add Project' : 'Save Changes'}
        </button>
        {!isNew && (
          <Link to={`/project/${form.id}`} target="_blank" style={s.previewBtn}>Preview ↗</Link>
        )}
        {!isNew && (
          <button type="button" style={s.deleteBtn} onClick={() => onDelete(form.id)}>Delete Project</button>
        )}
      </div>
    </form>
  )
}

export default function Admin() {
  const [projects, setProjects] = useState(() => getProjects())
  const [selected, setSelected] = useState(null) // id or 'new'
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleSave = (updated) => {
    let next
    if (selected === 'new') {
      if (projects.find(p => p.id === updated.id)) {
        alert(`A project with ID "${updated.id}" already exists. Choose a different ID.`)
        return
      }
      next = [...projects, updated]
    } else {
      next = projects.map(p => p.id === selected ? updated : p)
    }
    saveProjects(next)
    setProjects(next)
    setSelected(updated.id)
    showToast(selected === 'new' ? 'Project added!' : 'Changes saved!')
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const next = projects.filter(p => p.id !== id)
    saveProjects(next)
    setProjects(next)
    setSelected(null)
    showToast('Project deleted.')
  }

  const currentProject = selected === 'new' ? EMPTY_PROJECT : projects.find(p => p.id === selected)

  return (
    <div style={s.wrap}>
      <nav style={s.nav}>
        <Link to="/" style={s.navBack}
          onMouseEnter={e=>e.currentTarget.style.color='#fff'}
          onMouseLeave={e=>e.currentTarget.style.color='var(--g400)'}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
            <path d="M10 13L5 8l5-5"/>
          </svg>
          Portfolio
        </Link>
        <span style={s.navTitle}>Admin Dashboard</span>
        <span style={{fontSize:12,color:'var(--g600)'}}>{projects.length} projects</span>
      </nav>

      <div style={s.layout}>
        {/* Sidebar */}
        <aside style={s.sidebar}>
          <div style={s.sideHeader}>Projects</div>
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                ...s.sideItem,
                background: selected === p.id ? 'rgba(255,255,255,.06)' : 'transparent',
                borderColor: selected === p.id ? 'var(--border-h)' : 'transparent',
              }}
              onMouseEnter={e => { if (selected !== p.id) e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
              onMouseLeave={e => { if (selected !== p.id) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{overflow:'hidden'}}>
                <div style={s.sideItemTitle}>{p.title.split('—')[0].trim()}</div>
                <div style={s.sideItemSub}>{p.eyebrow}</div>
              </div>
              {selected === p.id && (
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',flexShrink:0}} />
              )}
            </div>
          ))}

          <button
            type="button"
            style={s.addBtn}
            onClick={() => setSelected('new')}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(46,202,139,.18)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--teal-dim)'}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{width:14,height:14}}>
              <path d="M8 3v10M3 8h10"/>
            </svg>
            Add New Project
          </button>
        </aside>

        {/* Main content */}
        <main style={s.main}>
          {!selected ? (
            <div style={s.empty}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" style={{width:48,height:48,color:'rgba(255,255,255,.1)'}}>
                <rect x="8" y="8" width="32" height="32" rx="4"/>
                <path d="M24 18v12M18 24h12"/>
              </svg>
              <p style={{fontSize:14,color:'var(--g600)'}}>Select a project to edit, or add a new one.</p>
            </div>
          ) : currentProject ? (
            <ProjectForm
              key={selected}
              project={currentProject}
              onSave={handleSave}
              onDelete={handleDelete}
              isNew={selected === 'new'}
            />
          ) : null}
        </main>
      </div>

      {toast && <div style={s.toast}>{toast}</div>}

      <style>{`
        select option { background: #1a1a1a; color: #fff; }
        input[type=checkbox] { accent-color: var(--teal); width:14px; height:14px; }
        @media(max-width:768px) {
          .admin-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
