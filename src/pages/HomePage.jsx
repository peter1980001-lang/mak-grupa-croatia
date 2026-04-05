// src/pages/HomePage.jsx  — full presentation, all 43 PDF pages covered
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
import logoSrc           from '../assets/logo.jpeg'
import AudioManager      from '../components/AudioManager'
import AutoPlay         from '../components/AutoPlay'
import LoadingScreen    from '../components/LoadingScreen'

// ─── shared typography tokens ─────────────────────────────────────────────────
const T = {
  label: {
    color: '#c8a96a', fontSize: 'clamp(0.6rem, 0.95vw, 0.78rem)',
    fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400,
    letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1rem 0',
  },
  h2: {
    color: '#f5f3ea', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
    fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
    lineHeight: 1.15, letterSpacing: '0.01em', margin: '0 0 1.4rem 0',
  },
  h3: {
    color: '#f5f3ea', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
    fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 500, margin: '0 0 0.5rem 0',
  },
  body: {
    color: 'rgba(245,243,234,0.65)', fontSize: 'clamp(0.82rem, 1.25vw, 0.96rem)',
    fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300,
    lineHeight: 1.7, margin: 0,
  },
  gold: { color: '#c8a96a' },
  divider: { borderTop: '1px solid rgba(200,169,106,0.25)', margin: '1.4rem 0' },
}

function Bullet({ children }) {
  return (
    <li style={{
      color: 'rgba(245,243,234,0.75)', fontSize: 'clamp(0.88rem, 1.35vw, 1.02rem)',
      fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, marginBottom: '0.55rem',
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem', listStyle: 'none',
    }}>
      <span style={{ color: '#c8a96a', fontSize: '0.55em', marginTop: '0.45em', flexShrink: 0 }}>■</span>
      {children}
    </li>
  )
}

