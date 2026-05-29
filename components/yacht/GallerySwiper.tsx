"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { GalleryItem } from "@/lib/yacht/data";

export function GallerySwiper({ items }: { items: GalleryItem[] }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3200, disableOnInteraction: true }}
      grabCursor
      loop
      spaceBetween={18}
      slidesPerView={1.2}
      breakpoints={{
        560: { slidesPerView: 2.1 },
        900: { slidesPerView: 3.1 },
        1180: { slidesPerView: 4 },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <figure className="gallery-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <figcaption className="gallery-card__cap">
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
