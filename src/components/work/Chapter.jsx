import { useRef } from "react";
import useStripScroll from "../../hooks/useStripScroll";
import ChapterMeta from "./ChapterMeta";
import Strip from "./Strip";

// .chap - meta column and strip side by side, stacked up to 959px; the hero index links to #ch-<key>
export default function Chapter({ chapter, chapterIndex, onOpenItem, onOpenStory }) {
    const scrollerRef = useRef(null);
    const strip = useStripScroll(scrollerRef, chapter.items.length);

    return (
        <article
            id={`ch-${chapter.key}`}
            aria-labelledby={`cht-${chapter.key}`}
            className="grid scroll-mt-16 grid-cols-[minmax(280px,27%)_minmax(0,1fr)] gap-[clamp(24px,3.5vw,64px)] border-t border-line-dark py-[clamp(40px,4.5vw,64px)] last:border-b upto959:grid-cols-[1fr] upto959:gap-7"
        >
            <ChapterMeta
                chapter={chapter}
                chapterIndex={chapterIndex}
                index={strip.index}
                atStart={strip.atStart}
                atEnd={strip.atEnd}
                onStep={strip.scrollByDir}
                onOpenStory={onOpenStory}
            />
            <Strip
                chapter={chapter}
                chapterIndex={chapterIndex}
                scrollerRef={scrollerRef}
                progress={strip.progress}
                onOpenItem={onOpenItem}
            />
        </article>
    );
}
