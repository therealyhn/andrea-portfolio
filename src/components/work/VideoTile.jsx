import { memo } from "react";
import { WORK_COPY } from "../../data/workData";
import useVideoMeta from "../../hooks/useVideoMeta";
import { formatDuration } from "../../lib/utils/format";
import { TILE_BUTTON_CLASSES, TILE_ITEM_CLASSES, TILE_MEDIA_CLASSES } from "./ImageTile";

const DEFAULT_RATIO = 16 / 9;

/*
  .tile--video - poster (static VIDEO_META) or the film's first frame, play badge and caption with the length.
  Without static metadata the ratio and length come from the video itself once its metadata loads.
*/
function VideoTile({ item, index, chapterIndex, onOpenItem }) {
    const { meta, onLoadedMetadata } = useVideoMeta();
    const width = item.width ?? meta?.width;
    const height = item.height ?? meta?.height;
    const ratio = width && height ? width / height : DEFAULT_RATIO;
    const duration = item.duration ?? meta?.duration ?? null;
    const length = duration === null ? null : formatDuration(duration);
    const landscape = width > height;

    return (
        <li className={TILE_ITEM_CLASSES} style={{ "--ar": ratio.toFixed(4) }}>
            <button
                type="button"
                aria-label={`${WORK_COPY.playFilm}: ${item.alt}${length ? `, ${length}` : ""}`}
                onClick={(event) => onOpenItem(chapterIndex, index, event.currentTarget)}
                className={`${TILE_BUTTON_CLASSES} before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(to_top,rgba(20,2,6,.72),rgba(20,2,6,0)_46%)] before:content-['']`}
            >
                {item.poster ? (
                    <img
                        src={item.poster}
                        alt=""
                        width={landscape ? 720 : 360}
                        height={landscape ? 405 : 640}
                        loading="lazy"
                        decoding="async"
                        data-loaded="true"
                        className={TILE_MEDIA_CLASSES}
                    />
                ) : (
                    <video
                        src={`${item.url}#t=0.1`}
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        tabIndex={-1}
                        onLoadedMetadata={onLoadedMetadata}
                        className="size-full object-cover"
                    />
                )}

                {/* .tile__play */}
                <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 z-[2] -ml-9 -mt-9 grid size-[72px] place-items-center rounded-full border border-cream/55 bg-cream/[.14] backdrop-blur-[8px] [transition:transform_.5s_var(--ease),background_.4s] group-hover/tile:scale-[1.08] group-hover/tile:bg-cream/[.26] upto600:-ml-[30px] upto600:-mt-[30px] upto600:size-[60px]"
                >
                    <svg className="ml-[3px] size-[22px] fill-cream stroke-none" aria-hidden="true" focusable="false">
                        <use href="#i-play" />
                    </svg>
                </span>

                {/* .tile__cap */}
                <span
                    aria-hidden="true"
                    className="absolute bottom-4 left-[18px] right-[18px] z-[2] flex items-baseline justify-between gap-3 text-left"
                >
                    <b className="font-serif text-[20px] font-normal leading-[1.15] opsz-12">{item.alt}</b>
                    {length && (
                        <span className="font-sans text-12 font-medium leading-100 tracking-[.1em] tabular-nums text-cream-soft">
                            {length}
                        </span>
                    )}
                </span>
            </button>
        </li>
    );
}

export default memo(VideoTile);
