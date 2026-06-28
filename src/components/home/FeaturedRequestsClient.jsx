// src/components/home/FeaturedRequestsClient.jsx
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import BloodRequestCard from '@/components/shared/BloodRequestCard';

export default function FeaturedRequestsClient({ requests, isLoggedIn }) {
  const router = useRouter();

  const handleViewDetails = id => {
    if (!isLoggedIn) {
      toast.info('Please log in to view request details.');
      router.push('/auth/signin');
      return;
    }
    router.push(`/donation-requests/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map(req => (
        <BloodRequestCard
          key={req._id}
          req={req}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
}
