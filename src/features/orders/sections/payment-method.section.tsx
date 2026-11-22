import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import AddressForm from "@/features/addresses/components/AddressForm";
import { UserAddresses } from "@/features/addresses/components/UserAddresses";
import { useCartStore } from "@/features/cart/store/cart.store";
import {
  faCircleInfo,
  faCreditCard,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PaymentMethodSkeleton from "../components/PaymentMethodSkeleton";
import { ShippingAddress } from "@/features/addresses/types/addresses.types";

export default function PaymentMethod({
  setOption,
  option,
  setAddress,
}: {
  setOption: React.Dispatch<React.SetStateAction<1 | 2>>;
  option: number;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddress | null>>;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  function onSuccess() {
    setRefreshKey((prev) => prev + 1);
  }

  const hasHydrated = useCartStore((state) => state.hasHydrated);
  if (!hasHydrated) {
    return <PaymentMethodSkeleton />;
  }

  return (
    <>
      <section className="bg-white p-4 shadow rounded-md space-y-4 xl:flex-3">
        <p className="heading font-bold">Payment Method</p>
        <div className="space-y-6">
          <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
            <Item
              className={`border-2 border-gray-200/70 p-4 cursor-pointer ${option === 1 && "border-primary-400 bg-primary-200/30"}`}
              onClick={() => setOption(1)}
            >
              <ItemContent className="gap-3">
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="text-3xl text-primary-600"
                  />
                  <div className="lg:flex lg:w-full lg:justify-between">
                    <div>
                      <ItemTitle className="font-semibold text-base">
                        Cash on Delivery
                      </ItemTitle>
                      <ItemDescription className="font-medium">
                        Pay when your order arrives
                      </ItemDescription>
                    </div>
                    <p className="text-primary-500 font-semibold">
                      No extra charges
                    </p>
                  </div>
                </div>
                <p className="border border-primary-500 rounded-md flex items-center justify-center p-3 gap-3 bg-primary-50 font-semibold">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-primary-600 text-lg"
                  />
                  <span className="text-primary-600">
                    Please keep exact change ready for hassle-free delivery
                  </span>
                </p>
              </ItemContent>
            </Item>
            <Item
              className={`border-2 border-gray-200/70 p-4 cursor-pointer ${option === 2 && "border-primary-400 bg-primary-200/30"}`}
              onClick={() => setOption(2)}
            >
              <ItemContent className="gap-3">
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-3xl text-primary-600"
                  />
                  <div className="lg:flex lg:w-full lg:justify-between">
                    <div>
                      <ItemTitle className="font-semibold text-base">
                        Online Payment
                      </ItemTitle>
                      <ItemDescription className="font-medium">
                        Pay securely with card or digital wallet
                      </ItemDescription>
                    </div>
                    <p className="text-primary-500 font-semibold">
                      Recommended
                    </p>
                  </div>
                </div>
                <p className="border border-blue-500 rounded-md flex items-center justify-center p-3 gap-3 bg-blue-50 font-semibold">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-blue-600 text-lg"
                  />
                  <span className="text-blue-600">
                    You will be redirected to secure payment getway to complete
                    your transaction
                  </span>
                </p>
              </ItemContent>
            </Item>
          </div>
          <UserAddresses refreshKey={refreshKey} setAddress={setAddress}/>
          <p className="text-primary-600 font-medium text-center mb-1">
            or add a new one
          </p>
          <AddressForm onSuccess={onSuccess}/>
        </div>
      </section>
    </>
  );
}
