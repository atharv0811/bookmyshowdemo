import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import SliderSkeleton from './skeletons/slider-skeleton';
import { Link } from 'react-router-dom';

const Slider = ({ data }) => {
    const imgUrl = localStorage.getItem('imgUrl')

    if (!data || data.length === 0) return <SliderSkeleton />;

    return (
        <Swiper
            modules={[Autoplay, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                pauseOnMouseEnter: true
            }}
        >
            {
                data.slice(0, 5).map((item) => {
                    return (
                        <SwiperSlide key={item.id} className='h-[25rem]'>
                            <div className="w-full h-full relative">
                                <img
                                    src={imgUrl + item.backdrop_path}
                                    alt=""
                                    className="w-full h-full object-center"
                                />
                            </div>

                            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

                            <div className="container mx-auto">
                                <div className="absolute bottom-0 max-w-md px-4 lg:ps-14 mb-6">
                                    <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-5xl drop-shadow-2xl">
                                        {item.title}
                                    </h2>
                                    <p className="text-white text-ellipsis line-clamp-3 my-2">
                                        {item.overview}
                                    </p>
                                    <div className="text-white flex items-center gap-4">
                                        <p>Ratings: {Number(item.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>Views: {Number(item.popularity).toFixed()}</p>
                                    </div>
                                    <Link to={`/${item.id}`}>
                                        <button className="bg-gradient-to-tr from-[#13253e] to-[#275aa1] px-4 py-2 text-gray-300 font-bold rounded-lg mt-4 shadow-md hover:scale-110 transition-all">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default Slider