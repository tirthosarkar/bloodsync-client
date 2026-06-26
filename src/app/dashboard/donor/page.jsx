'use client';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function DonorDashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <p className="text-gray-600">This is your Donor Dashboard.</p>
    </div>
  );
}
