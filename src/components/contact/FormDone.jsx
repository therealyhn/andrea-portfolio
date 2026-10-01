import { FORM_COPY } from "../../data/contactData";
import Eyebrow from "../ui/Eyebrow";

// .form__done - thank-you note shown in place of the form once the message is sent (always mounted: live region)
export default function FormDone({ name }) {
    return (
        <div role="status" aria-live="polite" className="hidden py-6 text-left group-data-[done=true]/form:block">
            <Eyebrow className="text-ink-soft">{FORM_COPY.doneEyebrow}</Eyebrow>
            <h3 className="mb-3.5 mt-[18px] font-serif text-[length:clamp(34px,3.6vw,54px)] font-normal leading-[1.05] opsz-20 [&_em]:text-rouge">
                {FORM_COPY.doneThanks}
                <em>{name || FORM_COPY.doneFallbackName}</em>.
            </h3>
            <p className="max-w-[40ch] text-ink-body">{FORM_COPY.doneText}</p>
        </div>
    );
}
