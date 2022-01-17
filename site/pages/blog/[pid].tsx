import { GetStaticProps } from "next";

import { PostPage } from "components/pages/Blog/Post";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation, locales } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
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
  const slugs = await fetchCMSContent("allPostSlugs");
  if (!slugs) {
    throw new Error("No content found");
  }
  const paths = slugs.reduce((acc, { slug }) => {
    for (const locale in locales) {
      acc.push({
        params: {
          pid: slug,
        },
        locale: locale,
      });
    }
    return acc;
  }, [] as any);
  return {
    paths,
    fallback: true,
  };
};

export default PostPage;
