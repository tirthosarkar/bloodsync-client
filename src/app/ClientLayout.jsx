'use client';

import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <AuthProvider>
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? 'flex-1' : ''}>{children}</main>
      {!isDashboard && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="light"
      />
    </AuthProvider>
  );
}
