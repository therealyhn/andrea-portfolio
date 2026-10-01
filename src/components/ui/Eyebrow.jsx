// .eyebrow - color comes from the parent through className
export default function Eyebrow({ as = "p", className = "", children }) {
    const Tag = as;

    return (
        <Tag
            className={`flex items-center gap-[14px] font-sans font-medium text-12 leading-120 [font-stretch:100%] tracking-20 uppercase before:content-[''] before:w-8 before:h-px before:bg-current before:opacity-55 ${className}`}
        >
            {children}
        </Tag>
    );
}
