import { useCallback, useState } from "react";

// Size and length of a film read from its own metadata (for videos without static VIDEO_META)
export default function useVideoMeta() {
    const [meta, setMeta] = useState(null);

    const onLoadedMetadata = useCallback((event) => {
        const { videoWidth, videoHeight, duration } = event.currentTarget;
        setMeta({
            width: videoWidth || null,
            height: videoHeight || null,
            duration: Number.isFinite(duration) ? duration : null,
        });
    }, []);

    return { meta, onLoadedMetadata };
}
