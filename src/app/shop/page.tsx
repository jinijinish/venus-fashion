import Header from "@/components/layout/header"
import FooterSection from "@/components/layout/FooterSection"
import HeroSection from "@/components/shop/HeroSection"
import ProductSection from "@/components/shop/ProductSection"
import MarqueeSection from "@/components/shop/MarqueeSection"
// import AddSection from "@/components/shop/AddSection"

export default function Home() {
  return (
    <main>
      <Header/>
      {/* <HeroSection/> */}
      {/* <MarqueeSection/> */}
      {/* <AddSection/> */}
      <ProductSection/>
      <FooterSection/>
    </main>
  )
}