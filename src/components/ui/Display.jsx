// .display - serif headline, <em> inside renders italic; id is the target of a section's aria-labelledby
export default function Display({ as = "h2", id, className = "", children }) {
    const Tag = as;

    return (
        <Tag id={id} className={`font-serif font-normal tracking-neg2 [font-optical-sizing:auto] opsz-34 [&_em]:italic ${className}`}>
            {children}
        </Tag>
    );
}
