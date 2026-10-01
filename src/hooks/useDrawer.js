import { useCallback, useRef, useState } from "react";

const INITIAL_STATE = { open: false, view: null, session: 0 };

/*
  Side drawer state: a chapter story ({ kind: "story", chapterIndex }) or a legal text ({ kind: "legal", docKey }).
  The view stays set after closing (the panel slides out with its content); `session` grows on every open.
  Closing returns focus to the button that opened it.
*/
export default function useDrawer() {
    const [state, setState] = useState(INITIAL_STATE);
    const returnFocusRef = useRef(null);

    const show = useCallback((view, triggerEl) => {
        returnFocusRef.current = triggerEl ?? null;
        setState((prev) => ({ open: true, view, session: prev.session + 1 }));
    }, []);

    const openStory = useCallback((chapterIndex, triggerEl) => show({ kind: "story", chapterIndex }, triggerEl), [show]);
    const openLegal = useCallback((docKey, triggerEl) => show({ kind: "legal", docKey }, triggerEl), [show]);

    const close = useCallback(() => {
        setState((prev) => (prev.open ? { ...prev, open: false } : prev));
        returnFocusRef.current?.focus({ preventScroll: true });
    }, []);

    return { state, openStory, openLegal, close };
}
