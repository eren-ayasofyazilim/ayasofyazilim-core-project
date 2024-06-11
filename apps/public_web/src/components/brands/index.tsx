"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

export function Brands() {
  return (
    <div className="w-full flex justify-center bg-white">
      <Carousel
        className="w-full"
        plugins={[AutoScroll()]}
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          watchDrag: false,
        }}
      >
        <CarouselContent className="w-full flex mx-auto">
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/12">
              <div className="p-1 flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
