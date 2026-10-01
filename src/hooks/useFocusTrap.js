import { useEffect } from "react";

const FOCUSABLE =
    'a[href],button:not([disabled]),input,textarea,video[controls],[tabindex]:not([tabindex="-1"])';

// Keeps Tab / Shift+Tab inside `ref` while active (wraps from last to first and back).
export default function useFocusTrap(ref, active) {
    useEffect(() => {
        const root = ref.current;
        if (!active || !root) return;

        const onKeyDown = (event) => {
            if (event.key !== "Tab") return;

            const focusable = [...root.querySelectorAll(FOCUSABLE)].filter(
                (el) => el.offsetParent !== null || el === document.activeElement,
            );
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        root.addEventListener("keydown", onKeyDown);

        return () => root.removeEventListener("keydown", onKeyDown);
    }, [ref, active]);
}
