import { Resources } from "components/pages/Resources";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { GetStaticPropsContext } from "next";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const { locale } = ctx;

    const [
      enDocuments,
      enFeaturedArticles,
      localeDocuments,
      localeFeaturedArticles,
    ] = await Promise.all([
      fetchCMSContent("allDocuments", { locale: "en" }),
      fetchCMSContent("allFeaturedPosts", { locale: "en" }),
      fetchCMSContent("allDocuments", { locale }),
      fetchCMSContent("allFeaturedPosts", { locale }),
    ]);

    let documents, featuredArticles;
    // if en has more documents or articles than locale, then show locale documents and articles plus en documents and articles
    if (
      localeDocuments.length < enDocuments.length ||
      localeFeaturedArticles.length < enFeaturedArticles.length
    ) {
      documents = [...localeDocuments, ...enDocuments];
      featuredArticles = [...localeFeaturedArticles, ...enFeaturedArticles];
    } else {
      documents = [...enDocuments];
      featuredArticles = [...enFeaturedArticles];
    }

    const translation = await loadTranslation(locale);
    if (!documents) {
      throw new Error("No documents found");
    }

    return {
      props: {
        documents,
        featuredArticles,
        translation,
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
