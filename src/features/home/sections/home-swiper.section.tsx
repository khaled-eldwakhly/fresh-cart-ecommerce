"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import homeSlider1 from "@/assets/images/home-slider-1.png";
import homeSlider2 from "@/assets/images/home-slider-2.jpg";
import homeSlider3 from "@/assets/images/home-slider-3.jpg";
import {
  faChevronLeft,
  faChevronRight,
  faPalette,
  faTags,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function HomeSwiper() {
  return (
    <>
      <section className="bg-amber-100">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          pagination={{ clickable: true }}
          slidesPerView={1}
          className="relative"
        >
          <SwiperSlide className="relative">
            <Image
              priority
              src={homeSlider1}
              alt="home slider 1"
              className="bg-amber-50 w-full h-100 object-cover"
            />
            <div className="bg-green-500/60 absolute inset-0 flex justify-start items-center">
              <div className="container text-white space-y-4">
                <div className="space-y-2">
                  <h2 className="capitalize text-xl sm:text-2xl font-bold space-x-2">
                    <span>fresh product delivered to your door</span>
                    <FontAwesomeIcon icon={faTruckArrowRight} />
                  </h2>
                  <p className="font-medium">Get 20% off on your first order</p>
                  <button className="bg-white text-emerald-400 font-semibold px-3 py-1 rounded-md border-2 border-transparent hover:border-primary-500 duration-150">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <Image
              priority
              src={homeSlider2}
              alt="home slider 2"
              className="bg-amber-50 w-full h-100 object-cover"
            />
            <div className="bg-fuchsia-600/30 absolute inset-0 flex justify-start items-center">
              <div className="container text-white space-y-4">
                <div className="space-y-2">
                  <h2 className="capitalize text-xl sm:text-2xl font-bold space-x-2">
                    <span>your store. your style</span>
                    <FontAwesomeIcon icon={faPalette} />
                  </h2>
                  <p className="font-medium">
                    Shop the latest trends anytime, anywhere
                  </p>
                </div>
                <button className="bg-transparent text-white font-semibold px-3 py-1 rounded-md border-2 hover:bg-white/20 duration-150">
                  Explore Now
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <Image
              priority
              src={homeSlider3}
              alt="home slider 3"
              className="bg-amber-50 w-full h-100 object-cover"
            />
            <div className="bg-rose-400/45 absolute inset-0 flex justify-start items-center">
              <div className="container text-white space-y-4">
                <div className="space-y-2">
                  <h2 className="capitalize text-xl sm:text-2xl font-bold space-x-2">
                    <span>biggest deals of the season</span>
                    <FontAwesomeIcon icon={faTags} />
                  </h2>
                  <p className="font-medium">
                    Save big on your favorite products. Limited time only
                  </p>
                </div>
                <button className="bg-transparent text-white font-semibold px-3 py-1 rounded-md border-2 hover:bg-white/20 duration-150">
                  Save the Deals
                </button>
              </div>
            </div>
          </SwiperSlide>
          <button className="hidden custom-next absolute top-1/2 right-4 lg:right-8 xl:right-10 -translate-y-1/2  z-10 bg-white hover:bg-white/80 cursor-pointer size-8 rounded-full sm:flex items-center justify-center text-gray-800">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button className="hidden custom-prev absolute top-1/2 left-4 lg:left-8 xl:left-10 -translate-y-1/2 z-10 bg-white hover:bg-white/80 cursor-pointer size-8 rounded-full sm:flex items-center justify-center text-gray-800">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Swiper>
      </section>
    </>
  );
}
