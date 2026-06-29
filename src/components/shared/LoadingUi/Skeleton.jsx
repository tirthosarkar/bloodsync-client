// src/components/shared/MyRequestsSkeleton.jsx

export default function Skeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden min-w-0 animate-pulse">
      {/* ── Header ── */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-2">
          <div className="h-5 w-44 bg-gray-200 rounded-md" />
          <div className="h-3 w-64 bg-gray-100 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-16 bg-gray-100 rounded-full" />
          <div className="h-7 w-28 bg-gray-100 rounded-lg" />
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden lg:block">
        {/* thead */}
        <div className="flex items-center gap-4 px-6 py-3.5 bg-gray-50/70 border-b border-gray-100">
          {[180, 120, 120, 80, 120, 60].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-gray-200 rounded"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 border-b border-gray-100"
          >
            {/* Recipient */}
            <div className="flex flex-col gap-1.5" style={{ width: 180 }}>
              <div className="h-3.5 w-36 bg-gray-200 rounded" />
              <div className="h-2.5 w-28 bg-gray-100 rounded xl:hidden" />
            </div>
            {/* Location */}
            <div
              className="hidden xl:flex flex-col gap-1.5"
              style={{ width: 120 }}
            >
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-2.5 w-16 bg-gray-100 rounded" />
            </div>
            {/* Schedule */}
            <div
              className="hidden xl:flex flex-col gap-1.5"
              style={{ width: 120 }}
            >
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-2.5 w-14 bg-gray-100 rounded" />
            </div>
            {/* Blood Group */}
            <div style={{ width: 80 }}>
              <div className="h-6 w-12 bg-red-100 rounded-md" />
            </div>
            {/* Status */}
            <div className="flex flex-col gap-1.5" style={{ width: 120 }}>
              <div className="h-5 w-20 bg-amber-100 rounded-full" />
            </div>
            {/* Actions */}
            <div className="ml-auto">
              <div className="h-7 w-7 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile Card View ── */}
      <div className="block lg:hidden divide-y divide-gray-100">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 space-y-3">
            {/* top row */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-3 w-48 bg-gray-100 rounded" />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="h-5 w-10 bg-red-100 rounded" />
                <div className="h-6 w-6 bg-gray-100 rounded" />
              </div>
            </div>
            {/* date/time row */}
            <div className="flex items-center gap-3">
              <div className="h-3 w-28 bg-gray-100 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
            {/* status row */}
            <div className="flex items-center justify-between pt-1">
              <div className="h-5 w-20 bg-amber-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination Footer ── */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div className="h-3 w-40 bg-gray-100 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-gray-100 rounded-lg" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-7 w-7 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
