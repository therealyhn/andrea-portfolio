import { MEDIA_STEPS, WORK_COPY } from "../../data/workData";
import { pad2 } from "../../lib/utils/format";
import Display from "../ui/Display";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";

/*
  .chap__meta - chapter number, title, lead, optional full-story link (R2.04 passes onOpenStory) and,
  pinned to the bottom, the tile counter with the strip arrows (arrows hidden up to 600px).
*/
export default function ChapterMeta({ chapter, chapterIndex, index, atStart, atEnd, onStep, onOpenStory }) {
    const total = chapter.items.length;
    const hasStory = chapter.story.length > 1 && Boolean(onOpenStory);
    const disabled = { [-1]: atStart, 1: atEnd };

    return (
        <Reveal className="flex min-h-full flex-col pl-gutter upto959:pr-gutter">
            {/* .chap__no */}
            <p className="flex items-center gap-3 font-serif text-15 font-normal italic leading-100 text-cream-faint opsz-12 after:h-px after:flex-1 after:bg-line-dark after:content-['']">
                {WORK_COPY.chapter} {chapter.no}
            </p>
            <Display
                as="h3"
                id={`cht-${chapter.key}`}
                className="mb-[18px] mt-[22px] text-[length:clamp(34px,3.2vw,52px)] leading-102 text-balance"
            >
                {chapter.title}
            </Display>
            {chapter.lead && <p className="max-w-[40ch] text-16 leading-165 text-cream-soft">{chapter.lead}</p>}

            {/* .ulink.chap__more */}
            {hasStory && (
                <button
                    type="button"
                    onClick={(event) => onOpenStory(chapterIndex, event.currentTarget)}
                    className="relative mt-5 inline-flex items-center gap-2.5 self-start py-2 font-sans text-13 font-semibold uppercase leading-100 tracking-14 text-cream after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-editorial after:content-[''] hover:after:scale-x-[.35]"
                >
                    {WORK_COPY.readStory}
                    <Icon name="arrow" size={16} />
                </button>
            )}

            {/* .chap__ctrl */}
            <div className="mt-auto flex items-center justify-between gap-4 pt-8 upto959:pt-5">
                <p aria-live="polite" className="font-serif text-15 font-normal leading-100 tabular-nums text-cream-faint opsz-12">
                    <b className="mr-1.5 text-[30px] font-normal italic text-cream">{pad2(index + 1)}</b>/ {pad2(total)}
                </p>
                <div className="flex gap-2 upto600:hidden">
                    {MEDIA_STEPS.map((step) => (
                        <button
                            key={step.dir}
                            type="button"
                            aria-label={`${step.label} ${chapter.short} ${WORK_COPY.stepSuffix}`}
                            disabled={disabled[step.dir]}
                            onClick={() => onStep(step.dir)}
                            className="grid size-[52px] place-items-center border border-cream/30 transition-[background-color,color,border-color,opacity] duration-300 enabled:hover:border-cream enabled:hover:bg-cream enabled:hover:text-wine disabled:cursor-default disabled:opacity-30"
                        >
                            <Icon name={step.icon} />
                        </button>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}
