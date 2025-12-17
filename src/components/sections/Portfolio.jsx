import { useEffect, useMemo, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import "animate.css";

export default function Portfolio() {
    const [data, setData] = useState(null);
    const [sectionRef, inView] = useInView();

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "workSection"][0]{ heading, subheading, items[]{ title, image } }`)
            .then(setData)
            .catch(console.error);
    }, []);

    const items = useMemo(() => data?.items || [], [data]);

    return (
        <section
            ref={sectionRef}
            id="work"
            className={`relative bg-surface-soft py-16 md:py-24 lg:py-32 overflow-hidden ${inView ? "" : "opacity-0"}`}
        >
            {/* custom wide container */}
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10">

                {/* HEADER */}
                <div className={`mb-16 ${inView ? "animate__animated animate__fadeInUp animate__slow" : ""}`}>
                    <h2 className="text-text-light font-display uppercase tracking-[0.08em] text-[38px] md:text-[48px] lg:text-[60px] text-center lg:text-left">
                        {data?.heading || "MY WORK"}
                    </h2>

                    {data?.subheading && (
                        <p className="mt-3 text-text-light/65 font-body text-[13px] uppercase tracking-[0.22em] text-center lg:text-left">
                            {data.subheading}
                        </p>
                    )}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 xl:gap-20">
                    {(items.length ? items : Array.from({ length: 4 })).slice(0, 4).map((item, idx) => {
                        const imgUrl = item?.image ? urlFor(item.image).width(1400).quality(90).url() : null;

                        return (
                            <div
                                key={item?._key || idx}
                                className={`flex flex-col items-center ${inView ? "animate__animated animate__fadeInUp animate__slow" : ""}`}
                                style={{ animationDelay: inView ? `${idx * 0.12}s` : "0s" }}
                            >
                                {/* CARD */}
                                <div className="relative w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px] aspect-[9/16] rounded-[42px] border border-text-light/20 bg-black/10 shadow-[0px_26px_110px_rgba(0,0,0,0.65)] overflow-hidden transition-transform duration-300 hover:-translate-y-1">

                                    {/* INNER FRAME */}
                                    <div className="absolute inset-[12px] rounded-[32px] border border-text-light/12 pointer-events-none" />

                                    {/* IMAGE */}
                                    <div className="absolute inset-[22px] rounded-[28px] overflow-hidden bg-black/20">
                                        {imgUrl ? (
                                            <img
                                                src={imgUrl}
                                                alt={item?.title || "Work"}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-text-light/45 font-body text-[12px] tracking-[0.18em] uppercase">
                                                Upload in Sanity
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none" />
                                    </div>

                                    {/* TOP NOTCH */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-[5px] rounded-full bg-text-light/15" />
                                </div>

                                {/* CAPTION */}
                                <div className="mt-6 text-center">
                                    <div className="text-text-light/90 font-body uppercase tracking-[0.22em] text-[11px]">
                                        {item?.title || "WORK ITEM"}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
