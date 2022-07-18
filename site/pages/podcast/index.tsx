import { Podcast } from "components/pages/Podcast";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { GetStaticPropsContext } from "next";

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const podcasts = await fetchCMSContent("allPodcasts");
    const translation = await loadTranslation(ctx.locale);
    if (!podcasts) {
      throw new Error("No podcasts found");
    }
    return {
      props: {
        podcasts,
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
}

export default Podcast;
