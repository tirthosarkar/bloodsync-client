'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { TbLogin2 } from 'react-icons/tb';

import { authClient, signOut } from '@/lib/auth-client'; // Make sure this path points to your client instance
import { toast } from 'react-toastify';
import UserDropdown from './UserDropdown';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Donation Requests', href: '/donation-requests' },
  { label: 'Funding', href: '/funding' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ── Better Auth Client Session ──
  const { data: session } = authClient.useSession();
  const user = session?.user || null;
  console.log(user);

  const isActive = href => pathname === href;

  // ── Better Auth Logout Handler ──
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully');
            setIsMenuOpen(false);
            // router.push("/auth/signin"); // Route user back to login
            // router.refresh(); // Clear server layer cache
            window.location.href = '/auth/signin';
          },
          onError: ctx => {
            toast.error(ctx.error.message || 'Failed to log out.');
          },
        },
      });
    } catch (error) {
      console.error('Logout unexpected error:', error);
      toast.error('An error occurred while logging out.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/80 backdrop-blur-lg shadow-sm">
      <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/nav-logo.png"
            alt="BloodSync Logo"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            if (link.href === '/funding' && !user) return null;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right Side Action Panel ── */}
        <div className="flex items-center gap-3">
          {!user ? (
            // ── Not Logged In View ──
            <>
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <TbLogin2 className="text-lg sm:text-xl" />
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <FaHandHoldingHeart className="text-lg sm:text-xl" />
                Join as Donor
              </Link>
            </>
          ) : (
            // ── Logged In: Better Auth Avatar Dropdown ──
            <UserDropdown
              user={user}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          )}

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Side Menu Menu ── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col px-4 pb-4 gap-1 border-t border-gray-100 bg-white">
          {navLinks.map(link => {
            if (link.href === '/funding' && !user) return null;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {/* Mobile Auth Routing Adjustments */}
          {!user ? (
            <li>
              <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                {isLoggingOut ? 'Processing...' : 'Logout'}
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
