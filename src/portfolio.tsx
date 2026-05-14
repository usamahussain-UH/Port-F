import { useEffect, useState } from 'react'
import './portfolio.css'
import './index.css'
import { getInitialTheme, scrollToId, type Theme } from './components/utils'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AiSection from './components/AiSection'
import ProjectsSection from './components/ProjectsSection'
import CvSection from './components/CvSection'
import FunSection from './components/FunSection'
import EducationSection from './components/EducationSection'
import AchievementsSection from './components/AchievementsSection'
import AboutSection from './components/AboutSection'
import CertificatesSlider from './components/CertificatesSlider'
import ContactSection from './components/ContactSection'
import GuestBookSection from './components/GuestBookSection'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'

export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="app">
      <div className="bg">
        <ParticlesBackground />
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-scanlines" />
      </div>

      <Header theme={theme} setTheme={setTheme} />

      <main className="main" id="top">
        <HeroSection theme={theme} onNavigate={scrollToId} />
        <AiSection />
        <ProjectsSection />
        <CertificatesSlider />
        <CvSection />
        <FunSection />
        <EducationSection />
        <AchievementsSection />
        <AboutSection />
        <ContactSection />
        <GuestBookSection />
      </main>

      <Footer />
    </div>
  )
}
