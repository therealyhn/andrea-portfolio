import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import WhyMeContent from "../whyme/WhyMeContent"

export default function WhyMeSec() {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "whyMe"][0]{
                    heading,
                    description,
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
        : { backgroundColor: "#1a1a1a" };

    return (
        <section id="whyme" className="relative w-full py-20 md:py-32 overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={bgStyle}>
            <div className="absolute inset-0 bg-black/60 md:bg-black/50" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center md:justify-end">
                <WhyMeContent
                    heading={data.heading}
                    description={data.description}
                    skills={data.skills}
                    buttonText={data.buttonText}
                />
            </div>
        </section>
    );
}