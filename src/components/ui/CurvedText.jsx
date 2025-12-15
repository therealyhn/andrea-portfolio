export default function CurvedText({ text }) {
    if (!text) return null;

    return (
        <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full pointer-events-none"
        >
            <defs>
                <path
                    id="curve"
                    d="M 50 200 A 150 150 0 1 1 350 200"
                />
            </defs>

            <text
                fill="currentColor"
                className="text-text-light uppercase tracking-[0.35em]"
                fontSize="28"
                fontFamily="inherit"
            >
                <textPath
                    href="#curve"
                    startOffset="50%"
                    textAnchor="middle"
                >
                    {text}
                </textPath>
            </text>
        </svg>
    );
}
