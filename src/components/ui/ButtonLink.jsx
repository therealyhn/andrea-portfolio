import Icon from "./Icon";

// .btn
const BASE_CLASSES =
    "group inline-flex items-center justify-center gap-3 min-h-[52px] px-[26px] border font-sans font-semibold text-13 leading-100 tracking-14 uppercase whitespace-nowrap transition-[background-color,color,border-color] duration-350 ease-editorial disabled:opacity-60 disabled:cursor-default";

// .btn--cream / .btn--ghost / .btn--wine
const VARIANT_CLASSES = {
    cream: "bg-cream text-wine border-cream hover:bg-transparent hover:text-cream",
    ghost: "text-cream border-cream/40 hover:border-cream hover:bg-cream/[.06]",
    wine: "bg-wine text-cream border-wine hover:bg-ink hover:border-ink",
};

/*
  variant: "cream" | "ghost" | "wine"
  href -> <a>, otherwise <button type={type}>
*/
export default function ButtonLink({ variant = "cream", href, onClick, type = "button", icon, disabled, children }) {
    const className = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`;
    const content = (
        <>
            {children}
            {icon && (
                <Icon
                    name={icon}
                    size={18}
                    className="transition-transform duration-350 ease-editorial group-hover:translate-x-1"
                />
            )}
        </>
    );

    if (href) {
        return (
            <a href={href} onClick={onClick} className={className}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={className}>
            {content}
        </button>
    );
}
