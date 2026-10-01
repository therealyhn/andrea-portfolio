import { useEffect } from "react";

// Shared by every overlay: the page stays locked while at least one of them is active.
let locks = 0;

export default function useScrollLock(active) {
    useEffect(() => {
        if (!active) return;

        locks += 1;
        document.body.classList.add("overflow-hidden");

        return () => {
            locks = Math.max(0, locks - 1);
            if (locks === 0) document.body.classList.remove("overflow-hidden");
        };
    }, [active]);
}
