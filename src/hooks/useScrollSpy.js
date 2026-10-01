import { useEffect, useState } from "react";

const THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1];

// id of the last section whose top is above 40% of the viewport (the first id while none is)
export default function useScrollSpy(ids) {
    const [activeId, setActiveId] = useState(ids[0]);

    useEffect(() => {
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!sections.length) return;

        // sections are looked up on every pass, so one that mounts later still counts
        const update = () => {
            const line = window.innerHeight * 0.4;
            let current = ids[0];
            ids.forEach((id) => {
                const section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= line) current = id;
            });
            setActiveId(current);
        };

        const observer = new IntersectionObserver(update, { threshold: THRESHOLDS });
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [ids]);

    return activeId;
}
