import { useEffect, useRef, useState } from "react";
import { imageSrcSet, imageUrl } from "../../lib/sanity/imageUrl";

const LIGHTBOX_SRC_WIDTH = 1200;
const LIGHTBOX_WIDTHS = [800, 1200, 1600, 2200];
const LIGHTBOX_QUALITY = 82;

// .lb__media - fitted into the stage below the top bar and caption
const MEDIA_CLASSES =
    "h-auto max-h-[calc(100dvh_-_168px)] w-auto max-w-full bg-wine-media object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] transition-opacity duration-350 ease-editorial upto700:max-h-[calc(100dvh_-_150px)]";

/*
  img.lb__media - hidden until loaded; in a zoomed stage it drops the size limits (the screen-size variant is
  repeated, otherwise the 700px max-height would win over the zoom).
*/
const IMAGE_CLASSES =
    "cursor-zoom-in data-[loading=true]:opacity-0 group-data-[zoom=true]/stage:mx-auto group-data-[zoom=true]/stage:max-h-none group-data-[zoom=true]/stage:max-w-none group-data-[zoom=true]/stage:cursor-zoom-out group-data-[zoom=true]/stage:shadow-none upto700:group-data-[zoom=true]/stage:max-h-none";

/*
  The open lightbox item: a Sanity image (srcset up to 2200px, zoom width from the Lightbox) or the film
  (autoplay with controls, paused as soon as the lightbox closes).
*/
export default function LightboxMedia({ item, active, zoomWidth }) {
    const videoRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!active) videoRef.current?.pause();
    }, [active]);

    if (item.kind === "video") {
        return (
            <video
                ref={videoRef}
                src={item.url}
                poster={item.poster ?? undefined}
                width={item.width ?? undefined}
                height={item.height ?? undefined}
                aria-label={item.alt}
                controls
                playsInline
                autoPlay
                preload="auto"
                className={MEDIA_CLASSES}
            />
        );
    }

    const ratio = item.width / item.height;

    return (
        <img
            srcSet={imageSrcSet(item.ref, LIGHTBOX_WIDTHS, LIGHTBOX_QUALITY)}
            sizes={zoomWidth ? `${zoomWidth}px` : `min(${(ratio * 100).toFixed(1)}vh, 100vw)`}
            src={imageUrl(item.ref, LIGHTBOX_SRC_WIDTH, LIGHTBOX_QUALITY)}
            alt={item.alt}
            width={item.width}
            height={item.height}
            decoding="async"
            data-loading={loading}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            style={zoomWidth ? { width: zoomWidth } : undefined}
            className={`${MEDIA_CLASSES} ${IMAGE_CLASSES}`}
        />
    );
}
