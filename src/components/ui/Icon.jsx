const SIZE_CLASSES = {
    16: "size-4",
    18: "size-[18px]",
    20: "size-5",
    22: "size-[22px]",
};

/*
  size: 16 | 18 | 20 | 22
  className: only transform / transition / color (size and stroke come from here)
*/
export default function Icon({ name, size = 20, className = "" }) {
    return (
        <svg
            className={`${SIZE_CLASSES[size]} flex-none fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] ${className}`}
            aria-hidden="true"
            focusable="false"
        >
            <use href={`#i-${name}`} />
        </svg>
    );
}
