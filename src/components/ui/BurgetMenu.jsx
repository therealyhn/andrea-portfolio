import { useState } from "react";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed top-6 right-6 z-50 flex flex-col gap-1.5"
                aria-label="Open menu"
            >
                <span className="w-7 h-[2px] bg-text-light" />
                <span className="w-7 h-[2px] bg-text-light" />
                <span className="w-7 h-[2px] bg-text-light" />
            </button>

            <div
                className={`fixed inset-0 z-40 transition-all duration-500 ${open ? "visible" : "invisible"
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setOpen(false)}
                />

                <aside
                    className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-background-dark
            transform transition-transform duration-500
            ${open ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="p-10 flex flex-col gap-8 text-text-light">
                        <button
                            onClick={() => setOpen(false)}
                            className="self-end text-sm uppercase tracking-widest"
                        >
                            Close
                        </button>

                        <nav className="flex flex-col gap-6 text-2xl font-light">
                            <a href="#home">Home</a>
                            <a href="#about">About</a>
                            <a href="#work">My Work</a>
                            <a href="#skills">Skills</a>
                            <a href="#contact">Contact</a>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    );
}
