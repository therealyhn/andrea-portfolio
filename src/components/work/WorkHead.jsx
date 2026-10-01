import { Fragment } from "react";
import { WORK_COPY } from "../../data/workData";
import { buildWorkSummary } from "../../lib/utils/workSummary";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RichText from "../ui/RichText";
import Wrap from "../ui/Wrap";

// .work__head - title on the left, chapter summary (counts in bold) bottom right; summary is empty until loaded
export default function WorkHead({ chapters }) {
    const summary = buildWorkSummary(chapters);

    return (
        <Wrap className="mb-[clamp(48px,6vw,96px)] grid grid-cols-[1fr_minmax(0,440px)] items-end gap-x-16 gap-y-8 upto959:grid-cols-[1fr]">
            <div>
                <Reveal>
                    <Eyebrow className="text-cream-soft">{WORK_COPY.eyebrow}</Eyebrow>
                </Reveal>
                <Reveal delay=".08s">
                    <Display id="workTitle" className="mt-6 text-[length:clamp(64px,11.5vw,196px)] leading-86">
                        <RichText segments={WORK_COPY.title} />
                    </Display>
                </Reveal>
            </div>

            {/* .work__sum */}
            <Reveal as="p" delay=".16s" className="max-w-[38ch] text-17 text-cream-soft [&_b]:font-medium [&_b]:text-cream">
                {summary.map((segment, i) =>
                    segment.bold ? <b key={i}>{segment.text}</b> : <Fragment key={i}>{segment.text}</Fragment>,
                )}
            </Reveal>
        </Wrap>
    );
}
