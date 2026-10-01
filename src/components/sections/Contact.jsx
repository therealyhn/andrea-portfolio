import { CONTACT_COPY } from "../../data/contactData";
import ContactForm from "../contact/ContactForm";
import ContactList from "../contact/ContactList";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import RichText from "../ui/RichText";
import Wrap from "../ui/Wrap";

// .contact - title, then intro with the contact channels next to the form (stacked up to 959px)
export default function Contact() {
    return (
        <section
            id="contact"
            aria-labelledby="contactTitle"
            className="bg-paper pb-[clamp(88px,10vw,150px)] pt-[clamp(96px,12vw,180px)] text-ink"
        >
            <Wrap>
                <Reveal>
                    <Eyebrow className="text-ink-soft">{CONTACT_COPY.eyebrow}</Eyebrow>
                </Reveal>
                <Reveal delay=".08s">
                    <Display
                        id="contactTitle"
                        className="mb-[clamp(48px,6vw,96px)] mt-6 text-[length:clamp(64px,12vw,208px)] leading-[.84] [&_em]:text-rouge"
                    >
                        <RichText segments={CONTACT_COPY.title} />
                    </Display>
                </Reveal>

                {/* .contact__grid */}
                <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-[clamp(40px,7vw,128px)] upto959:grid-cols-[1fr]">
                    <Reveal>
                        <p className="mb-9 max-w-[36ch] text-[19px] leading-160 text-ink-body">{CONTACT_COPY.intro}</p>
                        <ContactList />
                    </Reveal>
                    <ContactForm />
                </div>
            </Wrap>
        </section>
    );
}
