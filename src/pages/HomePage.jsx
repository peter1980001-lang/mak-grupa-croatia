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

// ─── shared typography tokens ─────────────────────────────────────────────────
const T = {
  label: {
    color: '#c9a84c', fontSize: 'clamp(0.6rem, 0.95vw, 0.78rem)',
    fontFamily: 'system-ui, sans-serif', fontWeight: 400,
    letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1rem 0',
  },
  h2: {
    color: '#ffffff', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
    fontFamily: 'system-ui, sans-serif', fontWeight: 300,
    lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.4rem 0',
  },
  h3: {
    color: '#ffffff', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
    fontFamily: 'system-ui, sans-serif', fontWeight: 500, margin: '0 0 0.5rem 0',
  },
  body: {
    color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.82rem, 1.25vw, 0.96rem)',
    fontFamily: 'system-ui, sans-serif', fontWeight: 300,
    lineHeight: 1.7, margin: 0,
  },
  gold: { color: '#c9a84c' },
  divider: { borderTop: '1px solid rgba(201,168,76,0.25)', margin: '1.4rem 0' },
}

function Bullet({ children }) {
  return (
    <li style={{
      color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.88rem, 1.35vw, 1.02rem)',
      fontFamily: 'system-ui, sans-serif', fontWeight: 300, marginBottom: '0.55rem',
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem', listStyle: 'none',
    }}>
      <span style={{ color: '#c9a84c', fontSize: '0.55em', marginTop: '0.45em', flexShrink: 0 }}>■</span>
      {children}
    </li>
  )
}

