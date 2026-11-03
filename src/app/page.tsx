import Image from "next/image";
import Header from "@/components/layout/header";
import FooterSection from "@/components/layout/FooterSection";
import HeroSection from "@/components/home/hero-section";
import InfoSection from "@/components/home/InfoSection";
import TrendingSection from "@/components/home/trending-section";
import PopularSection from "@/components/home/PopularSection";
import CTASection from "@/components/home/CTASection";
import WelcomeSection from "@/components/home/WelcomeSection";
import JewelryTestimonial from "@/components/home/JewelryTestimonial";
import BgSection from "@/components/home/BgSection";
import PressAndSocialSection from "@/components/home/PressAndSocialSection";
import ShopSection from "@/components/home/ShopSection";
import FloatingSection from "@/components/layout/FloatingSection";

export default function Home() {
  return (
    <main>
      <Header/>
      <HeroSection/>
      <InfoSection/>
      <TrendingSection/>
      <PopularSection/>
      <CTASection/>
      <WelcomeSection/>
      {/* <ShopSection/> */}
      <JewelryTestimonial/>
      <BgSection/>
      <PressAndSocialSection/>
      <FooterSection/>  
      {/* <FloatingSection/> */}
    </main>
    
  );
}
