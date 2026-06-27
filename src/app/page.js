import Banner from '@/components/home/Banner';
import BecomeHeroSection from '@/components/home/BecomeHeroSection';
import HowBloodSyncWorks from '@/components/home/HowBloodSyncWorks';
import WhyChooseBloodSync from '@/components/home/WhyChooseBloodSync';

export default function Home() {
  return (
    <>
      <Banner />
      <HowBloodSyncWorks />
      <WhyChooseBloodSync />
      <BecomeHeroSection />
    </>
  );
}
