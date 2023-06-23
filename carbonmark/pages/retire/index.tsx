import { Retire } from "components/pages/Retire";
import { getCarbonmarkProject } from "lib/carbonmark";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

const featuredProjectKeys = ["VCS-1577-2015", "VCS-1764-2020", "VCS-1121-2018"];

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);

    const featuredProjects = await Promise.all(
      featuredProjectKeys.map(
        async (project) => await getCarbonmarkProject(project)
      )
    );

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
        featuredProjects,
        fixedThemeName: "theme-light",
      },
    };
  } catch (e) {
    console.error("Failed to generate Retire Page", e);
    return {
      notFound: true,
    };
  }
};

export default Retire;
