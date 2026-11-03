import { products } from '@/service/products';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
// Remove WishlistProvider import

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for each product
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Parse the ID to handle both string and number
  const numericId = parseInt(id);
  const productId = isNaN(numericId) ? id : numericId;
  
  // Find product by either string or number ID
  const product = products.find(p => p.id === productId || String(p.id) === id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: `${product.name} - ${product.brand} | Jewelry Store`,
    description: `Shop ${product.name} by ${product.brand}. ${product.rating} stars, ${product.reviews} reviews.`,
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: `Shop ${product.name} by ${product.brand}. ${product.rating} stars, ${product.reviews} reviews.`,
      images: [product.image],
    },
  };
}

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  
  // Parse the ID to handle both string and number
  const numericId = parseInt(id);
  const productId = isNaN(numericId) ? id : numericId;
  
  // Find product by either string or number ID
  const product = products.find(p => p.id === productId || String(p.id) === id);
  
  if (!product) {
    notFound();
  }

  return (
    <CartProvider>
      {/* Remove WishlistProvider wrapper */}
      <ProductDetailClient product={product} />
    </CartProvider>
  );
}