export default function HomePage() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <AudioManager />
      <AutoPlay />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 1–2  |  Hero + Intro cinematic  |  z 0–2
      ══════════════════════════════════════════════════════════════════════ */}
      <HeroScroll />
      <AquaCityIntro />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 3  |  AquaCity – mjesto koje generacije poznaju  |  z 3
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-identity" zIndex={3} height="160vh">
        <GlassBox style={{ maxWidth: '620px', textAlign: 'left', padding: '2.8rem 3.2rem', position: 'absolute', bottom: '8%', left: '6%' }}>
          <p style={T.label}>AquaCity Varaždin</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.4rem' }}>
            Mjesto koje generacije<br />
            <span style={T.gold}>već poznaju</span>
          </h2>
          <ul style={{ padding: 0, margin: '0 0 1.6rem 0' }}>
            {['Okupljanje s obitelji i prijateljima', 'Prostor za odmor i druženje', 'Aktivno — ali sezonski'].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
          <div style={T.divider} />
          <p style={{ ...T.body, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'rgba(245,243,234,0.80)', margin: 0 }}>
            Mjesto koje je već dio grada.<br />
            <span style={{ color: '#c8a96a', fontWeight: 400 }}>Ali živi samo ljeti.</span>
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 4–5  |  Problem cinematic  |  z 4
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityProblem />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 6  |  Location cinematic  |  z 5
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityLocation />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 7–8  |  Strateška pozicija  |  z 6
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-varazdin-transit" zIndex={6} height="290vh">
        <GlassBox style={{ maxWidth: '560px', padding: '2.8rem 3.2rem', position: 'absolute', bottom: '8%', left: '8%' }}>
          <p style={T.label}>Strateška pozicija</p>
          <h2 style={{ ...T.h2, marginBottom: '1.8rem' }}>
            Varaždin kao točka prolaza —<br />
            <span style={T.gold}>i potencijal dolaska</span>
          </h2>
          <ul style={{ padding: 0, margin: '0 0 1.6rem 0' }}>
            {[
              'Između Zagreba i sjevera Hrvatske',
              'Povezan sa Slovenijom, Austrijom i Mađarskom',
              'Regionalni tokovi već postoje',
            ].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
          <div style={T.divider} />
          <p style={{ ...T.body, color: 'rgba(245,243,234,0.85)', fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', margin: 0 }}>
            Prolaz postoji.{' '}
            <span style={{ color: '#c8a96a', fontWeight: 400 }}>Boravak je kratak.</span>
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 9–10  |  Vision cinematic  |  z 7
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityVision />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 11–13  |  Model razvoja  |  z 8
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-model" zIndex={8} height="550vh">
        <GlassBox style={{ maxWidth: '680px', padding: '3rem 3.5rem', position: 'absolute', top: '8%', left: '8%' }}>
          <p style={T.label}>Model razvoja</p>
          <h2 style={{ ...T.h2, marginBottom: '2.2rem' }}>
            Kontroliran. Siguran.<br />
            <span style={T.gold}>Bez rizika za Grad.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.6rem' }}>
            <div style={{ background: 'rgba(200,169,106,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c8a96a', marginBottom: '0.7rem' }}>Zaštita</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['Uklonjivo i reverzibilno', 'Električno, bez utjecaja', 'Ekološki usklađeno'].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(200,169,106,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c8a96a', marginBottom: '0.7rem' }}>Bez ulaganja</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['100% privatno financirano', 'Grad bez troška', 'Grad zadržava kontrolu'].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(200,169,106,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c8a96a', marginBottom: '0.7rem' }}>Fazni pristup</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['Korak po korak', 'Svaka faza se potvrđuje', 'Razvoj bez obveze'].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 14  |  5 faza transformacije  |  z 9
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-phases" zIndex={9} height="530vh" bg="#0f2a23">
        <GlassBox style={{ maxWidth: '780px', padding: '3rem 3.5rem' }}>
          <p style={{ ...T.label, textAlign: 'center', marginBottom: '1.6rem' }}>Plan razvoja</p>
          <h2 style={{ ...T.h2, textAlign: 'center', marginBottom: '2.4rem', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            5 faza <span style={T.gold}>transformacije</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { faza: 'Faza 1', title: 'Aktivacija jezera' },
              { faza: 'Faza 2', title: 'Večernji sadržaji' },
              { faza: 'Faza 3', title: 'Vodene atrakcije' },
              { faza: 'Faza 4', title: 'Wellness & Fitness' },
              { faza: 'Faza 5', title: 'Smještaj' },
            ].map(({ faza, title }, i) => (
              <div key={faza} style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                paddingBottom: '0.9rem',
                borderBottom: i < 4 ? '1px solid rgba(245,243,234,0.07)' : 'none',
              }}>
                <div style={{ minWidth: '72px' }}>
                  <span style={{ color: '#c8a96a', fontSize: 'clamp(0.55rem, 0.85vw, 0.7rem)', fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{faza}</span>
                </div>
                <p style={{ color: '#f5f3ea', fontSize: 'clamp(0.95rem, 1.45vw, 1.1rem)', fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 400, margin: 0 }}>{title}</p>
              </div>
            ))}
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 15–19  |  Phase 1 cinematic + Vremenski okvir  |  z 10
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase1 />

      {/* ══════════════════════════════════════════════════════════════════════
          Phase 2  |  z 11
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase2 />

      {/* ══════════════════════════════════════════════════════════════════════
          Phase 3  |  z 12
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase3 />

      {/* ══════════════════════════════════════════════════════════════════════
          Phase 4  |  z 13
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase4 />

      {/* ══════════════════════════════════════════════════════════════════════
          Phase 5  |  z 14
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase5 />

      {/* ══════════════════════════════════════════════════════════════════════
          Cjelovita vizija  |  z 15
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-full-vision" zIndex={15} height="470vh">
        <GlassBox style={{ maxWidth: '493px', textAlign: 'left', padding: '2.55rem 3rem', position: 'absolute', top: '12%', left: '8%' }}>
          <p style={T.label}>Cjelovita vizija</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', marginBottom: '1.5rem' }}>
            AquaCity postaje<br />
            <span style={T.gold}>mjesto ostanka</span>
          </h2>
          <ul style={{ padding: 0, margin: '0 0 1.6rem 0', textAlign: 'left' }}>
            {['Dolaze redovito', 'Ostaju dulje', 'Vraćaju se'].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
          <div style={T.divider} />
          <p style={{ ...T.body, color: '#c8a96a', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 400, letterSpacing: '0.05em', margin: 0 }}>
            Iz mjesta dolaska u mjesto ostanka
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          Model suradnje — 3 slides  |  z 16
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-partnership" zIndex={16} height="300vh">
        <GlassBox style={{ maxWidth: '680px', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Model suradnje</p>
          <h2 style={{ ...T.h2, marginBottom: '2rem' }}>
            Jasno definirane<br />
            <span style={T.gold}>odgovornosti</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ ...T.h3, color: '#c8a96a', marginBottom: '0.8rem' }}>Grad Varaždin</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['Osigurava prostor', 'Regulatorni okvir i nadzor', 'Bez financijskog ulaganja'].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div>
              <p style={{ ...T.h3, color: '#c8a96a', marginBottom: '0.8rem' }}>M.A.K Grupa</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['Razvoj i financiranje projekta', 'Operativno upravljanje', 'Preuzima sav operativni i financijski rizik'].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
          </div>
        </GlassBox>
      </StaticSlide>

      <StaticSlide id="static-public" zIndex={16} height="280vh">
        <GlassBox style={{ maxWidth: '620px', padding: '2.8rem 3.2rem' }}>
          <p style={T.label}>Prostor ostaje javan</p>
          <h2 style={{ ...T.h2, marginBottom: '1.8rem' }}>
            Za građane —<br />
            <span style={T.gold}>kao i do sada</span>
          </h2>
          <ul style={{ padding: 0, margin: '0 0 1.6rem 0' }}>
            {[
              'Kupanje i pristup vodi ostaju besplatni',
              'Prostor ostaje dostupan svima',
              'Nema zatvaranja javnog prostora',
            ].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
          <div style={T.divider} />
          <p style={{ ...T.body, color: '#c8a96a', fontWeight: 400, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', margin: 0 }}>
            Sadržaj se dodaje — prostor ostaje javni
          </p>
        </GlassBox>
      </StaticSlide>

      <StaticSlide id="static-change" zIndex={16} height="280vh">
        <GlassBox style={{ maxWidth: '600px', padding: '2.8rem 3.2rem' }}>
          <p style={T.label}>Što se mijenja</p>
          <h2 style={{ ...T.h2, marginBottom: '1.8rem' }}>
            Više sadržaja. Dulji boravak.<br />
            <span style={T.gold}>Veća vrijednost.</span>
          </h2>
          <ul style={{ padding: 0, margin: 0 }}>
            {['Prostor dobiva novu funkciju', 'Boravak postaje duži', 'Aktivnost nije više sezonska'].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          Sljedeći korak  |  z 17
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-nextstep" zIndex={17} height="480vh">
        <GlassBox style={{ maxWidth: '640px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Sljedeći korak</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.2rem' }}>
            Pokretanje<br />
            <span style={T.gold}>Faze 1</span>
          </h2>
          <p style={{ ...T.body, marginBottom: '1.8rem', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'rgba(245,243,234,0.85)' }}>
            Ako postoji usklađenost oko vizije — sljedeći korak je Faza 1
          </p>
          <ul style={{ padding: 0, margin: '0 0 1.6rem 0', textAlign: 'left' }}>
            {['Ograničeno i kontrolirano', 'Bez dugoročne obveze', 'Temelj za daljnje odluke'].map(t => <Bullet key={t}>{t}</Bullet>)}
          </ul>
          <div style={T.divider} />
          <p style={{ ...T.body, color: '#c8a96a', fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', fontWeight: 400, margin: 0 }}>
            Donosi se odluka o prvom koraku — ne o cijelom projektu
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          Zaključak + Kontakt  |  z 18
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-contact" zIndex={18} height="260vh">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.8rem', width: '100%', maxWidth: '700px', padding: '0 2rem' }}>

          <img
            src={logoSrc}
            alt="MAK Grupa"
            style={{
              width: 'clamp(220px, 32vw, 420px)',
              userSelect: 'none',
              pointerEvents: 'none',
              maskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 62% 68% at 50% 50%, black 35%, transparent 80%)',
            }}
          />

          <GlassBox style={{ width: '100%', textAlign: 'center', padding: '2.4rem 3rem' }}>
            <p style={T.label}>Zaključak</p>
            <h2 style={{ ...T.h2, fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', marginBottom: '1.4rem' }}>
              AquaCity postaje ključna točka<br />
              <span style={T.gold}>razvoja Varaždina</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '1.8rem' }}>
              {['Fazan', 'Kontroliran', 'Financijski održiv'].map(t => (
                <div key={t} style={{ textAlign: 'center' }}>
                  <span style={{ color: '#c8a96a', fontSize: '1rem', display: 'block', marginBottom: '0.3rem' }}>◈</span>
                  <p style={{ color: 'rgba(245,243,234,0.75)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontFamily: '"DM Sans", system-ui, sans-serif', fontWeight: 300, margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(200,169,106,0.3)', paddingTop: '1.6rem' }}>
              <p style={{ color: '#f5f3ea', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 400, margin: '0 0 0.25rem 0' }}>Mario Kukec</p>
              <p style={{ ...T.body, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', marginBottom: '1.1rem' }}>Direktor · M.A.K Grupa d.o.o.</p>
              <p style={{ ...T.body, lineHeight: 2.2, color: 'rgba(245,243,234,0.70)' }}>
                <span style={T.gold}>mario@makgrupa.com</span><br />
                +971 55 129 1080 · www.makgrupa.com
              </p>
            </div>
            <p style={{ ...T.body, fontSize: 'clamp(0.55rem, 0.8vw, 0.68rem)', color: 'rgba(245,243,234,0.18)', letterSpacing: '0.1em', marginTop: '1.4rem' }}>
              Koncept, dizajn i prava razvoja u vlasništvu M.A.K Grupe | 2026
            </p>
          </GlassBox>

        </div>
      </StaticSlide>

    </SmoothScroll>
  )
}
