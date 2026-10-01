import { ABOUT_COPY } from "../../data/aboutData";
import Reveal from "../ui/Reveal";

// .about__copy p:first-child::first-letter - red serif drop cap
const DROP_CAP_CLASSES =
    "first-letter:float-left first-letter:mt-[.04em] first-letter:mr-[.06em] first-letter:-ml-[.02em] first-letter:font-serif first-letter:text-[4.1em] first-letter:leading-[.82] first-letter:text-rouge first-letter:opsz-18";

// .about__copy - body text column, the first paragraph opens with a drop cap
export default function AboutCopy() {
    return (
        <Reveal
            delay=".1s"
            className="col-[6/span_3] flex flex-col gap-5 text-17 leading-170 text-ink-body upto1100:col-[7/span_6] upto700:col-[1/-1]"
        >
            {ABOUT_COPY.paragraphs.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? DROP_CAP_CLASSES : undefined}>
                    {paragraph}
                </p>
            ))}
        </Reveal>
    );
}
