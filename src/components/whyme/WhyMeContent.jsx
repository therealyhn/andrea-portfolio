import { PortableText } from "@portabletext/react";
import { urlFor } from "../../lib/sanityClient";
import Button from "../ui/Button";
import SkillList from "./SkillList";

export default function WhyMeContent({ heading, description, descriptionContent, skills, buttonText, inView }) {
    const richTextComponents = {
        types: {
            image: ({ value }) => {
                if (!value?.asset) return null;
                const src = urlFor(value).width(1200).quality(88).fit("max").url();

                return (
                    <figure className="my-5">
                        <img
                            src={src}
                            alt={value.alt || "Why me image"}
                            className="w-full rounded-2xl object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </figure>
                );
            },
        },
        block: {
            h3: ({ children }) => (
                <h3 className="mt-5 mb-3 font-display uppercase tracking-[0.08em] text-[20px] md:text-[22px] lg:text-[24px] text-text-light">
                    {children}
                </h3>
            ),
            blockquote: ({ children }) => (
                <blockquote className="my-5 border-l-2 border-text-light/30 pl-4 italic text-text-light/80">
                    {children}
                </blockquote>
            ),
            normal: ({ children }) => <p className="about-rich-paragraph">{children}</p>,
        },
        list: {
            bullet: ({ children }) => <ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>,
        },
        marks: {
            link: ({ value, children }) => (
                <a
                    href={value?.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-text-light/40 underline-offset-4 hover:decoration-text-light"
                >
                    {children}
                </a>
            ),
        },
    };

    return (
        <div className="whyme-content w-full md:w-1/2 lg:w-5/12 text-right text-text-light">
            {/* Dekoracija */}
            <div className={`flex justify-end gap-2 mb-4 text-primary opacity-80 ${inView ? "animate__animated animate__fadeIn" : "opacity-0 invisible"}`}>
                <span className="text-2xl">✦</span>
                <span className="text-xl mt-2">✦</span>
            </div>

            <h2 className={`whyme-title font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider mb-6 transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp" : "opacity-0 invisible"}`}>
                {heading || "Zašto izabrati mene?"}
            </h2>

            <div className={`whyme-desc about-richtext font-body text-text-light/80 text-lg sm:text-xl leading-relaxed mb-8 transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-1s" : "opacity-0 invisible"}`}>
                {Array.isArray(descriptionContent) && descriptionContent.length > 0 ? (
                    <PortableText value={descriptionContent} components={richTextComponents} />
                ) : (
                    description && <p className="about-rich-paragraph whitespace-pre-line">{description}</p>
                )}
            </div>

            <div className={`transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-2s" : "opacity-0 invisible"}`}>
                <SkillList skills={skills} />
            </div>

            <div className={`transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-3s" : "opacity-0 invisible"}`}>
                <Button href="#contact" variant="outline" className="mt-6">{buttonText}</Button>
            </div>
        </div>
    );
}
