import { useEffect, useState } from "react";

const DRAG_THRESHOLD_PX = 6;

/*
  Mouse drag scrolls the strip (touch and pen keep native scrolling). Returns true while dragging; the click
  that ends a drag is swallowed so it does not open the tile under the pointer.
*/
export default function useDragScroll(scrollerRef) {
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let start = null;
        let moved = false;

        const stopClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };
        const onPointerDown = (event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            start = { x: event.clientX, left: scroller.scrollLeft };
            moved = false;
        };
        const onPointerMove = (event) => {
            if (!start) return;
            const dx = event.clientX - start.x;
            if (!moved && Math.abs(dx) > DRAG_THRESHOLD_PX) {
                moved = true;
                setDragging(true);
            }
            if (moved) scroller.scrollLeft = start.left - dx;
        };
        const onPointerUp = () => {
            if (!start) return;
            start = null;
            if (!moved) return;
            setDragging(false);
            scroller.addEventListener("click", stopClick, { capture: true, once: true });
            setTimeout(() => scroller.removeEventListener("click", stopClick, { capture: true }), 0);
        };

        scroller.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);

        return () => {
            scroller.removeEventListener("pointerdown", onPointerDown);
            scroller.removeEventListener("click", stopClick, { capture: true });
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, [scrollerRef]);

    return dragging;
}
