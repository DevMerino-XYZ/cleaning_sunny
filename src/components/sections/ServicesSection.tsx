"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Service = {
  title: string;
  desc: string;
  image: string;
};

const services: Service[] = [
  {
    title: "General Cleaning",
    desc: "Routine maintenance cleaning to maintain cleanliness and organization.",
    image: "/images/gallery/general-cleaning.webp",
  },
  {
    title: "Deep Cleaning",
    desc: "Detailed, intensive cleaning targeting buildup and hard-to-reach areas.",
    image: "/images/gallery/deep-cleaning.webp",
  },
  {
    title: "Window Cleaning",
    desc: "Interior and exterior window cleaning for improved visibility and presentation.",
    image: "/images/gallery/window-cleaning.webp",
  },
  {
    title: "Office & Commercial Cleaning",
    desc: "Professional cleaning solutions tailored for offices and business environments.",
    image: "/images/gallery/office-commercial-cleaning.webp",
  },
  {
    title: "Residential Cleaning",
    desc: "Complete home cleaning services designed for comfort and hygiene.",
    image: "/images/gallery/residential-cleaning.webp",
  },
  {
    title: "Trash Removal",
    desc: "Efficient and organized waste removal services.",
    image: "/images/gallery/trash-removal.webp",
  },
  {
    title: "Move-In / Move-Out Cleaning",
    desc: "Thorough cleaning services to prepare properties before or after moving.",
    image: "/images/gallery/move-in-move-out-cleaning.webp",
  },
  {
    title: "Post-Construction Cleaning",
    desc: "Detailed cleanup after renovations or construction projects.",
    image: "/images/gallery/post-construction-cleaning.webp",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-16">
          Our Cleaning Services
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl group">
                
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-6 text-left text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}