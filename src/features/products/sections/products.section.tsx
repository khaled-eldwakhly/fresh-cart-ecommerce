import ProductCard from "../components/ProductCard";
import { Product } from "../types/products.types";

export default function ProductsSection({
  products,
  featuredGlag,
}: {
  products: Product[];
  featuredGlag: boolean;
}) {
  return (
    <>
      <section className={`${!featuredGlag && "container page-padding"}`}>
        <div className="grid grid-cols-12 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard info={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
}
