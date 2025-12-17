import { useEffect, useMemo, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "animate.css";

export default function Portfolio() {
    const [data, setData] = useState(null);
    const [sectionRef, inView] = useInView();

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "workSection"][0]{ heading, subheading, items[]{ _key, title, image } }`)
            .then(setData)
            .catch(console.error);
    }, []);

    const items = useMemo(() => data?.items || [], [data]);

    return (
        <section
            ref={sectionRef}
            id="work"
            className={`relative bg-surface-soft py-14 md:py-14 lg:py-14 overflow-hidden ${inView ? "" : "opacity-0"}`}
        >
            <div className="max-w-[1750px] mx-auto px-3 sm:px-6 lg:px-10">

                {/* TITLE */}
                <div className={`${inView ? "animate__animated animate__fadeInUp animate__slow" : ""}`}>
                    <h2 className="text-text-light font-display uppercase tracking-[0.08em] text-[32px] sm:text-[40px] md:text-[50px] lg:text-[62px] text-center lg:text-left">
                        {data?.heading || "MY WORK"}
                    </h2>

                    {/* {data?.subheading && (
                        <p className="mt-3 text-text-light/65 font-body text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-center lg:text-left">
                            {data.subheading}
                        </p>
                    )} */}
                </div>

                {/* SWIPER */}
                <div className={`mt-8 md:mt-10 ${inView ? "animate__animated animate__fadeIn animate__slow" : ""}`}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{ nextEl: ".work-next", prevEl: ".work-prev" }}
                        pagination={{ clickable: true }}
                        spaceBetween={1}
                        slidesPerView={1}
                        breakpoints={{
                            480: { slidesPerView: 1.3, spaceBetween: 24 },
                            640: { slidesPerView: 1.8, spaceBetween: 32 },
                            768: { slidesPerView: 2.2, spaceBetween: 48 },
                            // Desktop – 3 large cards (unchanged)
                            1024: { slidesPerView: 3, spaceBetween: 1 },
                            1280: { slidesPerView: 3, spaceBetween: 1 },
                            1536: { slidesPerView: 3, spaceBetween: 1 },
                        }}
                        className="!pb-14"
                    >
                        {(items.length ? items : Array.from({ length: 6 })).map((item, idx) => {
                            const imgUrl = item?.image
                                ? urlFor(item.image).width(1500).quality(90).url()
                                : null;

                            return (
                                <SwiperSlide key={item?._key || idx} className="!h-auto flex justify-center">
                                    <div className="flex flex-col items-center">

                                        {/* CARD */}
                                        <div
                                            className={`
                                                relative md:mt-10 md:mb-5
                                                w-[80vw] xs:w-[210px] sm:w-[250px] md:w-[350px] lg:w-[350px]
                                                max-w-[350px]
                                                aspect-[9/16]
                                                rounded-[20px] sm:rounded-[36px] md:rounded-[48px] lg:rounded-[48px]
                                                border border-text-light/15
                                                bg-black/10
                                                overflow-hidden
                                                shadow-[0px_24px_36px_rgba(0,0,0,0.36)] md:shadow-[0px_40px_80px_rgba(0,0,0,0.55)]
                                                transition-transform duration-300
                                                hover:translate-y-2
                                            `}
                                        >
                                            {/* inner frame */}
                                            <div className="absolute inset-[6px] sm:inset-[10px] md:inset-[12px] rounded-[12px] sm:rounded-[24px] md:rounded-[36px] border border-text-light/10 pointer-events-none" />

                                            {/* image */}
                                            <div className="absolute inset-[11px] sm:inset-[16px] md:inset-[22px] rounded-[10px] sm:rounded-[18px] md:rounded-[32px] overflow-hidden bg-black/20">
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={item?.title || "Work"}
                                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-text-light/45 font-body text-[12px] uppercase tracking-[0.18em]">
                                                        Upload in Sanity
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black/40 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* LABEL */}
                                        <div className="mt-4 sm:mt-6 text-center">
                                            <span className="text-text-light/80 font-body uppercase tracking-[0.22em] text-[11px]">
                                                {item?.title || "WORK ITEM"}
                                            </span>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* NAV */}
                    {/* <div className="mt-6 flex items-center justify-center gap-4">
                        <button className="work-prev w-12 h-12 rounded-full border border-text-light/25 text-text-light/80 hover:bg-text-light hover:text-background-dark transition-all duration-300">
                            ←
                        </button>
                        <button className="work-next w-12 h-12 rounded-full border border-text-light/25 text-text-light/80 hover:bg-text-light hover:text-background-dark transition-all duration-300">
                            →
                        </button>
                    </div> */}
                </div>

            </div>
        </section>
    );
}
