import { useEffect, useState } from "react";

const SOLID_OFFSET = 64;

// true once the hero sentinel has scrolled above the solid header line (64px from the top)
export default function useHeaderSolid(sentinelRef) {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => setSolid(!entry.isIntersecting && entry.boundingClientRect.top < SOLID_OFFSET),
            { rootMargin: `-${SOLID_OFFSET}px 0px 0px 0px` },
        );
        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [sentinelRef]);

    return solid;
}
