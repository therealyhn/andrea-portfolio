import { useEffect, useMemo, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "animate.css";
import PortfolioModal from "../portfolio/PortfolioModal";

export default function Portfolio() {
    const [data, setData] = useState(null);
    const [sectionRef, inView] = useInView();


    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "workSection"][0]{ heading, subheading, items[]{ _key, title, image, description, gallery } }`)
            .then(setData)
            .catch(console.error);
    }, []);

    const items = useMemo(() => data?.items || [], [data]);
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section
            ref={sectionRef}
            id="work"
            className={`relative bg-background-dark py-14 md:py-14 lg:py-14 ${inView ? "" : "opacity-0"}`}
        >
            <div className="max-w-[1750px] mx-auto">

                {/* Red overlay tint */}
                <div className="absolute inset-0 bg-surface-soft/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark" />

                {/* TITLE */}
                <div className={`${inView ? "animate__animated animate__fadeInUp animate__slow" : ""}`}>
                    <h2 className="text-text-light font-display uppercase tracking-[0.08em] text-[32px] sm:text-[40px] md:text-[50px] lg:text-[62px] text-center lg:text-left">
                        {data?.heading || "MY WORK"}
                    </h2>
                </div>

                {/* SWIPER */}
                <div className={`mt-8 md:mt-10 ${inView ? "animate__animated animate__fadeIn animate__slow" : ""}`}>
                    <div className="mb-4 md:mb-6 px-5 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            aria-label="Previous work item"
                            className="work-prev portfolio-nav-btn"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            aria-label="Next work item"
                            className="work-next portfolio-nav-btn"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{ nextEl: ".work-next", prevEl: ".work-prev" }}
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            480: { slidesPerView: 1.3, spaceBetween: 24 },
                            640: { slidesPerView: 1.8, spaceBetween: 32 },
                            768: { slidesPerView: 2, spaceBetween: 48 },
                            1024: { slidesPerView: 2, spaceBetween: 48 },
                            1280: { slidesPerView: 3, spaceBetween: 48 },
                            1536: { slidesPerView: 4, spaceBetween: 48 },
                        }}
                        className="portfolio-swiper !pb-14 !px-5"
                    >
                        {(items.length ? items : Array.from({ length: 6 })).map((item, idx) => {
                            const imgUrl = item?.image
                                ? urlFor(item.image).width(1500).quality(90).url()
                                : "/img/placeholders/1-1.jpg";

                            return (
                                <SwiperSlide key={item?._key || idx} className="!h-auto flex justify-center">
                                    <div className="flex flex-col items-center">

                                        {/* CARD */}
                                        <div
                                            onClick={() => item && setSelectedItem(item)}
                                            className={`
                                                relative
                                                w-[80vw] xs:w-[210px] sm:w-[250px] md:w-[350px] lg:w-[350px]
                                                max-w-[350px]
                                                aspect-[9/16]
                                                rounded-[20px] sm:rounded-[36px] md:rounded-[48px] lg:rounded-[48px]
                                                border border-text-light/30
                                                bg-black/10
                                                overflow-hidden
                                                shadow-[0px_24px_36px_rgba(0,0,0,0.36)] md:shadow-[0px_40px_40px_rgba(0,0,0,0.55)]
                                                transition-transform duration-300
                                                hover:translate-y-2
                                                cursor-pointer
                                            `}
                                        >
                                            {/* inner frame */}
                                            <div className="absolute inset-[6px] sm:inset-[10px] md:inset-[12px] rounded-[12px] sm:rounded-[24px] md:rounded-[36px] 
                                            border-4 border-text-light/10 pointer-events-none" />

                                            {/* image */}
                                            <div className="absolute inset-[11px] sm:inset-[16px] md:inset-[22px] rounded-[10px] sm:rounded-[18px] md:rounded-[32px] overflow-hidden bg-black/20">
                                                <img
                                                    src={imgUrl}
                                                    alt={item?.title || "Work"}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/40 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* LABEL */}
                                        <div className="mt-4 sm:mt-6 text-center">
                                            <span className="text-text-light/80 font-body uppercase tracking-[0.22em] text-[14px]">
                                                {item?.title || "WORK ITEM"}
                                            </span>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>

            {/* MODAL COMPONENT */}
            <PortfolioModal
                selectedItem={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
}
