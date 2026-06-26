import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'BloodSync | Blood Donation Platform',
    template: '%s | BloodSync',
  },
  description:
    'BloodSync connects blood donors with those in need. Register as a donor, request blood, and save lives today.',
  keywords: [
    'blood donation',
    'donate blood',
    'blood bank',
    'blood request',
    'save lives',
    'donor registration',
  ],
  authors: [{ name: 'Shahadat Hossain' }],
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
