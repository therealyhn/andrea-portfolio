import { EMAIL_PARTS, FOOTER_COPY, FOOTER_NAV, FOOTER_SOCIAL } from "../../data/contactData";
import { LEGAL_COPY, LEGAL_DOCS, LEGAL_KEYS } from "../../data/legalData";
import { BRAND, CONTACT } from "../../data/siteData";
import Eyebrow from "../ui/Eyebrow";
import Icon from "../ui/Icon";
import Wrap from "../ui/Wrap";

const YEAR = new Date().getFullYear();

// .ft__cols h3 / a, button
const COLUMN_TITLE_CLASSES = "mb-3.5 font-sans text-11 font-medium uppercase leading-120 tracking-20 text-cream-faint";
const COLUMN_LINK_CLASSES =
    "flex min-h-9 items-center gap-2.5 text-left text-15 text-cream-soft transition-colors duration-300 hover:text-cream";

/*
  .ft - large email link and three link columns (Navigate, Follow, Legal -> drawer), the AM mark masked over a
  wine gradient, and the copyright bar.
*/
export default function Footer({ onOpenLegal }) {
    return (
        <footer className="overflow-hidden bg-wine-3 pt-[clamp(88px,10vw,150px)] text-cream">
            <Wrap>
                {/* .ft__top */}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-16 gap-y-8 border-b border-line-dark pb-[clamp(56px,6vw,88px)] upto959:grid-cols-[1fr]">
                    <div>
                        <Eyebrow className="text-cream-soft">{FOOTER_COPY.eyebrow}</Eyebrow>
                        {/* .ft__mail */}
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="mt-[22px] inline-block bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-[position:0_100%] bg-no-repeat font-serif text-[length:clamp(26px,5.4vw,88px)] font-normal leading-110 tracking-neg2 opsz-18 transition-[background-size] duration-700 ease-editorial hover:bg-[length:100%_1px] hover:italic"
                        >
                            {EMAIL_PARTS[0]}
                            <wbr />
                            {EMAIL_PARTS[1]}
                        </a>
                    </div>

                    {/* .ft__cols */}
                    <div className="grid grid-cols-[repeat(3,auto)] gap-x-[clamp(32px,5vw,88px)] gap-y-6 upto560:grid-cols-[1fr_1fr]">
                        <div>
                            <h3 className={COLUMN_TITLE_CLASSES}>{FOOTER_COPY.navigateTitle}</h3>
                            {FOOTER_NAV.map((link) => (
                                <a key={link.id} href={`#${link.id}`} className={COLUMN_LINK_CLASSES}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div>
                            <h3 className={COLUMN_TITLE_CLASSES}>{FOOTER_COPY.followTitle}</h3>
                            {FOOTER_SOCIAL.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={COLUMN_LINK_CLASSES}
                                >
                                    <Icon name={social.icon} size={18} />
                                    {social.label}
                                </a>
                            ))}
                        </div>
                        <div>
                            <h3 className={COLUMN_TITLE_CLASSES}>{FOOTER_COPY.legalTitle}</h3>
                            {LEGAL_KEYS.map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={(event) => onOpenLegal(key, event.currentTarget)}
                                    className={COLUMN_LINK_CLASSES}
                                >
                                    {LEGAL_DOCS[key].title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* .ft__mark */}
                <div
                    aria-hidden="true"
                    className="mt-[clamp(56px,7vw,110px)] aspect-[2296/700] w-full bg-[linear-gradient(180deg,#6e1428_0%,#4a0917_55%,rgba(74,9,23,0)_100%)] [mask:url(/img/logo/am-mark.png)_top_center/100%_auto_no-repeat]"
                />

                {/* .ft__bar */}
                <div className="flex flex-wrap justify-between gap-x-6 gap-y-2.5 border-t border-line-dark pb-[max(26px,env(safe-area-inset-bottom))] pt-[22px] text-13 text-cream-faint">
                    <p>
                        © {YEAR} {BRAND.copyright}. {LEGAL_COPY.rights}
                    </p>
                    <p>
                        {FOOTER_COPY.developedBy}{" "}
                        <a
                            href={BRAND.developer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cream-soft underline decoration-cream/40 underline-offset-4 hover:text-cream"
                        >
                            {BRAND.developer.label}
                        </a>
                    </p>
                </div>
            </Wrap>
        </footer>
    );
}
