import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import "animate.css";

export default function About() {
    const [about, setAbout] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "about"][0]{ leftTitle, leftText, centerImage, rightTitle, experiences[]{role, company, period, description}, educationTitle, education[]{school, program, period} }`)
            .then(setAbout)
            .catch(console.error);
    }, []);

    const imageUrl = about?.centerImage ? urlFor(about.centerImage).width(900).quality(90).url() : null;

    return (
        <section id="about" className="relative bg-background-dark py-20 md:py-28 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

                    <div className="lg:col-span-4 animate__animated animate__fadeInUp animate__slow">
                        <h2 className="text-text-light font-display uppercase tracking-[0.08em] text-[28px] md:text-[34px] mb-6">
                            {about?.leftTitle || "About"}
                        </h2>

                        <p className="text-text-light/75 font-body leading-relaxed text-[14px] md:text-[15px] max-w-md">
                            {about?.leftText || ""}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a href="#contact" className="px-7 py-3 rounded-full bg-text-light text-background-dark uppercase tracking-[0.22em] text-[11px] hover:opacity-90 transition">
                                Contact
                            </a>

                            <a href="#portfolio" className="px-7 py-3 rounded-full border border-text-light/35 text-text-light/90 uppercase tracking-[0.22em] text-[11px] hover:bg-text-light/10 transition">
                                My work
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center animate__animated animate__fadeIn animate__slow">
                        <div className="relative w-[340px] h-[480px] md:w-[420px] md:h-[580px] lg:w-[460px] lg:h-[640px]">
                            <div className="absolute inset-0 rounded-[9999px] border border-text-light/25 bg-black/10 shadow-[0px_22px_90px_rgba(0,0,0,0.6)]" />
                            <div className="absolute inset-[22px] rounded-[9999px] border border-text-light/15" />
                            <div className="absolute inset-[40px] rounded-[9999px] overflow-hidden bg-black/20">

                                {imageUrl ? (
                                    <img src={imageUrl} alt="About portrait" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-light/50 text-sm">
                                        Upload image in Sanity
                                    </div>
                                )}
                            </div>

                            <div className="absolute -inset-6 rounded-[9999px] blur-2xl opacity-40 pointer-events-none" /></div>
                    </div>

                    <div className="lg:col-span-4 animate__animated animate__fadeInUp animate__slow">
                        <h3 className="text-text-light font-display uppercase tracking-[0.08em] text-[22px] md:text-[26px] mb-6">
                            {about?.rightTitle || "Work experience"}
                        </h3>

                        <div className="space-y-6">
                            {(about?.experiences || []).map((exp, idx) => (
                                <div key={idx} className="border-b border-text-light/15 pb-5">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                        <div className="text-text-light/90 font-body text-[14px] md:text-[15px]">
                                            <span className="font-semibold">{exp?.role}</span>{exp?.company ? ` · ${exp.company}` : ""}
                                        </div>
                                        {exp?.period && (
                                            <div className="text-text-light/55 text-[11px] uppercase tracking-[0.22em]">
                                                {exp.period}
                                            </div>
                                        )}
                                    </div>

                                    {exp?.description && (
                                        <p className="mt-2 text-text-light/70 font-body text-[13px] leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <h4 className="text-text-light/90 font-display uppercase tracking-[0.08em] text-[18px] mb-4">
                                {about?.educationTitle || "Education"}
                            </h4>

                            <div className="space-y-3">
                                {(about?.education || []).map((ed, idx) => (
                                    <div key={idx} className="text-text-light/75 font-body text-[13px] leading-relaxed">
                                        <div className="text-text-light/90 font-semibold">{ed?.school}</div>
                                        <div>{ed?.program}</div>
                                        {ed?.period && <div className="text-text-light/55 text-[11px] uppercase tracking-[0.22em] mt-1">{ed.period}</div>}
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
