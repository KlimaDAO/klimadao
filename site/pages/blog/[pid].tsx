import { GetStaticProps } from "next";

import { PostPage } from "components/pages/Blog/Post";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const post = await fetchCMSContent("post", {
      slug: ctx.params?.pid,
    });
    const translation = await loadTranslation(ctx.locale);
    if (!post) {
      throw new Error("No content found");
    }
    return {
      props: {
        post,
        translation,
      },
      revalidate: 120,
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 120,
    };
  }
};

export const getStaticPaths = async () => {
  const paths = await fetchCMSContent("allPostSlugs");
  if (!paths) {
    throw new Error("No content found");
  }
  return {
    paths: paths.map((path) => `/blog/${path.slug}`),
    fallback: true,
  };
};

export default PostPage;
