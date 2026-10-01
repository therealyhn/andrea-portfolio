// .wrap
export default function Wrap({ as = "div", className = "", children }) {
    const Tag = as;
    return <Tag className={`w-full max-w-wrap mx-auto px-gutter ${className}`}>{children}</Tag>;
}
