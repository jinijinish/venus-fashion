// service/products.ts
export interface Product {
  reviewCount: any;
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  dateAdded?: string;
  salesCount?: number;
  images?: string[];
  description?: string;
  specifications?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  // FEATURED Products
  {
    id: "1",
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&auto=format',
    brand: 'Belage Jewels',
    name: 'Givenchy Crystal and Stone Medium Drop Earrings',
    price: 250.00,
    rating: 5,
    reviews: 2,
    category: 'featured',
    isNew: false,
    isBestSeller: false,
    description: 'Elegant drop earrings featuring crystal and stone details from Givenchy. Perfect for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['Small', 'Medium', 'Large'],
    reviewCount: undefined
  },
  {
    id: "2",
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format',
    brand: 'Jenny Jewel',
    name: 'Diamond Studded Chandelier Gold Earring',
    price: 250.00,
    oldPrice: 280.00,
    discount: '-11%',
    rating: 4,
    reviews: 1,
    category: 'featured',
    isNew: false,
    isBestSeller: false,
    description: 'Stunning chandelier earrings with diamond studded details in gold.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Gold', 'Platinum'],
    sizes: ['Medium', 'Large'],
    reviewCount: undefined
  },
  {
    id: "3",
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&auto=format',
    brand: 'Cartier',
    name: '18K Gold Diamond Eternity Ring',
    price: 1250.00,
    oldPrice: 1500.00,
    discount: '-17%',
    rating: 5,
    reviews: 8,
    category: 'featured',
    isNew: false,
    isBestSeller: false,
    description: 'Classic eternity ring featuring diamonds set in 18K gold.',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Platinum', 'Rose Gold'],
    sizes: ['5', '6', '7', '8', '9'],
    reviewCount: undefined
  },
  {
    id: "4",
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&auto=format',
    brand: 'Tiffany & Co.',
    name: 'Platinum Diamond Tennis Bracelet',
    price: 3200.00,
    rating: 5,
    reviews: 12,
    category: 'featured',
    isNew: false,
    isBestSeller: false,
    description: 'Elegant tennis bracelet with diamonds set in platinum.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Platinum', 'White Gold'],
    sizes: ['6.5"', '7"', '7.5"', '8"'],
    reviewCount: undefined
  },
  {
    id: "5",
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&auto=format',
    brand: 'Bvlgari',
    name: 'Serpenti Rose Gold Diamond Watch',
    price: 5800.00,
    rating: 5,
    reviews: 6,
    category: 'featured',
    isNew: false,
    isBestSeller: false,
    description: 'Luxurious Serpenti watch with rose gold and diamond details.',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Rose Gold', 'Yellow Gold'],
    sizes: ['Small', 'Medium'],
    reviewCount: undefined
  },
  
  // NEW ARRIVALS
  {
    id: "6",
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop&auto=format',
    brand: 'Van Cleef & Arpels',
    name: 'Alhambra Vintage Mother of Pearl Pendant',
    price: 2950.00,
    rating: 5,
    reviews: 3,
    category: 'new',
    isNew: true,
    isBestSeller: false,
    dateAdded: '2024-02-15',
    description: 'Iconic Alhambra pendant with mother of pearl and gold detailing.',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Gold', 'Rose Gold'],
    sizes: ['16"', '18"', '20"'],
    reviewCount: undefined
  },
  {
    id: "7",
    image: 'https://images.unsplash.com/photo-1620656788840-8f330604b4b3?w=600&h=600&fit=crop&auto=format',
    brand: 'Chopard',
    name: 'Happy Hearts Rose Gold Diamond Necklace',
    price: 2150.00,
    oldPrice: 2400.00,
    discount: '-10%',
    rating: 5,
    reviews: 4,
    category: 'new',
    isNew: true,
    isBestSeller: false,
    dateAdded: '2024-02-10',
    description: 'Playful heart-shaped necklace with floating diamonds.',
    images: [
      'https://images.unsplash.com/photo-1620656788840-8f330604b4b3?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Rose Gold', 'White Gold'],
    sizes: ['16"', '18"'],
    reviewCount: undefined
  },
  {
    id: "8",
    image: 'https://images.unsplash.com/photo-1624984554156-7441ed70441a?w=600&h=600&fit=crop&auto=format',
    brand: 'Piaget',
    name: 'Possession Yellow Gold Diamond Ring',
    price: 2650.00,
    rating: 5,
    reviews: 2,
    category: 'new',
    isNew: true,
    isBestSeller: false,
    dateAdded: '2024-02-05',
    description: 'Rotating diamond ring from the Possession collection.',
    images: [
      'https://images.unsplash.com/photo-1624984554156-7441ed70441a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Yellow Gold', 'Rose Gold'],
    sizes: ['5', '6', '7', '8'],
    reviewCount: undefined
  },
  {
    id: "9",
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format',
    brand: 'Graff',
    name: 'Emerald Cut Diamond Solitaire 2ct',
    price: 9250.00,
    rating: 5,
    reviews: 1,
    category: 'new',
    isNew: true,
    isBestSeller: false,
    dateAdded: '2024-02-01',
    description: 'Stunning emerald cut diamond solitaire ring.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Platinum', 'White Gold'],
    sizes: ['5', '6', '7'],
    reviewCount: undefined
  },
  {
    id: "10",
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&auto=format',
    brand: 'Mikimoto',
    name: 'South Sea Golden Pearl Necklace',
    price: 4800.00,
    rating: 5,
    reviews: 2,
    category: 'new',
    isNew: true,
    isBestSeller: false,
    dateAdded: '2024-01-28',
    description: 'Luxurious South Sea golden pearl necklace.',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Gold', 'White'],
    sizes: ['16"', '18"', '20"'],
    reviewCount: undefined
  },
  
  // BEST SELLERS
  {
    id: "11",
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&auto=format',
    brand: 'David Yurman',
    name: 'Cable Classics Diamond Hoop Earrings',
    price: 1650.00,
    rating: 5,
    reviews: 45,
    category: 'best-seller',
    isNew: false,
    isBestSeller: true,
    salesCount: 234,
    description: 'Signature cable design hoop earrings with diamonds.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Silver', 'Gold'],
    sizes: ['Small', 'Medium', 'Large'],
    reviewCount: undefined
  },
  {
    id: "12",
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop&auto=format',
    brand: 'Pomellato',
    name: 'Nudo Rose Gold Amethyst Ring',
    price: 2850.00,
    oldPrice: 3100.00,
    discount: '-8%',
    rating: 5,
    reviews: 28,
    category: 'best-seller',
    isNew: false,
    isBestSeller: true,
    salesCount: 189,
    description: 'Colorful Nudo ring with amethyst in rose gold.',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Rose Gold', 'Gold'],
    sizes: ['5', '6', '7', '8'],
    reviewCount: undefined
  },
  {
    id: "13",
    image: 'https://images.unsplash.com/photo-1620656788840-8f330604b4b3?w=600&h=600&fit=crop&auto=format',
    brand: 'Buccellati',
    name: 'Ramage Yellow Gold Bracelet',
    price: 5400.00,
    rating: 5,
    reviews: 15,
    category: 'best-seller',
    isNew: false,
    isBestSeller: true,
    salesCount: 156,
    description: 'Intricate Ramage design bracelet in yellow gold.',
    images: [
      'https://images.unsplash.com/photo-1620656788840-8f330604b4b3?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Yellow Gold', 'White Gold'],
    sizes: ['6.5"', '7"', '7.5"'],
    reviewCount: undefined
  },
  {
    id: "14",
    image: 'https://images.unsplash.com/photo-1624984554156-7441ed70441a?w=600&h=600&fit=crop&auto=format',
    brand: 'Messika',
    name: 'Move Diamond Pavé Necklace',
    price: 3150.00,
    rating: 5,
    reviews: 32,
    category: 'best-seller',
    isNew: false,
    isBestSeller: true,
    salesCount: 278,
    description: 'Modern Move necklace with sliding diamonds.',
    images: [
      'https://images.unsplash.com/photo-1624984554156-7441ed70441a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['White Gold', 'Rose Gold'],
    sizes: ['16"', '18"'],
    reviewCount: undefined
  },
  {
    id: "15",
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format',
    brand: 'Harry Winston',
    name: 'Winston Cluster Diamond Earrings',
    price: 12500.00,
    rating: 5,
    reviews: 8,
    category: 'best-seller',
    isNew: false,
    isBestSeller: true,
    salesCount: 45,
    description: 'Spectacular Winston Cluster diamond earrings.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&auto=format'
    ],
    colors: ['Platinum', 'Diamond'],
    sizes: ['Small', 'Medium'],
    reviewCount: undefined
  }
];