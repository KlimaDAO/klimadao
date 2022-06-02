import { Blog } from "components/pages/Blog";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { GetStaticPropsContext } from "next";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const posts = await fetchCMSContent("allPosts");
    const translation = await loadTranslation(ctx.locale);
    if (!posts) {
      throw new Error("No blogs found");
    }
    return {
      props: {
        posts,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 240,
    };
  }
}

export default Blog;
