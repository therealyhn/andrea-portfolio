import SkillList from "./SkillList";
import Button from "../ui/Button";

export default function WhyMeContent({ heading, description, skills, buttonText }) {
    return (
        <div className="w-full md:w-1/2 lg:w-5/12 text-right text-text-light">
            {/* Dekoracija */}
            <div className="flex justify-end gap-2 mb-4 text-primary opacity-80">
                <span className="text-2xl">✦</span>
                <span className="text-xl mt-2">✦</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider mb-6">
                {heading}
            </h2>

            {description && (
                <p className="font-body text-text-light/80 text-lg sm:text-xl leading-relaxed mb-8 whitespace-pre-line">
                    {description}
                </p>
            )}

            <SkillList skills={skills} />

            <Button href="#contact" variant="outline">{buttonText}</Button>
        </div>
    );
}