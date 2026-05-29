"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ProgramDay } from "@/lib/yacht/data";
import { Clock } from "@/components/yacht/icons";

export function ProgramSwiper({ days }: { days: ProgramDay[] }) {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      grabCursor
      spaceBetween={20}
      slidesPerView={1.08}
      breakpoints={{
        640: { slidesPerView: 1.6 },
        900: { slidesPerView: 2.2 },
        1180: { slidesPerView: 3 },
      }}
    >
      {days.map((day) => (
        <SwiperSlide key={day.day}>
          <article className="program-card">
            <span className="program-card__day">{day.day}</span>
            <span className="program-card__date">{day.date}</span>
            <h3 className="program-card__title">{day.title}</h3>
            <p className="program-card__summary">{day.summary}</p>
            <ul className="program-card__schedule">
              {day.schedule.map((slot) => (
                <li key={slot.time}>
                  <b>{slot.time}</b>
                  <span>{slot.label}</span>
                </li>
              ))}
            </ul>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
