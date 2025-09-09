"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IImageCarouselProps {
  images: string[];
}

const ImgCarousel: React.FC<IImageCarouselProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={src}
            alt={`slide_${idx}`}
            width={1000}
            height={400}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImgCarousel;