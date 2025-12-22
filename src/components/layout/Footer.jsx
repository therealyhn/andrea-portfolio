import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../lib/sanityClient";

export default function Footer() {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "footer"][0]{
                copyrightName,
                logo,
                facebookUrl,
                twitterUrl,
                instagramUrl
            }`)
            .then(setData)
            .catch(console.error);
    }, []);

    const logoUrl = data?.logo
        ? urlFor(data.logo).width(400).url()
        : "/img/placeholders/1-1.jpg";

    return (
        <footer className="relative bg-surface-soft text-text-light pt-24 pb-10 overflow-hidden">

            <div className="absolute inset-0 bg-surface-soft/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-surface-soft" />

            <div className="relative z-20 max-w-7xl mx-auto px-6">
                {/* Gornji red */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-16">
                    {/* Levo — Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src={logoUrl}
                            alt="Logo"
                            className="h-10 brightness-0 invert opacity-80"
                            loading="lazy"
                        />
                    </div>

                    {/* Centar — Social ikone */}
                    <div className="flex justify-center gap-8">
                        {[
                            { id: "facebook", url: data?.facebookUrl },
                            { id: "tik-tok", url: data?.tiktokUrl },
                            { id: "instagram", url: data?.instagramUrl }
                        ].map((social) => (
                            <a
                                key={social.id}
                                href={social.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="p-3 rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:bg-white group-hover:border-white">
                                    <img
                                        src={`/img/svg/social/${social.id}.svg`}
                                        alt={social.id}
                                        className="h-5 w-5 opacity-70 group-hover:opacity-100 brightness-0 invert group-hover:invert-0 transition-all duration-300 group-hover:rotate-[12deg]"
                                    />
                                </div>
                                {/* animated ring on hover */}
                                <span className="absolute -inset-1 rounded-full border border-text-light/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></span>
                            </a>
                        ))}
                    </div>

                    {/* Desno — Copyright */}
                    <div className="text-center md:text-right font-body">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                            © {new Date().getFullYear()} {data?.copyrightName || "Andrea Portfolio"}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                            Sva prava zadržana.
                        </p>
                    </div>
                </div>

                {/* Linija */}
                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Potpis */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white/30 font-body">
                    <p>
                        Razvijeno od strane{" "}
                        <a href="https://jovanljusic.com/" target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Jovan Ljušić</a>
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
