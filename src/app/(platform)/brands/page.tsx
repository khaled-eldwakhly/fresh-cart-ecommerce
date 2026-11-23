import { getUserToken } from "@/features/auth/helpers/auth/auth";
import BrandsScreen from "@/features/brands/screens/brands.screen";

export const metadata = {
  title: "Brands",
};


export default async function Brands() {
  return (
    <>
      <BrandsScreen />
    </>
  );
}
