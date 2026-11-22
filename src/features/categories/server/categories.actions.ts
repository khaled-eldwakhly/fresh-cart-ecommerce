import {
  CategoriesResponse,
  SpecificCategoryResponse
} from "../types/categories.types";

type GetCategoriesParams = {
  limit?: number;
  page?: number;
  keyword?: string;
  sort?: string;
};

export async function getAllCategories(
  params: GetCategoriesParams = {},
): Promise<CategoriesResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  const response = await fetch(
    `${process.env.BASE_URL_V_1}/categories${query ? `?${query}` : ""}`,
    {
      next: { revalidate: 900 },
    },
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function getSpecificCategory(
  categotyId: string,
): Promise<SpecificCategoryResponse> {
  const response = await fetch(
    `${process.env.BASE_URL_V_1}/categories/${categotyId}`,
  );
  if (!response.ok)
    throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  return data;
}
