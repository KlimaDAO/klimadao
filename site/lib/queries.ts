import { IS_PRODUCTION } from "./constants";

/* Posts can have a hideFromProduction field that may be set to true if the author
wants to publish their posts but dont want it to appear in the production environment. 

NOTE: When constructing a new query for posts, please add the hideFromProduction filter to the prodQuery
so the query wont reveal any hidden posts in the production environment */

const prodQueries = {
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
    *[_type == "post" && hideFromProduction != true] | order(publishedAt desc) {
      "slug": slug.current, 
      title
    }[0]
  `,
  /** fetch a blog post based on slug */
  post: /* groq */ `
    *[_type == "post" && slug.current == $slug && hideFromProduction != true][0] {
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset -> {
            url,
            "width": metadata.dimensions.width,
            "height": metadata.dimensions.height,
          }
        },
        _type == 'pdf' => {
          "name":@->.name,
           "url":@->.file.asset->url
        }
      },
      title,
      author->,
      "imageUrl": mainImage.asset->url,
      publishedAt
    }
  `,
};

const stagingQueries: typeof prodQueries = {
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
    *[_type == "post" && hideFromProduction != true] | order(publishedAt desc) {
      "slug": slug.current, 
      title
    }[0]
  `,
  /** fetch a blog post based on slug */
  post: /* groq */ `
    *[_type == "post" && slug.current == $slug][0] {
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset -> {
            url,
            "width": metadata.dimensions.width,
            "height": metadata.dimensions.height,
          }
        },
        _type == 'pdf' => {
          "name":@->.name,
           "url":@->.file.asset->url
        }
      },
      title,
      author->,
      "imageUrl": mainImage.asset->url,
      publishedAt
    }
  `,
};

export const queries = IS_PRODUCTION ? prodQueries : stagingQueries;

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
export type LatestPost = { slug: string; title: string };

export type Post = {
  slug: string;
  title: string;
  author: { name: string };
  body: { children: { text: string }[] }[];
  imageUrl?: string;
  publishedAt: string;
  summary: string;
};

export interface QueryContent {
  allPosts: AllPosts;
  latestPost: LatestPost;
  post: Post;
}
