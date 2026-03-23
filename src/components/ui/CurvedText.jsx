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
    const showStraightText = viewport.width < 1024;

    // --- BREAKPOINTS ---
    const is4K = viewport.width >= 2560;
    const is2K = !is4K && viewport.width >= 1920;
    const is1440 = !is4K && !is2K && viewport.width >= 1440;
    const extraCompactDesktop = !is1440 && !is2K && !is4K && viewport.width >= 1024 && viewport.height <= 820;
    const compactLaptop = !is1440 && !is2K && !is4K && viewport.width >= 1024 && viewport.height <= 900;

    // --- PER-BREAKPOINT VALUES ---
    let radiusMultiplier, fontMultiplier, fontMax, totalAngle, bottomOffsetMult;

    if (is4K) {
        radiusMultiplier = 0.54; fontMultiplier = 0.085; fontMax = 220; totalAngle = 240; bottomOffsetMult = 0.47;
    } else if (is2K) {
        radiusMultiplier = 0.43; fontMultiplier = 0.085; fontMax = 165; totalAngle = 244; bottomOffsetMult = 0.44;
    } else if (is1440) {
        radiusMultiplier = 0.46; fontMultiplier = 0.085; fontMax = 118; totalAngle = 248; bottomOffsetMult = 0.40;
    } else if (extraCompactDesktop) {
        radiusMultiplier = 0.33; fontMultiplier = 0.067; fontMax = 86; totalAngle = 272; bottomOffsetMult = 0.41;
    } else if (compactLaptop) {
        radiusMultiplier = 0.38; fontMultiplier = 0.075; fontMax = 102; totalAngle = 280; bottomOffsetMult = 0.43;
    } else {
        radiusMultiplier = 0.43; fontMultiplier = 0.085; fontMax = 86; totalAngle = 250; bottomOffsetMult = 0.47;
    }

    const radius = Math.floor(Math.min(viewport.width, viewport.height) * radiusMultiplier);
    const desktopBottomOffset = Math.floor(viewport.height * bottomOffsetMult);
    const startAngle = -(totalAngle / 2);

    const count = Math.max(letters.length - 1, 1);
    const angleStep = totalAngle / count;

    const desktopFontSize = Math.max(30, Math.min(viewport.height * fontMultiplier, fontMax));

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
                    className="hidden lg:block relative animate__animated animate__fadeInDown animate__slow"
                    style={{
                        width: `${desktopContainerWidth}px`,
                        height: `${desktopContainerHeight}px`,
                    }}
                >
                    {letters.map((char, i) => {
                        const angle = startAngle + i * angleStep;
                        if (char === "") return null;

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
