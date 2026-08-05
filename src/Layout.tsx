import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageViewTracker from './components/PageViewTracker';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bone text-charbon">
      <PageViewTracker />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
