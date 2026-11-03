import Header from "@/components/layout/header"
import FooterSection from "@/components/layout/FooterSection"
import CollectionProducts from "@/components/collections/CollectionProducts";

interface PageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  
  return (
    <main>
      <Header/>
      <CollectionProducts 
        category={category}
        subcategory={subcategory}
      />
      <FooterSection/>
    </main>
  )
}