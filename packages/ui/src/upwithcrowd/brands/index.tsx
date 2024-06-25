"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ayasofyazilim-ui/atoms/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@repo/ayasofyazilim-ui/atoms/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

type BrandType = {
  title: string;
  href: string;
};
export function Brands({ brands }: { brands: BrandType[] }) {
  return (
    <div className="w-full flex justify-center bg-white relative">
      <div className="z-10 bg-gradient-to-r from-white to-transparent absolute left-0 w-60 h-full"></div>
      <Carousel
        className="w-full"
        plugins={[AutoScroll({ speed: 2, playOnInit: true })]}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          watchDrag: false,
        }}
      >
        <CarouselContent className="w-full flex mx-auto items-center">
          {brands.map((brand, key) => (
            <CarouselItem
              key={key}
              className="basis-1/3 md:basis-1/4 lg:basis-1/6 grow flex items-center justify-center p-4"
            >
              <div className="flex items-center justify-center max-w-32 grayscale-0 hover:grayscale-0 transition-all">
                <img src={brand.href} className="h-auto w-full " />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="z-10 bg-gradient-to-l from-white to-transparent absolute right-0 w-60 h-full"></div>
    </div>
  );
}
