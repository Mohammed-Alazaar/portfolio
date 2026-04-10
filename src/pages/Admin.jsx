import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, createProject, updateProject, deleteProject, login, verifyToken, getExperiences, createExperience, updateExperience, deleteExperience } from '../api'

const EMPTY_PROJECT = {
  id: '', title: '', subtitle: '', eyebrow: '', description: '', url: '', year: '',
  tags: [], challenge: { heading: 'The Challenge', body: '', bullets: [] },
  features: [], story: '', journey: [], outcomes: [],
  brand: { name: '', initials: '', tagline: '' },
}

const EMPTY_EXPERIENCE = {
  id: '', company: '', role: '', period: '', current: false, location: '',
  eyebrow: '', headline: '', description: '', about: '', story: '',
  tags: [], responsibilities: [], contributions: [], outcomes: [],
  brand: { name: '', initials: '', tagline: '', url: '' },
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

function ProjectForm({ project, onSave, onDelete, isNew, saving }) {
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
        <button type="submit" style={{...s.saveBtn, opacity: saving ? .6 : 1}} disabled={saving}
          onMouseEnter={e=>{ if (!saving) e.currentTarget.style.opacity='.85' }}
          onMouseLeave={e=>{ if (!saving) e.currentTarget.style.opacity='1' }}
        >
          {saving ? 'Saving…' : isNew ? 'Add Project' : 'Save Changes'}
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

function ExperienceForm({ experience, onSave, onDelete, isNew, saving }) {
  const [form, setForm] = useState(() => JSON.parse(JSON.stringify(experience)))
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
    if (!form.id.trim()) { alert('ID is required'); return }
    if (!form.company.trim()) { alert('Company is required'); return }
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={s.formTitle}>{isNew ? 'Add Experience' : 'Edit Experience'}</div>
      <div style={s.formSub}>{isNew ? 'Add a work experience entry.' : `Editing: ${form.company} — ${form.role}`}</div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Basic Info</div>
        <div style={s.grid2}>
          <Field label="ID (URL slug)" value={form.id} onChange={v => set('id', v.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''))} placeholder="e.g. draglab" />
          <Field label="Period" value={form.period} onChange={v => set('period', v)} placeholder="e.g. 2024 – Present" />
        </div>
        <div style={s.grid2}>
          <Field label="Company" value={form.company} onChange={v => set('company', v)} placeholder="Company name" />
          <Field label="Role / Title" value={form.role} onChange={v => set('role', v)} placeholder="e.g. Full-Stack Developer" />
        </div>
        <div style={s.grid2}>
          <Field label="Location" value={form.location} onChange={v => set('location', v)} placeholder="e.g. Remote · Helsinki" />
          <Field label="Eyebrow" value={form.eyebrow} onChange={v => set('eyebrow', v)} placeholder="e.g. AI Legal Tech · Finland" />
        </div>
        <div style={{...s.field,flexDirection:'row',alignItems:'center',gap:10}}>
          <input type="checkbox" checked={form.current} onChange={e => set('current', e.target.checked)} id="exp-current" />
          <label htmlFor="exp-current" style={{fontSize:13,color:'var(--g400)',cursor:'pointer'}}>Currently working here</label>
        </div>
        <Field label="Headline (detail page h1)" value={form.headline} onChange={v => set('headline', v)} placeholder="e.g. Building a platform from scratch" />
        <TextArea label="Short Description (home page)" value={form.description} onChange={v => set('description', v)} rows={2} placeholder="1–2 sentence summary shown on homepage" />
        <TextArea label="About the Company" value={form.about} onChange={v => set('about', v)} rows={3} placeholder="What does the company do?" />
        <TagsField tags={form.tags} onChange={v => set('tags', v)} />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Brand</div>
        <div style={s.grid2}>
          <Field label="Brand Name" value={form.brand.name} onChange={v => set('brand.name', v)} placeholder="CompanyName" />
          <Field label="Initials" value={form.brand.initials} onChange={v => set('brand.initials', v)} placeholder="CN" />
        </div>
        <div style={s.grid2}>
          <Field label="Tagline" value={form.brand.tagline} onChange={v => set('brand.tagline', v)} placeholder="Short tagline" />
          <Field label="Website URL" value={form.brand.url} onChange={v => set('brand.url', v)} placeholder="https://company.com" />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Key Contributions</div>
        {form.contributions.map((c, i) => (
          <div key={i} style={{background:'rgba(255,255,255,.02)',border:'.5px solid var(--border)',borderRadius:12,padding:'16px',marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:12,color:'var(--g600)'}}>Contribution {i + 1}</span>
              <button type="button" style={s.removeBtn} onClick={() => set('contributions', form.contributions.filter((_,j)=>j!==i))}>×</button>
            </div>
            <div style={s.grid2}>
              <div style={s.field}>
                <label style={s.label}>Icon</label>
                <select value={c.icon} onChange={e => { const n=[...form.contributions]; n[i]={...n[i],icon:e.target.value}; set('contributions',n) }} style={{...s.input,cursor:'pointer'}}>
                  {['grid','globe','shield','chart','cube','cart','users','rocket','brand','mail','search'].map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <Field label="Title" value={c.title} onChange={v => { const n=[...form.contributions]; n[i]={...n[i],title:v}; set('contributions',n) }} placeholder="Contribution title" />
            </div>
            <TextArea label="Description" value={c.desc} onChange={v => { const n=[...form.contributions]; n[i]={...n[i],desc:v}; set('contributions',n) }} rows={2} placeholder="Short description" />
          </div>
        ))}
        <button type="button" style={s.addItemBtn} onClick={() => set('contributions', [...form.contributions, {icon:'grid',title:'',desc:''}])}>+ Add Contribution</button>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Full Story</div>
        <TextArea label="Story (supports <em>text</em>)" value={form.story} onChange={v => set('story', v)} rows={6} placeholder="Full narrative. Wrap key phrases in <em>...</em> for teal emphasis." />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Responsibilities</div>
        <BulletsField label="Day-to-day responsibilities" items={form.responsibilities} onChange={v => set('responsibilities', v)} placeholder="A specific responsibility" />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Outcomes</div>
        <BulletsField label="Key results / outcomes" items={form.outcomes} onChange={v => set('outcomes', v)} placeholder="A measurable or meaningful outcome" />
      </div>

      <div style={s.actionsRow}>
        <button type="submit" style={{...s.saveBtn, opacity: saving ? .6 : 1}} disabled={saving}>
          {saving ? 'Saving…' : isNew ? 'Add Experience' : 'Save Changes'}
        </button>
        {!isNew && (
          <Link to={`/experience/${form.id}`} target="_blank" style={s.previewBtn}>Preview ↗</Link>
        )}
        {!isNew && (
          <button type="button" style={s.deleteBtn} onClick={() => onDelete(form.id)}>Delete</button>
        )}
      </div>
    </form>
  )
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await login(username, password)
      localStorage.setItem('admin_token', token)
      onLogin()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font)'}}>
      <div style={{width:'100%',maxWidth:380,padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{fontSize:11,letterSpacing:'.12em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14}}>Portfolio Admin</div>
          <h1 style={{fontSize:28,fontWeight:600,letterSpacing:'-.045em',color:'#fff',marginBottom:8}}>Sign in</h1>
          <p style={{fontSize:13,color:'var(--g600)'}}>Access restricted to authorized users only.</p>
        </div>

        <form onSubmit={handleSubmit} style={{background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:18,padding:'32px 28px',display:'flex',flexDirection:'column',gap:16}}>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontSize:11,letterSpacing:'.08em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500}}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              required
              style={{background:'rgba(255,255,255,.04)',border:'.5px solid var(--border)',borderRadius:10,padding:'11px 14px',fontSize:14,color:'#fff',fontFamily:'var(--font)',outline:'none'}}
              onFocus={e=>e.target.style.borderColor='rgba(46,202,139,.4)'}
              onBlur={e=>e.target.style.borderColor='var(--border)'}
            />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontSize:11,letterSpacing:'.08em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500}}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              style={{background:'rgba(255,255,255,.04)',border:'.5px solid var(--border)',borderRadius:10,padding:'11px 14px',fontSize:14,color:'#fff',fontFamily:'var(--font)',outline:'none'}}
              onFocus={e=>e.target.style.borderColor='rgba(46,202,139,.4)'}
              onBlur={e=>e.target.style.borderColor='var(--border)'}
            />
          </div>

          {error && (
            <div style={{fontSize:12,color:'#ff6b6b',background:'rgba(255,60,60,.08)',border:'.5px solid rgba(255,60,60,.2)',borderRadius:8,padding:'10px 14px'}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{marginTop:4,padding:'12px',background:'var(--teal)',border:'none',borderRadius:10,fontSize:14,fontWeight:600,color:'#000',cursor:loading?'not-allowed':'pointer',opacity:loading?.7:1,letterSpacing:'-.01em',transition:'opacity .2s'}}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{textAlign:'center',marginTop:20,fontSize:12,color:'rgba(255,255,255,.1)'}}>
          Portfolio · Mohammed Alazaar
        </p>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [tab, setTab] = useState('projects') // 'projects' | 'experience'
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    verifyToken()
      .then(({ valid }) => { if (valid) setAuthed(true) })
      .catch(() => {})
      .finally(() => setAuthChecking(false))
  }, [])

  useEffect(() => {
    if (!authed) return
    getProjects().then(setProjects).catch(console.error)
    getExperiences().then(setExperiences).catch(console.error)
  }, [authed])

  const handleLogin = () => setAuthed(true)

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAuthed(false)
    setProjects([])
    setSelected(null)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleSave = async (updated) => {
    setSaving(true)
    try {
      if (tab === 'projects') {
        if (selected === 'new') {
          const created = await createProject(updated)
          setProjects(prev => [...prev, created])
          setSelected(created.id)
          showToast('Project added!')
        } else {
          const saved = await updateProject(selected, updated)
          setProjects(prev => prev.map(p => p.id === selected ? saved : p))
          setSelected(saved.id)
          showToast('Changes saved!')
        }
      } else {
        if (selected === 'new') {
          const created = await createExperience(updated)
          setExperiences(prev => [...prev, created])
          setSelected(created.id)
          showToast('Experience added!')
        } else {
          const saved = await updateExperience(selected, updated)
          setExperiences(prev => prev.map(e => e.id === selected ? saved : e))
          setSelected(saved.id)
          showToast('Changes saved!')
        }
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return
    try {
      if (tab === 'projects') {
        await deleteProject(id)
        setProjects(prev => prev.filter(p => p.id !== id))
      } else {
        await deleteExperience(id)
        setExperiences(prev => prev.filter(e => e.id !== id))
      }
      setSelected(null)
      showToast('Deleted.')
    } catch (err) {
      alert(err.message)
    }
  }

  if (authChecking) {
    return (
      <div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{color:'var(--g600)',fontSize:13}}>Checking session…</p>
      </div>
    )
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  const currentProject = selected === 'new' ? EMPTY_PROJECT : projects.find(p => p.id === selected)
  const currentExperience = selected === 'new' ? EMPTY_EXPERIENCE : experiences.find(e => e.id === selected)

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
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <span style={{fontSize:12,color:'var(--g600)'}}>{projects.length} projects · {experiences.length} exp</span>
          <button
            onClick={handleLogout}
            style={{fontSize:12,color:'var(--g600)',background:'none',border:'.5px solid var(--border)',borderRadius:8,padding:'4px 12px',cursor:'pointer',transition:'color .2s,border-color .2s',fontFamily:'var(--font)'}}
            onMouseEnter={e=>{e.currentTarget.style.color='#ff6b6b';e.currentTarget.style.borderColor='rgba(255,60,60,.3)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='var(--g600)';e.currentTarget.style.borderColor='var(--border)'}}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div style={s.layout}>
        <aside style={s.sidebar}>
          {/* Tab switcher */}
          <div style={{display:'flex',gap:4,marginBottom:16,background:'rgba(255,255,255,.04)',borderRadius:10,padding:4}}>
            {['projects','experience'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setSelected(null) }}
                style={{flex:1,padding:'6px 0',borderRadius:7,border:'none',cursor:'pointer',fontSize:12,fontWeight:500,letterSpacing:'-.01em',fontFamily:'var(--font)',transition:'background .2s, color .2s',
                  background: tab === t ? 'rgba(255,255,255,.1)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--g600)',
                }}
              >
                {t === 'projects' ? 'Projects' : 'Experience'}
              </button>
            ))}
          </div>

          <div style={s.sideHeader}>{tab === 'projects' ? 'Projects' : 'Experience'}</div>

          {tab === 'projects' && projects.map(p => (
            <div key={p.id} onClick={() => setSelected(p.id)}
              style={{...s.sideItem, background: selected===p.id?'rgba(255,255,255,.06)':'transparent', borderColor: selected===p.id?'var(--border-h)':'transparent'}}
              onMouseEnter={e => { if (selected!==p.id) e.currentTarget.style.background='rgba(255,255,255,.03)' }}
              onMouseLeave={e => { if (selected!==p.id) e.currentTarget.style.background='transparent' }}
            >
              <div style={{overflow:'hidden'}}>
                <div style={s.sideItemTitle}>{p.title.split('—')[0].trim()}</div>
                <div style={s.sideItemSub}>{p.eyebrow}</div>
              </div>
              {selected===p.id && <div style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',flexShrink:0}} />}
            </div>
          ))}

          {tab === 'experience' && experiences.map(e => (
            <div key={e.id} onClick={() => setSelected(e.id)}
              style={{...s.sideItem, background: selected===e.id?'rgba(255,255,255,.06)':'transparent', borderColor: selected===e.id?'var(--border-h)':'transparent'}}
              onMouseEnter={ev => { if (selected!==e.id) ev.currentTarget.style.background='rgba(255,255,255,.03)' }}
              onMouseLeave={ev => { if (selected!==e.id) ev.currentTarget.style.background='transparent' }}
            >
              <div style={{overflow:'hidden'}}>
                <div style={s.sideItemTitle}>{e.company}</div>
                <div style={s.sideItemSub}>{e.role}</div>
              </div>
              {selected===e.id && <div style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',flexShrink:0}} />}
            </div>
          ))}

          <button type="button" style={s.addBtn} onClick={() => setSelected('new')}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(46,202,139,.18)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--teal-dim)'}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{width:14,height:14}}>
              <path d="M8 3v10M3 8h10"/>
            </svg>
            Add {tab === 'projects' ? 'Project' : 'Experience'}
          </button>
        </aside>

        <main style={s.main}>
          {!selected ? (
            <div style={s.empty}>
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" style={{width:48,height:48,color:'rgba(255,255,255,.1)'}}>
                <rect x="8" y="8" width="32" height="32" rx="4"/>
                <path d="M24 18v12M18 24h12"/>
              </svg>
              <p style={{fontSize:14,color:'var(--g600)'}}>Select an entry to edit, or add a new one.</p>
            </div>
          ) : tab === 'projects' && currentProject ? (
            <ProjectForm key={selected} project={currentProject} onSave={handleSave} onDelete={handleDelete} isNew={selected==='new'} saving={saving} />
          ) : tab === 'experience' && currentExperience ? (
            <ExperienceForm key={selected} experience={currentExperience} onSave={handleSave} onDelete={handleDelete} isNew={selected==='new'} saving={saving} />
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
