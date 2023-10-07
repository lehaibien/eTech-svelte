export interface Image {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  originalFileName: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  images: Image[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  image: Image;
}
