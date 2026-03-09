import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import WhyMeContent from "../whyme/WhyMeContent"

import useInView from "../../hooks/useInView";

export default function WhyMeSec() {
    const [data, setData] = useState(null);
    const [sectionRef, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "whyMe"][0]{
                    heading,
                    description,
                    descriptionContent,
                    skills,
                    buttonText,
                    backgroundImage
                }`
            )
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) return null;

    const bgStyle = data.backgroundImage
        ? { backgroundImage: `url(${urlFor(data.backgroundImage).width(1920).auto('format').url()})` }
        : { backgroundImage: `url(/img/placeholders/whyme-placeholder.jpg)` };

    return (
        <section
            id="whyme"
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 lg:py-32 min-h-[70svh] md:min-h-screen overflow-hidden bg-cover bg-[position:30%_center] md:bg-[position:45%_center] lg:bg-[position:30%_center] bg-no-repeat bg-scroll md:bg-fixed"
            style={bgStyle}
        >
            {/* Red overlay tint */}
            <div className="absolute inset-0 bg-surface-soft/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/5 via-background-dark/10 to-background-dark" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center md:justify-end">
                <WhyMeContent
                    heading={data.heading}
                    description={data.description}
                    descriptionContent={data.descriptionContent}
                    skills={data.skills}
                    buttonText={data.buttonText}
                    inView={inView}
                />
            </div>
        </section>
    );
}
