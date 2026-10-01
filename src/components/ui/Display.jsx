// .display - serif headline, <em> inside renders italic
export default function Display({ as = "h2", className = "", children }) {
    const Tag = as;

    return (
        <Tag className={`font-serif font-normal tracking-neg2 [font-optical-sizing:auto] opsz-34 [&_em]:italic ${className}`}>
            {children}
        </Tag>
    );
}
