// src/pages/HomePage.jsx
import SmoothScroll from '../components/SmoothScroll'
import HeroScroll from '../components/HeroScroll'
import AquaCityIntro from '../components/AquaCityIntro'
import AquaCityProblem from '../components/AquaCityProblem'

export default function HomePage() {
  return (
    <SmoothScroll>
      <HeroScroll />
      <AquaCityIntro />
      <AquaCityProblem />
    </SmoothScroll>
  )
}
