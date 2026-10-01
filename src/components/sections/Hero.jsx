import { BRAND } from "../../data/siteData";
import { HERO_COPY } from "../../data/heroData";
import HeroFigure from "../hero/HeroFigure";
import HeroIndex from "../hero/HeroIndex";
import HeroIntro from "../hero/HeroIntro";
import HeroMasthead from "../hero/HeroMasthead";
import Icon from "../ui/Icon";

/*
  .hero - full-height opening section and the size container for every cq-* variant inside it.
  The sentinel (28% down) tells the header when to turn solid; timeline-hero drives the scroll-out motion.
*/
export default function Hero({ heroFigure, chapters, status, sentinelRef }) {
    return (
        <section
            id="home"
            aria-label={HERO_COPY.sectionLabel}
            className="relative isolate h-svh min-h-[600px] overflow-hidden bg-wine [container-type:size] timeline-hero"
        >
            {/* .hero__sentinel */}
            <span ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-[28%] h-px w-px" />

            <HeroMasthead />

            {/* .hero__kicker - portrait only */}
            <p
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(var(--hd)_+_7cqh_+_min(20.5cqw,13cqh)*.84_+_min(10.5cqw,6.4cqh)*1.25)] z-[3] hidden text-center font-sans text-11 font-medium uppercase leading-100 tracking-[.24em] text-cream-soft motion-fade [--fade-delay:.7s] fonts-pending:[animation-play-state:paused] cq-portrait:block"
            >
                {BRAND.role}
            </p>

            {/* .hero__place - wide landscape only, on the left (swapped with the last name, owner 2026-10-01) */}
            <p className="absolute left-gutter top-[calc(var(--hd)_+_3cqh_+_min(20.5cqw,30cqh)*.84_+_1.6cqh)] z-[3] flex items-center gap-2.5 font-sans text-11 font-medium uppercase leading-140 tracking-20 text-cream-soft motion-fade [--fade-delay:.65s] cq-land-1199:hidden cq-portrait:hidden">
                <Icon name="pin" size={16} />
                {BRAND.place}
            </p>

            <HeroFigure figure={heroFigure} />

            {/* .hero::after - portrait fade under the buttons */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 z-[2] hidden h-[34cqh] bg-gradient-to-t from-wine from-[18%] via-wine/[.86] via-[48%] to-wine/0 cq-portrait:block"
            />

            <HeroIntro />
            <HeroIndex chapters={chapters} status={status} />
        </section>
    );
}
