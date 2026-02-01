import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
