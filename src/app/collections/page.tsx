import Header from "@/components/layout/header"
import FooterSection from "@/components/layout/FooterSection"
import CollectionsHero from "@/components/collections/CollectionsHero"
import CategoriesGrid from "@/components/collections/CategoriesGrid"

export default function CollectionsPage() {
  return (
    <main>
      <Header/>
      <CollectionsHero/>
      <CategoriesGrid/>
      <FooterSection/>
    </main>
  )
}