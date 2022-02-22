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
  /** fetch all the blog post slugs, for getStaticPaths */
  allPostSlugs: '*[_type == "post"] {"slug": slug.current}',
  latestPost:
    '*[_type == "post"] | order(_createdAt desc){"slug": slug.current, title}[0]',
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
export type AllPostSlugs = { slug: string }[];
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
  allPostSlugs: AllPostSlugs;
  latestPost: LatestPost;
  post: Post;
}
