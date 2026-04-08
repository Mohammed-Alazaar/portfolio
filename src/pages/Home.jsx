import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects } from '../data/projects'

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
  adminBtn: {
    fontSize:12,color:'var(--teal)',background:'var(--teal-dim)',
    border:'.5px solid rgba(46,202,139,.25)',padding:'5px 14px',borderRadius:980,
    cursor:'pointer',transition:'background .2s',
  },
  hero: {
    padding:'clamp(80px,10vw,130px) 24px clamp(60px,8vw,100px)',
    textAlign:'center',borderBottom:'.5px solid var(--border)',
    position:'relative',overflow:'hidden',
  },
  heroBg: {
    content:'',position:'absolute',width:700,height:500,borderRadius:'50%',
    background:'radial-gradient(ellipse,rgba(46,202,139,.055) 0%,transparent 68%)',
    top:-60,left:'50%',transform:'translateX(-50%)',pointerEvents:'none',
  },
  eyebrow: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:22 },
  h1: { fontSize:'clamp(38px,6.5vw,76px)',fontWeight:600,letterSpacing:'-.045em',lineHeight:1.05,color:'#fff',marginBottom:20,maxWidth:820,marginLeft:'auto',marginRight:'auto' },
  sub: { fontSize:'clamp(15px,1.6vw,18px)',color:'var(--g400)',maxWidth:520,margin:'0 auto 14px',lineHeight:1.68,fontWeight:300,letterSpacing:'-.02em' },
  contactRow: { display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:38,marginTop:8 },
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
  const projects = getProjects()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    document.querySelectorAll('.r-hero').forEach((el) => el.classList.add('on'))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <nav style={s.nav}>
        <span style={s.navName}>Mohammed Alazaar</span>
        <div style={s.navLinks}>
          <a href="mailto:mhmdalazr@gmail.com" style={s.navLink}>Contact</a>
          <a href="https://linkedin.com/in/mohammedalazaar" target="_blank" rel="noreferrer" style={s.navLink}>LinkedIn</a>
          <a href="https://github.com/mhmdalazr" target="_blank" rel="noreferrer" style={s.navLink}>GitHub</a>
          <Link to="/admin" style={s.adminBtn}>Admin</Link>
        </div>
      </nav>

      <section style={s.hero} id="hero">
        <div style={s.heroBg} />
        <div className="r-hero" style={s.eyebrow}>Growth · Full-Stack · Marketing</div>
        <h1 className="r-hero" style={s.h1}>Mohammed Alazaar</h1>
        <p className="r-hero" style={s.sub}>
          Growth & Marketing Manager and Full-Stack Developer bridging strategy with technical execution — from go-to-market to production-grade platforms.
        </p>
        <div className="r-hero" style={s.contactRow}>
          <a href="mailto:mhmdalazr@gmail.com" style={s.contactLink}>mhmdalazr@gmail.com</a>
          <span style={{color:'rgba(255,255,255,.12)'}}>·</span>
          <span style={s.contactLink}>Ankara, Türkiye</span>
          <span style={{color:'rgba(255,255,255,.12)'}}>·</span>
          <a href="https://linkedin.com/in/mohammedalazaar" target="_blank" rel="noreferrer" style={s.contactLink}>linkedin.com/in/mohammedalazaar</a>
        </div>
        <div className="r-hero" style={s.tags}>
          {['Go-To-Market','Full-Stack Dev','SEO Architecture','HubSpot','GA4 · GTM','Node.js','MongoDB','React','Figma'].map(t => (
            <span key={t} style={s.tag}>{t}</span>
          ))}
        </div>
      </section>

      <div style={{borderTop:'.5px solid var(--border)'}}>
        <div style={s.section}>
          <div className="r" style={s.lbl}>Selected Work</div>
          <h2 className="r d1" style={s.sh}>Projects</h2>
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
