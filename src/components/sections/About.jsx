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
            className={`relative py-16 md:py-24 lg:py-28 md:h-screen bg-surface-soft transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
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
                <div className="flex flex-col md:flex-row justify-evenly items-center">

                    {/* LEFT */}
                    <div className={`w-full max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                        <h2 className={`text-text-light font-display uppercase tracking-[0.08em] text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[58px] mb-6 ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                            {about?.leftTitle || "About"}
                        </h2>

                        <p className={`text-text-light/75 font-body leading-relaxed text-[16px] md:text-[18px] lg:text-[20px] xl:text-[21px] max-w-md mx-auto lg:mx-0 ${inView ? "animate__animated animate__fadeInUp animate__fast" : "opacity-0"}`}>
                            {about?.leftText || ""}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                            <Button href="#contact" variant="filled">Contact</Button>
                            <Button href="#work" variant="outline">My work</Button>
                        </div>
                    </div>

                    {/* MOBILE SEPARATOR */}
                    <div className={`lg:hidden my-14 w-full flex justify-center ${inView ? "animate__animated animate__fadeIn animate__fast" : "opacity-0"}`}>
                        <span className="w-20 h-px bg-text-light/25"></span>
                    </div>

                    {/* CENTER IMAGE – DESKTOP ONLY */}
                    <div className={`hidden lg:flex justify-center lg:justify-end ${inView ? "animate__animated animate__fadeIn animate__fast" : "opacity-0"}`}>
                        <div className="relative w-[380px] h-[540px] md:w-[460px] md:h-[640px] lg:w-[520px] lg:h-[720px]">
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
