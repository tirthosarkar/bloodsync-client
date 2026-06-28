'use client';

import Marquee from 'react-fast-marquee';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { BsDropletFill } from 'react-icons/bs';

export default function ActivityTicker({ items = [] }) {
  if (!items?.length) return null;

  return (
    <section className="overflow-hidden border-y border-red-100 bg-gradient-to-r from-red-50 via-white to-emerald-50">
      {/* ================= MOBILE ================= */}

      <div className="block md:hidden">
        {/* Top Live Badge */}

        <div className="flex items-center gap-3 border-b border-red-100 bg-white px-4 py-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500" />

            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Live Community Activity
          </span>
        </div>

        <Marquee
          autoFill
          pauseOnHover
          speed={35}
          gradient={false}
          className="py-3"
        >
          {items.map(item => (
            <TickerCard key={item.id} item={item} mobile />
          ))}
        </Marquee>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden md:flex">
        <div className="flex w-60 shrink-0 items-center gap-3 border-r border-red-100 bg-white px-6">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500" />

            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
              LIVE
            </p>

            <p className="text-[11px] text-gray-500">Community Activity</p>
          </div>
        </div>

        <Marquee
          autoFill
          pauseOnHover
          speed={45}
          gradient
          gradientColor="#ffffff"
          gradientWidth={80}
          className="py-4"
        >
          {items.map(item => (
            <TickerCard key={item.id} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TickerCard({ item, mobile = false }) {
  return (
    <div
      className={`
        mx-2
        flex
        min-w-max
        items-center
        gap-3
        rounded-full
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg

        ${mobile ? 'px-3 py-2' : 'px-5 py-3'}
      `}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          rounded-full

          ${mobile ? 'h-8 w-8' : 'h-10 w-10'}

          ${
            item.type === 'blood'
              ? 'bg-red-100 text-red-600'
              : 'bg-emerald-100 text-emerald-600'
          }
        `}
      >
        {item.type === 'blood' ? (
          <BsDropletFill className={mobile ? 'text-sm' : 'text-lg'} />
        ) : (
          <FaHandHoldingHeart className={mobile ? 'text-sm' : 'text-lg'} />
        )}
      </div>

      <div>
        <h4
          className={`font-semibold text-gray-800 ${
            mobile ? 'text-xs' : 'text-sm'
          }`}
        >
          {item.title}
        </h4>

        <p className={`text-gray-500 ${mobile ? 'text-[10px]' : 'text-xs'}`}>
          {item.subtitle}

          <span className="mx-2">•</span>

          {item.time}
        </p>
      </div>
    </div>
  );
}
