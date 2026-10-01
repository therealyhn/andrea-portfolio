import { ABOUT_ART } from "../../data/aboutData";
import Reveal from "../ui/Reveal";

const IMAGE_CLASSES = "size-full object-cover bg-paper-2";

/*
  .about__art - hand-drawn illustration with the AI visual overlapping its bottom right corner,
  captions staggered under it
*/
export default function AboutArt() {
    const { main, inset, captions } = ABOUT_ART;

    return (
        <Reveal
            as="figure"
            className="relative col-[1/span_4] upto1100:col-[1/span_5] upto700:col-[1/-1] upto700:max-w-[420px]"
        >
            {/* .about__main */}
            <div className="relative mr-[14%] upto700:mr-[18%]">
                {/* .about__crop */}
                <div className="aspect-[4/5] overflow-hidden">
                    <img
                        src={main.src}
                        srcSet={main.srcSet}
                        sizes={main.sizes}
                        width={main.width}
                        height={main.height}
                        alt={main.alt}
                        loading="lazy"
                        decoding="async"
                        className={`${IMAGE_CLASSES} object-[50%_62%]`}
                    />
                </div>

                {/* .about__inset */}
                <div className="absolute -bottom-12 -right-[24%] aspect-[3/4] w-[52%] border-8 border-paper shadow-[0_30px_60px_-30px_rgba(42,7,16,.45)] upto700:-bottom-10 upto700:-right-[20%] upto700:w-[48%]">
                    <img
                        src={inset.src}
                        srcSet={inset.srcSet}
                        sizes={inset.sizes}
                        width={inset.width}
                        height={inset.height}
                        alt={inset.alt}
                        loading="lazy"
                        decoding="async"
                        className={IMAGE_CLASSES}
                    />
                </div>
            </div>

            <figcaption className="mt-[18px] flex justify-between gap-4 text-13 text-ink-soft">
                {captions.map((caption, i) => (
                    <span
                        key={caption.label}
                        className={`flex items-baseline gap-2 whitespace-nowrap ${i === 0 ? "max-w-[44%]" : "mt-11"}`}
                    >
                        <b className="font-serif text-17 font-normal italic leading-120 text-ink opsz-20">{caption.label}</b>{" "}
                        {caption.text}
                    </span>
                ))}
            </figcaption>
        </Reveal>
    );
}
