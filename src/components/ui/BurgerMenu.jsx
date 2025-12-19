import { useState, useEffect } from "react";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showDesktopBurger, setShowDesktopBurger] = useState(true);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#work", label: "My Work" },
        { href: "#whyme", label: "Why Me?" },
        { href: "#contact", label: "Contact" },
    ];

    // Scroll handling (mobile header bg + desktop burger visibility)
    useEffect(() => {
        function onScroll() {
            const y = window.scrollY;

            setScrolled(y > 4);
            setShowDesktopBurger(y < window.innerHeight * 0.6);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* --- MOBILE HEADER --- */}
            <div
                className={`
                    fixed top-0 left-0 w-full h-12 z-40 flex items-center sm:hidden transition-all duration-300
                    ${scrolled || open
                        ? "backdrop-blur bg-surface/70 shadow-lg"
                        : "bg-transparent shadow-none"
                    }
                `}
            >
                {/* Mobile burger */}
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-[70] w-8 h-8 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`absolute h-[2px] w-7 bg-text-light transition-all duration-300
                            ${open ? "rotate-45" : "-translate-y-2"}`}
                    />
                    <span
                        className={`absolute h-[2px] w-7 bg-text-light transition-all duration-300
                            ${open ? "-rotate-45" : "translate-y-2"}`}
                    />
                </button>
            </div>

            {/* --- DESKTOP BURGER (HOME ONLY) --- */}
            {showDesktopBurger && (
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="hidden sm:flex absolute top-10 right-10 z-50 w-8 h-8 items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`absolute h-[2px] w-7 bg-text-light transition-all duration-300
                            ${open ? "rotate-45" : "-translate-y-2"}`}
                    />
                    <span
                        className={`absolute h-[2px] w-7 bg-text-light transition-all duration-300
                            ${open ? "-rotate-45" : "translate-y-2"}`}
                    />
                </button>
            )}

            {/* --- OVERLAY + MENU --- */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setOpen(false)}
                />

                {/* Menu panel */}
                <aside
                    className={`absolute top-0 right-0 h-full w-2/3 sm:w-[380px] bg-surface
                        transform transition-transform duration-500
                        ${open ? "translate-x-0" : "translate-x-full"}`}
                >
                    <nav className="p-10 md:p-20 flex flex-col gap-4 text-text-light text-2xl font-light">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="relative px-3 py-2 transition-all duration-200 group"
                            >
                                <span className="relative z-10">{link.label}</span>

                                {/* underline */}
                                <span
                                    className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-0 bg-text-light transition-all duration-300 ease-in-out
                                    group-hover:w-full group-focus:w-full"
                                />
                            </a>
                        ))}
                    </nav>
                </aside>
            </div>
        </>
    );
}
