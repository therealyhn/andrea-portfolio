import useReveal from "../../hooks/useReveal";

// [data-reveal] - fades and lifts in once; delay sets --d (e.g. ".12s")
export default function Reveal({ as = "div", delay, className = "", children, ...rest }) {
    const Tag = as;
    const revealRef = useReveal();

    return (
        <Tag
            ref={revealRef}
            style={delay !== undefined ? { "--d": delay } : undefined}
            className={`opacity-0 translate-y-7 transition-[opacity,transform] duration-1000 ease-editorial [transition-delay:var(--d,0s)] data-[in=true]:opacity-100 data-[in=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}
