// .field input / textarea - underline only; ink when focused, red while in error
const CONTROL_CLASSES =
    "w-full rounded-none border-b border-ink/[.28] bg-transparent pb-3 pt-2.5 font-sans text-[18px] font-normal leading-140 text-ink outline-none transition-[border-color] duration-300 placeholder:text-ink-hint focus:border-ink focus:shadow-[0_1px_0_#2a0710] aria-[invalid=true]:border-rouge aria-[invalid=true]:shadow-[0_1px_0_#b8172f]";
const TEXTAREA_CLASSES = `${CONTROL_CLASSES} min-h-[132px] resize-y`;

// .field - label, input or textarea, error line (shown and linked only while the value is wrong)
export default function FormField({ name, field, value, invalid, onChange, onBlur }) {
    const id = `f-${name}`;
    const errorId = `e-${name}`;
    const Control = field.multiline ? "textarea" : "input";

    return (
        <div className="relative mb-[26px]">
            <label
                htmlFor={id}
                className="mb-2 block font-sans text-11 font-medium uppercase leading-120 tracking-18 text-ink-soft"
            >
                {field.label}
            </label>
            <Control
                id={id}
                name={name}
                type={field.type}
                rows={field.rows}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required
                aria-invalid={Boolean(invalid)}
                aria-describedby={invalid ? errorId : undefined}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={field.multiline ? TEXTAREA_CLASSES : CONTROL_CLASSES}
            />
            <p id={errorId} className={invalid ? "mt-2 text-13 text-rouge" : "hidden"}>
                {field.error}
            </p>
        </div>
    );
}
