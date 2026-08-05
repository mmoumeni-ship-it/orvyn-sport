import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
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
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<RepasPage />} />
            <Route path="/menu/:slug" element={<MealDetailPage />} />
            <Route path="/repas" element={<Navigate to="/menu" replace />} />
            <Route path="/repas/:id" element={<MealDetailPage />} />
            <Route path="/bowls-proteines" element={<BowlsProteines />} />
            <Route path="/repas-prise-de-masse" element={<PriseDeMasse />} />
            <Route path="/repas-seche" element={<Seche />} />
            <Route path="/repas-post-entrainement" element={<PostEntrainement />} />
            <Route path="/shakes-proteines" element={<ShakesProteines />} />
            <Route path="/snacks-healthy" element={<SnacksHealthy />} />
            <Route path="/abonnements" element={<AbonnementsPage />} />
            <Route path="/panier" element={<CartPage />} />
            <Route path="/commande" element={<CheckoutPage />} />
            <Route path="/commande-confirmee" element={<OrderConfirmationPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
