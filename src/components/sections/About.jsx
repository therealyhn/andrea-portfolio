import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import Button from "../ui/Button";
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
        : "/img/placeholders/1-1.jpg";

    return (
        <section
            ref={sectionRef}
            id="about"
            className={`about-section relative py-16 md:py-24 lg:py-28 overflow-hidden bg-surface-soft transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
        >
            {/* Red overlay tint */}
            <div className="absolute inset-0 bg-surface-soft/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface-soft via-surface-soft/80 to-background-dark" />

            {/* Scroll indicator (mobile centered, desktop right) */}
            <a
                href="#work"
                className="absolute left-1/2 bottom-0 md:bottom-2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
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

            <div className="container relative z-10">
                <div className="about-grid mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">

                    {/* LEFT */}
                    <div className={`about-copy w-full max-w-[560px] mx-auto md:mx-0 text-center md:text-left ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                        <h2 className={`about-title text-text-light font-display uppercase tracking-[0.08em] text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[58px] mb-6 ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                            {about?.leftTitle || "About"}
                        </h2>

                        <p className={`about-text text-text-light/75 font-body leading-relaxed text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] max-w-md mx-auto lg:mx-0 ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                            {about?.leftText || ""}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                            <Button href="#contact" variant="filled">Contact</Button>
                            <Button href="#work" variant="outline">My work</Button>
                        </div>
                    </div>

                    {/* MOBILE SEPARATOR */}
                    <div className={`md:hidden my-10 w-full flex justify-center ${inView ? "animate__animated animate__fadeIn animate__fast" : "opacity-0"}`}>
                        <span className="w-20 h-px bg-text-light/25"></span>
                    </div>

                    {/* CENTER IMAGE – DESKTOP ONLY */}
                    <div className={`flex justify-center md:justify-end ${inView ? "animate__animated animate__fadeIn animate__fast" : "opacity-0"}`}>
                        <div className="about-image-wrap relative w-[75vw] max-w-[380px] h-[520px] sm:w-[360px] sm:h-[560px] md:w-[390px] md:h-[560px] lg:w-[460px] lg:h-[640px] xl:w-[520px] xl:h-[720px]">
                            <div className="absolute inset-0 rounded-[9999px] border border-text-light/25 bg-black/10 shadow-[0px_30px_80px_rgba(0,0,0,0.65)]" />
                            <div className="absolute inset-[26px] rounded-[9999px] border border-text-light/15" />
                            <div className="absolute inset-[50px] rounded-[9999px] overflow-hidden bg-black/20">
                                <img
                                    src={imageUrl}
                                    alt="About portrait"
                                    className={`w-full h-full object-cover ${inView ? "animate__animated animate__fadeIn animate__fast" : "opacity-0"}`}
                                />
                            </div>
                            <div className="absolute -inset-10 rounded-[9999px] blur-5xl opacity-40 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
