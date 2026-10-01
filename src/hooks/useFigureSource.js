import { useEffect, useState } from "react";
import { imageSrcSet, imageUrl } from "../lib/sanity/imageUrl";

const FIGURE_WIDTHS = [480, 680, 1020, 1360];

// The figure is at most 82vh / 1240px tall, so its rendered width is that height times the aspect ratio.
function sanitySource(figure) {
    const ratio = figure.width / figure.height;

    return {
        ref: figure.ref,
        src: imageUrl(figure.ref, 1360),
        srcSet: imageSrcSet(figure.ref, FIGURE_WIDTHS),
        sizes: `min(${Math.round(82 * ratio * 100) / 100}vh, ${Math.round(1240 * ratio)}px)`,
        width: figure.width,
        height: figure.height,
    };
}

/*
  Source for a cut-out figure <img> (O06): the local file first; once the Sanity figure
  has fully loaded, the same <img> switches to it (no second layer, no opacity swap).
*/
export default function useFigureSource(figure, local) {
    const [loaded, setLoaded] = useState(null);

    useEffect(() => {
        if (!figure) return;

        const source = sanitySource(figure);
        const preload = new Image();
        let active = true;

        preload.onload = () => {
            if (active) setLoaded(source);
        };
        // same srcset/sizes as the visible <img>, so the browser picks (and caches) the same candidate
        preload.sizes = source.sizes;
        preload.srcset = source.srcSet;
        preload.src = source.src;

        return () => {
            active = false;
            preload.onload = null;
        };
    }, [figure]);

    if (figure && loaded && loaded.ref === figure.ref) return loaded;

    return { src: local.src, srcSet: undefined, sizes: undefined, width: local.width, height: local.height };
}
