import Loading from "@/components/shared/loading/Loading";
import { Suspense } from "react";
import HomeSwiper from "../sections/home-swiper.section";
import PromoBanner from "../sections/promo-banner.section";
import OurCategories from "../sections/our-categories.section";
import DealsBanner from "../sections/deals-banner.section";
import FeaturedProducts from "../sections/featured-products.section";
import Newsletter from "../sections/news-letter.section";

export default function HomeScreen() {
  return (
    <>
      <main>
        <HomeSwiper />
        <PromoBanner />
        <Suspense fallback={<Loading />}>
          <OurCategories />
        </Suspense>
        <DealsBanner />
        <Suspense fallback={<Loading />}>
          <FeaturedProducts />
        </Suspense>
        <Newsletter />
      </main>
    </>
  );
}
