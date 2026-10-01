import { useCallback, useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import { SITE_MEDIA_QUERY } from "../lib/sanity/queries";
import { normalizeSiteMedia } from "../lib/sanity/normalizeSiteMedia";

// Fetches the Sanity-managed media once (called only in App). status: "loading" | "ready" | "error".
export default function useSiteMedia() {
    const [state, setState] = useState({ status: "loading", data: null });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;

        sanityClient
            .fetch(SITE_MEDIA_QUERY)
            .then((raw) => {
                if (active) setState({ status: "ready", data: normalizeSiteMedia(raw) });
            })
            .catch((err) => {
                if (!active) return;
                console.error(err);
                setState({ status: "error", data: null });
            });

        return () => {
            active = false;
        };
    }, [attempt]);

    const retry = useCallback(() => {
        setState({ status: "loading", data: null });
        setAttempt((n) => n + 1);
    }, []);

    return { status: state.status, data: state.data, retry };
}
