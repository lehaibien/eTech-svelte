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
  image: Image;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export interface Brand {
  id: number;
  name: string;
  country: string;
  image: Image;
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

export interface Address {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
}

export type Order = {
  id: number;
  user: User;
  orderItems: CartItem[];
  orderStatus: number;
  createdAt: Date;
  modifiedAt: Date;
}

/*Id = user.Id,
Username = user.UserName,
Name = user.Name,
Email = user.Email,
PhoneNumber = user.PhoneNumber,
Image = user.Image,
Address = user.Address,
Orders = user.Orders,
*/

export type User = {
  id: string;
  userName: string;
  email: string;
  name: string;
  phoneNumber: string;
  image: Image;
  role: string;
  address: Address;
  orders: Order[];
}
