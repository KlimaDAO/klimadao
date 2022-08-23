import { IS_PRODUCTION } from "./constants";

/* Posts can have a hideFromProduction field that may be set to true if the author
wants to publish their posts but dont want it to appear in the production environment. 

NOTE: When constructing a new query for posts, please add the hideFromProduction filter to the prodQuery
so the query wont reveal any hidden posts in the production environment */

export const queryFilter = IS_PRODUCTION
  ? "hideFromProduction != true"
  : "true";

export const queries = {
  /** fetch all blog posts and podcasts, sorted by publishedAt, limit to 20 */
  allDocuments: /* groq */ `
    *[_type in ["post", "podcast"] && ${queryFilter}][0...20] | order(publishedAt desc) {
      "type": _type,
      publishedAt, 
      title, 
      summary, 
      "slug": slug.current, 
      author->,
      "imageUrl": mainImage.asset->url,
      "embed": embedCode
    }
  `,

  /** fetch all blog posts, sorted by publishedAt */
  allPosts: /* groq */ `
    *[_type == "post" && hideFromProduction != true] | order(publishedAt desc) {
      summary, 
      "slug": slug.current, 
      title, 
      publishedAt, 
      author->, 
      "imageUrl": mainImage.asset->url
    }
  `,
  /** fetch the last published post slug and title */
  latestPost: /* groq */ `
    *[_type == "post" && ${queryFilter}] | order(publishedAt desc) {
      "slug": slug.current, 
      title
    }[0]
  `,
  /** fetch a blog post based on slug */
  post: /* groq */ `
    *[_type == "post" && slug.current == $slug && ${queryFilter}][0] {
      body[] {
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "name": uploadedFile->.name,
            "href": uploadedFile->.file.asset->url
          }
        },
        _type == "image" => {
          ...,
          asset -> {
            url,
            "width": metadata.dimensions.width,
            "height": metadata.dimensions.height,
          }
        }
      },
      title,
      author->,
      "imageUrl": mainImage.asset->url,
      publishedAt,
      summary,
      showDisclaimer,
    }
  `,
  allPodcasts: /* groq */ `
  *[_type == "podcast" && hideFromProduction != true] | order(publishedAt desc) {
    summary, 
    "slug": slug.current, 
    title, 
    publishedAt, 
    host->, 
    "embed": embedCode
  }
`,
};

/** Just details needed to render cards */
export type PostDetails = {
  slug: string;
  publishedAt: string;
  title: string;
  author: { name: string };
  summary: string;
  imageUrl?: string;
};
export type AllPosts = PostDetails[];
export type PodcastDetails = {
  slug: string;
  publishedAt: string;
  title: string;
  host: { name: string };
  summary: string;
  embed?: string;
};
export type AllPodcasts = PodcastDetails[];
export type LatestPost = { slug: string; title: string };

export type Post = {
  slug: string;
  title: string;
  author: { name: string };
  body: { children: { text: string }[] }[];
  imageUrl?: string;
  publishedAt: string;
  summary: string;
  showDisclaimer?: boolean;
};

export type Document = {
  type: "post" | "podcast";
  publishedAt: string;
  title: string;
  summary: string;
  slug: string;
  author: { name: string };
  imageUrl?: string;
  embed?: string;
};

export interface QueryContent {
  allDocuments: Document[];
  allPosts: AllPosts;
  latestPost: LatestPost;
  post: Post;
  allPodcasts: AllPodcasts;
}
