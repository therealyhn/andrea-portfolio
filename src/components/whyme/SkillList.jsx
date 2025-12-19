import useInView from "../../hooks/useInView";

export default function SkillList({ skills }) {
    const [sectionRef, inView] = useInView();
    if (!skills || skills.length === 0) return null;

    return (
        <ul ref={sectionRef} className={`flex flex-col items-end gap-4 mb-10 transition-all duration-700 ${inView ? "animate__animated animate__fadeInUp animate__delay-2s" : "opacity-0 invisible"}`}>
            {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-4 text-lg sm:text-xl font-light tracking-wide text-text-light/90 group">
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity">{skill}</span>

                    <div className="text-primary opacity-90 group-hover:scale-110 transition-transform duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                        </svg>
                    </div>
                </li>
            ))}
        </ul>
    );
}