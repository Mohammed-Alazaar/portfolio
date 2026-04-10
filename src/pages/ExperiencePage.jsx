import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getExperienceById } from '../api'
import FeatureIcon from '../components/FeatureIcon'

const s = {
  nav: {
    position:'sticky',top:0,zIndex:200,height:48,display:'flex',alignItems:'center',
    justifyContent:'space-between',padding:'0 22px',
    background:'rgba(0,0,0,0.75)',backdropFilter:'saturate(180%) blur(20px)',
    WebkitBackdropFilter:'saturate(180%) blur(20px)',
    borderBottom:'.5px solid var(--border)',
  },
  navBack: { display:'flex',alignItems:'center',gap:5,fontSize:14,color:'var(--g400)',textDecoration:'none',letterSpacing:'-.01em',transition:'color .2s' },
  navMid: { position:'absolute',left:'50%',transform:'translateX(-50%)',fontSize:12,color:'var(--g600)',letterSpacing:'-.01em',whiteSpace:'nowrap' },
  navR: { fontSize:12,color:'var(--g600)' },
  hero: { padding:'clamp(80px,10vw,140px) 24px clamp(90px,11vw,150px)',textAlign:'center',borderBottom:'.5px solid var(--border)',position:'relative',overflow:'hidden' },
  heroBg: { position:'absolute',width:700,height:500,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(46,202,139,.055) 0%,transparent 68%)',top:-60,left:'50%',transform:'translateX(-50%)',pointerEvents:'none' },
  eyebrow: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:18 },
  h1: { fontSize:'clamp(32px,5.5vw,66px)',fontWeight:600,letterSpacing:'-.045em',lineHeight:1.05,color:'#fff',marginBottom:12,maxWidth:820,marginLeft:'auto',marginRight:'auto' },
  heroRole: { fontSize:'clamp(15px,1.6vw,18px)',color:'var(--teal)',fontWeight:400,letterSpacing:'-.02em',marginBottom:20 },
  heroPeriod: { display:'inline-flex',alignItems:'center',gap:8,fontSize:13,color:'var(--g600)',letterSpacing:'-.01em',marginBottom:28 },
  tags: { display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center' },
  tag: { fontSize:12,color:'var(--g400)',background:'var(--surf)',border:'.5px solid var(--border)',padding:'5px 14px',borderRadius:980,letterSpacing:'-.01em' },
  sw: { borderTop:'.5px solid var(--border)' },
  sec: { maxWidth:960,margin:'0 auto',padding:'clamp(64px,8vw,96px) 24px' },
  lbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14 },
  sh: { fontSize:'clamp(26px,3.5vw,46px)',fontWeight:600,letterSpacing:'-.04em',lineHeight:1.1,color:'#fff',marginBottom:16 },
  sp: { fontSize:15,color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.015em',maxWidth:500 },
  tc: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'start' },
  card: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:18,padding:'28px 26px 30px' },
  cardLbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14 },
  chips: { display:'flex',flexWrap:'wrap',gap:6 },
  chip: { fontSize:11,color:'var(--g400)',background:'rgba(255,255,255,.04)',border:'.5px solid rgba(255,255,255,.09)',padding:'4px 11px',borderRadius:980,letterSpacing:'-.01em' },
  bl: { listStyle:'none',marginTop:16 },
  blItem: { fontSize:14,color:'var(--g400)',padding:'9px 0 9px 17px',position:'relative',lineHeight:1.62,borderBottom:'.5px solid rgba(255,255,255,.04)',letterSpacing:'-.01em' },
  fg: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 },
  fc: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:16,padding:'22px 20px',transition:'background .25s,border-color .25s' },
  fi: { width:30,height:30,borderRadius:8,background:'var(--teal-dim)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12 },
  story: { fontSize:'clamp(17px,1.9vw,21px)',color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.025em',textAlign:'center',maxWidth:660,margin:'0 auto',fontWeight:300 },
  respList: { listStyle:'none',maxWidth:720,margin:'32px auto 0' },
  respItem: { display:'flex',alignItems:'baseline',gap:14,fontSize:15,color:'var(--g400)',padding:'14px 0',borderBottom:'.5px solid rgba(255,255,255,.05)',lineHeight:1.6,letterSpacing:'-.02em' },
  ol: { listStyle:'none',marginTop:30 },
  olItem: { display:'flex',alignItems:'baseline',gap:14,fontSize:'clamp(15px,1.6vw,18px)',color:'var(--g400)',padding:'16px 0',borderBottom:'.5px solid rgba(255,255,255,.05)',lineHeight:1.55,letterSpacing:'-.02em',fontWeight:300,transition:'color .2s' },
  foot: { borderTop:'.5px solid var(--border)',padding:'28px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:960,margin:'0 auto' },
  fcopy: { fontSize:12,color:'var(--g600)',letterSpacing:'-.01em' },
  btt: { fontSize:12,color:'var(--g600)',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,letterSpacing:'-.01em',fontFamily:'var(--font)',transition:'color .2s' },
}

export default function ExperiencePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [exp, setExp] = useState(null)
  const [loading, setLoading] = useState(true)
  const dotsRef = useRef(null)

  useEffect(() => {
    getExperienceById(id)
      .then(setExp)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!exp) return
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.13 }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    document.querySelectorAll('#ehero .r').forEach((el) => el.classList.add('on'))

    const sids = ['ehero','eabout','econtrib','estory','eresp','eoutcome']
    const dots = document.querySelectorAll('.sd')
    const dobs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) dots.forEach(d => d.classList.toggle('on', d.dataset.s === e.target.id))
    }), { threshold: 0.35 })
    sids.forEach(sid => { const el = document.getElementById(sid); if (el) dobs.observe(el) })

    return () => { obs.disconnect(); dobs.disconnect() }
  }, [exp])

  if (loading) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
        <p style={{color:'var(--g600)',fontSize:13,letterSpacing:'-.01em'}}>Loading…</p>
      </div>
    )
  }

  if (!exp) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',gap:16}}>
        <p style={{color:'var(--g400)'}}>Experience not found.</p>
        <Link to="/" style={{color:'var(--teal)',fontSize:14}}>← Back to portfolio</Link>
      </div>
    )
  }

  return (
    <>
      {/* Side dots */}
      <div className="sdots" ref={dotsRef} style={{position:'fixed',right:18,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:6,zIndex:100}}>
        {['ehero','eabout','econtrib','estory','eresp','eoutcome'].map((sec, i) => (
          <a
            key={sec}
            className={`sd${i === 0 ? ' on' : ''}`}
            href={`#${sec}`}
            data-s={sec}
            onClick={e => { e.preventDefault(); document.getElementById(sec)?.scrollIntoView({behavior:'smooth'}) }}
            style={{width:5,height:5,borderRadius:3,background:'rgba(255,255,255,0.15)',cursor:'pointer',transition:'all .3s cubic-bezier(.25,.46,.45,.94)',display:'block'}}
          />
        ))}
      </div>

      <nav style={s.nav}>
        <Link to="/" style={s.navBack}
          onMouseEnter={e=>e.currentTarget.style.color='#fff'}
          onMouseLeave={e=>e.currentTarget.style.color='var(--g400)'}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16,flexShrink:0}}>
            <path d="M10 13L5 8l5-5"/>
          </svg>
          Back
        </Link>
        <div style={s.navMid}>Mohammed Alazaar — {exp.company}</div>
        <div style={s.navR}>MA</div>
      </nav>

      {/* Hero */}
      <section id="ehero" style={s.hero}>
        <div style={s.heroBg} />
        <div className="r" style={s.eyebrow}>{exp.eyebrow}</div>
        <h1 className="r d1" style={s.h1}>{exp.headline}</h1>
        <div className="r d2" style={s.heroRole}>{exp.role} · {exp.company}</div>
        <div className="r d3" style={s.heroPeriod}>
          {exp.current && (
            <span style={{display:'inline-flex',alignItems:'center',gap:5,color:'var(--teal)'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',display:'block'}} />
              Current
            </span>
          )}
          {exp.current && <span style={{color:'rgba(255,255,255,.1)'}}>·</span>}
          {exp.period}
          {exp.location && <><span style={{color:'rgba(255,255,255,.1)'}}>·</span>{exp.location}</>}
        </div>
        <div className="r d4" style={s.tags}>
          {exp.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}
        </div>
      </section>

      {/* About */}
      <div style={s.sw} id="eabout">
        <div style={s.sec}>
          <div style={s.tc}>
            <div className="r">
              <div style={s.lbl}>About</div>
              <h2 style={s.sh}>The Company</h2>
              <p style={s.sp}>{exp.about}</p>
              {exp.brand?.url && (
                <a href={exp.brand.url} target="_blank" rel="noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:13,color:'var(--teal)',marginTop:18,letterSpacing:'-.01em'}}>
                  Visit {exp.company} →
                </a>
              )}
            </div>
            <div className="r d1">
              <div style={s.card}>
                <div style={s.cardLbl}>Skills & Tools</div>
                <div style={s.chips}>
                  {exp.tags.map(t => <span key={t} style={s.chip}>{t}</span>)}
                </div>
              </div>
              <div style={{...s.card, marginTop:12}}>
                <div style={s.cardLbl}>Position</div>
                <div style={{fontSize:14,color:'#fff',fontWeight:500,letterSpacing:'-.02em',marginBottom:6}}>{exp.role}</div>
                <div style={{fontSize:12,color:'var(--g600)',letterSpacing:'-.01em'}}>{exp.period} · {exp.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Contributions */}
      <div style={s.sw} id="econtrib">
        <div style={s.sec}>
          <div style={s.tc}>
            <div className="r">
              <div style={s.lbl}>Key Contributions</div>
              <h2 style={s.sh}>What I Built</h2>
              <p style={s.sp}>Core areas of ownership and impact during this role.</p>
            </div>
            <div className="r d1" style={s.fg}>
              {exp.contributions.map(c => (
                <div key={c.title} style={s.fc}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.borderColor='rgba(46,202,139,.2)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='var(--surf)'; e.currentTarget.style.borderColor='var(--border)' }}
                >
                  <div style={s.fi}><FeatureIcon type={c.icon} /></div>
                  <h4 style={{fontSize:14,fontWeight:500,color:'#fff',letterSpacing:'-.02em',marginBottom:5}}>{c.title}</h4>
                  <p style={{fontSize:12,color:'var(--g600)',lineHeight:1.6,letterSpacing:'-.01em'}}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={s.sw} id="estory">
        <div style={{...s.sec,textAlign:'center'}}>
          <div className="r" style={s.lbl}>Full Story</div>
          <h2 className="r d1" style={{...s.sh,marginLeft:'auto',marginRight:'auto'}}>The Full Story</h2>
          <p className="r d2" style={s.story} dangerouslySetInnerHTML={{__html: exp.story}} />
        </div>
      </div>

      {/* Responsibilities */}
      <div style={s.sw} id="eresp">
        <div style={{...s.sec,textAlign:'center'}}>
          <div className="r" style={s.lbl}>Day to Day</div>
          <h2 className="r d1" style={{...s.sh,marginLeft:'auto',marginRight:'auto'}}>Responsibilities</h2>
          <ul style={s.respList}>
            {exp.responsibilities.map((r, i) => (
              <li key={i} className={`r d${i % 3 + 1}`} style={s.respItem}>
                <span style={{flexShrink:0,width:6,height:6,borderRadius:'50%',background:'var(--teal)',position:'relative',top:1,display:'block'}} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Outcomes */}
      <div style={s.sw} id="eoutcome">
        <div style={s.sec}>
          <div className="r">
            <div style={s.lbl}>Results</div>
            <h2 style={s.sh}>The Outcome</h2>
          </div>
          <ul style={s.ol}>
            {exp.outcomes.map((o, i) => (
              <li key={i} className={`r d${i % 3 + 1}`} style={s.olItem}
                onMouseEnter={e=>e.currentTarget.style.color='#ccc'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--g400)'}
              >
                <span style={{flexShrink:0,width:6,height:6,borderRadius:'50%',background:'var(--teal)',position:'relative',top:-1,display:'block'}} />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={s.foot}>
          <span style={s.fcopy}>© 2026 Mohammed Alazaar</span>
          <button style={s.btt} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
            onMouseEnter={e=>e.currentTarget.style.color='#fff'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--g600)'}
          >
            Back to top
            <svg viewBox="0 0 12 12" style={{width:11,height:11,stroke:'currentColor',fill:'none',strokeWidth:1.6,strokeLinecap:'round'}}>
              <path d="M6 10V2M2 6l4-4 4 4"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .sd { width:5px !important; height:5px !important; background:rgba(255,255,255,0.15) !important; }
        .sd.on { background:var(--teal) !important; height:18px !important; }
        .sd:hover:not(.on) { background:rgba(255,255,255,.4) !important; }
        @media(max-width:740px){ .sdots { display:none } }
        @media(max-width:680px){ .exp-tc { grid-template-columns:1fr !important } }
      `}</style>
    </>
  )
}
