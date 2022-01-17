import { GetStaticProps } from "next";

import { PostPage } from "components/pages/Blog/Post";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    console.log("getting static props for", ctx.params?.pid, ctx.locale);
    const post = await fetchCMSContent("post", {
      slug: ctx.params?.pid,
    });
    const translation = await loadTranslation(ctx.locale);

    if (!post) {
      throw new Error("No content found");
    }
    if (!translation) {
      throw new Error("No translation found");
    }
    console.log(
      `static props for ${ctx.params?.pid} got:`,
      JSON.stringify(post, undefined, " "),
      translation
    );
    return {
      props: {
        post,
        translation,
      },
      revalidate: 120,
    };
  } catch (e) {
    console.error("Failed to generate", e);
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
