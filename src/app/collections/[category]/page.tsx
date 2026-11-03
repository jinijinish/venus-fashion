import Header from "@/components/layout/header"
import FooterSection from "@/components/layout/FooterSection"
import CollectionProducts from "@/components/collections/CollectionProducts";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  return (
    <main>
      <Header />
      <CollectionProducts category={category} />
      <FooterSection />
    </main>
  );
}