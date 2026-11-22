import {
  AllBrandsResponse,
  SpecificBrandResponse,
} from "../types/brands.types";

export async function getAllBrands(): Promise<AllBrandsResponse> {
  const response = await fetch(`${process.env.BASE_URL_V_1}/brands`, {
    next: { revalidate: 900 },
  });
  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  return data;
}

export async function getSpecificBrand(
  brandId: string,
): Promise<SpecificBrandResponse> {
  const response = await fetch(`${process.env.BASE_URL_V_1}/brands/${brandId}`);
  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  return data;
}
