import { ABOUT_COPY, CV_BLOCKS } from "../../data/aboutData";
import AboutArt from "../about/AboutArt";
import AboutCopy from "../about/AboutCopy";
import CvBlock from "../about/CvBlock";
import ButtonLink from "../ui/ButtonLink";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RichText from "../ui/RichText";
import Wrap from "../ui/Wrap";

// .about - statement, then a 12-column grid: art, copy, CV with the portfolio link
export default function About() {
    return (
        <section
            id="about"
            aria-labelledby="aboutTitle"
            className="relative bg-paper pb-[clamp(96px,11vw,170px)] pt-[clamp(96px,12vw,190px)] text-ink"
        >
            <Wrap>
                <Reveal>
                    <Eyebrow className="text-ink-soft">{ABOUT_COPY.eyebrow}</Eyebrow>
                </Reveal>
                <Reveal delay=".08s">
                    <Display
                        id="aboutTitle"
                        className="mb-[clamp(64px,8vw,130px)] mt-[30px] max-w-[16.5em] text-[length:clamp(34px,5.3vw,92px)] leading-[1.04] text-balance [&_em]:text-rouge"
                    >
                        <RichText segments={ABOUT_COPY.statement} />
                    </Display>
                </Reveal>

                {/* .about__grid */}
                <div className="grid grid-cols-12 items-start gap-[clamp(20px,2.4vw,40px)]">
                    <AboutArt />
                    <AboutCopy />

                    {/* .about__cv */}
                    <Reveal
                        delay=".18s"
                        className="col-[10/span_3] upto1100:col-[1/-1] upto1100:mt-10 upto1100:grid upto1100:grid-cols-[1fr_1fr] upto1100:gap-x-10 upto1100:gap-y-0 upto700:mt-6 upto700:grid-cols-[1fr]"
                    >
                        {CV_BLOCKS.map((block) => (
                            <CvBlock key={block.title} title={block.title} items={block.items} />
                        ))}

                        {/* .about__ctas */}
                        <div className="flex flex-wrap items-center gap-x-[26px] gap-y-3.5 upto1100:col-[1/-1]">
                            <ButtonLink href={ABOUT_COPY.cta.href} variant={ABOUT_COPY.cta.variant} icon={ABOUT_COPY.cta.icon}>
                                {ABOUT_COPY.cta.label}
                            </ButtonLink>
                        </div>
                    </Reveal>
                </div>
            </Wrap>
        </section>
    );
}
