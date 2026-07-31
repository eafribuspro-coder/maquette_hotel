import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AdminLayout from './components/admin/AdminLayout'
import Accueil from './pages/Accueil'
import Chambres from './pages/Chambres'
import Restaurant from './pages/Restaurant'
import Loisirs from './pages/Loisirs'
import Galerie from './pages/Galerie'
import Contact from './pages/Contact'
import ReserverChambre from './pages/ReserverChambre'
import ReserverTable from './pages/ReserverTable'
import Connexion from './pages/admin/Connexion'
import Dashboard from './pages/admin/Dashboard'
import ResaChambres from './pages/admin/ResaChambres'
import ResaTables from './pages/admin/ResaTables'
import Clients from './pages/admin/Clients'
import ConfigChambres from './pages/admin/ConfigChambres'
import ConfigTables from './pages/admin/ConfigTables'
import Medias from './pages/admin/Medias'

/** Gabarit du site public : en-tête, contenu, pied de page. */
function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* La clé sur le pathname rejoue le fondu à chaque changement de page */}
      <main key={pathname} className="animate-page-fade flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Site public */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/chambres" element={<Chambres />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/loisirs" element={<Loisirs />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reserver/chambre" element={<ReserverChambre />} />
          <Route path="/reserver/table" element={<ReserverTable />} />
        </Route>

        {/* Espace administrateur */}
        <Route path="/admin/connexion" element={<Connexion />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chambres" element={<ResaChambres />} />
          <Route path="tables" element={<ResaTables />} />
          <Route path="clients" element={<Clients />} />
          <Route path="config-chambres" element={<ConfigChambres />} />
          <Route path="config-tables" element={<ConfigTables />} />
          <Route path="medias" element={<Medias />} />
        </Route>
      </Routes>
    </>
  )
}
