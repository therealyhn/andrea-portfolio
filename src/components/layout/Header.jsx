import { BRAND, LOGO_SRC, NAV_COPY, NAV_LINKS } from "../../data/siteData";

/*
  .hd - fixed header; data-solid (past the hero sentinel) adds the dark glass background,
  shrinks --hd to 64px and reveals the caption next to the logo. Below 960px only the Menu button stays.
*/
export default function Header({ solid, activeId, menuOpen, onMenuOpen, menuButtonRef }) {
    return (
        <header
            data-solid={solid}
            className="group/hd fixed inset-x-0 top-0 z-[60] flex h-hd items-center justify-between gap-6 border-b border-transparent px-gutter transition-[background-color,border-color,height] duration-450 ease-editorial data-[solid=true]:border-line-dark data-[solid=true]:bg-wine-3/95 data-[solid=true]:backdrop-blur-[16px] data-[solid=true]:backdrop-saturate-[1.3] data-[solid=true]:[--hd:64px]"
        >
            {/* .hd__logo */}
            <a href="#home" aria-label={NAV_COPY.logoLabel} className="flex min-h-tap items-center gap-3.5">
                <img src={LOGO_SRC} width="50" height="26" alt="" className="h-logo w-auto" />
                <span className="border-l border-line-dark pl-3.5 font-sans text-11 font-medium uppercase leading-125 tracking-20 text-cream-soft opacity-0 -translate-x-2 transition-[opacity,transform] duration-500 ease-editorial group-data-[solid=true]/hd:translate-x-0 group-data-[solid=true]/hd:opacity-100 upto959:hidden">
                    {BRAND.firstName} {BRAND.lastName}
                    <br />
                    {BRAND.role}
                </span>
            </a>

            {/* .hd__nav */}
            <nav aria-label={NAV_COPY.mainNavLabel} className="flex items-center gap-[clamp(20px,2.6vw,40px)] upto959:hidden">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        aria-current={link.id === activeId ? "true" : undefined}
                        className="relative py-3.5 font-sans text-12 font-medium uppercase leading-100 tracking-18 text-cream-soft transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-editorial after:content-[''] hover:text-cream hover:after:origin-left hover:after:scale-x-100 aria-[current=true]:text-cream aria-[current=true]:after:origin-left aria-[current=true]:after:scale-x-100"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* .hd__menu */}
            <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={onMenuOpen}
                className="hidden min-h-tap items-center gap-3 font-sans text-12 font-semibold uppercase leading-100 tracking-20 upto959:inline-flex"
            >
                {/* .hd__burger */}
                <span
                    aria-hidden="true"
                    className="relative h-2.5 w-[26px] before:absolute before:inset-x-0 before:top-0 before:h-[1.5px] before:bg-current before:transition-transform before:duration-400 before:ease-editorial before:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-current after:transition-transform after:duration-400 after:ease-editorial after:content-['']"
                />
                {NAV_COPY.menu}
            </button>
        </header>
    );
}
