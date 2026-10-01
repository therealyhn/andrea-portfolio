import { memo, useCallback, useState } from "react";
import { imageSrcSet, imageUrl } from "../../lib/sanity/imageUrl";
import { pad2 } from "../../lib/utils/format";

const TILE_SRC_WIDTH = 480;
const TILE_WIDTHS = [320, 480, 720, 960, 1280];
// Tile height in `sizes`: min(116vw, 64svh) is 116vw on a 390x844 phone, 600px on desktop
const NARROW_TILE_VW = 116;
const WIDE_TILE_PX = 600;

// .tile - height from --th, width from the media aspect ratio (--ar); shared with VideoTile
export const TILE_ITEM_CLASSES =
    "relative h-[var(--th)] w-[calc(var(--th)*var(--ar))] flex-none snap-start [--th:clamp(320px,60svh,620px)] upto959:[--th:min(116vw,64svh,560px)]";

// .tile__btn with its ::after hover frame; not clickable while the strip is dragged
export const TILE_BUTTON_CLASSES =
    "group/tile relative block size-full overflow-hidden bg-wine-tile shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_26px_50px_-24px_rgba(0,0,0,.7)] after:absolute after:inset-0 after:border after:border-cream/0 after:transition-[border-color] after:duration-400 after:content-[''] hover:after:border-cream/55 group-data-[drag=true]/strip:pointer-events-none";

// .tile__btn img - fades in once loaded, grows slightly on hover
export const TILE_MEDIA_CLASSES =
    "size-full object-cover opacity-0 [transition:transform_1.1s_var(--ease),opacity_.6s] group-hover/tile:scale-[1.035] data-[loaded=true]:opacity-100";

// .tile - image from the Sanity CDN; opens the lightbox
function ImageTile({ item, index, total, chapterIndex, onOpenItem }) {
    const [loaded, setLoaded] = useState(false);
    const ratio = item.width / item.height;

    const markLoaded = useCallback(() => setLoaded(true), []);
    // an image already complete when it mounts (memory cache) is shown right away
    const imageRef = useCallback((image) => {
        if (image?.complete) setLoaded(true);
    }, []);

    return (
        <li className={TILE_ITEM_CLASSES} style={{ "--ar": ratio.toFixed(4) }}>
            <button
                type="button"
                onClick={(event) => onOpenItem(chapterIndex, index, event.currentTarget)}
                className={TILE_BUTTON_CLASSES}
            >
                <img
                    ref={imageRef}
                    srcSet={imageSrcSet(item.ref, TILE_WIDTHS)}
                    sizes={`(max-width:959px) ${Math.round(NARROW_TILE_VW * ratio)}vw, ${Math.round(WIDE_TILE_PX * ratio)}px`}
                    src={imageUrl(item.ref, TILE_SRC_WIDTH)}
                    alt={item.alt}
                    width={TILE_SRC_WIDTH}
                    height={Math.round(TILE_SRC_WIDTH / ratio)}
                    loading="lazy"
                    decoding="async"
                    data-loaded={loaded}
                    onLoad={markLoaded}
                    onError={markLoaded}
                    className={TILE_MEDIA_CLASSES}
                />
                {/* .tile__no */}
                <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 z-[1] translate-y-1.5 bg-wine-3/[.82] px-[9px] py-[7px] font-sans text-11 font-medium leading-100 tracking-14 text-cream opacity-0 [transition:opacity_.35s,transform_.35s_var(--ease)] group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100"
                >
                    {pad2(index + 1)} / {pad2(total)}
                </span>
            </button>
        </li>
    );
}

export default memo(ImageTile);
