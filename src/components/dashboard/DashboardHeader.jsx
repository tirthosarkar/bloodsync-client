'use client';

import { Avatar } from '@heroui/react';
import { FaBars, FaBell } from 'react-icons/fa';

export default function DashboardHeader({ user, toggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-red-600"
        >
          <FaBars size={20} />
        </button>
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-red-600 relative">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm text-gray-700">
            {user?.name}
          </span>
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
            <Avatar
              size="sm"
              className="cursor-pointer ring-2 ring-red-200 hover:ring-red-400 transition-all"
            >
              <Avatar.Image src={user?.image || user?.avatar} />
              <Avatar.Fallback>
                {user?.name ? user?.name?.charAt(0).toUpperCase() || 'U' : '?'}
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
