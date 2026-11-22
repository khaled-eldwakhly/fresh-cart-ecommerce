export interface AddressResponse {
  status: string;
  message: string;
  data: Address[];
  // ^ for getLoggedUserAddresses endpoint
  results?: number;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}
