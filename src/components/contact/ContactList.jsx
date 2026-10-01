import { Fragment } from "react";
import { CONTACT_ROWS } from "../../data/contactData";
import Icon from "../ui/Icon";

// .clist a / .clist div - label, value, icon
const ROW_CLASSES =
    "grid min-h-16 grid-cols-[118px_minmax(0,1fr)_24px] items-center gap-3 py-5 upto560:grid-cols-[92px_minmax(0,1fr)_20px]";

// .clist - contact channels; linked rows turn the value italic and nudge the arrow on hover
export default function ContactList() {
    return (
        <ul>
            {CONTACT_ROWS.map((row) => {
                const content = (
                    <>
                        <small className="font-sans text-11 font-medium uppercase leading-120 tracking-18 text-ink-soft">
                            {row.label}
                        </small>
                        <span className="font-serif text-[length:clamp(19px,1.7vw,25px)] font-normal leading-125 opsz-12 [overflow-wrap:break-word] group-hover/row:italic">
                            {row.parts.map((part, i) => (
                                <Fragment key={part}>
                                    {i > 0 && <wbr />}
                                    {part}
                                </Fragment>
                            ))}
                        </span>
                        <Icon
                            name={row.icon}
                            className="text-ink-soft [transition:transform_.4s_var(--ease),color_.3s] group-hover/row:-translate-y-[3px] group-hover/row:translate-x-[3px] group-hover/row:text-rouge"
                        />
                    </>
                );

                return (
                    <li key={row.label} className="border-t border-line-light last:border-b">
                        {row.href ? (
                            <a
                                href={row.href}
                                target={row.external ? "_blank" : undefined}
                                rel={row.external ? "noopener noreferrer" : undefined}
                                className={`group/row ${ROW_CLASSES}`}
                            >
                                {content}
                            </a>
                        ) : (
                            <div className={ROW_CLASSES}>{content}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
