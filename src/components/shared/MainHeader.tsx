import {
    faBoxOpen,
    faLayerGroup,
    faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderMode = "brands" | "products" | "categories";
export default function MainHeader({
  hearderMode,
}: {
  hearderMode: HeaderMode;
}) {
  const headerList = {
    brands: {
      heading: "Our Partner Brands",
      description: `Dicover quality products from our trusted brand partners. We've
        partnered with leading brands to bring you the best selection of
        fresh and organic products.`,
      colorsStyle:
        "bg-fuchsia-600 from-fuchsia-700 via-fuchsia-600 to-fuchsia-400",
      icon: faMedal,
    },
    products: {
      heading: "Our Products",
      description: `Discover our wide selection of fresh and organic products. From farm-fresh produce to pantry essentials, we bring you the best quality at the best prices.`,
      colorsStyle: "bg-blue-600 from-blue-700 via-blue-600 to-blue-400",
      icon: faBoxOpen,
    },
    categories: {
      heading: "Browse Our Categories",
      description: `Explore our wide range of categories, from fresh produce and dairy to bakery and pantry essentials. Find exactly what you need in just a few clicks.`,
      colorsStyle: "bg-violet-600 from-violet-700 via-violet-600 to-violet-400",
      icon: faLayerGroup,
    },
  };

  const selectedHeaderMode = headerList[hearderMode];
  return (
    <header className={`md:bg-linear-to-r ${selectedHeaderMode.colorsStyle}`}>
      <section className="container text-white py-9 flex flex-col gap-6 items-center md:flex-row">
        <div className="bg-white/20 size-40 shrink-0 rounded-xl flex justify-center items-center">
          <FontAwesomeIcon
            icon={selectedHeaderMode.icon}
            className="text-8xl text-white/60"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white/85">
            {selectedHeaderMode.heading}
          </h1>
          <p className="text-white/80 font-medium lg:text-lg lg:max-w-4/5">
            {selectedHeaderMode.description}
          </p>
        </div>
      </section>
    </header>
  );
}
