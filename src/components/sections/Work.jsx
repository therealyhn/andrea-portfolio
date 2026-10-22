import Chapter from "../work/Chapter";
import WorkHead from "../work/WorkHead";

// .work - header, then the chapters from the CMS (read at build time, src/lib/cms.js)
export default function Work({ media, onOpenItem, onOpenStory }) {
    const { chapters } = media;

    return (
        <section
            id="work"
            aria-labelledby="workTitle"
            className="overflow-hidden bg-wine-3 pb-[clamp(72px,8vw,120px)] pt-[clamp(96px,12vw,180px)]"
        >
            <WorkHead chapters={chapters} />

            <div>
                {chapters.map((chapter, ci) => (
                    <Chapter
                        key={chapter.key}
                        chapter={chapter}
                        chapterIndex={ci}
                        onOpenItem={onOpenItem}
                        onOpenStory={onOpenStory}
                    />
                ))}
            </div>
        </section>
    );
}
