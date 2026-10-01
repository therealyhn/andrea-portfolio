import { BRAND } from "../../data/siteData";
import { HERO_COPY } from "../../data/heroData";

/*
  .hero__mast - first name as giant rising letters (--i staggers them), last name in italic below.
  Both wait for the display font (fonts-pending) and the letter row drifts up while the hero scrolls out.
*/
export default function HeroMasthead() {
    return (
        <h1 className="font-normal">
            <span className="sr-only">{HERO_COPY.srTitle}</span>

            {/* .mast__a */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(var(--hd)_+_3cqh)] z-[1] flex justify-center whitespace-nowrap font-serif text-[length:min(19.6cqw,30cqh)] font-normal uppercase leading-[.76] tracking-[.022em] text-cream [font-optical-sizing:auto] opsz-24 motion-mast cq-portrait:top-[calc(var(--hd)_+_7cqh)] cq-portrait:text-[length:min(20.5cqw,13cqh)]"
            >
                {[...BRAND.firstName].map((letter, i) => (
                    <span
                        key={i}
                        style={{ "--i": i }}
                        className="inline-block motion-rise fonts-pending:[animation-play-state:paused]"
                    >
                        {letter}
                    </span>
                ))}
            </span>

            {/* .mast__b - on the right in landscape (owner, 2026-10-01; the redesign has it on the left) */}
            <span
                aria-hidden="true"
                className="absolute right-gutter top-[calc(var(--hd)_+_3cqh_+_min(20.5cqw,30cqh)*.84)] z-[3] font-serif text-[length:min(6.2cqw,10.5cqh)] font-normal italic leading-100 tracking-neg1 text-cream opsz-18 motion-fade [--fade-delay:.55s] fonts-pending:[animation-play-state:paused] cq-portrait:left-0 cq-portrait:right-0 cq-portrait:top-[calc(var(--hd)_+_7cqh_+_min(20.5cqw,13cqh)*.84)] cq-portrait:text-center cq-portrait:text-[length:min(10.5cqw,6.4cqh)]"
            >
                {BRAND.lastName}
            </span>
        </h1>
    );
}
