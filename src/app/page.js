// import Image from "next/image";

import BecomeHeroSection from '@/components/home/BecomeHeroSection';
import HowBloodSyncWorks from '@/components/home/HowBloodSyncWorks';
import WhyChooseBloodSync from '@/components/home/WhyChooseBloodSync';

export default function Home() {
  return (
    <>
      <HowBloodSyncWorks />
      <WhyChooseBloodSync />
      <BecomeHeroSection />
    </>
  );
}
