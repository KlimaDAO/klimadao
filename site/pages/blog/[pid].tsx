import { GetStaticProps } from "next";

import Post from "components/pages/Blog/Post";
import { fetchCMSContent } from "lib/fetchCMSContent";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const [content] = await fetchCMSContent("blog", {
      slug: context.params?.pid,
    });
    if (!content) {
      throw new Error("No content found");
    }
    return {
      props: {
        blog: {
          title: content.title,
          body: content.body,
          author: content.author.name,
          imageUrl: content.imageUrl,
          publishedAt: content.publishedAt,
        },
      },
      // revalidate: 120,
    };
  } catch (e) {
    return {
      notFound: true,
      // revalidate: 120
    };
  }
};

export const getStaticPaths = async () => {
  const paths = await fetchCMSContent("blogSlugs");
  if (!paths) {
    throw new Error("No content found");
  }
  return {
    paths: paths.map((path) => `/blog/${path.slug}`),
    fallback: true,
  };
};

export default Post;
