import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isPublicRoute = !['/admin', '/login'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      {isPublicRoute && <Navbar />}
      <main>
        {children}
      </main>
      {isPublicRoute && <Footer />}
    </div>
  );
}
