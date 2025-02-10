import { useRef } from "react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const CardSlider = ({ data }) => {
    const swiperRef = useRef(null);

    const imgUrl = localStorage.getItem('imgUrl')

    return (
        <>
            <Swiper
                modules={[A11y, Navigation]}
                spaceBetween={50}
                slidesPerView={2}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 15 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 25 },
                }}
                className="h-full"
            >
                {data.map((movie) => {
                    return (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/${movie.id}`} >
                                <div className="w-full h-full max-w-[150px] sm:max-w-[180px] lg:max-w-[200px] rounded-lg overflow-hidden relative cursor-pointer group">
                                    <img
                                        src={imgUrl + movie.poster_path}
                                        alt=""
                                        className="rounded-lg h-full object-cover"
                                    />
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <button
                className="absolute top-1/2 -left-[12px] lg:-left-[26px] -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute top-1/2 -right-[12px] lg:-right-[20px] -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </>
    )
}

export default CardSlider