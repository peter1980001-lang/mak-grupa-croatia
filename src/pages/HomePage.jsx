// src/pages/HomePage.jsx
import SmoothScroll      from '../components/SmoothScroll'
import HeroScroll        from '../components/HeroScroll'
import AquaCityIntro     from '../components/AquaCityIntro'
import AquaCityProblem   from '../components/AquaCityProblem'
import AquaCityLocation  from '../components/AquaCityLocation'
import AquaCityVision    from '../components/AquaCityVision'
import AquaCityPhase1    from '../components/AquaCityPhase1'
import AquaCityPhase2    from '../components/AquaCityPhase2'
import AquaCityPhase3    from '../components/AquaCityPhase3'
import AquaCityPhase4    from '../components/AquaCityPhase4'
import AquaCityPhase5    from '../components/AquaCityPhase5'
import StaticSlide       from '../components/StaticSlide'
import GlassBox          from '../components/GlassBox'

// ─── shared text styles ──────────────────────────────────────────────────────
const label = {
  color: '#c9a84c', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
  fontFamily: 'system-ui, sans-serif', fontWeight: 400,
  letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
}
const h2 = {
  color: '#ffffff', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
  fontFamily: 'system-ui, sans-serif', fontWeight: 300,
  lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.4rem 0',
}
const body = {
  color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
  fontFamily: 'system-ui, sans-serif', fontWeight: 300,
  lineHeight: 1.7, margin: 0,
}

export default function HomePage() {
  return (
    <SmoothScroll>
      {/* ── 0: Hero / logo reveal ─────────────────────────── z-index 0 */}
      <HeroScroll />

      {/* ── 1: Intro cinematic ────────────────────────────── z-index 2 */}
      <AquaCityIntro />

      {/* ── BREATH: AquaCity identity ─────────────────────── z-index 3 */}
      <StaticSlide id="static-identity" zIndex={3} height="140vh">
        <GlassBox style={{ maxWidth: '680px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={label}>AquaCity Varaždin</p>
          <h2 style={{ ...h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.8rem' }}>
            Mjesto koje generacije<br />
            <span style={{ fontWeight: 600 }}>već poznaju</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', marginTop: '0.5rem' }}>
            {[
              { value: '50+', desc: 'godina tradicije' },
              { value: '100k+', desc: 'posjetitelja godišnje' },
              { value: '#1', desc: 'potencijal u regiji' },
            ].map(({ value, desc }) => (
              <div key={value} style={{ textAlign: 'center' }}>
                <p style={{ color: '#c9a84c', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 600, margin: '0 0 0.3rem 0' }}>{value}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{desc}</p>
              </div>
            ))}
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ── 2: Problem cinematic ──────────────────────────── z-index 4 */}
      <AquaCityProblem />

      {/* ── 3: Location cinematic ─────────────────────────── z-index 5 */}
      <AquaCityLocation />

      {/* ── 4: Vision cinematic ───────────────────────────── z-index 6 */}
      <AquaCityVision />

      {/* ── BREATH: 5-phase timeline ──────────────────────── z-index 7 */}
      <StaticSlide id="static-phases" zIndex={7} height="160vh">
        <GlassBox style={{ maxWidth: '780px', padding: '3rem 3.5rem' }}>
          <p style={{ ...label, textAlign: 'center', marginBottom: '1.6rem' }}>Plan razvoja</p>
          <h2 style={{ ...h2, textAlign: 'center', marginBottom: '2.4rem', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Pet faza <span style={{ fontWeight: 600 }}>transformacije</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { faza: 'Faza 1', year: '2027', title: 'Aktivacija jezera', desc: 'Električni brodići, plutajuće platforme' },
              { faza: 'Faza 2', year: '2028', title: 'Večernji sadržaji', desc: 'Kino na jezeru, LED ekran' },
              { faza: 'Faza 3', year: '2029', title: 'Vodeni park', desc: 'Aquapark, 30+ atrakcija' },
              { faza: 'Faza 4', year: '2030', title: 'Wellness & Fitness', desc: 'Sauna, spa, outdoor fitness' },
              { faza: 'Faza 5', year: '2031', title: 'Smještaj na jezeru', desc: 'Glamping, plutajući bungalovi' },
            ].map(({ faza, year, title, desc }) => (
              <div key={faza} style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem',
              }}>
                <div style={{ minWidth: '90px' }}>
                  <span style={{ color: '#c9a84c', fontSize: 'clamp(0.55rem, 0.85vw, 0.7rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{faza}</span>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.65rem, 0.95vw, 0.8rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, margin: '0.15rem 0 0 0' }}>{year}</p>
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 500, margin: '0 0 0.2rem 0' }}>{title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ── 5–9: Phase cinematics ─────────────────────────── z-index 8–12 */}
      <AquaCityPhase1 />
      <AquaCityPhase2 />
      <AquaCityPhase3 />
      <AquaCityPhase4 />
      <AquaCityPhase5 />

      {/* ── BREATH: Partnership model ─────────────────────── z-index 13 */}
      <StaticSlide id="static-partnership" zIndex={13} height="160vh">
        <GlassBox style={{ maxWidth: '740px', padding: '3rem 3.5rem' }}>
          <p style={{ ...label, textAlign: 'center', marginBottom: '1.6rem' }}>Model partnerstva</p>
          <h2 style={{ ...h2, textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Zajedno gradimo<br /><span style={{ fontWeight: 600 }}>regionalnu destinaciju</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {[
              { title: 'Strateška partnerstva', desc: 'Lokalna vlast, turističke zajednice i privatni sektor' },
              { title: 'Prihodi od turizma', desc: 'Višestruki prihodni tokovi — smještaj, ulaznice, gastronomija' },
              { title: 'Cjelogodišnja aktivnost', desc: 'Ljeto i zima — 365 dana prihoda' },
              { title: 'Faze razvoja', desc: 'Postupna izgradnja smanjuje investicijski rizik' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ borderLeft: '2px solid rgba(201,168,76,0.4)', paddingLeft: '1rem' }}>
                <p style={{ color: '#ffffff', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 500, margin: '0 0 0.4rem 0' }}>{title}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.75rem, 1.1vw, 0.88rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ── BREATH: Contact / CTA ─────────────────────────── z-index 14 */}
      <StaticSlide id="static-contact" zIndex={14} height="140vh">
        <GlassBox style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={label}>Kontakt</p>
          <h2 style={{ ...h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '2rem' }}>
            Razgovarajmo o<br /><span style={{ fontWeight: 600 }}>vašoj investiciji</span>
          </h2>
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.3)', paddingTop: '1.8rem' }}>
            <p style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 400, margin: '0 0 0.4rem 0' }}>Mario Kukec</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 1.4rem 0' }}>M.A.K Grupa d.o.o.</p>
            <p style={{ ...body, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>
              Varaždin, Hrvatska<br />
              <span style={{ color: '#c9a84c' }}>info@makgrupa.hr</span>
            </p>
          </div>
        </GlassBox>
      </StaticSlide>
    </SmoothScroll>
  )
}
