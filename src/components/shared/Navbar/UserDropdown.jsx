'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Avatar } from '@heroui/react';
import { FiChevronDown } from 'react-icons/fi';
import { MdAttachMoney, MdDashboard, MdLogout, MdPerson } from 'react-icons/md';

const DASHBOARD_PATHS = {
  admin: '/dashboard',
  volunteer: '/dashboard',
  donor: '/dashboard/donor',
};

export default function UserDropdown({ user, handleLogout, isLoggingOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dashboardPath =
    DASHBOARD_PATHS[user?.role?.toLowerCase()] || '/dashboard/donor';

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-200 bg-white shadow-red-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar
          size="sm"
          className="cursor-pointer ring-2 ring-red-200 hover:ring-red-400 transition-all md:w-9! md:h-9! "
        >
          <Avatar.Image src={user?.image || user?.avatar} />
          <Avatar.Fallback>
            {user?.name
              ? user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : '?'}
          </Avatar.Fallback>
        </Avatar>

        <FiChevronDown
          size={15}
          className={`text-red-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ── Dropdown Panel ── */}
      <div
        className={`absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        {/* User info header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user?.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.email}</p>
          {/* Role badge যোগ করো */}
          <span
            className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              user?.role === 'admin'
                ? 'bg-purple-100 text-purple-700'
                : user?.role === 'volunteer'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
            }`}
          >
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </span>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <Link
            href={dashboardPath}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <MdDashboard className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <MdPerson className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
            My Profile
          </Link>

          <Link
            href="/funding"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <MdAttachMoney className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
            Funding
          </Link>

          {/* Divider */}
          <div className="my-1 border-t border-gray-100" />

          {/* Logout */}
          <button
            onClick={() => {
              if (!isLoggingOut) handleLogout();
            }}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <MdLogout className="w-4 h-4 shrink-0" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <MdLogout className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
