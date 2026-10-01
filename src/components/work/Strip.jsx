import { WORK_COPY } from "../../data/workData";
import useDragScroll from "../../hooks/useDragScroll";
import Reveal from "../ui/Reveal";
import ImageTile from "./ImageTile";
import VideoTile from "./VideoTile";

/*
  .strip - horizontally scrolled row of tiles (focusable region, mouse drag, snap) and the progress bar
  below it (--p = share of the strip seen so far). Full bleed on the right, gutter on the left below 960px.
*/
export default function Strip({ chapter, chapterIndex, scrollerRef, progress, onOpenItem }) {
    const dragging = useDragScroll(scrollerRef);
    const { items } = chapter;

    return (
        <Reveal delay=".1s" className="relative min-w-0">
            {/* .strip__scroller */}
            <div
                ref={scrollerRef}
                tabIndex={0}
                role="region"
                aria-label={`${chapter.title}, ${items.length} ${chapter.unit}. ${WORK_COPY.stripHint}`}
                data-drag={dragging}
                className="group/strip cursor-grab snap-x snap-proximity overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-pl-0 pr-gutter -outline-offset-2 [scrollbar-width:none] data-[drag=true]:cursor-grabbing data-[drag=true]:select-none data-[drag=true]:snap-none upto959:scroll-pl-gutter upto959:pl-gutter [&::-webkit-scrollbar]:hidden"
            >
                {/* .strip__track */}
                <ul className="flex w-max gap-3.5">
                    {items.map((item, i) =>
                        item.kind === "video" ? (
                            <VideoTile
                                key={item.key}
                                item={item}
                                index={i}
                                chapterIndex={chapterIndex}
                                onOpenItem={onOpenItem}
                            />
                        ) : (
                            <ImageTile
                                key={item.key}
                                item={item}
                                index={i}
                                total={items.length}
                                chapterIndex={chapterIndex}
                                onOpenItem={onOpenItem}
                            />
                        ),
                    )}
                </ul>
            </div>

            {/* .strip__bar */}
            <div aria-hidden="true" className="relative mr-gutter mt-[22px] h-px overflow-hidden bg-line-dark upto959:ml-gutter">
                <i
                    style={{ "--p": progress.toFixed(4) }}
                    className="absolute inset-0 origin-left scale-x-[var(--p,0)] bg-cream transition-transform duration-200 ease-linear"
                />
            </div>
        </Reveal>
    );
}
