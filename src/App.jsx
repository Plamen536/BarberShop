import About from './components/About'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import Reviews from './components/Reviews'
import Services from './components/Services'
import Team from './components/Team'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Към съдържанието
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Team />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
