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

const Banner = () => {
    const txtContainerCss = 'w-full h-full absolute bottom-0 left-0 px-3 md:px-10 py-2 md:py-8 bg-[#1c0014a8]';
    const titleCss = 'text-base md:text-2xl lg:text-4xl font-bold text-lite dark:text-secondary uppercase mb-2 md:mb-5';
    const descCss = 'text-sm md:text-base lg:text-lg font-semibold text-[#cecece] dark:text-dark-lite max-w-xl';

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
            <SwiperSlide>
                <div className="w-full h-[450px] md:h-full max-h-screen relative">
                    <div className={txtContainerCss}>
                        <div className="absolute p-4 md:pl-20 bottom-0 md:bottom-1/2 left-0 md:translate-y-1/2">
                            <h2 className={titleCss}>Run For Life</h2>
                            <p className={descCss}>Age is just a number. Age can&apos;t stop you from running. The only thing stopping you from running is your thoughts. So stop thinking, just put on your shooes and start running.</p>
                        </div>
                    </div>
                    <img src={slide1} className="w-full h-full object-cover" />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="w-full h-[450px] md:h-full max-h-screen relative">
                    <div className={txtContainerCss}>
                        <div className="absolute p-4 md:pl-20 bottom-0 md:bottom-1/2 left-0 md:translate-y-1/2">
                            <h2 className={titleCss}>Run Like Never Before</h2>
                            <p className={descCss}>You have a great opportunity here to explore yourself. You can improve yourself beyond your imagination. So don&apos;t waste time, grab the opportunity today.</p>
                        </div>
                    </div>
                    <img src={slide2} className="w-full h-full object-cover" />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="w-full h-[450px] md:h-full max-h-screen relative">
                    <div className={txtContainerCss}>
                        <div className="absolute p-4 md:pl-20 bottom-0 md:bottom-1/2 left-0 md:translate-y-1/2">
                            <h2 className={titleCss}>Improve Your Health</h2>
                            <p className={descCss}>Running can be the best exercise for your health. It makes your fit and keeps your mind full of joy. So running is essential for your body and mind.</p>
                        </div>
                    </div>
                    <img src={slide3} className="w-full h-full object-cover" />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="w-full h-[450px] md:h-full max-h-screen relative">
                    <div className={txtContainerCss}>
                        <div className="absolute p-4 md:pl-20 bottom-0 md:bottom-1/2 left-0 md:translate-y-1/2">
                            <h2 className={titleCss}>Meet New People</h2>
                            <p className={descCss}>Many people from different countries participate in Marathon every year. So it is a great opportunity for you to meet new people from different countries and different culture as well.</p>
                        </div>
                    </div>
                    <img src={slide4} className="w-full h-full object-cover" />
                </div>
            </SwiperSlide>
        </Swiper>
    </section>);
};

export default Banner;