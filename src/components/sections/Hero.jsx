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

    const heroImage = heroData?.image
        ? urlFor(heroData.image).width(2200).quality(90).url()
        : null;

    return (
        <section
            id="home"
            className="relative min-h-screen bg-background-dark overflow-hidden"
        >
            <BurgerMenu />

            {/* FULLSCREEN image */}
            {heroImage && (
                <img
                    src={heroImage}
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover animate__animated animate__fadeIn"
                />
            )}

            {/* (Optional) dark overlay if needed for contrast */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}

            {/* Scroll indicator */}
            <a
                href="#about"
                className="absolute left-10 md:left-[12%] bottom-16 z-20 flex flex-col items-center gap-3 text-text-light uppercase tracking-[0.45em] text-[9px] font-body animate__animated animate__fadeInUp animate__slow"
            >
                <span className="text-[40px] opacity-70 animate__animated animate__fadeInDown animate__infinite animate__slower">
                    ⌄
                </span>

            </a>

            {/* Curved text centered */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-text-light pointer-events-none">
                <CurvedText text={heroData?.curvedText} />
            </div>
        </section>
    );
}
