import { WHY_COPY } from "../../data/whyData";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RichText from "../ui/RichText";
import SkillsList from "../why/SkillsList";
import WhyClose from "../why/WhyClose";
import WhyFigure from "../why/WhyFigure";

/*
  .why - left column: sticky title over the figure; right column: lead, two text columns, skills, closing.
  Up to 959px the left column dissolves (display: contents) into one column: title, text, figure.
  overflow-clip, not overflow-hidden: a hidden ancestor would break the sticky title.
*/
export default function WhyMe({ whyFigure }) {
    return (
        <section id="whyme" aria-labelledby="whyTitle" className="relative overflow-clip bg-wine">
            {/* .why__grid */}
            <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-[clamp(32px,5vw,96px)] upto959:grid-cols-[1fr] upto959:gap-0">
                {/* .why__left */}
                <div className="flex min-w-0 flex-col pt-[clamp(96px,12vw,180px)] upto959:contents">
                    {/* .why__head */}
                    <div className="flex-1 pl-gutter upto959:order-1 upto959:px-gutter upto959:pb-0 upto959:pt-[clamp(88px,14vw,140px)]">
                        {/* .why__stick */}
                        <div className="sticky top-[120px] upto959:static">
                            <Reveal>
                                <Eyebrow className="text-cream-soft">{WHY_COPY.eyebrow}</Eyebrow>
                            </Reveal>
                            <Reveal delay=".08s">
                                <Display id="whyTitle" className="mt-6 text-[length:clamp(72px,10vw,176px)] leading-86">
                                    <RichText segments={WHY_COPY.title} />
                                </Display>
                            </Reveal>
                        </div>
                    </div>

                    <WhyFigure figure={whyFigure} />
                </div>

                {/* .why__right */}
                <div className="min-w-0 pb-[clamp(96px,10vw,160px)] pr-gutter pt-[clamp(120px,15vw,250px)] upto959:order-2 upto959:px-gutter upto959:pb-0 upto959:pt-10">
                    <Reveal>
                        <Display
                            as="p"
                            className="max-w-[22em] text-[length:clamp(28px,2.7vw,44px)] leading-[1.18] text-pretty [&_em]:text-cream-blush"
                        >
                            <RichText segments={WHY_COPY.lead} />
                        </Display>
                    </Reveal>

                    {/* .why__cols */}
                    <Reveal
                        delay=".08s"
                        className="mt-[clamp(40px,4vw,64px)] grid grid-cols-[1fr_1fr] gap-x-10 gap-y-5 text-16 leading-170 text-cream-soft upto600:grid-cols-[1fr]"
                    >
                        {WHY_COPY.columns.map((column) => (
                            <div key={column[0]}>
                                {column.map((paragraph, i) => (
                                    <p key={paragraph} className={i > 0 ? "mt-5" : undefined}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </Reveal>

                    <SkillsList />
                    <WhyClose />
                </div>
            </div>
        </section>
    );
}
