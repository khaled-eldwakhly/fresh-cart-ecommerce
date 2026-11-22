import { Input } from "@/components/ui/input";
import {
  faAppStoreIos,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faEnvelope,
  faLeaf,
  faTags,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Star } from "lucide-react";

export default function Newsletter() {
  return (
    <>
      <section className="container section-padding">
        <div className="lg:flex bg-linear-to-b from-teal-100/50 to-40% to-white shadow-lg shadow-teal-100 rounded-xl p-8 gap-10">
          <div className="lg:flex-3">
            <div className="space-y-5 p-5">
              <div className="flex items-center gap-3">
                <div className="p-4 bg-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-lg text-white"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="uppercase text-teal-500 font-bold">
                    newsletter
                  </span>
                  <span className="text-gray-500">50,000+ subscribes</span>
                </div>
              </div>
              <h3 className="capitalize text-xl sm:text-3xl font-bold">
                Get the Freshest Updates{" "}
                <span className="text-primary-600">Delivered Free</span>
              </h3>
              <p className="text-gray-500 ">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
              <ul className="space-y-3.5 md:space-y-0 md:flex md:items-center md:gap-5 text-[13px] *:px-4 *:py-2 *:border *:border-primary-200 *:rounded-2xl *:space-x-2 *:flex *:items-center *:shadow *:shadow-primary-100">
                <li>
                  <div className="flex justify-center items-center bg-primary-100 rounded-full size-7.5 text-primary-600">
                    <FontAwesomeIcon icon={faLeaf} />
                  </div>
                  <span>Fresh Picks Weekly</span>
                </li>
                <li>
                  <div className="flex justify-center items-center bg-primary-100 rounded-full size-7.5 text-primary-600">
                    <FontAwesomeIcon icon={faTruck} />
                  </div>
                  <span>Free Delivery Codes</span>
                </li>
                <li>
                  <div className="flex justify-center items-center bg-primary-100 rounded-full size-7.5 text-primary-600">
                    <FontAwesomeIcon icon={faTags} />
                  </div>
                  <span>Members-Only Deals</span>
                </li>
              </ul>
              <div className="space-y-3 md:space-y-0 md:flex md:gap-3">
                <Input
                  placeholder="you@example.com"
                  className="md:grow p-3 md:h-full"
                />
                <button className="w-full md:w-45 bg-linear-to-r from-emerald-600 to-emerald-500 to-80% text-white rounded-xl p-3 shadow-sm hover:shadow-none shadow-teal-400 hover:scale-103 duration-150 group">
                  Subscribe{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="group-hover:ml-1 duration-150"
                  />
                </button>
              </div>
              <span className="text-gray-400 text-[12px] sm:text-sm">
                ✨ Unsubscribe anytime. No spam, ever.
              </span>
            </div>
          </div>
          <div className="bg-teal-200/70 w-px min-h-full hidden lg:block"></div>
          <div className="lg:flex-2">
            <div className="space-y-5 bg-slate-800 text-white p-5 rounded-2xl">
              <span className="block  w-fit bg-primary-400/15 text-primary-500 px-2.5 py-1.5 rounded-xl border border-primary-400  text-[12px] capitalize font-bold">
                📱 mobile app
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Shop Faster on Our App
              </h3>
              <p className="text-gray-400 text-sm">
                Get app-exclusive deals & 15% off your first order.
              </p>
              <ul className="*:bg-gray-50/10 *:border *:border-gray-50/20 *:rounded-xl *:px-4 *:py-2 *:flex *:items-center *:gap-3 space-y-4">
                <li>
                  <FontAwesomeIcon icon={faAppStoreIos} />
                  <div className="flex flex-col">
                    <span className="uppercase text-[12px] text-gray-200/60">
                      download on
                    </span>
                    <span>App Store</span>
                  </div>
                </li>
                <li>
                  <FontAwesomeIcon icon={faGooglePlay} />
                  <div className="flex flex-col">
                    <span className="uppercase text-[12px] text-gray-200/60">
                      get it on
                    </span>
                    <span>Google Play</span>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-3">
                <span className="flex items-center">
                  {[...Array(5)].map((star, index) => (
                    <Star
                      key={index}
                      className="size-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </span>
                <p className="text-sm text-gray-400">4.9 • 100K+ downloads</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
