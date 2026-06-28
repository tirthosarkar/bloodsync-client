// src/components/shared/BloodRequestCard.jsx
'use client';

import {
  FaTint,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaEye,
  FaHospital,
} from 'react-icons/fa';

const BLOOD_GROUP_COLORS = {
  'A+': 'bg-red-500',
  'A-': 'bg-red-600',
  'B+': 'bg-rose-600',
  'B-': 'bg-rose-700',
  'O+': 'bg-orange-500',
  'O-': 'bg-orange-600',
  'AB+': 'bg-purple-500',
  'AB-': 'bg-purple-600',
};

export default function BloodRequestCard({ req, onViewDetails }) {
  const badgeColor = BLOOD_GROUP_COLORS[req.bloodGroup] || 'bg-red-600';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-visible relative p-6 flex flex-col h-full">
      {/* Blood Group Badge */}
      <div className="absolute -top-3 left-5 z-10">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${badgeColor} text-white rounded-full text-xs font-bold shadow-md border-2 border-white`}
        >
          <FaTint size={10} />
          {req.bloodGroup}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Recipient Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
          {req.recipientName}
        </h3>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <FaMapMarkerAlt className="text-red-400 shrink-0" size={12} />
          {req.recipientDistrictName}, {req.recipientUpazilaName}
        </p>

        {/* Details */}
        <div className="space-y-2 flex-1">
          {req.hospitalName && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaHospital className="text-gray-400 shrink-0" size={13} />
              <span className="truncate">{req.hospitalName}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendar className="text-gray-400 shrink-0" size={13} />
            <span>
              {new Date(req.donationDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock className="text-gray-400 shrink-0" size={13} />
            <span>{req.donationTime}</span>
          </div>
        </div>

        {/* Urgency indicator */}
        <div className="flex items-center gap-2 mt-4 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span className="text-xs text-green-600 font-medium">
            Pending · Needs donor
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onViewDetails(req._id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm shadow-red-200"
        >
          <FaEye size={13} />
          View Details
        </button>
      </div>
    </div>
  );
}
