import Banner from '@/components/home/Banner';
import BecomeHeroSection from '@/components/home/BecomeHeroSection';
import ContactSection from '@/components/home/ContactSection';
import HowBloodSyncWorks from '@/components/home/HowBloodSyncWorks';
import MarqueeSection from '@/components/home/MarqueeSection';
import WhyChooseBloodSync from '@/components/home/WhyChooseBloodSync';
import { getMarqueeData } from '@/lib/marquee';
import { ToastContainer } from 'react-toastify';

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stats`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    if (data.success) return data;
  } catch {}
  // fallback
  return { totalDonors: 0, totalRequests: 0, totalFunding: 0 };
}

export default async function Home() {
  const [items, stats] = await Promise.all([getMarqueeData(), getStats()]);
  return (
    <>
      <Banner stats={stats} />
      <MarqueeSection items={items} />
      <HowBloodSyncWorks />
      <WhyChooseBloodSync />
      <BecomeHeroSection />
      <ContactSection />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="light"
      />
    </>
  );
}
