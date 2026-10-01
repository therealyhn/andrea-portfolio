import { FORM_COPY, FORM_FIELDS } from "../../data/contactData";
import useContactForm from "../../hooks/useContactForm";
import ButtonLink from "../ui/ButtonLink";
import Reveal from "../ui/Reveal";
import FormDone from "./FormDone";
import FormField from "./FormField";

/*
  .form - name, email + phone side by side (stacked up to 560px), message; the send button is disabled while
  sending. A failed send shows an alert under the footer and keeps the values; a sent message swaps the form
  for the thank-you note (data-done).
*/
export default function ContactForm() {
    const form = useContactForm();
    const sending = form.status === "sending";
    const fieldProps = (name) => ({
        name,
        field: FORM_FIELDS[name],
        value: form.values[name],
        invalid: form.invalid[name],
        onChange: form.onChange,
        onBlur: form.onBlur,
    });

    return (
        <Reveal
            delay=".1s"
            data-done={form.status === "sent"}
            className="group/form relative border border-line-light bg-paper-card p-[clamp(28px,3.4vw,56px)]"
        >
            <form noValidate onSubmit={form.onSubmit} className="group-data-[done=true]/form:hidden">
                <FormField {...fieldProps("name")} />
                {/* .form__row */}
                <div className="grid grid-cols-[1fr_1fr] gap-x-7 upto560:grid-cols-[1fr]">
                    <FormField {...fieldProps("email")} />
                    <FormField {...fieldProps("phone")} />
                </div>
                <FormField {...fieldProps("message")} />

                {/* .form__foot */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-[18px]">
                    <p className="max-w-[30ch] text-13 text-ink-soft">{FORM_COPY.note}</p>
                    <ButtonLink variant="wine" type="submit" icon="arrow" disabled={sending}>
                        {sending ? FORM_COPY.sending : FORM_COPY.submit}
                    </ButtonLink>
                </div>
                {form.status === "error" && (
                    <p role="alert" className="mt-4 text-sm text-rouge">
                        {FORM_COPY.errorMessage}
                    </p>
                )}
            </form>

            <FormDone name={form.firstName} />
        </Reveal>
    );
}
