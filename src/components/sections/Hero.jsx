import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import BurgerMenu from "../ui/BurgerMenu";
import CurvedText from "../ui/CurvedText";
import "animate.css";

export default function Hero() {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "hero"][0]`)
            .then((data) => setHeroData(data))
            .catch(console.error);
    }, []);

    const heroImage = heroData?.image
        ? urlFor(heroData.image).width(900).url()
        : null;

    return (
        <section
            id="home"
            className="relative min-h-screen bg-background-dark flex items-center justify-center overflow-hidden"
        >
            <BurgerMenu />

            <div className="container relative z-10">
                <div className="relative flex items-center justify-center">
                    {heroImage && (
                        <div className="relative w-full max-w-5xl animate__animated animate__fadeIn">
                            <img
                                src={heroImage}
                                alt={heroData?.title || "Hero image"}
                                className="w-full h-auto object-cover rounded-md shadow-2xl"
                            />

                            <div className="absolute inset-0 flex items-center justify-center text-text-light">
                                <CurvedText text={heroData?.curvedText} />
                            </div>
                        </div>
                    )}
                </div>

                {heroData?.subtitle && (
                    <div className="mt-10 text-center animate__animated animate__fadeInUp">
                        <span className="text-text-light uppercase tracking-[0.35em] text-xs">
                            {heroData.subtitle}
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}
