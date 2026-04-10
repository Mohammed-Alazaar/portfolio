import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProjectById } from '../api'
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
  eyebrow: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:22 },
  h1: { fontSize:'clamp(38px,6.5vw,76px)',fontWeight:600,letterSpacing:'-.045em',lineHeight:1.05,color:'#fff',marginBottom:20,maxWidth:820,marginLeft:'auto',marginRight:'auto' },
  heroSub: { fontSize:'clamp(16px,1.8vw,19px)',color:'var(--g400)',maxWidth:510,margin:'0 auto 38px',lineHeight:1.62,fontWeight:300,letterSpacing:'-.02em' },
  tags: { display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center' },
  tag: { fontSize:12,color:'var(--g400)',background:'var(--surf)',border:'.5px solid var(--border)',padding:'5px 14px',borderRadius:980,letterSpacing:'-.01em',transition:'border-color .2s,color .2s' },
  sw: { borderTop:'.5px solid var(--border)' },
  sec: { maxWidth:960,margin:'0 auto',padding:'clamp(64px,8vw,96px) 24px' },
  lbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14 },
  sh: { fontSize:'clamp(26px,3.5vw,46px)',fontWeight:600,letterSpacing:'-.04em',lineHeight:1.1,color:'#fff',marginBottom:16 },
  sp: { fontSize:15,color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.015em',maxWidth:500 },
  tc: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'start' },
  card: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:18,padding:'28px 26px 30px',transition:'border-color .25s' },
  cardLbl: { fontSize:11,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:14 },
  chips: { display:'flex',flexWrap:'wrap',gap:6 },
  chip: { fontSize:11,color:'var(--g400)',background:'rgba(255,255,255,.04)',border:'.5px solid rgba(255,255,255,.09)',padding:'4px 11px',borderRadius:980,letterSpacing:'-.01em' },
  bl: { listStyle:'none',marginTop:22 },
  blItem: { fontSize:14,color:'var(--g400)',padding:'7px 0 7px 17px',position:'relative',lineHeight:1.62,borderBottom:'.5px solid rgba(255,255,255,.04)',letterSpacing:'-.01em' },
  fg: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 },
  fc: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:16,padding:'22px 20px',transition:'background .25s,border-color .25s' },
  fi: { width:30,height:30,borderRadius:8,background:'var(--teal-dim)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12 },
  story: { fontSize:'clamp(17px,1.9vw,21px)',color:'var(--g400)',lineHeight:1.78,letterSpacing:'-.025em',textAlign:'center',maxWidth:660,margin:'0 auto',fontWeight:300 },
  jw: { maxWidth:660,margin:'44px auto 0' },
  jt: { position:'relative',paddingLeft:26 },
  jl: { position:'absolute',left:7,top:10,bottom:10,width:1,background:'linear-gradient(to bottom,var(--teal) 0%,rgba(46,202,139,.08) 100%)' },
  ji: { position:'relative',marginBottom:22,display:'flex',gap:16,alignItems:'flex-start' },
  jn: { position:'absolute',left:-26,top:9,width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center' },
  jp: { fontSize:10,letterSpacing:'.1em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:7 },
  jb: { background:'var(--surf)',border:'.5px solid var(--border)',borderRadius:14,padding:'20px 22px',flex:1,transition:'border-color .25s' },
  jnum: { width:40,flexShrink:0,textAlign:'right',fontSize:11,color:'rgba(255,255,255,.12)',paddingTop:9,fontWeight:300 },
  sf: { marginTop:8 },
  browser: { background:'#0d0d0d',border:'.5px solid rgba(255,255,255,.1)',borderRadius:14,overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,.7)' },
  browserBar: { height:40,background:'#161616',display:'flex',alignItems:'center',padding:'0 16px',gap:10,borderBottom:'.5px solid rgba(255,255,255,.07)' },
  browserDots: { display:'flex',gap:6,flexShrink:0 },
  browserUrl: { flex:1,background:'rgba(255,255,255,.05)',borderRadius:6,height:24,display:'flex',alignItems:'center',padding:'0 10px',gap:6 },
  browserContent: { minHeight:360,position:'relative',overflow:'hidden' },
  ol: { listStyle:'none',marginTop:30 },
  olItem: { display:'flex',alignItems:'baseline',gap:14,fontSize:'clamp(15px,1.6vw,18px)',color:'var(--g400)',padding:'16px 0',borderBottom:'.5px solid rgba(255,255,255,.05)',lineHeight:1.55,letterSpacing:'-.02em',fontWeight:300,transition:'color .2s' },
  foot: { borderTop:'.5px solid var(--border)',padding:'28px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:960,margin:'0 auto' },
  fcopy: { fontSize:12,color:'var(--g600)',letterSpacing:'-.01em' },
  btt: { fontSize:12,color:'var(--g600)',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,letterSpacing:'-.01em',fontFamily:'var(--font)',transition:'color .2s' },
}

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const dotsRef = useRef(null)

  useEffect(() => {
    getProjectById(id)
      .then(setProject)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!project) return
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.13 }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    document.querySelectorAll('#hero .r').forEach((el) => el.classList.add('on'))

    const sids = ['hero','challenge','special','story','journey','showcase','outcome']
    const dots = document.querySelectorAll('.sd')
    const dobs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) dots.forEach(d => d.classList.toggle('on', d.dataset.s === e.target.id))
    }), { threshold: 0.35 })
    sids.forEach(sid => { const el = document.getElementById(sid); if (el) dobs.observe(el) })

    return () => { obs.disconnect(); dobs.disconnect() }
  }, [project])

  if (loading) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
        <p style={{color:'var(--g600)',fontSize:13,letterSpacing:'-.01em'}}>Loading…</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',gap:16}}>
        <p style={{color:'var(--g400)'}}>Project not found.</p>
        <Link to="/" style={{color:'var(--teal)',fontSize:14}}>← Back to portfolio</Link>
      </div>
    )
  }

  const p = project

  return (
    <>
      <div className="sdots" ref={dotsRef} style={{position:'fixed',right:18,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:6,zIndex:100}}>
        {['hero','challenge','special','story','journey','showcase','outcome'].map((sec, i) => (
          <a
            key={sec}
            className={`sd${i === 0 ? ' on' : ''}`}
            href={`#${sec}`}
            data-s={sec}
            onClick={e => { e.preventDefault(); document.getElementById(sec)?.scrollIntoView({behavior:'smooth'}) }}
            style={{
              width:5,height:5,borderRadius:3,background:'rgba(255,255,255,0.15)',
              cursor:'pointer',transition:'all .3s cubic-bezier(.25,.46,.45,.94)',display:'block',
            }}
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
        <div style={s.navMid}>Mohammed Alazaar — {p.title.split('—')[0].trim()}</div>
        <div style={s.navR}>MA</div>
      </nav>

      <section id="hero" style={s.hero}>
        <div style={s.heroBg} />
        <div className="r" style={s.eyebrow}>{p.eyebrow}</div>
        <h1 className="r d1" style={s.h1}>{p.title}</h1>
        <p className="r d2" style={s.heroSub}>{p.description}</p>
        <div className="r d3" style={s.tags}>
          {p.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}
        </div>
      </section>

      <div style={s.sw} id="challenge">
        <div style={s.sec}>
          <div style={s.tc}>
            <div className="r">
              <div style={s.lbl}>The challenge</div>
              <h2 style={s.sh}>{p.challenge.heading}</h2>
              <p style={s.sp}>{p.challenge.body}</p>
              <ul style={s.bl}>
                {p.challenge.bullets.map(b => (
                  <li key={b} style={s.blItem}>
                    <span style={{position:'absolute',left:0,top:16,width:7,height:1,background:'var(--teal)',display:'block'}} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="r d1">
              <div style={s.card}>
                <div style={s.cardLbl}>Technologies used</div>
                <div style={s.chips}>
                  {p.tags.map(t => <span key={t} style={s.chip}>{t}</span>)}
                </div>
              </div>
              {p.url && (
                <div style={{marginTop:12}}>
                  <a href={p.url} target="_blank" rel="noreferrer"
                    style={{fontSize:13,color:'var(--teal)',letterSpacing:'-.01em',display:'flex',alignItems:'center',gap:6}}
                  >
                    View Live Project →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={s.sw} id="special">
        <div style={s.sec}>
          <div style={s.tc}>
            <div className="r">
              <div style={s.lbl}>Key features</div>
              <h2 style={s.sh}>What Makes It Special</h2>
              <p style={s.sp}>Core functionality and standout capabilities.</p>
            </div>
            <div className="r d1" style={s.fg}>
              {p.features.map(f => (
                <div key={f.title} style={s.fc}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.borderColor='rgba(46,202,139,.2)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='var(--surf)'; e.currentTarget.style.borderColor='var(--border)' }}
                >
                  <div style={s.fi}><FeatureIcon type={f.icon} /></div>
                  <h4 style={{fontSize:14,fontWeight:500,color:'#fff',letterSpacing:'-.02em',marginBottom:5}}>{f.title}</h4>
                  <p style={{fontSize:12,color:'var(--g600)',lineHeight:1.6,letterSpacing:'-.01em'}}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={s.sw} id="story">
        <div style={{...s.sec,textAlign:'center'}}>
          <div className="r" style={s.lbl}>Full story</div>
          <h2 className="r d1" style={{...s.sh,marginLeft:'auto',marginRight:'auto'}}>The Full Story</h2>
          <p className="r d2" style={s.story} dangerouslySetInnerHTML={{__html: p.story}} />
        </div>
      </div>

      <div style={s.sw} id="journey">
        <div style={{...s.sec,textAlign:'center'}}>
          <div className="r" style={s.lbl}>Process</div>
          <h2 className="r d1" style={{...s.sh,marginLeft:'auto',marginRight:'auto'}}>The Journey</h2>
          <div style={s.jw}>
            <div style={s.jt}>
              <div style={s.jl} />
              {p.journey.map((step, i) => (
                <div key={i} className={`r d${i % 3}`} style={s.ji}>
                  <div style={s.jn}>
                    <div style={{width:8,height:8,borderRadius:'50%',border:'1.5px solid rgba(46,202,139,.5)',background: step.done ? 'var(--teal)' : '#000',borderColor: step.done ? 'var(--teal)' : 'rgba(46,202,139,.5)',transition:'background .2s,border-color .2s'}} />
                  </div>
                  <div style={s.jb}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(46,202,139,.18)'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}
                  >
                    <div style={s.jp}>{step.phase}</div>
                    <h4 style={{fontSize:14,fontWeight:500,color:'#fff',letterSpacing:'-.02em',marginBottom:5}}>{step.title}</h4>
                    <p style={{fontSize:12,color:'var(--g600)',lineHeight:1.65,letterSpacing:'-.01em'}}>{step.desc}</p>
                  </div>
                  <div style={s.jnum}>{String(i + 1).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={s.sw} id="showcase">
        <div style={{...s.sec,textAlign:'center'}}>
          <div className="r" style={s.lbl}>Visual showcase</div>
          <h2 className="r d1" style={{...s.sh,marginLeft:'auto',marginRight:'auto'}}>The Product</h2>

          <div className="r d2" style={s.sf}>
            {/* Browser mockup */}
            <div style={s.browser}>
              {/* Chrome bar */}
              <div style={s.browserBar}>
                <div style={s.browserDots}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} style={{width:12,height:12,borderRadius:'50%',background:c,opacity:.9}} />
                  ))}
                </div>
                <div style={s.browserUrl}>
                  <svg viewBox="0 0 12 12" fill="none" style={{width:10,height:10,flexShrink:0}}>
                    <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
                    <path d="M6 1.5v9M1.5 6h9M2.5 3.5C3.5 4.5 4.5 5 6 5s2.5-.5 3.5-1.5M2.5 8.5C3.5 7.5 4.5 7 6 7s2.5.5 3.5 1.5" stroke="rgba(255,255,255,.25)" strokeWidth=".8"/>
                  </svg>
                  <span style={{fontSize:11,color:'rgba(255,255,255,.3)',letterSpacing:'-.01em',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                    {p.url || `${p.brand.name.toLowerCase().replace(/\s/g,'-')}.app`}
                  </span>
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{flexShrink:0,fontSize:11,color:'var(--teal)',letterSpacing:'-.01em',display:'flex',alignItems:'center',gap:4,textDecoration:'none',padding:'4px 10px',background:'var(--teal-dim)',borderRadius:6,border:'.5px solid rgba(46,202,139,.25)'}}
                  >
                    Open ↗
                  </a>
                )}
              </div>

              {/* Content area */}
              <div style={s.browserContent}>
                {/* Gradient BG */}
                <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 40%,rgba(46,202,139,.07) 0%,transparent 60%)',pointerEvents:'none'}} />

                {/* Product card layout */}
                <div style={{padding:'40px 40px 48px',display:'flex',flexDirection:'column',gap:32}}>
                  {/* Header row */}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:14}}>
                      <div style={{width:44,height:44,background:'linear-gradient(135deg,var(--teal),rgba(46,202,139,.4))',borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#000',letterSpacing:'-.03em',flexShrink:0}}>
                        {p.brand.initials}
                      </div>
                      <div>
                        <div style={{fontSize:18,fontWeight:600,letterSpacing:'-.04em',color:'#fff'}}>{p.brand.name}</div>
                        <div style={{fontSize:11,color:'var(--g600)',marginTop:1}}>{p.brand.tagline}</div>
                      </div>
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{fontSize:13,fontWeight:500,color:'#000',background:'var(--teal)',padding:'9px 20px',borderRadius:10,textDecoration:'none',letterSpacing:'-.01em'}}
                      >
                        Launch →
                      </a>
                    )}
                  </div>

                  {/* Feature grid mini */}
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
                    {p.features.map((f, i) => (
                      <div key={i} style={{background:'rgba(255,255,255,.03)',border:'.5px solid rgba(255,255,255,.07)',borderRadius:12,padding:'16px 18px',textAlign:'left'}}>
                        <div style={{fontSize:11,letterSpacing:'.08em',color:'var(--teal)',textTransform:'uppercase',fontWeight:500,marginBottom:6}}>{f.title}</div>
                        <div style={{fontSize:12,color:'var(--g600)',lineHeight:1.55,letterSpacing:'-.01em'}}>{f.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack bar */}
                  <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',paddingTop:8,borderTop:'.5px solid rgba(255,255,255,.06)'}}>
                    <span style={{fontSize:11,color:'rgba(255,255,255,.2)',letterSpacing:'-.01em',marginRight:4}}>Built with</span>
                    {p.tags.slice(0,6).map(t => (
                      <span key={t} style={{fontSize:11,color:'var(--g600)',background:'rgba(255,255,255,.04)',border:'.5px solid rgba(255,255,255,.08)',padding:'3px 10px',borderRadius:980,letterSpacing:'-.01em'}}>{t}</span>
                    ))}
                    {p.tags.length > 6 && <span style={{fontSize:11,color:'rgba(255,255,255,.2)'}}>+{p.tags.length-6} more</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={s.sw} id="outcome">
        <div style={s.sec}>
          <div className="r">
            <div style={s.lbl}>Results</div>
            <h2 style={s.sh}>The Outcome</h2>
          </div>
          <ul style={s.ol}>
            {p.outcomes.map((o, i) => (
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
        @media(max-width:740px){ .sdots,.nav-mid{display:none} }
      `}</style>
    </>
  )
}
