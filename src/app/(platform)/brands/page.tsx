import { getUserToken } from "@/features/auth/helpers/auth/auth";
import BrandsScreen from "@/features/brands/screens/brands.screen";

export const metadata = {
  title: "Brands",
};


export default async function Brands() {
  const token = await getUserToken()
  console.log(token)
  return (
    <>
      <BrandsScreen />
    </>
  );
}
