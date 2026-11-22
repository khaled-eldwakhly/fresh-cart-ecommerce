import CartItem from "../components/CartItem";
import { CartItem as CartItemInterface } from "../types/cart.types";

export default function CartItems({ items }: { items: CartItemInterface[] }) {
  return (
    <>
      <section className={`grid grid-cols-6 gap-5 lg:flex-5 items-start`}>
        {items.map((item) => (
          <CartItem item={item} key={item.product._id} />
        ))}
      </section>
    </>
  );
}
