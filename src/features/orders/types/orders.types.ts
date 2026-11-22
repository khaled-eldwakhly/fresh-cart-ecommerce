import { Brand } from "@/features/brands/types/brands.types";
import {
  Category,
  SubCategory,
} from "@/features/categories/types/categories.types";

export type GetUserOrdersResponse = Order[];

export interface Order {
  shippingAddress?: OrderShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrderShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface OrderProduct {
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
