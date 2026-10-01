import { HERO_FIGURE } from "../../data/heroData";
import useFigureSource from "../../hooks/useFigureSource";

// .hero__fig - cut-out figure standing on the bottom edge; local file until the Sanity figure has loaded (O06)
export default function HeroFigure({ figure }) {
    const source = useFigureSource(figure, HERO_FIGURE);

    return (
        <img
            src={source.src}
            srcSet={source.srcSet}
            sizes={source.sizes}
            width={source.width}
            height={source.height}
            alt={HERO_FIGURE.alt}
            fetchPriority="high"
            decoding="async"
            className="absolute bottom-0 left-[56%] z-[2] h-[min(82cqh,1240px)] w-auto max-w-none -translate-x-1/2 motion-fig cq-portrait:left-1/2 cq-portrait:h-[min(66cqh,152cqw)] cq-land-1023:left-[66%]"
        />
    );
}
