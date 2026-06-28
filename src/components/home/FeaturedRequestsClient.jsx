'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import BloodRequestCard from '@/components/shared/BloodRequestCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function FeaturedRequestsClient({ requests, isLoggedIn }) {
  const router = useRouter();

  const handleViewDetails = id => {
    if (!isLoggedIn) {
      toast.info('Please log in to view request details.', {
        position: 'top-center',
        autoClose: 5000,
      });
      router.push('/auth/signin');
      return;
    }

    router.push(`/donation-requests/${id}`);
  };

  return (
    <>
      <style jsx global>{`
        /* === MAIN WRAPPER === */
        .swiper-wrapper-container {
          position: relative;
          width: 100%;
        }

        /* === SWIPER CORE === */
        .featured-swiper {
          /* Increased top padding from 10px to 24px so cards don't cut off when lifting up */
          padding: 24px 4px 42px;
          /* Negative margin keeps the section layout matching your original design spacing */
          margin-top: -14px;
        }

        .featured-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .featured-swiper .swiper-slide {
          display: flex;
          height: auto;
        }

        .featured-swiper .swiper-slide > div {
          width: 100%;
          height: 100%;
        }

        /* === CARD HOVER EFFECT === */
        .featured-card-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          /* Hardware acceleration prevents layout shaking/flickering during transit */
          will-change: transform, box-shadow;
          transition:
            transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .featured-card-wrapper:hover {
          transform: translateY(-8px);
          /* Enhanced shadow depth matches the higher floating distance */
          box-shadow: 0 22px 40px -10px rgba(0, 0, 0, 0.14);
        }

        /* === PAGINATION DOTS === */
        .featured-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .featured-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #fca5a5;
          opacity: 0.6;
          transition: all 0.3s ease;
          margin: 0 5px !important;
        }

        .featured-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: #dc2626;
          opacity: 1;
        }
      `}</style>

      <div className="swiper-wrapper-container">
        <Swiper
          className="featured-swiper"
          modules={[Navigation, Pagination, Autoplay, A11y]}
          navigation={{
            prevEl: '.custom-swiper-prev',
            nextEl: '.custom-swiper-next',
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          grabCursor
          loop={requests.length > 3}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          }}
        >
          {requests.map(req => (
            <SwiperSlide key={req._id}>
              <div className="featured-card-wrapper">
                <BloodRequestCard req={req} onViewDetails={handleViewDetails} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
