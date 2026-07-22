import React, { Suspense, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import { BackToTop } from './components/ui';
import SplashScreen from './components/SplashScreen/SplashScreen';

import HomePage from './pages/HomePage';

const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PackagesPage = React.lazy(() => import('./pages/PackagesPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function AppRoutes() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Re-trigger splash on route change
  React.useEffect(() => {
    setShowSplash(true);
    setSplashKey((k) => k + 1);
  }, [location.pathname]);

  return (
    <>
      <SplashScreen
        key={splashKey}
        visible={showSplash}
        onComplete={handleSplashComplete}
        duration={2800}
      />
      <ScrollToTop />
      <BackToTop />
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>Loading...</div>}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
