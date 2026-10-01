import { WHY_FIGURE } from "../../data/whyData";
import { imageSrcSet, imageUrl } from "../../lib/sanity/imageUrl";

const SANITY_WIDTHS = [390, 780, 1170, 1560];
const SANITY_SIZES = "(max-width: 959px) 88vw, 600px";

// Sanity `whyFigure` when set, otherwise the local cut-out (O06)
function figureSource(figure) {
    if (!figure) {
        return { src: WHY_FIGURE.src, width: WHY_FIGURE.width, height: WHY_FIGURE.height };
    }
    return {
        src: imageUrl(figure.ref, 780),
        srcSet: imageSrcSet(figure.ref, SANITY_WIDTHS),
        sizes: SANITY_SIZES,
        width: figure.width,
        height: figure.height,
    };
}

// .why__fig - figure under the sticky title (desktop), last and centered on narrow screens
export default function WhyFigure({ figure }) {
    const source = figureSource(figure);

    return (
        <div className="relative pt-14 upto959:order-3 upto959:flex upto959:justify-center upto959:pt-12">
            <img
                src={source.src}
                srcSet={source.srcSet}
                sizes={source.sizes}
                width={source.width}
                height={source.height}
                alt={WHY_FIGURE.alt}
                loading="lazy"
                decoding="async"
                className="ml-gutter h-auto w-[min(100%,600px)] upto959:m-0 upto959:w-[min(88%,520px)]"
            />
        </div>
    );
}
