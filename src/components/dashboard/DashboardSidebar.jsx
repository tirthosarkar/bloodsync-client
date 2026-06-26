'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaPlusCircle,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
  FaHeartbeat,
} from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { MdSpaceDashboard } from 'react-icons/md';
import Image from 'next/image';

export default function DashboardSidebar({ user, isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const { logout } = useContext(AuthContext);
  const role = user?.role?.toLowerCase() || 'donor';

  const getNavItems = () => {
    const commonItems = [
      { label: 'HomePage', href: `/`, icon: FaHome },
      {
        label: 'Dashboard',
        href: `/dashboard/${role}`,
        icon: MdSpaceDashboard,
      },
      { label: 'Profile', href: '/dashboard/profile', icon: FaUser },
    ];

    const roleSpecificItems = {
      donor: [
        {
          label: 'My Requests',
          href: '/dashboard/my-donation-requests',
          icon: FaClipboardList,
        },
        {
          label: 'Create Request',
          href: '/dashboard/create-donation-request',
          icon: FaPlusCircle,
        },
      ],
      admin: [
        {
          label: 'All Users',
          href: '/dashboard/admin/all-users',
          icon: FaUsers,
        },
        {
          label: 'All Requests',
          href: '/dashboard/admin/all-blood-donation-request',
          icon: FaClipboardList,
        },
      ],
      volunteer: [
        {
          label: 'All Requests',
          href: '/dashboard/volunteer/all-blood-donation-request',
          icon: FaClipboardList,
        },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[role] || [])];
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col h-full`}
      >
        {/* Sidebar Header with Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
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
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-red-600"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) toggleSidebar();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'}`}
                  >
                    <Icon
                      className={isActive ? 'text-red-500' : 'text-gray-400'}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-6 bg-red-500 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt /> <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
