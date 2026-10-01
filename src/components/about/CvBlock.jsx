// .cv - titled list of periods (work experience, education)
export default function CvBlock({ title, items }) {
    return (
        <div className="mb-12 upto700:mb-9">
            <h3 className="border-b border-ink pb-3.5 font-sans text-12 font-medium uppercase leading-120 tracking-20 text-ink-soft">
                {title}
            </h3>
            <ol>
                {items.map((item) => (
                    <li key={`${item.period} ${item.role}`} className="border-b border-line-light py-[18px]">
                        <time className="mb-2 block font-sans text-12 font-medium leading-100 tracking-12 text-ink-soft">
                            {item.period}
                        </time>
                        <b className="block font-serif text-22 font-normal leading-120 tracking-neg1 opsz-20">{item.role}</b>
                        <span className="mt-1 block text-15 text-ink-soft">{item.place}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
