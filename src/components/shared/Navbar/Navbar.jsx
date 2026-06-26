// components/Navbar.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button, Avatar, Dropdown } from '@heroui/react';

// ── Placeholder: replace with BetterAuth session later ──
const user = null;
// const { data: session } = authClient.useSession()  ← swap to this later

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Donation Requests', href: '/donation-requests' },
  { label: 'Funding', href: '/funding' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = href => pathname === href;

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

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {!user ? (
            // ── Not Logged In ──
            <>
              <Link href="/login" className="hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-red-600"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  Join as Donor
                </Button>
              </Link>
            </>
          ) : (
            // ── Logged In: Avatar Dropdown ──
            // 💡 Later: replace user.avatar & user.name with BetterAuth session data
            <Dropdown>
              <Dropdown.Trigger>
                <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  <Avatar
                    src={user?.avatar}
                    name={user?.name}
                    size="sm"
                    className="cursor-pointer ring-2 ring-red-200"
                  />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Link href="/dashboard" className="w-full block">
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <Link href="/dashboard/profile" className="w-full block">
                      My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    className="text-red-600"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 gap-1 border-t border-gray-100">
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
          {!user && (
            <li>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
