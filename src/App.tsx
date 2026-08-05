import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import HomePage from './pages/HomePage';
import BowlsProteines from './pages/BowlsProteines';
import PriseDeMasse from './pages/PriseDeMasse';
import Seche from './pages/Seche';
import PostEntrainement from './pages/PostEntrainement';
import ShakesProteines from './pages/ShakesProteines';
import SnacksHealthy from './pages/SnacksHealthy';
import AbonnementsPage from './pages/AbonnementsPage';
import BlogPage from './pages/BlogPage';
import BlogArticle from './pages/BlogArticle';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import RepasPage from './pages/RepasPage';
import MealDetailPage from './pages/MealDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RouteErrorBoundary><HomePage /></RouteErrorBoundary>} />
            <Route path="/menu" element={<RouteErrorBoundary><RepasPage /></RouteErrorBoundary>} />
            <Route path="/menu/:slug" element={<RouteErrorBoundary><MealDetailPage /></RouteErrorBoundary>} />
            <Route path="/repas" element={<Navigate to="/menu" replace />} />
            <Route path="/repas/:id" element={<RouteErrorBoundary><MealDetailPage /></RouteErrorBoundary>} />
            <Route path="/bowls-proteines" element={<RouteErrorBoundary><BowlsProteines /></RouteErrorBoundary>} />
            <Route path="/repas-prise-de-masse" element={<RouteErrorBoundary><PriseDeMasse /></RouteErrorBoundary>} />
            <Route path="/repas-seche" element={<RouteErrorBoundary><Seche /></RouteErrorBoundary>} />
            <Route path="/repas-post-entrainement" element={<RouteErrorBoundary><PostEntrainement /></RouteErrorBoundary>} />
            <Route path="/shakes-proteines" element={<RouteErrorBoundary><ShakesProteines /></RouteErrorBoundary>} />
            <Route path="/snacks-healthy" element={<RouteErrorBoundary><SnacksHealthy /></RouteErrorBoundary>} />
            <Route path="/abonnements" element={<RouteErrorBoundary><AbonnementsPage /></RouteErrorBoundary>} />
            <Route path="/panier" element={<RouteErrorBoundary><CartPage /></RouteErrorBoundary>} />
            <Route path="/commande" element={<RouteErrorBoundary><CheckoutPage /></RouteErrorBoundary>} />
            <Route path="/commande-confirmee" element={<RouteErrorBoundary><OrderConfirmationPage /></RouteErrorBoundary>} />
            <Route path="/blog" element={<RouteErrorBoundary><BlogPage /></RouteErrorBoundary>} />
            <Route path="/blog/:slug" element={<RouteErrorBoundary><BlogArticle /></RouteErrorBoundary>} />
            <Route path="/a-propos" element={<RouteErrorBoundary><AboutPage /></RouteErrorBoundary>} />
            <Route path="/contact" element={<RouteErrorBoundary><ContactPage /></RouteErrorBoundary>} />
            <Route path="/faq" element={<RouteErrorBoundary><FAQPage /></RouteErrorBoundary>} />
            <Route path="*" element={<RouteErrorBoundary><NotFoundPage /></RouteErrorBoundary>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
