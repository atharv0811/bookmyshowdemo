import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CardSkeleton = () => {
    return (
        <div className="relative w-full">
            <Swiper
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 15 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 25 },
                }}
            >
                {[...Array(6)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-[225px] sm:h-[270px] lg:h-[300px] bg-gray-300 rounded-lg animate-pulse" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSkeleton;
