export default function CurvedText({ text }) {
    if (!text) return null;

    // Remove dupli razmaci
    const clean = text.replace(/\s+/g, " ").trim();

    // Razbijanje stringa na karaktere
    const letters = clean.split("");
    const radius = 400;
    const totalAngle = 240;

    // Pocetni ugao (centar luka)
    const startAngle = -120;

    // Koliko stepeni ide po slovu
    const count = Math.max(letters.length - 1, 1);
    const angleStep = totalAngle / count;

    return (
        <>
            {/* Mobile */}
            <div className="md:hidden flex justify-center items-center absolute top-28 left-0 w-full z-20 text-text-light font-display uppercase tracking-[0.35em] text-[24px] text-center animate__animated animate__fadeInDown animate__slow">
                {clean}
            </div>

            {/* Desktop */}
            <div className="hidden md:block relative w-[1000px] h-[420px] animate__animated animate__fadeInDown animate__slow">
                {letters.map((char, i) => {
                    const angle = startAngle + i * angleStep;
                    if (char === " ") return null;

                    return (
                        <span
                            key={i}
                            className="absolute left-1/2 bottom-40 origin-center text-text-light font-bold font-display uppercase text-[22px] lg:text-[100px]
                             animate__animated animate__fadeIn"
                            style={{
                                transform: `translateX(-50%) rotate(${angle}deg) translateY(-${radius}px)`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        >
                            {char}
                        </span>

                    );
                })}
            </div>
        </>
    );
}
