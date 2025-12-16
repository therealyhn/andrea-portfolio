import { useState } from "react";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#work", label: "My Work" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" }
    ];

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="fixed top-10 right-10 z-50 w-8 h-8 flex items-center justify-center"
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

            {/* Overlay + menu */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setOpen(false)}
                />

                <aside
                    className={`absolute top-0 right-0 h-full w-full sm:w-[380px] bg-surface
          transform transition-transform duration-500
          ${open ? "translate-x-0" : "translate-x-full"}`}
                >
                    <nav className="p-20 flex flex-col gap-4 text-text-light text-2xl font-light">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="rounded transition-all duration-200 px-3 py-2 relative hover:bg-transparent focus:bg-transparent group"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <span className="relative z-10">{link.label}</span>
                                {/* Animated underline left-to-right, matches text width */}
                                <span
                                    className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full group-focus:w-full"
                                />
                            </a>
                        ))}
                    </nav>
                </aside>
            </div>
            <style>{`
                /* Make the underline grow from left to right to match word width */
                .group:hover .group-hover\\:w-full, .group:focus .group-focus\\:w-full {
                    width: 100% !important;
                }
            `}</style>
        </>
    );
}
