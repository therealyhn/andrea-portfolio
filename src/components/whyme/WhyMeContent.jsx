import SkillList from "./SkillList";
import Button from "../ui/Button";
import useInView from "../../hooks/useInView";

export default function WhyMeContent({ heading, description, skills, buttonText }) {
    const [sectionRef, inView] = useInView();
    return (
        <div ref={sectionRef} className="w-full md:w-1/2 lg:w-5/12 text-right text-text-light">
            {/* Dekoracija */}
            <div className="flex justify-end gap-2 mb-4 text-primary opacity-80">
                <span className="text-2xl">✦</span>
                <span className="text-xl mt-2">✦</span>
            </div>

            <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider mb-6 transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp" : "opacity-0 invisible"}`}>
                {heading}
            </h2>

            {description && (
                <p className={`font-body text-text-light/80 text-lg sm:text-xl leading-relaxed mb-8 whitespace-pre-line transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-1s" : "opacity-0 invisible"}`}>
                    {description}
                </p>
            )}

            <SkillList skills={skills} />

            <Button href="#contact" variant="outline" className={`transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-2s" : "opacity-0 invisible"}`}>{buttonText}</Button>
        </div>
    );
}