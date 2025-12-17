import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import "animate.css";

export default function About() {
    const [about, setAbout] = useState(null);
    const [sectionRef, inView] = useInView();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "about"][0]{ leftTitle, leftText, centerImage, rightTitle, experiences[]
                    {role, company, period, description}, educationTitle, education[]{school, program, period} }`
            )
            .then(setAbout)
            .catch(console.error);
    }, []);

    const imageUrl = about?.centerImage
        ? urlFor(about.centerImage).width(900).quality(90).url()
        : null;

    return (
        <section
            ref={sectionRef}
            id="about"
            className={`relative bg-background-dark py-16 md:py-24 lg:py-28 overflow-hidden transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
        >
            {/* Scroll indicator (mobile centered, desktop right) */}
            <a
                href="#work"
                className="absolute left-1/2 bottom-10 md:bottom-2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
                 text-text-light uppercase tracking-[0.45em] 
                text-[9px] font-body animate__fadeInDown animate__infinite animate__slower"
            >
                <svg
                    className="w-14 h-14 md:w-16 md:h-16 opacity-70 animate__animated animate__fadeInDown animate__infinite animate__slower"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 26L32 40L46 26"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start lg:items-center">

                    {/* LEFT */}
                    <div className={`lg:col-span-4 text-center lg:text-left ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-1s" : "opacity-0"}`}>
                        <h2 className={`text-text-light font-display uppercase tracking-[0.08em] text-[22px] sm:text-[24px] md:text-[32px] lg:text-[36px] mb-6 ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-1s" : "opacity-0"}`}>
                            {about?.leftTitle || "About"}
                        </h2>

                        <p className={`text-text-light/75 font-body leading-relaxed text-[14px] md:text-[16px] max-w-md mx-auto lg:mx-0 ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-2s" : "opacity-0"}`}>
                            {about?.leftText || ""}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                            <a
                                href="#contact"
                                className={`w-full sm:w-auto text-center px-10 py-3 rounded-full bg-text-light text-background-dark uppercase tracking-[0.3em] text-[10px] border border-text-light transition-all duration-300 hover:bg-background-dark hover:text-text-light hover:-translate-y-[1px] ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-3s" : "opacity-0"}`}
                            >
                                Contact
                            </a>

                            <a
                                href="#portfolio"
                                className={`w-full sm:w-auto text-center px-10 py-3 rounded-full border border-text-light text-text-light/80 uppercase tracking-[0.3em] text-[10px] transition-all duration-300 hover:bg-text-light hover:text-background-dark hover:-translate-y-[1px] ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-4s" : "opacity-0"}`}
                            >
                                My work
                            </a>
                        </div>
                    </div>

                    {/* MOBILE SEPARATOR */}
                    <div className={`lg:hidden my-14 w-full flex justify-center ${inView ? "animate__animated animate__fadeIn animate__slow animate__delay-4s" : "opacity-0"}`}>
                        <span className="w-20 h-px bg-text-light/25"></span>
                    </div>

                    {/* CENTER IMAGE – DESKTOP ONLY */}
                    <div className={`hidden lg:flex lg:col-span-4 justify-center ${inView ? "animate__animated animate__fadeIn animate__slow animate__delay-2s" : "opacity-0"}`}>
                        <div className="relative w-[380px] h-[540px] md:w-[460px] md:h-[640px] lg:w-[520px] lg:h-[720px]">
                            <div className="absolute inset-0 rounded-[9999px] border border-text-light/25 bg-black/10 shadow-[0px_30px_120px_rgba(0,0,0,0.65)]" />
                            <div className="absolute inset-[26px] rounded-[9999px] border border-text-light/15" />
                            <div className="absolute inset-[50px] rounded-[9999px] overflow-hidden bg-black/20">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="About portrait"
                                        className={`w-full h-full object-cover ${inView ? "animate__animated animate__fadeIn animate__slow animate__delay-3s" : "opacity-0"}`}
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-text-light/50 text-sm ${inView ? "animate__animated animate__fadeIn animate__slow animate__delay-3s" : "opacity-0"}`}>
                                        Upload image in Sanity
                                    </div>
                                )}
                            </div>
                            <div className="absolute -inset-10 rounded-[9999px] blur-5xl opacity-40 pointer-events-none" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className={`lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-3s" : "opacity-0"}`}>
                        <h3 className={`text-text-light font-display uppercase tracking-[0.08em] text-[28px] lg:text-[36px] mb-6 ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-4s" : "opacity-0"}`}>
                            {about?.rightTitle || "Work experience"}
                        </h3>
                        <div className="space-y-8 w-full max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                            {(about?.experiences || []).map((exp, idx) => (
                                <div
                                    key={idx}
                                    className={`${inView ? `animate__animated animate__fadeInUp animate__slow animate__delay-${5 + idx}s` : "opacity-0"}`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                        <div className="text-text-light/90 font-body text-[14px] md:text-[16px] flex flex-col">
                                            <span className="font-semibold">{exp?.role}</span>
                                            {exp?.company && (
                                                <span className="text-text-light/55">{exp.company}</span>
                                            )}
                                        </div>
                                        {exp?.period && (
                                            <div className="text-accent-gold text-[12px] uppercase italic tracking-[0.22em] text-center lg:text-left">
                                                {exp.period}
                                            </div>
                                        )}
                                    </div>
                                    {/* {exp?.description && (
                                        <p className="mt-2 text-text-light/70 font-body text-[14px] leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )} */}
                                    <div className="mt-2 flex items-center justify-center lg:justify-start gap-3">
                                        <span className="h-px w-10 bg-text-light/25"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                                        <span className="h-px w-full bg-text-light/25"></span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="mt-14 w-full max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                            <h4 className={`text-text-light/90 font-display uppercase tracking-[0.08em] text-[28px] lg:text-[32px] mb-6 ${inView ? "animate__animated animate__fadeInUp animate__slow animate__delay-6s" : "opacity-0"}`}>
                                {about?.educationTitle || "Education"}
                            </h4>
                            <div className="space-y-6">
                                {(about?.education || []).map((ed, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative pl-4 text-text-light/75 font-body text-[14px] leading-relaxed text-center lg:text-left ${inView ? `animate__animated animate__fadeInUp animate__slow animate__delay-${7 + idx}s` : "opacity-0"}`}
                                    >
                                        <span className="hidden md:block absolute left-0 top-1 w-px h-full bg-accent-gold"></span>

                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                            <div>
                                                <div className="text-text-light/90 font-semibold">{ed?.school}</div>
                                                <div className="text-light/25">{ed?.program}</div>
                                            </div>
                                            {ed?.period && (
                                                <div className="text-accent-gold text-[12px] uppercase italic tracking-[0.22em] mt-1 text-center lg:text-left">
                                                    {ed.period}
                                                </div>
                                            )}
                                        </div>

                                        <div className="md:hidden mt-2 flex items-center justify-center lg:justify-start gap-3">
                                            <span className="h-px w-full bg-text-light/25"></span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                                            <span className="h-px w-10 bg-text-light/25"></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
