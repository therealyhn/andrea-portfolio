import { WHY_COPY } from "../../data/whyData";
import ButtonLink from "../ui/ButtonLink";
import Reveal from "../ui/Reveal";
import RichText from "../ui/RichText";

// .why__close - closing invitation with the contact button aligned to its last line
export default function WhyClose() {
    const { cta } = WHY_COPY;

    return (
        <Reveal className="mt-[clamp(56px,6vw,88px)] flex flex-wrap items-end justify-between gap-7">
            <p className="max-w-[20em] font-serif text-[length:clamp(26px,2.4vw,38px)] italic leading-120 text-cream opsz-20">
                <span className="mb-3.5 block max-w-[44ch] font-sans text-16 not-italic leading-160 text-cream-soft">
                    {WHY_COPY.closeIntro}
                </span>
                <RichText segments={WHY_COPY.closeStatement} />
            </p>
            <ButtonLink href={cta.href} variant={cta.variant} icon={cta.icon}>
                {cta.label}
            </ButtonLink>
        </Reveal>
    );
}
