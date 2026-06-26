import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
