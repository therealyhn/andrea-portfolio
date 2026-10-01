import { HERO_COPY } from "../../data/heroData";

/*
  .hero__index - chapter list linking to each Work chapter (bottom right, wide landscape only).
  The list stays empty until the Sanity data is ready.
*/
export default function HeroIndex({ chapters, status }) {
    const items = status === "ready" ? chapters : [];

    return (
        <nav
            aria-label={HERO_COPY.indexLabel}
            className="absolute bottom-hero-edge right-gutter z-[3] w-[min(24cqw,330px)] motion-fade [--fade-delay:.85s] cq-land-1023:hidden cq-portrait:hidden"
        >
            <h2 className="mb-3.5 font-sans text-11 font-medium uppercase leading-100 tracking-20 text-cream-faint">
                {HERO_COPY.indexTitle}
            </h2>
            <ol className="[&>li:last-child>a]:border-b">
                {items.map((chapter) => (
                    <li key={chapter.key}>
                        <a
                            href={`#ch-${chapter.key}`}
                            className="group/ix grid grid-cols-[30px_1fr_auto] items-baseline gap-2 border-t border-line-dark py-[13px] [transition:padding_.4s_var(--ease),color_.3s] hover:pl-2"
                        >
                            <span className="font-sans text-11 font-medium leading-100 tracking-12 text-cream-faint">
                                {chapter.no}
                            </span>
                            <b className="font-serif text-[21px] font-normal leading-110 tracking-neg1 opsz-12 group-hover/ix:italic">
                                {chapter.short}
                            </b>
                            <i className="font-sans text-12 font-medium not-italic leading-100 text-cream-faint">
                                {chapter.items.length}
                            </i>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
