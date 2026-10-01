// The only content the site reads from Sanity: hero figure, Why Me figure, Work categories with their media.
export const SITE_MEDIA_QUERY = `{
  "heroFigure": *[_type == "hero"][0].figure,
  "whyFigure": *[_type == "whyMe"][0].figure,
  "categories": *[_type == "workSection"][0].items[]{
    _key,
    title,
    "media": gallery[]{ _key, _type, "ref": asset._ref, "url": asset->url }
  }
}`;
