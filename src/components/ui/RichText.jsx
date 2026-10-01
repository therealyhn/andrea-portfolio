import { Fragment } from "react";

// segments [{ text, em? }] (plan §2.4) -> text with <em> parts; the parent styles the <em> (color, italic)
export default function RichText({ segments }) {
    return segments.map((segment, i) =>
        segment.em ? <em key={i}>{segment.text}</em> : <Fragment key={i}>{segment.text}</Fragment>,
    );
}
