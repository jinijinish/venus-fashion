// src/service/categoryData.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;  // Add rating field
  reviews?: number; // Add reviews count field
}

// Mock products data with ratings and reviews
export const productsByCategory: Record<number, Product[]> = {
  1: [ // Pendant
    { 
      id: 101, 
      name: 'Givenchy Crystal and Stone Medium Drop Earrings', 
      price: 250, 
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&auto=format', 
      category: 'Pendant',
      rating: 4,
      reviews: 2
    },
    { 
      id: 102, 
      name: 'Gold Pendant with Diamond Accent', 
      price: 199, 
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&auto=format', 
      category: 'Pendant',
      rating: 5,
      reviews: 8
    },
    { 
      id: 103, 
      name: 'Silver Pendant', 
      price: 89, 
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&auto=format', 
      category: 'Pendant',
      rating: 3,
      reviews: 4
    },
    { 
      id: 104, 
      name: 'Pearl Pendant', 
      price: 159, 
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format', 
      category: 'Pendant',
      rating: 4,
      reviews: 6
    },
  ],
  2: [ // Rings
    { 
      id: 201, 
      name: 'Diamond Ring', 
      price: 499, 
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&auto=format', 
      category: 'Rings',
      rating: 5,
      reviews: 12
    },
    { 
      id: 202, 
      name: 'Gold Ring', 
      price: 299, 
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&auto=format', 
      category: 'Rings',
      rating: 4,
      reviews: 7
    },
    { 
      id: 203, 
      name: 'Silver Ring', 
      price: 129, 
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&auto=format&sig=2', 
      category: 'Rings',
      rating: 4,
      reviews: 5
    },
  ],
  3: [ // Necklaces
    { 
      id: 301, 
      name: 'Gold Necklace', 
      price: 599, 
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&auto=format', 
      category: 'Necklaces',
      rating: 5,
      reviews: 15
    },
    { 
      id: 302, 
      name: 'Pearl Necklace', 
      price: 399, 
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format', 
      category: 'Necklaces',
      rating: 4,
      reviews: 9
    },
  ],
};

// Category names mapping
export const categoryNames: Record<number, string> = {
  1: 'Pendant',
  2: 'Rings',
  3: 'Necklaces',
  4: 'Bracelets',
  5: 'Earrings',
  6: 'Charm & Bangles',
  7: 'Anklets',
  8: 'Brooches',
  9: 'Cufflinks',
  10: 'Hair Jewelry',
  11: 'Toe Rings',
  12: 'Watch Charms',
};

export const getProductsByCategory = (categoryId: number): Product[] => {
  return productsByCategory[categoryId] || [];
};

export const getCategoryName = (categoryId: number): string => {
  return categoryNames[categoryId] || 'Category';
};