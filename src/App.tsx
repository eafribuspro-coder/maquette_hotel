import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Accueil from './pages/Accueil'
import Chambres from './pages/Chambres'
import Restaurant from './pages/Restaurant'
import Loisirs from './pages/Loisirs'
import Galerie from './pages/Galerie'
import Contact from './pages/Contact'

export default function App() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      {/* La clé sur le pathname rejoue le fondu à chaque changement de page */}
      <main key={pathname} className="animate-page-fade flex-1">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/chambres" element={<Chambres />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/loisirs" element={<Loisirs />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
