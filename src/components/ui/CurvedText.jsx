export default function CurvedText({ text }) {
    if (!text) return null;

    const letters = text.split("");
    const angleStep = 180 / (letters.length - 1);

    return (
        <div className="relative w-[360px] h-[240px] sm:w-[520px] sm:h-[300px] md:w-[1000px] md:h-[420px]">
            {letters.map((char, i) => {
                const angle = -90 + i * angleStep;

                const radius =
                    window.innerWidth < 640
                        ? 130
                        : window.innerWidth < 768
                            ? 200
                            : 400;

                return (
                    <span
                        key={i}
                        className="absolute left-1/2 bottom-40 md:bottom-0 origin-bottom text-text-light font-serif uppercase tracking-[0.42em] text-[13px] sm:text-[17px] md:text-[22px] lg:text-[50px]"
                        style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    );
}
