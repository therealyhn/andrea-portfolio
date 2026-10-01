import { WORK_COPY } from "../../data/workData";
import ButtonLink from "../ui/ButtonLink";
import Chapter from "../work/Chapter";
import WorkHead from "../work/WorkHead";
import WorkStatus from "../work/WorkStatus";

const NO_CHAPTERS = [];

// .work - header, then the Sanity chapters (or the loading / error line with a retry)
export default function Work({ media, status, retry, onOpenItem }) {
    const chapters = media?.chapters ?? NO_CHAPTERS;

    return (
        <section
            id="work"
            aria-labelledby="workTitle"
            className="overflow-hidden bg-wine-3 pb-[clamp(72px,8vw,120px)] pt-[clamp(96px,12vw,180px)]"
        >
            <WorkHead chapters={chapters} />

            {status === "loading" && <WorkStatus role="status" message={WORK_COPY.loading} />}
            {status === "error" && (
                <WorkStatus role="alert" message={WORK_COPY.error}>
                    <ButtonLink variant="ghost" onClick={retry}>
                        {WORK_COPY.retry}
                    </ButtonLink>
                </WorkStatus>
            )}
            {status === "ready" && (
                <div>
                    {chapters.map((chapter, ci) => (
                        <Chapter key={chapter.key} chapter={chapter} chapterIndex={ci} onOpenItem={onOpenItem} />
                    ))}
                </div>
            )}
        </section>
    );
}
