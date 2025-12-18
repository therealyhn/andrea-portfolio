/* 
  variant: "outline" (default) | "filled"
*/
export default function Button({ children, href, variant = "outline", className = "" }) {

    // Baza stila - elegantan font, uppercase, zaobljeno
    const baseStyle = "inline-block px-10 py-3 rounded-full uppercase tracking-[0.25em] text-[11px] sm:text-[12px] font-medium transition-all duration-500 ease-out transform";

    // Varijante
    const variants = {
        outline: "border border-text-light/30 text-text-light hover:bg-text-light hover:text-background-dark hover:tracking-[0.35em] hover:border-text-light",
        filled: "bg-text-light text-background-dark border border-text-light hover:bg-transparent hover:text-text-light hover:tracking-[0.35em]"
    };

    return (
        <a
            href={href}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </a>
    );
}