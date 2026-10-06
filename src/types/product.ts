export type ProductCategory =
  | 'Snacks'
  | 'Sweets'
  | 'Karjikay'
  | 'Karam & Spices'
  | 'Pickles'
  | 'Farm Products';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: '1 kg';
  category: ProductCategory;
  image: string;
  description: string;
  available: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  unit: '1 kg';
  quantity: number;
  image: string;
}
