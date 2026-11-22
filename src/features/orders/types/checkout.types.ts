import { ShippingAddress } from "@/features/addresses/types/addresses.types";
import { Product } from "@/features/products/types/products.types";

export interface CreateCashOrderResponse {
  status: string;
  message: string;
  user: User;
  pricing: Pricing;
  data: Data;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Pricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}

export interface Data {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User2;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface User2 {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface CheckoutResponse {
  status: string
  session: Session
}

export interface Session {
  url: string
  success_url: string
  cancel_url: string
}
