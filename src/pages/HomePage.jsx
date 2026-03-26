// src/pages/HomePage.jsx
import SmoothScroll from '../components/SmoothScroll'
import HeroScroll from '../components/HeroScroll'
import AquaCityIntro from '../components/AquaCityIntro'

export default function HomePage() {
  return (
    <SmoothScroll>
      <HeroScroll />
      <AquaCityIntro />
    </SmoothScroll>
  )
}
