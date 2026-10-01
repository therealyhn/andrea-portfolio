import { Fragment, useEffect, useRef, useState } from "react";
import { LEGAL_COPY, LEGAL_DOCS, STORY_COPY } from "../../data/legalData";
import { BRAND, NAV_COPY } from "../../data/siteData";
import { WORK_COPY } from "../../data/workData";
import useFocusTrap from "../../hooks/useFocusTrap";
import useScrollLock from "../../hooks/useScrollLock";
import ButtonLink from "../ui/ButtonLink";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";

const CLOSE_FOCUS_DELAY_MS = 60;
const SCROLL_TO_CHAPTER_DELAY_MS = 120;
const YEAR = new Date().getFullYear();

// .dr__content p and p:first-child (the story lead)
const PARAGRAPH_CLASSES = "mb-[18px] text-17 leading-175 text-ink-story";
const LEAD_CLASSES = "mb-[18px] font-serif text-22 font-normal leading-[1.5] text-ink opsz-12";

// Text of the current view: a chapter story or a legal document (null before the first open)
function drawerContent(view, chapters) {
    if (view?.kind === "story") {
        const chapter = chapters[view.chapterIndex];
        if (!chapter) return null;
        return {
            kicker: `${WORK_COPY.chapter} ${chapter.no}`,
            title: chapter.title,
            meta: `${chapter.items.length} ${chapter.unit}`,
            paragraphs: chapter.story,
            chapterKey: chapter.key,
            unit: chapter.unit,
        };
    }
    if (view?.kind === "legal") {
        const doc = LEGAL_DOCS[view.docKey];
        if (!doc) return null;
        return {
            kicker: LEGAL_COPY.kicker,
            title: doc.title,
            meta: `${LEGAL_COPY.updatedLabel} ${doc.updated}`,
            sections: doc.sections,
        };
    }
    return null;
}

/*
  .dr - side panel for a chapter story or a legal text (always mounted, data-open). Opens at the top with an
  empty progress bar that fills as the text scrolls; Escape, Close or the scrim closes it. "View the <unit>"
  closes the story and scrolls to its chapter. tabIndex -1 keeps focus inside after a click on the text.
*/
export default function Drawer({ chapters, state, onClose }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const bodyRef = useRef(null);
    const [progress, setProgress] = useState({ session: 0, value: 0 });

    const { open, view, session } = state;
    const content = drawerContent(view, chapters);
    // the bar belongs to one opening; a new one starts empty
    const progressValue = progress.session === session ? progress.value : 0;

    useScrollLock(open);
    useFocusTrap(dialogRef, open);

    useEffect(() => {
        if (!open) return;
        if (bodyRef.current) bodyRef.current.scrollTop = 0;
        const timer = setTimeout(() => closeRef.current?.focus(), CLOSE_FOCUS_DELAY_MS);
        return () => clearTimeout(timer);
    }, [open, session]);

    const onKeyDown = (event) => {
        if (event.key === "Escape") onClose();
    };

    const onBodyScroll = (event) => {
        const body = event.currentTarget;
        const max = body.scrollHeight - body.clientHeight;
        setProgress({ session, value: max > 0 ? body.scrollTop / max : 1 });
    };

    const goToChapter = () => {
        const chapterEl = document.getElementById(`ch-${content.chapterKey}`);
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        onClose();
        setTimeout(() => chapterEl?.scrollIntoView({ behavior }), SCROLL_TO_CHAPTER_DELAY_MS);
    };

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drTitle"
            tabIndex={-1}
            data-open={open}
            onKeyDown={onKeyDown}
            className="group/dr invisible fixed inset-0 z-[95] [transition:visibility_0s_.5s] data-[open=true]:visible data-[open=true]:[transition:none]"
        >
            {/* .dr__scrim */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-[rgba(15,2,5,.6)] opacity-0 transition-opacity duration-500 ease-editorial group-data-[open=true]/dr:opacity-100"
            />

            {/* .dr__panel */}
            <div className="absolute inset-y-0 right-0 flex w-[min(640px,100%)] translate-x-full flex-col bg-paper text-ink transition-transform duration-600 ease-editorial group-data-[open=true]/dr:translate-x-0">
                {/* .dr__head */}
                <div className="flex min-h-[72px] items-center justify-between gap-4 border-b border-line-light px-drawer py-3.5">
                    <Eyebrow className="text-ink-soft">{content?.kicker}</Eyebrow>
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

                {/* .dr__progress */}
                <div style={{ "--p": progressValue }} className="h-0.5 origin-left scale-x-[var(--p,0)] bg-rouge" />

                {/* .dr__body */}
                <div
                    ref={bodyRef}
                    onScroll={onBodyScroll}
                    className="flex-1 overflow-y-auto overscroll-contain px-drawer pb-[72px] pt-[clamp(32px,5vw,64px)]"
                >
                    <Display id="drTitle" className="mb-7 text-[length:clamp(36px,4.6vw,58px)] leading-102">
                        {content?.title}
                    </Display>
                    {content?.meta && <p className="-mt-3 mb-7 text-13 tracking-[.06em] text-ink-soft">{content.meta}</p>}

                    {/* .dr__content */}
                    {content && (
                        <div>
                            {content.paragraphs?.map((paragraph, i) => (
                                <p key={i} className={i === 0 ? LEAD_CLASSES : PARAGRAPH_CLASSES}>
                                    {paragraph}
                                </p>
                            ))}
                            {content.sections?.map((section) => (
                                <Fragment key={section.heading}>
                                    <h3 className="mb-2.5 mt-8 font-sans text-13 font-semibold uppercase leading-[1.3] tracking-14 text-ink">
                                        {section.heading}
                                    </h3>
                                    <p className={PARAGRAPH_CLASSES}>{section.body}</p>
                                </Fragment>
                            ))}

                            {/* .dr__foot - the legal copyright line takes the redesign's .is-legal p:first-child style */}
                            <div className="mt-10 border-t border-line-light pt-6">
                                {content.paragraphs ? (
                                    <ButtonLink variant="wine" icon="arrow" onClick={goToChapter}>
                                        {STORY_COPY.action} {content.unit}
                                    </ButtonLink>
                                ) : (
                                    <p className="font-sans text-16 leading-175 tracking-[.06em] text-ink-story">
                                        © {YEAR} {BRAND.copyright}. {LEGAL_COPY.rights}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
