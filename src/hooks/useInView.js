import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.4 }) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            options
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [options]);

    return [sectionRef, visible];
}
