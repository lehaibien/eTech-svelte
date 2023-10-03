export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: number;
  name: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  brand: Brand;
  images: string[];
  createdAt: Date;
  modifiedAt: Date;
}
