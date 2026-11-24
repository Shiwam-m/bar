import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MoleculeScene } from './three/MoleculeScene';
import { IntroPreloader } from './components/IntroPreloader';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { EventsPage } from './pages/EventsPage';
import { ReservationPage } from './pages/ReservationPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-bg text-ink flex flex-col justify-between selection:bg-gold selection:text-bg">
      {/* Intro Preloader Animation on every page open / refresh */}
      <IntroPreloader />

      {/* Interactive 3D Molecule Canvas */}
      <MoleculeScene isHome={isHome} />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/book" element={<ReservationPage />} />
          {/* Legacy contact route redirects to book */}
          <Route path="/contact" element={<Navigate to="/book" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
