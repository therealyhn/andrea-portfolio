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
    const isTabletOrSmallDesktop = viewport.width < 1200;
    const isCompactHeight = viewport.height < 720;
    const showStraightText = isTabletOrSmallDesktop || isCompactHeight;

    // --- UNIVERSAL HEIGHT-BASED SCALING ---

    // Radius is 65% of screen height - ensures consistent curvature regardless of width
    const radius = Math.floor(viewport.height * 0.65);

    // Center the arc vertically so the top is always at ~90% of screen height
    const desktopBottomOffset = Math.floor(viewport.height * 0.25);

    // Shallower angle for a sophisticated look (max 140deg)
    const totalAngle = Math.min(140, letters.length * 8);
    const startAngle = -(totalAngle / 2);

    const count = Math.max(letters.length - 1, 1);
    const angleStep = totalAngle / count;

    // Fluid font size tied directly to screen height, clamped for desktop readability
    const desktopFontSize = Math.max(
        34,
        Math.min(viewport.height * 0.085, 120)
    );

    // Use full viewport dimensions for the arc container
    const desktopContainerWidth = viewport.width;
    const desktopContainerHeight = viewport.height;

    return (
        <>
            {/* Mobile */}
            <div className="md:hidden flex justify-center items-center absolute top-20 sm:top-24 left-0 w-full px-4 z-20 text-text-light font-display uppercase tracking-[0.25em] text-[20px] sm:text-[24px] text-center animate__animated animate__fadeInDown animate__slow">
                {clean}
            </div>

            {/* Tablet + compact-height fallback */}
            {showStraightText && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center px-6 2k:px-10 4k:px-16 z-20 text-text-light font-display uppercase tracking-[0.2em] lg:tracking-[0.28em] 2k:tracking-[0.32em] 4k:tracking-[0.38em] text-center animate__animated animate__fadeInDown animate__slow">
                    <span className="text-[clamp(32px,5.5vw,68px)] 2k:text-[clamp(68px,4.2vw,100px)] 4k:text-[clamp(100px,4vw,144px)] leading-[1.1]">
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