function Card({ title, body }) {
  return (
    <div style={{ borderLeft: '2px solid rgba(201,168,76,0.35)', paddingLeft: '1rem' }}>
      <p style={T.h3}>{title}</p>
      <p style={T.body}>{body}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <SmoothScroll>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 1–2  |  Hero + Intro cinematic  |  z 0–2
      ══════════════════════════════════════════════════════════════════════ */}
      <HeroScroll />
      <AquaCityIntro />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 3  |  AquaCity – mjesto koje generacije poznaju  |  z 3
          PDF p.3
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-identity" zIndex={3} height="150vh">
        <GlassBox style={{ maxWidth: '700px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={T.label}>AquaCity Varaždin</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.6rem' }}>
            Mjesto koje generacije<br />
            <span style={T.gold}>već poznaju</span>
          </h2>
          <p style={{ ...T.body, marginBottom: '2rem', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
            Desetljećima je AquaCity jedno od glavnih mjesta ocupljanja u Varaždinu.
            Generacije dolaze ovdje plivati, opuštati se i provoditi vrijeme s obitelji.
          </p>
          <div style={T.divider} />
          <p style={{ ...T.body, fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
            "AquaCity nije samo lokacija. To je dio Varaždina."
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 4–5  |  Problem cinematic  |  z 4
          PDF p.4–5
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityProblem />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 6  |  Location cinematic  |  z 5
          PDF p.6
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityLocation />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 7–8  |  Varaždin: Strateška točka  |  z 6
          PDF p.7–8
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-varazdin-transit" zIndex={6} height="160vh">
        <GlassBox style={{ maxWidth: '760px', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Strateška pozicija</p>
          <h2 style={{ ...T.h2, marginBottom: '2rem' }}>
            Varaždin kao točka<br />
            <span style={T.gold}>dolaska i prolaza</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.8rem' }}>Prometna mreža</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {[
                  'Između Zagreba i sjevera Hrvatske',
                  'Prema Sloveniji i Austriji',
                  'Regionalne turističke rute',
                ].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div>
              <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.8rem' }}>Neiskorišteni potencijal</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {[
                  'Boravak u gradu ostaje kratak',
                  'Potencijal dolazaka nije iskorišten',
                  'Cilj: pretvoriti prolazak u razlog za ostanak',
                ].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
          </div>
          <div style={T.divider} />
          <p style={{ ...T.body, color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
            AquaCity ima sve elemente —<br />
            <span style={T.gold}>nedostaje sadržaj koji produžuje boravak.</span>
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 9–10  |  Vision cinematic  |  z 7
          PDF p.9–10
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityVision />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 11–17  |  Model, zaštita i kontrola  |  z 8
          PDF p.11–17
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-model" zIndex={8} height="180vh">
        <GlassBox style={{ maxWidth: '820px', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Model razvoja</p>
          <h2 style={{ ...T.h2, marginBottom: '2.2rem' }}>
            Kontroliran, siguran<br />
            <span style={T.gold}>i bez rizika za Grad</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.6rem', marginBottom: '1.8rem' }}>
            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.7rem' }}>Zaštita okoliša</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {[
                  'Uklonjivi, reverzibilni sustavi',
                  'Električna rješenja bez buke',
                  'Jasno definirane zone korištenja',
                  'Usklađenost s ekološkim standardima',
                ].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.7rem' }}>Grad bez ulaganja</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {[
                  'Privatni kapital i investitori',
                  'M.A.K Grupa razvija i upravlja',
                  'Svi elementi su uklonjivi',
                  'Grad zadržava regulatornu kontrolu',
                ].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '12px', padding: '1.4rem 1.2rem' }}>
              <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.7rem' }}>Fazni pristup</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {[
                  'Svaka faza funkcionira samostalno',
                  'Donosi vrijednost odmah',
                  'Ne stvara dugoročne obveze',
                  'Razvoj se temelji na rezultatima',
                ].map(t => <Bullet key={t}>{t}</Bullet>)}
              </ul>
            </div>
          </div>
          <div style={T.divider} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem' }}>
            <Card
              title="Realizacijski okvir"
              body="Faze su jasno strukturirane i vremenski definirane. Svaki korak ima ograničen opseg i mjerljiv rezultat. Projekt se temelji na stvarnim podacima, ne pretpostavkama."
            />
            <Card
              title="Zašto ovaj model funkcionira"
              body="Nema potrebe za velikim početnim ulaganjem. Rizik se smanjuje kroz fazni pristup. Svaka faza potvrđuje opravdanost sljedeće — razvoj se događa uz stalnu mogućnost prilagodbe."
            />
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 14  |  5-phase timeline  |  z 9
          PDF p.14
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-phases" zIndex={9} height="170vh">
        <GlassBox style={{ maxWidth: '800px', padding: '3rem 3.5rem' }}>
          <p style={{ ...T.label, textAlign: 'center', marginBottom: '1.6rem' }}>Plan razvoja</p>
          <h2 style={{ ...T.h2, textAlign: 'center', marginBottom: '2.4rem', fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Pet faza <span style={T.gold}>transformacije</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { faza: 'Faza 1', year: '2027', title: 'Aktivacija vode i društvenih sadržaja', desc: 'Električni PLJUS brodići, plutajuće platforme — jezero postaje aktivan prostor boravka' },
              { faza: 'Faza 2', year: '2028', title: 'Večernji sadržaji i kino', desc: 'LED ekran na vodi, filmovi, sport i kulturna događanja — AquaCity aktivan dan i noć' },
              { faza: 'Faza 3', year: '2029', title: 'Aktivne vodene atrakcije', desc: 'Napuhavajući vodeni park, 30+ atrakcija — nova razina atraktivnosti i ponovnih dolazaka' },
              { faza: 'Faza 4', year: '2030', title: 'Wellness i Fitness', desc: 'Sauna, spa, outdoor fitness uz jezero — cjelogodišnja rutina, ne samo sezonski posjet' },
              { faza: 'Faza 5', year: '2031', title: 'Smještaj na jezeru', desc: 'Glamping, plutajući bungalovi — posjet postaje boravak, viša vrijednost po gostu' },
            ].map(({ faza, year, title, desc }, i) => (
              <div key={faza} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
                paddingBottom: '0.9rem',
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ minWidth: '88px', paddingTop: '0.1rem' }}>
                  <span style={{ color: '#c9a84c', fontSize: 'clamp(0.55rem, 0.85vw, 0.7rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block' }}>{faza}</span>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(0.65rem, 0.95vw, 0.8rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, margin: '0.15rem 0 0 0' }}>{year}</p>
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 1.35vw, 1.02rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 500, margin: '0 0 0.25rem 0' }}>{title}</p>
                  <p style={{ ...T.body, fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={T.divider} />
          <p style={{ ...T.body, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)' }}>
            Razvoj ide od jednostavnih prema kompleksnijim sadržajima — smještaj dolazi tek kao završni korak, nakon što destinacija već funkcionira.
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 18–23  |  Phase 1 & 2 cinematics  |  z 10–11
          PDF p.18–23
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase1 />
      <AquaCityPhase2 />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 24–26  |  Phase 3 cinematic  |  z 12
          PDF p.24–26
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase3 />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 27–30  |  Phase 4 cinematic  |  z 13
          PDF p.27–30
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase4 />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 31–34  |  Phase 5 cinematic  |  z 14
          PDF p.31–34
      ══════════════════════════════════════════════════════════════════════ */}
      <AquaCityPhase5 />

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 35–36  |  Cjelovita vizija  |  z 15
          PDF p.35–36
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-full-vision" zIndex={15} height="160vh">
        <GlassBox style={{ maxWidth: '720px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Cjelovita vizija</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.8rem' }}>
            AquaCity postaje<br />
            <span style={T.gold}>mjesto ostanka</span>
          </h2>
          <p style={{ ...T.body, marginBottom: '2rem', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'rgba(255,255,255,0.8)' }}>
            Kombinacijom svih pet faza, AquaCity postaje prostor kontinuiranog korištenja —
            aktivan dan, večer i cijelu godinu.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '1.8rem' }}>
            {[
              { icon: '◈', title: 'Dolaze redovito', desc: 'Rutina, ne samo sezonski posjet' },
              { icon: '◈', title: 'Ostaju dulje', desc: 'Sadržaj koji opravdava produljenje boravka' },
              { icon: '◈', title: 'Vraćaju se', desc: 'Destinacija koja postaje navika' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <span style={{ color: '#c9a84c', fontSize: '1.4rem', display: 'block', marginBottom: '0.5rem' }}>{icon}</span>
                <p style={{ ...T.h3, fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', marginBottom: '0.35rem' }}>{title}</p>
                <p style={{ ...T.body, fontSize: 'clamp(0.75rem, 1.05vw, 0.88rem)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={T.divider} />
          <p style={{ ...T.body, color: '#c9a84c', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 400, letterSpacing: '0.05em' }}>
            Spoj prirode i sadržaja. Nije više mjesto dolaska — postaje mjesto ostanka.
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 37–41  |  Partnerstvo + koristi za Grad + regija + zajednica  |  z 16
          PDF p.37–41
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-partnership" zIndex={16} height="200vh">
        <GlassBox style={{ maxWidth: '860px', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Model javno-privatnog partnerstva</p>
          <h2 style={{ ...T.h2, marginBottom: '2.2rem' }}>
            Zajedno gradimo<br />
            <span style={T.gold}>regionalnu destinaciju</span>
          </h2>

          {/* PPP structure */}
          <div style={{ background: 'rgba(201,168,76,0.05)', borderRadius: '12px', padding: '1.4rem 1.6rem', marginBottom: '1.8rem' }}>
            <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '1rem' }}>Podjela uloga</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem' }}>
              {[
                { role: 'Grad Varaždin', items: ['Osigurava prostor', 'Regulatorni okvir i nadzor', 'Bez financijskog izlaganja'] },
                { role: 'M.A.K Grupa', items: ['Razvoj i financiranje', 'Operativno upravljanje', 'Preuzima sav operativni rizik'] },
                { role: 'Investitori', items: ['Privatni kapital', 'Fazno ulaganje', 'Kontroliran rizik'] },
              ].map(({ role, items }) => (
                <div key={role}>
                  <p style={{ ...T.body, color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.6rem, 0.85vw, 0.72rem)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{role}</p>
                  <ul style={{ padding: 0, margin: 0 }}>
                    {items.map(i => <Bullet key={i}>{i}</Bullet>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* City benefits */}
          <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '1rem' }}>Koristi za Grad Varaždin</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.8rem' }}>
            {[
              { title: 'Gospodarski učinak', items: ['Rast lokalne potrošnje', 'Poticanje poduzetništva', 'Nova radna mjesta'] },
              { title: 'Turistički učinak', items: ['Jačanje pozicije Varaždina', 'Privlačenje regionalnih posjetitelja', 'Dulji boravak gostiju'] },
              { title: 'Društveni učinak', items: ['Novi sadržaji za građane', 'Cjelogodišnja aktivnost', 'Očuvanje prirodnog karaktera'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ borderLeft: '2px solid rgba(201,168,76,0.3)', paddingLeft: '1rem' }}>
                <p style={T.h3}>{title}</p>
                <ul style={{ padding: 0, margin: 0 }}>
                  {items.map(i => <Bullet key={i}>{i}</Bullet>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={T.divider} />

          {/* Regional + community */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem' }}>
            <div>
              <p style={{ ...T.h3, marginBottom: '0.7rem' }}>Varaždin kao regionalna destinacija</p>
              <p style={{ ...T.body, marginBottom: '0.8rem' }}>Primarno tržište: Zagreb · Sjever Hrvatske · Slovenija · Austrija</p>
              <p style={T.body}>Lokacija već ima promet i vidljivost. Projekt pretvara prolazak u dolazak.</p>
            </div>
            <div>
              <p style={{ ...T.h3, marginBottom: '0.7rem' }}>Prostor ostaje za zajednicu</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {['Kupanje i pristup vodi ostaju slobodni', 'Boravak na otvorenom — bez kompromisa', 'Prirodni ambijent se čuva', 'Dodaju se novi razlozi za dolazak'].map(i => <Bullet key={i}>{i}</Bullet>)}
              </ul>
            </div>
          </div>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 42  |  Sljedeći korak — pokretanje Faze 1  |  z 17
          PDF p.42
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-nextstep" zIndex={17} height="150vh">
        <GlassBox style={{ maxWidth: '680px', textAlign: 'center', padding: '3rem 3.5rem' }}>
          <p style={T.label}>Sljedeći korak</p>
          <h2 style={{ ...T.h2, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '1.6rem' }}>
            Pokretanje<br />
            <span style={T.gold}>Faze 1</span>
          </h2>
          <p style={{ ...T.body, marginBottom: '2rem', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'rgba(255,255,255,0.8)' }}>
            Projekt je spreman za prelazak iz koncepta u provedbu.
            Sljedeći korak je pokretanje prve, ograničene faze.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            {[
              { title: 'Uključuje', items: ['Razradu Faze 1 tehnički i operativno', 'Definiranje modela provedbe', 'Usklađivanje s Gradom i dionicima'] },
              { title: 'Faza 1 je', items: ['Ograničena i kontrolirana', 'Reverzibilna — bez dugoročnih obveza', 'Temelj za donošenje odluka na osnovu rezultata'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '10px', padding: '1.2rem' }}>
                <p style={{ ...T.h3, color: '#c9a84c', marginBottom: '0.6rem', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>{title}</p>
                <ul style={{ padding: 0, margin: 0 }}>
                  {items.map(i => <Bullet key={i}>{i}</Bullet>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={T.divider} />
          <p style={{ ...T.body, color: '#c9a84c', fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', fontWeight: 400 }}>
            Ne donosi se odluka o cijelom projektu.<br />Donosi se odluka o prvom koraku.
          </p>
        </GlassBox>
      </StaticSlide>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE 43  |  Zaključak + Kontakt  |  z 18
          PDF p.43
      ══════════════════════════════════════════════════════════════════════ */}
      <StaticSlide id="static-contact" zIndex={18} height="150vh">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.8rem', width: '100%', maxWidth: '700px', padding: '0 2rem' }}>

          {/* Logo — prominent, same treatment as hero */}
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

          {/* Conclusion card */}
          <GlassBox style={{ width: '100%', textAlign: 'center', padding: '2.4rem 3rem' }}>
            <p style={T.label}>Zaključak</p>
            <h2 style={{ ...T.h2, fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', marginBottom: '1.4rem' }}>
              AquaCity ima potencijal postati<br />
              <span style={T.gold}>ključna točka razvoja Varaždina</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '1.8rem' }}>
              {['Fazan', 'Kontroliran', 'Financijski održiv'].map(t => (
                <div key={t} style={{ textAlign: 'center' }}>
                  <span style={{ color: '#c9a84c', fontSize: '1rem', display: 'block', marginBottom: '0.3rem' }}>◈</span>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 300, margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.3)', paddingTop: '1.6rem' }}>
              <p style={{ color: '#ffffff', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontFamily: 'system-ui, sans-serif', fontWeight: 400, margin: '0 0 0.25rem 0' }}>Mario Kukec</p>
              <p style={{ ...T.body, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', marginBottom: '1.1rem' }}>Direktor · M.A.K Grupa d.o.o.</p>
              <p style={{ ...T.body, lineHeight: 2.2, color: 'rgba(255,255,255,0.65)' }}>
                <span style={T.gold}>mario@makgrupa.com</span><br />
                +971 55 129 1080 · www.makgrupa.com
              </p>
            </div>
            <p style={{ ...T.body, fontSize: 'clamp(0.55rem, 0.8vw, 0.68rem)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', marginTop: '1.4rem' }}>
              Koncept, dizajn i prava razvoja u vlasništvu M.A.K Grupe | 2026
            </p>
          </GlassBox>

        </div>
      </StaticSlide>

    </SmoothScroll>
  )
}
