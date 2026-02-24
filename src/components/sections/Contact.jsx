import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import useInView from "../../hooks/useInView";
import "animate.css";

export default function Contact() {
    const [sectionRef, inView] = useInView({ threshold: 0.3 });
    const [contact, setContact] = useState(null);

    // Fetch Sanity
    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "contactPage"][0]{
                intro, addressValue, emailValue, phoneValue, instagramHandle, instagramUrl
            }`)
            .then(setContact)
            .catch((err) => console.error("Contact fetch error:", err));
    }, []);

    const introText = contact?.intro || "Molim vas popunite formular ili me kontaktirajte direktno.";

    return (
        <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative md:h-screen overflow-hidden bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">

                {/* Red overlay tint */}
                <div className="absolute inset-0 bg-surface-soft/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/80 to-black" />

                {/* NASLOV */}
                <div className={`mb-16 text-center md:text-left ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-text-light">
                        Kontaktirajte <span className="text-white/50">Me</span>
                    </h2>
                </div>

                <div className={`grid gap-12 md:grid-cols-2 ${inView ? "animate__animated animate__fadeInUp animate__delay-1s" : "opacity-0"}`}>

                    {/* LEVA STRANA: INFO */}
                    <div className="flex flex-col justify-center">
                        <p className="text-text-light/80 text-lg mb-12 leading-relaxed max-w-md font-body">
                            {introText}
                        </p>

                        <div className="space-y-8">
                            {contact?.addressValue && (
                                <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white transition-all duration-300">
                                        <img src="/img/svg/location.svg" alt="location" className="w-5 h-5 opacity-80 group-hover:opacity-100 invert group-hover:invert-0 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Adresa</p>
                                        <p className="text-lg text-text-light">{contact.addressValue}</p>
                                    </div>
                                </div>
                            )}

                            {contact?.emailValue && (
                                <a href={`mailto:${contact.emailValue}`} className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white transition-all duration-300">
                                        <img src="/img/svg/email.svg" alt="email" className="w-5 h-5 opacity-80 group-hover:opacity-100 invert group-hover:invert-0 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Email</p>
                                        <p className="text-lg text-text-light group-hover:text-white transition-colors">{contact.emailValue}</p>
                                    </div>
                                </a>
                            )}

                            {contact?.phoneValue && (
                                <a href={`tel:${contact.phoneValue.replace(/\s+/g, "")}`} className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white transition-all duration-300">
                                        <img src="/img/svg/phone.svg" alt="phone" className="w-5 h-5 opacity-80 group-hover:opacity-100 invert group-hover:invert-0 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Telefon</p>
                                        <p className="text-lg text-text-light group-hover:text-white transition-colors">{contact.phoneValue}</p>
                                    </div>
                                </a>
                            )}

                            {contact?.instagramHandle && (
                                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white transition-all duration-300">
                                        <img src="/img/svg/social/instagram.svg" alt="instagram" className="w-5 h-5 opacity-80 group-hover:opacity-100 invert group-hover:invert-0 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Instagram</p>
                                        <p className="text-lg text-text-light group-hover:text-white transition-colors">{contact.instagramHandle}</p>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* DESNA STRANA: FORMA */}
                    <div className="bg-white/5 p-8 md:p-10 rounded-[20px] border-2 border-white/10 backdrop-blur-sm mt-10 md:mt-0">
                        <form
                            action="https://api.web3forms.com/submit"
                            method="POST"
                            className="space-y-6"
                        >
                            <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY} />

                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Ime i Prezime</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-text-light outline-none focus:border-white transition-colors placeholder:text-white/20"
                                    placeholder="Vaše ime"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-text-light outline-none focus:border-white transition-colors placeholder:text-white/20"
                                    placeholder="vas@email.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Telefon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-text-light outline-none focus:border-white transition-colors placeholder:text-white/20"
                                    placeholder="+381 61 123 456"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Poruka</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-text-light outline-none focus:border-white transition-colors resize-none placeholder:text-white/20"
                                    placeholder="Kako vam mogu pomoći?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 border border-text-light py-4 rounded-full text-text-light uppercase tracking-[0.2em] hover:bg-text-light hover:text-black transition-all duration-300 text-sm font-medium"
                            >
                                Pošalji Poruku
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}