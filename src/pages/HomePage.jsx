// src/pages/HomePage.jsx
import SmoothScroll     from '../components/SmoothScroll'
import HeroScroll       from '../components/HeroScroll'
import AquaCityIntro    from '../components/AquaCityIntro'
import AquaCityProblem  from '../components/AquaCityProblem'
import AquaCityLocation from '../components/AquaCityLocation'
import AquaCityVision   from '../components/AquaCityVision'
import AquaCityPhase1   from '../components/AquaCityPhase1'
import AquaCityPhase2   from '../components/AquaCityPhase2'

export default function HomePage() {
  return (
    <SmoothScroll>
      <HeroScroll />
      <AquaCityIntro />
      <AquaCityProblem />
      <AquaCityLocation />
      <AquaCityVision />
      <AquaCityPhase1 />
      <AquaCityPhase2 />
    </SmoothScroll>
  )
}
