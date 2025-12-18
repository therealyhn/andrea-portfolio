export default function SkillList({ skills }) {
    if (!skills || skills.length === 0) return null;

    return (
        <ul className="flex flex-col items-end gap-3 mb-10">
            {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-3 text-base sm:text-lg font-medium text-text-light/90">
                    <span>{skill}</span>
                    <div className="w-5 h-5 bg-text-light text-theme-black flex items-center justify-center rounded-[2px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                    </div>
                </li>
            ))}
        </ul>
    );
}