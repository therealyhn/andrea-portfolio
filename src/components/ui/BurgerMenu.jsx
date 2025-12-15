import { useState } from "react";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);

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
                    className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-background-dark
          transform transition-transform duration-500
          ${open ? "translate-x-0" : "translate-x-full"}`}
                >
                    <nav className="p-12 flex flex-col gap-8 text-text-light text-2xl font-light">
                        <a href="#home" onClick={() => setOpen(false)}>Home</a>
                        <a href="#about" onClick={() => setOpen(false)}>About</a>
                        <a href="#work" onClick={() => setOpen(false)}>My Work</a>
                        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
                        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
                    </nav>
                </aside>
            </div>
        </>
    );
}
