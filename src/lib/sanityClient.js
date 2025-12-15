import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "0c6yhpfy",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-01",
});