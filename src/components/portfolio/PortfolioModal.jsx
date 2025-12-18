import { useEffect, useState, useMemo } from "react";
import { urlFor } from "../../lib/sanityClient";
import "animate.css";
import Lightbox from "./Lightbox";

export default function PortfolioModal({ selectedItem, onClose }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Combine main image and gallery into one array for the lightbox
    const allImages = useMemo(() => {
        if (!selectedItem) return [];
        const imgs = [];
        if (selectedItem.image) imgs.push(selectedItem.image);
        if (selectedItem.gallery) imgs.push(...selectedItem.gallery);
        return imgs;
    }, [selectedItem]);

    // Prevent scrolling
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedItem]);

    if (!selectedItem) return null;

    const handleNext = () => {
        setLightboxIndex((prev) => (prev + 1) % allImages.length);
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>

            {/* CLICK OUTSIDE TO CLOSE */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* --- WINDOW / CARD VIEW --- */}
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#1a1a1a] rounded-[32px] overflow-hidden shadow-2xl flex flex-col animate__animated animate__zoomIn animate__faster border border-white/10">

                {/* WINDOW HEADER / CLOSE */}
                <div className="flex justify-end p-6 absolute top-0 right-0 z-10">
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="overflow-y-auto custom-scrollbar p-8 sm:p-12">

                    {/* TITLE & DESC */}
                    <div className="text-center mb-12">
                        <h3 className="text-text-light font-display uppercase tracking-[0.08em] text-[28px] sm:text-[40px] md:text-[56px]">
                            {selectedItem.title}
                        </h3>
                        {selectedItem.description && (
                            <p className="mt-4 text-text-light/70 font-body text-[16px] sm:text-[18px] max-w-3xl mx-auto leading-relaxed">
                                {selectedItem.description}
                            </p>
                        )}
                    </div>

                    {/* IMAGES GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {allImages.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setLightboxIndex(idx)}
                                className="rounded-[20px] overflow-hidden aspect-video sm:aspect-square cursor-pointer group relative"
                            >
                                <img
                                    src={urlFor(img).width(600).height(600).auto('format').url()}
                                    alt={`Gallery ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Overlay hint */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white drop-shadow-lg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- LIGHTBOX COMPONENT --- */}
            <Lightbox
                images={allImages}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={handleNext}
                onPrev={handlePrev}
            />

        </div>
    );
}
