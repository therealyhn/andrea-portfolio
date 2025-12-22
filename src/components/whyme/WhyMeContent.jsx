import Button from "../ui/Button";
import SkillList from "./SkillList";

export default function WhyMeContent({ heading, description, skills, buttonText, inView }) {
    return (
        <div className="w-full md:w-1/2 lg:w-5/12 text-right text-text-light">
            {/* Dekoracija */}
            <div className={`flex justify-end gap-2 mb-4 text-primary opacity-80 ${inView ? "animate__animated animate__fadeIn" : "opacity-0 invisible"}`}>
                <span className="text-2xl">✦</span>
                <span className="text-xl mt-2">✦</span>
            </div>

            <h2 className={`font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider mb-6 transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp" : "opacity-0 invisible"}`}>
                {heading || "Zašto izabrati mene?"}
            </h2>

            {description && (
                <p className={`font-body text-text-light/80 text-lg sm:text-xl leading-relaxed mb-8 whitespace-pre-line transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-1s" : "opacity-0 invisible"}`}>
                    {description || "Opis nije dostupan"}
                </p>
            )}

            <div className={`transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-2s" : "opacity-0 invisible"}`}>
                <SkillList skills={skills} />
            </div>

            <div className={`transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-3s" : "opacity-0 invisible"}`}>
                <Button href="#contact" variant="outline" className="mt-6">{buttonText}</Button>
            </div>
        </div>
    );
}