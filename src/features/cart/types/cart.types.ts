import { Brand } from "@/features/brands/types/brands.types";
import {
  Category,
  SubCategory,

} from "@/features/categories/types/categories.types";

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartItem {
  count: number;
  _id?: string;
  product: ProductDetails;
  price: number;
  availableQuantity: number;
  // * created for UI logic
  discountValue?: number;
  salePercentage?: number;
}

export interface ProductDetails {
  subcategory: SubCategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
