import { useEffect, useRef } from "react";
import { CONTACT, LOGO_SRC, NAV_COPY, NAV_LINKS } from "../../data/siteData";
import { pad2 } from "../../lib/utils/format";
import useFocusTrap from "../../hooks/useFocusTrap";
import useScrollLock from "../../hooks/useScrollLock";
import Icon from "../ui/Icon";

const CLOSE_FOCUS_DELAY_MS = 60;

/*
  .mn - full-screen menu dialog (below 960px). Opening focuses Close; Escape, Close or a link closes it
  (App then returns focus to the Menu button). Links rise in one after another (--i).
*/
export default function MobileMenu({ open, activeId, onClose }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);

    useScrollLock(open);
    useFocusTrap(dialogRef, open);

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => closeRef.current?.focus(), CLOSE_FOCUS_DELAY_MS);
        return () => clearTimeout(timer);
    }, [open]);

    const onKeyDown = (event) => {
        if (event.key === "Escape") onClose();
    };

    return (
        <div
            ref={dialogRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={NAV_COPY.menuDialogLabel}
            data-open={open}
            onKeyDown={onKeyDown}
            className="group/mn invisible fixed inset-0 z-[70] flex flex-col bg-wine-3 px-gutter pb-[max(28px,env(safe-area-inset-bottom))] opacity-0 [transition:opacity_.45s_var(--ease),visibility_0s_.45s] data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:[transition:opacity_.45s_var(--ease)]"
        >
            {/* .mn__top */}
            <div className="flex h-[72px] items-center justify-between">
                <img src={LOGO_SRC} width="50" height="26" alt={NAV_COPY.menuLogoAlt} className="h-logo w-auto" />
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-tap items-center gap-2.5 font-sans text-12 font-semibold uppercase leading-100 tracking-20"
                >
                    {NAV_COPY.close}
                    <Icon name="close" />
                </button>
            </div>

            {/* .mn__links */}
            <nav aria-label={NAV_COPY.mobileNavLabel} className="my-auto flex flex-col gap-0.5">
                {NAV_LINKS.map((link, i) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        aria-current={link.id === activeId ? "true" : undefined}
                        onClick={onClose}
                        style={{ "--i": i }}
                        className="flex translate-y-6 items-baseline gap-4 py-1.5 font-serif text-[length:clamp(40px,11vw,64px)] font-normal leading-[1.08] tracking-neg2 opacity-0 opsz-34 transition-[opacity,transform] duration-600 ease-editorial group-data-[open=true]/mn:translate-y-0 group-data-[open=true]/mn:opacity-100 group-data-[open=true]/mn:[transition-delay:calc(.08s_+_var(--i)_*_.05s)] aria-[current=true]:italic"
                    >
                        <small className="min-w-[22px] font-sans text-11 font-medium not-italic leading-100 tracking-18 text-cream-faint">
                            {pad2(i + 1)}
                        </small>
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* .mn__foot */}
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line-dark pt-6 text-14 text-cream-soft">
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-tap items-center">
                    {CONTACT.email}
                </a>
                <a
                    href={CONTACT.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-tap items-center"
                >
                    {NAV_COPY.instagramPrefix} {CONTACT.instagram.handle}
                </a>
            </div>
        </div>
    );
}
