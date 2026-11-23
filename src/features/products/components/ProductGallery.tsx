"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselProps = {
  imgCover: string;
  imgs: string[];
  title: string;
};

export default function CarouselImg({ imgs, title, imgCover }: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  const allImages = [imgCover, ...imgs.filter((img) => img !== imgCover)];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {allImages.map((img, index) => (
            <CarouselItem key={img}>
              <div className="relative h-70 sm:h-80 md:h-100 lg:h-110 md:w-full">
                <Image
                  fill
                  alt={`${title} ${index + 1}`}
                  src={img}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="mx-auto object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {allImages.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Show image ${index + 1}`}
              className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all ${
                selected === index
                  ? "border-green-600 shadow-md"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
