import Header from "@/components/layout/header"
import FooterSection from "@/components/layout/FooterSection"
import CartSection from "@/components/cart/CartSection"

export default function Home() {
  return (
    <main>
        <Header/>
        <CartSection/>
        <FooterSection/>
    </main>
  )
}