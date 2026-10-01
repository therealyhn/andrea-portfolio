import { useCallback, useEffect, useState } from "react";

const ARROW_STEP = 0.82;
const KEY_STEP = 0.5;
const EDGE_TOLERANCE_PX = 4;
const TILE_TOLERANCE_PX = 8;
const INITIAL_STATE = { index: 0, atStart: true, atEnd: false, progress: 0 };

function scrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

// Current tile (last one whose left edge has been reached), edges and the share of the strip seen so far
function readStrip(scroller) {
    const tiles = scroller.querySelector("ul")?.children ?? [];
    const max = scroller.scrollWidth - scroller.clientWidth;
    const x = scroller.scrollLeft;

    let index = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].offsetLeft - tiles[0].offsetLeft <= x + TILE_TOLERANCE_PX) index = i;
    }
    if (x >= max - EDGE_TOLERANCE_PX) index = Math.max(0, tiles.length - 1);

    return {
        index,
        atStart: x <= EDGE_TOLERANCE_PX,
        atEnd: x >= max - EDGE_TOLERANCE_PX,
        progress: max > 0 ? Number(Math.min(1, (x + scroller.clientWidth) / scroller.scrollWidth).toFixed(4)) : 1,
    };
}

function sameStrip(a, b) {
    return a.index === b.index && a.atStart === b.atStart && a.atEnd === b.atEnd && a.progress === b.progress;
}

/*
  Chapter strip position: counter index, arrow edges and progress bar value (read once per frame on scroll
  and on resize). Arrow keys on the focused scroller move half a view; scrollByDir moves 82% of it.
*/
export default function useStripScroll(scrollerRef, tileCount) {
    const [strip, setStrip] = useState(INITIAL_STATE);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const next = readStrip(scroller);
            setStrip((prev) => (sameStrip(prev, next) ? prev : next));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const onKeyDown = (event) => {
            if (event.target !== scroller || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
            event.preventDefault();
            const dir = event.key === "ArrowRight" ? 1 : -1;
            scroller.scrollBy({ left: dir * scroller.clientWidth * KEY_STEP, behavior: scrollBehavior() });
        };

        // The track is observed too: a video tile without a poster changes width once its metadata is known
        const resizeObserver = new ResizeObserver(schedule);
        resizeObserver.observe(scroller);
        if (scroller.firstElementChild) resizeObserver.observe(scroller.firstElementChild);
        scroller.addEventListener("scroll", schedule, { passive: true });
        scroller.addEventListener("keydown", onKeyDown);
        schedule();

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            scroller.removeEventListener("scroll", schedule);
            scroller.removeEventListener("keydown", onKeyDown);
        };
    }, [scrollerRef, tileCount]);

    const scrollByDir = useCallback(
        (dir) => {
            const scroller = scrollerRef.current;
            if (!scroller) return;
            scroller.scrollBy({ left: dir * scroller.clientWidth * ARROW_STEP, behavior: scrollBehavior() });
        },
        [scrollerRef],
    );

    return { ...strip, scrollByDir };
}
