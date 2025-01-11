import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';

import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import slide1 from '../../../assets/img/slide1.jpg';
import slide2 from '../../../assets/img/slide2.jpg';
import slide3 from '../../../assets/img/slide3.jpg';
import slide4 from '../../../assets/img/slide4.jpg';

const slides = [
    {
        title: "Run For Life",
        desc: "Age is just a number. Age can't stop you from running. The only thing stopping you from running is your thoughts. So stop thinking, just put on your shooes and start running.",
        img: slide1
    },
    {
        title: "Run Like Never Before",
        desc: "You have a great opportunity here to explore yourself. You can improve yourself beyond your imagination. So don't waste time, grab the opportunity today.",
        img: slide2
    },
    {
        title: "Improve Your Health",
        desc: "Running can be the best exercise for your health. It makes your fit and keeps your mind full of joy. So running is essential for your body and mind.",
        img: slide3
    },
    {
        title: "Meet New People",
        desc: "Many people from different countries participate in Marathon every year. So it is a great opportunity for you to meet new people from different countries and different culture as well.",
        img: slide4
    }
];

const txtContainerCss = 'w-full h-full absolute bottom-0 left-0 p-1 md:py-8 bg-[#1c0014a8]';
const titleCss = 'text-xl sm:text-3xl md:text-4xl font-bold text-lite dark:text-secondary uppercase mb-2 md:mb-5';
const descCss = 'text-sm sm:text-base lg:text-lg font-semibold text-white max-w-xl';

const Banner = () => {

    return (<section className="bg-secondary dark:bg-dark relative">
        <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            slidesPerView={1}
            effect="fade"
            autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
            }}
            navigation
            loop
        >
            {slides.map((slide, i)=>(<SwiperSlide key={i}>
                <div className="w-full h-[450px] md:h-full max-h-[calc(100vh-130px)] relative">
                    <div className={txtContainerCss}>
                        <div className="max-w-screen-xl h-full mx-auto px-2 flex flex-col justify-center">
                            <h2 className={titleCss}>
                                {slide.title}
                            </h2>
                            <p className={descCss}>
                            {slide.desc}
                            </p>
                        </div>
                    </div>
                    <img src={slide.img} className="w-full h-full object-cover" />
                </div>
            </SwiperSlide>))}
        </Swiper>
    </section>);
};

export default Banner;