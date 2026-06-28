import Banner from '@/components/home/Banner';
import BecomeHeroSection from '@/components/home/BecomeHeroSection';
import ContactSection from '@/components/home/ContactSection';
import HowBloodSyncWorks from '@/components/home/HowBloodSyncWorks';
import MarqueeSection from '@/components/home/MarqueeSection';
import WhyChooseBloodSync from '@/components/home/WhyChooseBloodSync';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>
      <Banner />
      <MarqueeSection />
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
