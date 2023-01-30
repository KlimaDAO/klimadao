import { Resources } from "components/pages/Resources";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { GetStaticPropsContext } from "next";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const documents = await fetchCMSContent("allDocuments");
    const featuredArticles = await fetchCMSContent("allFeaturedPosts");

    const translation = await loadTranslation(ctx.locale);
    if (!documents) {
      throw new Error("No documents found");
    }

    return {
      props: {
        documents,
        featuredArticles,
        translation,
        fixedThemeName: "theme-dark",
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("RESOURCES getStaticProps error: ", e);
    throw e;

    // enable below before Go Live
    // return {
    //   notFound: true,
    //   revalidate: 240,
    // };
  }
}

export default Resources;
