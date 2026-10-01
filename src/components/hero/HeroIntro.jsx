import { BRAND } from "../../data/siteData";
import { HERO_COPY } from "../../data/heroData";
import ButtonLink from "../ui/ButtonLink";
import Eyebrow from "../ui/Eyebrow";

/*
  .hero__intro - role, lead and the two calls to action (bottom left). In portrait only the buttons stay,
  centered and sharing the width.
*/
export default function HeroIntro() {
    return (
        <div className="absolute bottom-hero-edge left-gutter z-[3] w-[min(33cqw,460px)] motion-fade [--fade-delay:.75s] cq-land-1023:w-[min(46cqw,460px)] cq-portrait:bottom-[max(24px,env(safe-area-inset-bottom))] cq-portrait:right-gutter cq-portrait:w-auto cq-portrait:text-center">
            <Eyebrow className="mb-[22px] text-cream-soft cq-portrait:hidden">{BRAND.role}</Eyebrow>

            {/* .hero__lead */}
            <p className="max-w-[34ch] font-sans text-[length:clamp(17px,1.35cqw,21px)] font-normal leading-[1.55] text-cream-soft cq-short:hidden cq-portrait:hidden">
                {HERO_COPY.lead.map((part) =>
                    part.nowrap ? (
                        <span key={part.text} className="whitespace-nowrap">
                            {part.text}
                        </span>
                    ) : (
                        part.text
                    ),
                )}
            </p>

            {/* .hero__ctas */}
            <div className="mt-[30px] flex flex-wrap items-center gap-x-4 gap-y-3.5 cq-portrait:mx-auto cq-portrait:my-0 cq-portrait:max-w-[540px] cq-portrait:justify-center cq-portrait:gap-3 cq-portrait:[&>a]:min-w-0 cq-portrait:[&>a]:flex-1 cq-portrait:[&>a]:px-3.5">
                {HERO_COPY.ctas.map((cta) => (
                    <ButtonLink key={cta.href} href={cta.href} variant={cta.variant} icon={cta.icon}>
                        {cta.label}
                    </ButtonLink>
                ))}
            </div>
        </div>
    );
}
