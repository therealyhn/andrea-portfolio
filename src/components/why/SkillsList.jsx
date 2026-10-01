import { SKILLS, WHY_COPY } from "../../data/whyData";
import { pad2 } from "../../lib/utils/format";
import Reveal from "../ui/Reveal";

// .skills - numbered skills and tools in two columns (one on small screens)
export default function SkillsList() {
    return (
        <Reveal className="mt-[clamp(56px,6vw,88px)]">
            <h3 className="border-b border-cream pb-3.5 font-sans text-12 font-medium uppercase leading-120 tracking-20 text-cream-soft">
                {WHY_COPY.skillsTitle}
            </h3>
            <ol className="grid grid-cols-[1fr_1fr] gap-x-10 upto600:grid-cols-[1fr]">
                {SKILLS.map((skill, i) => (
                    <li
                        key={skill}
                        className="flex items-baseline gap-4 border-b border-line-dark py-4 font-serif text-[length:clamp(19px,1.5vw,23px)] leading-125 opsz-20"
                    >
                        {/* .skills li::before */}
                        <span
                            aria-hidden="true"
                            className="min-w-5 font-sans text-11 font-medium leading-100 tracking-12 text-cream-faint"
                        >
                            {pad2(i + 1)}
                        </span>
                        {skill}
                    </li>
                ))}
            </ol>
        </Reveal>
    );
}
