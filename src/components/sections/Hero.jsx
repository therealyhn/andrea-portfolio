import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import BurgerMenu from "../ui/BurgerMenu";
import CurvedText from "../ui/CurvedText";
import "animate.css";

export default function Hero() {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "hero"][0]{ image, curvedText }`)
            .then(setHeroData)
            .catch(console.error);
    }, []);

    const heroImage = heroData?.image ? urlFor(heroData.image).width(2200).quality(90).url() : null;

    return (
        <section id="home" className="relative min-h-screen bg-surface-soft overflow-hidden">
            <BurgerMenu />

            {/* FULLSCREEN image */}
            {heroImage && (
                <>
                    <img
                        src={heroImage}
                        alt="Hero background"
                        className="absolute inset-0 w-full h-full object-cover animate__animated animate__fadeIn"
                    />
                    {/* Red overlay tint */}
                    <div className="absolute inset-0 bg-surface-soft/50 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface-soft/20 to-black" />
                </>
            )}

            {/* Scroll indicator (mobile centered, desktop right) */}
            <a
                href="#about"
                className="absolute left-1/2 bottom-10 md:bottom-14 -translate-x-1/2 z-20 flex flex-col items-center gap-2
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


            {/* Curved text centered */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-text-light pointer-events-none">
                <CurvedText text={heroData?.curvedText} />
            </div>
        </section>
    );
}
