import { Button } from "@/components/ui/button";
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";


const slides = [
  
  {
    id: 0,
    image:
      "/assets/img_swiper/7.png",
    title: "Webber Naturals",
    subtitle: "100% Chính hãng",
    link: "/products/webber-naturals", // 
  },
  {
    id: 1,
    image: "/assets/img_swiper/2.png",
    title: "GymStore",
    subtitle: "Giao diện mới",
    link: "/products/gymstore", // chuyển hướng màn hình 
  },
  {
    id: 2,
    image: "/assets/img_swiper/3.png" ,
    title: "Now Foods",
    subtitle: "Sản phẩm sức khỏe",
    link: "/products/now-foods", // 
  },
];




const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setActiveIndex(index);
    swiper?.slideTo(index);
  };

  const handleSlideClick = (link) => {
    navigate(link);
  };
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-white py-1">
      <div className="container mx-auto px-1">
        <div className="grid md:grid-cols-[76%_24%] gap-8 items-start">
          {/* Left content */}
          <section className="bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-0">
        {/* Swiper banner */}
        <Swiper
           spaceBetween={20}
           slidesPerView={1}
           loop={true}
           autoplay={{ delay: 5000  }}
           onSwiper={setSwiper}
           onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // chuyển slide cùng luôn với activeIndex     
           modules={[Autoplay]}
           className="w-full h-[520px] rounded-lg shadow-lg overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt={slide.title}
                onClick={() => handleSlideClick(slide.link)}
                className="w-full h-full object-fill cursor-pointer hover:opacity-90 transition-opacity"
              />
            </SwiperSlide>
          ))} 
        </Swiper>

        {/* 3 items navigation */}
        <div className="grid grid-cols-3 text-center mt-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleItemClick(index)}
              className={`py-2 border-b-2 transition-all ${
                activeIndex === index
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-gray-500 hover:text-primary"
              }`}
            >
              <div className="text-sm">{slide.title}</div>
              <div className="text-xs">{slide.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
          {/* Right content - Product showcase */}
          <div className="relative">
            <div className="relative">
              {/* 5G badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-accent text-accent-foreground rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold">
                 
                </div>
              </div>
              
              {/* Product images */}
              <div className="flex flex-col gap-2 h-[576px]">
                <img 
                  src="assets/img_swiper/4.png"
                  alt="Creatine container 1"
                  onClick={() => handleSlideClick("/products/creatine-monohydrate")}
                  className="w-full flex-1 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
                <img 
                  src="assets/img_swiper/5.png"
                  alt="Creatine container 2"
                  onClick={() => handleSlideClick("/products/creatine-monohydrate")}
                  className="w-full flex-1 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
                <img 
                  src="assets/img_swiper/6.png"
                  alt="Creatine container 3"
                  onClick={() => handleSlideClick("/products/creatine-monohydrate")}
                  className="w-full flex-1 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;