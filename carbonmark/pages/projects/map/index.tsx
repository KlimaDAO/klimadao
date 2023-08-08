import { MapView } from "components/pages/Projects/MapView/MapView";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Project } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  try {
    const projects = await fetcher<Project[]>(urls.api.projects);
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonnmark Project Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default MapView;
