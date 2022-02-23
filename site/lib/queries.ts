const post = /* groq */ `
  *[slug.current == $slug][0] {
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->{url}
      }
    },
    title,
    author->,
    "imageUrl": mainImage.asset->url,
    publishedAt
  }
`;

export const queries = {
  /** fetch all blog posts, sorted by publishedAt */
  allPosts:
    '*[_type == "post"] | order(publishedAt desc) {summary, "slug": slug.current, title, publishedAt, author->, "imageUrl": mainImage.asset->url}',
  latestPost:
    '*[_type == "post"] | order(publishedAt desc){"slug": slug.current, title}[0]',
  /** fetch a blog post based on slug */
  post,
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
