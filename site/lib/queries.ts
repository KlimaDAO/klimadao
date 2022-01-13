export const queries = {
  blogs:
    '*[_type == "post"] | order(publishedAt desc) {summary, "slug": slug.current, title, publishedAt, author->, "imageUrl": mainImage.asset->url}',
  blogSlugs: '*[_type == "post"] {"slug": slug.current}',
  blog: '*[slug.current == $slug] {body[]{..., _type == "image" => {...,asset->{url}}}, title, author->, "imageUrl": mainImage.asset->url, publishedAt}',
};

export interface QueryContent {
  /** fetch all the blogs */
  blogs: {
    slug: string;
    publishedAt: string;
    title: string;
    author: { name: string };
    summary: string;
    imageUrl?: string;
  }[];
  /** fetch all the blog slugs */
  blogSlugs: { slug: string }[];
  /** fetch a blog based on slug */
  blog: {
    title: string;
    author: { name: string };
    body: { children: { text: string }[] }[];
    imageUrl?: string;
    publishedAt: string;
  }[];
}
