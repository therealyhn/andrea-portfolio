import { useEffect, useState } from "react";

export default function CurvedText({ text }) {
    const [viewport, setViewport] = useState(() => ({
        width: typeof window !== "undefined" ? window.innerWidth : 1440,
        height: typeof window !== "undefined" ? window.innerHeight : 900,
    }));

    useEffect(() => {
        function updateViewport() {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    if (!text) return null;

    // Remove dupli razmaci
    const clean = text.replace(/\s+/g, " ").trim();

    // Razbijanje stringa na karaktere
    const letters = clean.split("");
    const isTabletOrSmallDesktop = viewport.width < 1280;
    const isCompactHeight = viewport.height < 820;
    const showStraightText = isTabletOrSmallDesktop || isCompactHeight;
    const is2K = viewport.width >= 1920;
    const is4K = viewport.width >= 2560;

    const radiusMax = is4K ? 720 : is2K ? 560 : 360;
    const radius = Math.max(220, Math.min(radiusMax, Math.floor(viewport.width * 0.22)));
    const totalAngle = 240;

    // Pocetni ugao (centar luka)
    const startAngle = -120;

    // Koliko stepeni ide po slovu
    const count = Math.max(letters.length - 1, 1);
    const angleStep = totalAngle / count;
    const fontMax = is4K ? 160 : is2K ? 112 : 72;
    const desktopFontSize = Math.max(
        34,
        Math.min(fontMax, Math.floor(Math.min(viewport.width * 0.05, viewport.height * 0.085)))
    );
    const widthMax = is4K ? 2000 : is2K ? 1500 : 1000;
    const heightMax = is4K ? 860 : is2K ? 620 : 420;
    const desktopContainerWidth = Math.max(680, Math.min(widthMax, Math.floor(viewport.width * 0.84)));
    const desktopContainerHeight = Math.max(260, Math.min(heightMax, Math.floor(viewport.height * 0.44)));
    const desktopBottomOffset = Math.max(
        88,
        Math.min(is4K ? 280 : is2K ? 220 : 160, Math.floor(desktopContainerHeight * 0.38))
    );

    return (
        <>
            {/* Mobile */}
            <div className="md:hidden flex justify-center items-center absolute top-20 sm:top-24 left-0 w-full px-4 z-20 text-text-light font-display uppercase tracking-[0.25em] text-[20px] sm:text-[24px] text-center animate__animated animate__fadeInDown animate__slow">
                {clean}
            </div>

            {/* Tablet + compact-height fallback */}
            {showStraightText && (
                <div className="hidden md:flex absolute inset-x-0 top-[18%] lg:top-[20%] 2k:top-[21%] 4k:top-[22%] justify-center px-6 2k:px-10 4k:px-16 z-20 text-text-light font-display uppercase tracking-[0.2em] lg:tracking-[0.28em] 2k:tracking-[0.32em] 4k:tracking-[0.38em] text-center animate__animated animate__fadeInDown animate__slow">
                    <span className="text-[clamp(28px,4.5vw,56px)] 2k:text-[clamp(56px,3.6vw,88px)] 4k:text-[clamp(88px,3.4vw,128px)] leading-tight">
                        {clean}
                    </span>
                </div>
            )}

            {/* Large desktop curved text */}
            {!showStraightText && (
                <div
                    className="hidden xl:block 2k:scale-[1.04] 4k:scale-[1.08] relative animate__animated animate__fadeInDown animate__slow"
                    style={{
                        width: `${desktopContainerWidth}px`,
                        height: `${desktopContainerHeight}px`,
                    }}
                >
                {letters.map((char, i) => {
                    const angle = startAngle + i * angleStep;
                    if (char === " ") return null;

                    return (
                        <span
                            key={i}
                            className="absolute left-1/2 origin-center text-text-light font-bold font-display uppercase
                             animate__animated animate__fadeIn"
                            style={{
                                bottom: `${desktopBottomOffset}px`,
                                fontSize: `${desktopFontSize}px`,
                                lineHeight: 1,
                                transform: `translateX(-50%) rotate(${angle}deg) translateY(-${radius}px)`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        >
                            {char}
                        </span>

                    );
                })}
                </div>
            )}
        </>
    );
}
