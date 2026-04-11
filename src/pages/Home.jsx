import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, getExperiences } from '../api'

const s = {
  nav: {
    position:'sticky',top:0,zIndex:200,height:48,display:'flex',alignItems:'center',
    justifyContent:'space-between',padding:'0 22px',
    background:'rgba(0,0,0,0.75)',backdropFilter:'saturate(180%) blur(20px)',
    WebkitBackdropFilter:'saturate(180%) blur(20px)',
    borderBottom:'.5px solid var(--border)',
  },
  navName: { fontSize:14,fontWeight:500,letterSpacing:'-.02em',color:'#fff' },
  navLinks: { display:'flex',gap:24,alignItems:'center' },
  navLink: { fontSize:13,color:'var(--g400)',transition:'color .2s',cursor:'pointer' },
  hero: {
    borderBottom:'.5px solid var(--border)',
    position:'relative',overflow:'hidden',
  },
  heroInner: {
    maxWidth:760,margin:'0 auto',
    padding:'clamp(80px,10vw,130px) 24px clamp(64px,8vw,104px)',
    display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
  },
  heroBg: {
    content:'',position:'absolute',width:900,height:600,borderRadius:'50%',
    background:'radial-gradient(ellipse,rgba(46,202,139,.07) 0%,transparent 65%)',
    top:-100,left:'50%',transform:'translateX(-50%)',pointerEvents:'none',
  },
  heroLeft: { display:'flex',flexDirection:'column',alignItems:'center' },
  eyebrow: { fontSize:11,letterSpacing:'.14em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:22 },
  h1: { fontSize:'clamp(42px,7vw,88px)',fontWeight:600,letterSpacing:'-.05em',lineHeight:1.02,color:'#fff',marginBottom:22 },
  sub: { fontSize:'clamp(15px,1.6vw,18px)',color:'var(--g400)',maxWidth:580,marginBottom:16,lineHeight:1.75,fontWeight:300,letterSpacing:'-.02em' },
  contactRow: { display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',marginBottom:36,marginTop:8 },
  contactLink: { fontSize:12,color:'var(--g600)',letterSpacing:'-.01em',transition:'color .2s' },
  tags: { display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center' },
  tag: { fontSize:12,color:'var(--g400)',background:'var(--surf)',border:'.5px solid var(--border)',padding:'5px 14px',borderRadius:980,letterSpacing:'-.01em' },
  section: { maxWidth:1040,margin:'0 auto',padding:'clamp(56px,7vw,88px) 24px' },
  lbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14 },
  sh: { fontSize:'clamp(26px,3.5vw,40px)',fontWeight:600,letterSpacing:'-.04em',lineHeight:1.1,color:'#fff',marginBottom:36 },
  grid: { display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16 },
  card: {
    background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:18,
    padding:'28px 26px 30px',transition:'border-color .25s,background .25s',cursor:'pointer',
    display:'block',textDecoration:'none',color:'inherit',
  },
  cardEye: { fontSize:11,letterSpacing:'.08em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:10 },
  cardTitle: { fontSize:'clamp(17px,1.6vw,20px)',fontWeight:600,letterSpacing:'-.03em',color:'#fff',marginBottom:8,lineHeight:1.25 },
  cardDesc: { fontSize:13,color:'var(--g400)',lineHeight:1.7,letterSpacing:'-.01em',marginBottom:20 },
  chips: { display:'flex',flexWrap:'wrap',gap:6 },
  chip: { fontSize:11,color:'var(--g600)',background:'rgba(255,255,255,.04)',border:'.5px solid rgba(255,255,255,.09)',padding:'3px 10px',borderRadius:980,letterSpacing:'-.01em' },
  cardYear: { fontSize:11,color:'rgba(255,255,255,.2)',marginTop:16,letterSpacing:'-.01em' },
  expList: { display:'flex',flexDirection:'column',gap:0 },
  expItem: {
    display:'grid',gridTemplateColumns:'1fr auto',gap:24,alignItems:'start',
    padding:'28px 0',borderBottom:'.5px solid var(--border)',
  },
  expLeft: { display:'flex',flexDirection:'column',gap:10 },
  expMeta: { display:'flex',alignItems:'center',gap:10,flexWrap:'wrap' },
  expCo: { fontSize:15,fontWeight:600,letterSpacing:'-.03em',color:'#fff' },
  expDot: { width:3,height:3,borderRadius:'50%',background:'rgba(255,255,255,.2)',flexShrink:0 },
  expRole: { fontSize:13,color:'var(--teal)',letterSpacing:'-.01em',fontWeight:500 },
  expDesc: { fontSize:13,color:'var(--g400)',lineHeight:1.7,letterSpacing:'-.01em',maxWidth:580 },
  expTags: { display:'flex',flexWrap:'wrap',gap:5,marginTop:2 },
  expTag: { fontSize:11,color:'var(--g600)',background:'rgba(255,255,255,.04)',border:'.5px solid rgba(255,255,255,.07)',padding:'3px 9px',borderRadius:980,letterSpacing:'-.01em' },
  expPeriod: { fontSize:12,color:'var(--g600)',letterSpacing:'-.01em',whiteSpace:'nowrap',paddingTop:2 },
  expBadge: { display:'inline-flex',alignItems:'center',gap:5,fontSize:11,color:'var(--teal)',background:'var(--teal-dim)',border:'.5px solid rgba(46,202,139,.2)',padding:'3px 10px',borderRadius:980,letterSpacing:'-.01em' },
  aboutGrid: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'start' },
  skillCard: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:18,padding:'24px 22px' },
  skillLbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:12 },
  skillList: { listStyle:'none' },
  skillItem: { fontSize:13,color:'var(--g400)',padding:'5px 0 5px 16px',position:'relative',lineHeight:1.6,borderBottom:'.5px solid rgba(255,255,255,.04)',letterSpacing:'-.01em' },
  foot: { borderTop:'.5px solid var(--border)',padding:'28px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:1040,margin:'0 auto' },
  fcopy: { fontSize:12,color:'var(--g600)',letterSpacing:'-.01em' },
  btt: { fontSize:12,color:'var(--g600)',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,letterSpacing:'-.01em',transition:'color .2s' },
}

export default function Home() {
  const [projects, setProjects] = useState([])
  const [projError, setProjError] = useState(false)
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    getProjects().then(setProjects).catch(() => setProjError(true))
    getExperiences().then(setExperiences).catch(console.error)
  }, [])

  useEffect(() => {
    document.querySelectorAll('.r-hero').forEach((el) => el.classList.add('on'))
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [projects])

  return (
    <>
      <nav style={s.nav}>
        <span style={s.navName}>Mohammed Alazaar</span>
        <div style={s.navLinks}>
          <a href="mailto:mhmdalazr@gmail.com" style={s.navLink}>Contact</a>
          <a href="https://linkedin.com/in/mohammedalazaar" target="_blank" rel="noreferrer" style={s.navLink}>LinkedIn</a>
          <a href="https://github.com/mhmdalazr" target="_blank" rel="noreferrer" style={s.navLink}>GitHub</a>
        </div>
      </nav>

      <section style={s.hero} id="hero">
        <div style={s.heroBg} />
        <div style={s.heroInner}>
          <div style={s.heroLeft}>
            <div className="r-hero" style={s.eyebrow}>Growth · Full-Stack · Marketing</div>
            <h1 className="r-hero" style={s.h1}>Mohammed<br/>Alazaar</h1>
            <p className="r-hero" style={s.sub}>
              Growth & Marketing Manager and Full-Stack Developer bridging strategy with technical execution — from go-to-market to production-grade platforms.
            </p>
            <div className="r-hero" style={s.contactRow}>
              <a href="mailto:mhmdalazr@gmail.com" style={s.contactLink}>mhmdalazr@gmail.com</a>
              <span style={{color:'rgba(255,255,255,.12)'}}>·</span>
              <span style={s.contactLink}>Ankara, Türkiye</span>
              <span style={{color:'rgba(255,255,255,.12)'}}>·</span>
              <a href="https://linkedin.com/in/mohammedalazaar" target="_blank" rel="noreferrer" style={s.contactLink}>LinkedIn</a>
            </div>
            <div className="r-hero" style={s.tags}>
              {['Go-To-Market','Full-Stack Dev','SEO Architecture','HubSpot','GA4 · GTM','Node.js','MongoDB','React','Figma'].map(t => (
                <span key={t} style={s.tag}>{t}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={s.section}>
          <div className="r" style={s.lbl}>Selected Work</div>
          <h2 className="r d1" style={s.sh}>Projects</h2>
          {projError && (
            <div style={{fontSize:13,color:'#ff6b6b',background:'rgba(255,60,60,.07)',border:'.5px solid rgba(255,60,60,.15)',borderRadius:10,padding:'12px 18px',marginBottom:24,letterSpacing:'-.01em'}}>
              Could not connect to the server. Make sure the backend is running on port 3001.
            </div>
          )}
          <div style={s.grid}>
            {projects.map((p, i) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className={`r d${(i % 3) + 1}`}
                style={s.card}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-h)'; e.currentTarget.style.background='rgba(255,255,255,.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--surf)' }}
              >
                <div style={s.cardEye}>{p.eyebrow}</div>
                <div style={s.cardTitle}>{p.title}</div>
                <div style={s.cardDesc}>{p.description}</div>
                <div style={s.chips}>
                  {p.tags.slice(0, 4).map(t => <span key={t} style={s.chip}>{t}</span>)}
                  {p.tags.length > 4 && <span style={s.chip}>+{p.tags.length - 4}</span>}
                </div>
                <div style={s.cardYear}>{p.year}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={s.section}>
          <div className="r" style={s.lbl}>Experience</div>
          <h2 className="r d1" style={s.sh}>Work Experience</h2>
          <div style={s.expList}>
            {experiences.map((e, i) => (
              <Link
                key={e.id}
                to={`/experience/${e.id}`}
                className={`r d${(i % 2) + 1}`}
                style={{...s.expItem, textDecoration:'none', color:'inherit', display:'grid', cursor:'pointer'}}
                onMouseEnter={ev => ev.currentTarget.style.background='rgba(255,255,255,.02)'}
                onMouseLeave={ev => ev.currentTarget.style.background='transparent'}
              >
                <div style={s.expLeft}>
                  <div style={s.expMeta}>
                    <span style={s.expCo}>{e.company}</span>
                    <span style={s.expDot} />
                    <span style={s.expRole}>{e.role}</span>
                    {e.current && (
                      <span style={s.expBadge}>
                        <span style={{width:5,height:5,borderRadius:'50%',background:'var(--teal)',display:'block',flexShrink:0}} />
                        Current
                      </span>
                    )}
                  </div>
                  <p style={s.expDesc}>{e.description}</p>
                  <div style={s.expTags}>
                    {e.tags.slice(0, 6).map(t => (
                      <span key={t} style={s.expTag}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,paddingTop:2}}>
                  <span style={s.expPeriod}>{e.period}</span>
                  <span style={{fontSize:12,color:'var(--teal)',letterSpacing:'-.01em'}}>View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={s.section}>
          <div className="r" style={s.lbl}>About</div>
          <div style={{...s.aboutGrid, display:'grid'}}>
            <div className="r d1">
              <h2 style={{...s.sh, marginBottom:16}}>Growth strategy meets engineering execution.</h2>
              <p style={{fontSize:15,color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.015em',marginBottom:16}}>
                Software Engineering graduate from Üsküdar University with hands-on experience across B2C SaaS, B2B enterprise, and legal technology environments.
              </p>
              <p style={{fontSize:15,color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.015em'}}>
                I build scalable marketing systems and production platforms from zero to execution — bridging campaign strategy, technical SEO, and full-stack development in one role.
              </p>
            </div>
            <div className="r d2" style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={s.skillCard}>
                <div style={s.skillLbl}>Marketing & Growth</div>
                <ul style={s.skillList}>
                  {['GTM Strategy','B2B & B2C Campaigns','HubSpot CRM & Automation','Funnel Optimization & CRO','Email Marketing & A/B Testing'].map(sk => (
                    <li key={sk} style={s.skillItem}>
                      <span style={{position:'absolute',left:0,top:13,width:7,height:1,background:'var(--teal)',display:'block'}} />
                      {sk}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={s.skillCard}>
                <div style={s.skillLbl}>Development</div>
                <ul style={s.skillList}>
                  {['Node.js · Express · MongoDB','React · JavaScript · HTML/CSS','REST APIs · Cloudinary','GA4 · GTM · Google Ads','Technical SEO · JSON-LD'].map(sk => (
                    <li key={sk} style={s.skillItem}>
                      <span style={{position:'absolute',left:0,top:13,width:7,height:1,background:'var(--teal)',display:'block'}} />
                      {sk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={{...s.foot}}>
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
        @media(max-width:740px){
          .about-grid { grid-template-columns:1fr !important; }
        }
        .r-hero { opacity:0; transform:translateY(24px); transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94); }
        .r-hero.on { opacity:1; transform:none; }
      `}</style>
    </>
  )
}
