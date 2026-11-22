import {
  ProductDetailsResponse,
  ProductsResponse,
} from "../types/products.types";

type GetProductsParams = {
  limit?: number;
  page?: number;
  brand?: string;
  category?: string;
  sort?: string;
  keyword?: string;
};

const apiKeyMap: Record<string, string> = {
  category: "category[in]",
};

export async function getAllProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(apiKeyMap[key] ?? key, String(value));
    }
  });

  const query = searchParams.toString();

  const response = await fetch(
    `${process.env.BASE_URL_V_1}/products${query ? `?${query}` : ""}`,
    { next: { revalidate: 300 } },
  );

  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);

  const data = await response.json();
  return data;
}

export async function getSpecificProducts(
  productId: string,
): Promise<ProductDetailsResponse> {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/products/${productId}`,
  );

  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);

  const data = await response.json();
  return data;
}
