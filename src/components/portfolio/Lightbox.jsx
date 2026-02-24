import { useEffect } from "react";
import { urlFor } from "../../lib/sanityClient";
import "animate.css";

export default function Lightbox({ items, currentIndex, onClose, onNext, onPrev }) {
    if (!items || currentIndex === null) return null;
    const current = items[currentIndex];
    if (!current) return null;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNext, onPrev]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate__animated animate__fadeIn animate__faster"
            onClick={handleBackdropClick}
        >

            {/* CLOSE LIGHTBOX */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-20"
                aria-label="Close lightbox"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* PREV BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-colors z-20 hover:scale-110 p-2"
                aria-label="Previous media"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:w-16 sm:h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* NEXT BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-colors z-20 hover:scale-110 p-2"
                aria-label="Next media"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:w-16 sm:h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* MAIN MEDIA */}
            <div className="relative w-full h-full p-4 sm:p-12 flex items-center justify-center pointer-events-none">
                {current.videoUrl ? (
                    <video
                        src={current.videoUrl}
                        controls
                        playsInline
                        className="max-w-full max-h-full object-contain drop-shadow-2xl animate__animated animate__zoomIn pointer-events-auto select-none"
                    />
                ) : (
                    <img
                        src={urlFor(current).width(1920).auto("format").url()}
                        alt={`Lightbox ${currentIndex}`}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl animate__animated animate__zoomIn pointer-events-auto select-none"
                    />
                )}
                {/* COUNTER */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-body text-sm tracking-widest">
                    {currentIndex + 1} / {items.length}
                </div>
            </div>

        </div>
    );
}
