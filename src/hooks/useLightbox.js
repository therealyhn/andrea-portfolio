import { useCallback, useEffect, useRef, useState } from "react";

// The closing fade lasts 400 ms; the media stays mounted until it is over
const MEDIA_CLEAR_DELAY_MS = 420;
const INITIAL_STATE = { open: false, chapterIndex: 0, itemIndex: 0, session: 0, showMedia: false };

/*
  Lightbox state: which chapter item is shown and whether the dialog is open. `session` grows on every
  open, so reopening always mounts fresh media. Closing returns focus to the tile that opened it;
  navigation wraps around inside the chapter.
*/
export default function useLightbox(chapters) {
    const [state, setState] = useState(INITIAL_STATE);
    const returnFocusRef = useRef(null);
    const clearTimerRef = useRef(0);

    useEffect(() => () => clearTimeout(clearTimerRef.current), []);

    const openItem = useCallback((chapterIndex, itemIndex, triggerEl) => {
        clearTimeout(clearTimerRef.current);
        returnFocusRef.current = triggerEl ?? null;
        setState((prev) => ({ open: true, chapterIndex, itemIndex, session: prev.session + 1, showMedia: true }));
    }, []);

    const close = useCallback(() => {
        setState((prev) => (prev.open ? { ...prev, open: false } : prev));
        clearTimeout(clearTimerRef.current);
        clearTimerRef.current = setTimeout(() => {
            setState((prev) => (prev.open ? prev : { ...prev, showMedia: false }));
        }, MEDIA_CLEAR_DELAY_MS);
        returnFocusRef.current?.focus({ preventScroll: true });
    }, []);

    const go = useCallback(
        (delta) => {
            setState((prev) => {
                const count = chapters[prev.chapterIndex]?.items.length ?? 0;
                if (!prev.open || !count) return prev;
                return { ...prev, itemIndex: (prev.itemIndex + delta + count) % count };
            });
        },
        [chapters],
    );

    return { state, openItem, close, go };
}
