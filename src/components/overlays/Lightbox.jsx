import { useEffect, useRef, useState } from "react";
import { LIGHTBOX_COPY, MEDIA_STEPS } from "../../data/workData";
import useFocusTrap from "../../hooks/useFocusTrap";
import useScrollLock from "../../hooks/useScrollLock";
import { imageUrl } from "../../lib/sanity/imageUrl";
import { pad2 } from "../../lib/utils/format";
import Icon from "../ui/Icon";
import LightboxMedia from "./LightboxMedia";

const CLOSE_FOCUS_DELAY_MS = 50;
const ZOOM_FACTOR = 2.2;
const ZOOM_FALLBACK_WIDTH = 2400;
const SWIPE_MIN_PX = 48;
const SWIPE_RATIO = 1.4;
const PRELOAD_WIDTH = 1200;
const PRELOAD_QUALITY = 82;

// .lb__nav - previous / next on the stage edges, hidden up to 700px (swipe there)
const NAV_CLASSES =
    "absolute top-1/2 -mt-7 grid size-14 place-items-center border border-cream/[.28] bg-wine-deep/50 transition-[background-color,color] duration-300 hover:bg-cream hover:text-wine upto700:hidden";
const NAV_SIDE_CLASSES = { [-1]: "left-lb-nav", 1: "right-lb-nav" };

/*
  .lb - full-screen viewer for the items of one chapter (always mounted, data-open). Title and counter on top,
  media on the stage (click on an image zooms around the clicked point, click beside it closes), caption with
  the zoom hint below. Arrows, swipe and the arrow keys move through the chapter; Escape or Close closes.
  tabIndex -1: a click on the image keeps focus inside the dialog, so the keys keep working after a zoom.
*/
export default function Lightbox({ chapters, state, onClose, onGo }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const swipeRef = useRef(null);
    const [zoom, setZoom] = useState(null);

    const { open, chapterIndex, itemIndex, session, showMedia } = state;
    const chapter = chapters[chapterIndex];
    const item = chapter?.items[itemIndex];
    const mediaKey = item && showMedia ? `${session}:${chapterIndex}:${itemIndex}` : null;
    // zoom belongs to one shown item; navigating or reopening starts unzoomed
    const zoomWidth = zoom && zoom.key === mediaKey ? zoom.width : null;
    const zoomed = zoomWidth !== null;

    useScrollLock(open);
    useFocusTrap(dialogRef, open);

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => closeRef.current?.focus(), CLOSE_FOCUS_DELAY_MS);
        return () => clearTimeout(timer);
    }, [open]);

    // neighbouring images are requested ahead, so stepping through the chapter shows them at once
    useEffect(() => {
        if (!open || !chapter) return;
        const { items } = chapter;
        [1, -1].forEach((step) => {
            const neighbour = items[(itemIndex + step + items.length) % items.length];
            if (neighbour.kind !== "image") return;
            const preload = new Image();
            preload.src = imageUrl(neighbour.ref, PRELOAD_WIDTH, PRELOAD_QUALITY);
        });
    }, [open, chapter, itemIndex]);

    const onKeyDown = (event) => {
        if (event.key === "Escape") onClose();
        else if (event.target.tagName === "VIDEO") return;
        else if (event.key === "ArrowRight") onGo(1);
        else if (event.key === "ArrowLeft") onGo(-1);
    };

    const onStageClick = (event) => {
        const stage = event.currentTarget;
        const image = event.target.closest("img");
        if (!image) {
            if (event.target === stage) onClose();
            return;
        }

        if (zoomed) {
            setZoom(null);
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
            return;
        }

        const rect = image.getBoundingClientRect();
        const focusX = (event.clientX - rect.left) / rect.width;
        const focusY = (event.clientY - rect.top) / rect.height;
        const width = Math.min(
            Number(image.getAttribute("width")) || ZOOM_FALLBACK_WIDTH,
            Math.round(Math.max(stage.clientWidth, rect.width * ZOOM_FACTOR)),
        );
        setZoom({ key: mediaKey, width });
        requestAnimationFrame(() => {
            stage.scrollLeft = focusX * image.offsetWidth - stage.clientWidth / 2;
            stage.scrollTop = focusY * image.offsetHeight - stage.clientHeight / 2;
        });
    };

    const onPointerDown = (event) => {
        if (event.pointerType !== "mouse" && !zoomed) swipeRef.current = { x: event.clientX, y: event.clientY };
    };

    const onPointerUp = (event) => {
        const start = swipeRef.current;
        if (!start) return;
        swipeRef.current = null;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * SWIPE_RATIO) onGo(dx < 0 ? 1 : -1);
    };

    const zoomHint =
        item?.kind === "image" &&
        (window.matchMedia("(hover: none)").matches ? LIGHTBOX_COPY.zoomHintTouch : LIGHTBOX_COPY.zoomHintPointer);

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lbTitle"
            tabIndex={-1}
            data-open={open}
            onKeyDown={onKeyDown}
            className="invisible fixed inset-0 z-[90] grid grid-rows-[auto_minmax(0,1fr)_auto] bg-wine-deep opacity-0 [transition:opacity_.4s_var(--ease),visibility_0s_.4s] data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:[transition:opacity_.4s_var(--ease)]"
        >
            {/* .lb__top */}
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-gutter py-3.5">
                <p className="flex min-w-0 items-baseline gap-3.5">
                    <b id="lbTitle" className="truncate font-serif text-[length:clamp(18px,1.6vw,24px)] font-normal leading-120 opsz-20">
                        {chapter?.title}
                    </b>
                    <span className="whitespace-nowrap font-sans text-12 font-medium leading-100 tracking-12 tabular-nums text-cream-faint">
                        {item && `${pad2(itemIndex + 1)} / ${pad2(chapter.items.length)}`}
                    </span>
                </p>
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-tap items-center gap-2.5 px-1 font-sans text-12 font-semibold uppercase leading-100 tracking-20"
                >
                    {LIGHTBOX_COPY.close}
                    <Icon name="close" />
                </button>
            </div>

            {/* .lb__stage - the screen-size padding is repeated with the zoom, otherwise 12px would win */}
            <div
                data-zoom={zoomed}
                onClick={onStageClick}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="group/stage relative flex min-h-0 touch-pan-y items-center justify-center px-[clamp(16px,7vw,120px)] upto700:px-3 data-[zoom=true]:block data-[zoom=true]:touch-auto data-[zoom=true]:overflow-auto data-[zoom=true]:overscroll-contain data-[zoom=true]:p-0 data-[zoom=true]:[scrollbar-color:rgba(246,239,230,.3)_transparent] data-[zoom=true]:[scrollbar-width:thin] upto700:data-[zoom=true]:p-0"
            >
                {mediaKey && <LightboxMedia key={mediaKey} item={item} active={open} zoomWidth={zoomWidth} />}
            </div>

            {/* .lb__cap */}
            <p className="min-h-[58px] px-gutter pb-[max(20px,env(safe-area-inset-bottom))] pt-4 text-center text-14 text-cream-soft">
                {item?.alt}
                {zoomHint && (
                    <span className="ml-3.5 inline-flex items-center gap-2 text-12 tracking-[.08em] text-cream-faint">{zoomHint}</span>
                )}
            </p>

            {MEDIA_STEPS.map((step) => (
                <button
                    key={step.dir}
                    type="button"
                    aria-label={step.label}
                    onClick={() => onGo(step.dir)}
                    className={`${NAV_CLASSES} ${NAV_SIDE_CLASSES[step.dir]}`}
                >
                    <Icon name={step.icon} />
                </button>
            ))}
        </div>
    );
}
