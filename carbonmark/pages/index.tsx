import { Home } from "components/pages/Home";
import { getCarbonmarkProject } from "lib/carbonmark";
import { urls } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

const defaultProjectKeys = ["VCS-674-2014", "VCS-292-2020", "VCS-981-2017"];

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  console.log("generating", urls.api.projects);
  const projects = await Promise.all(
    defaultProjectKeys.map((project) => getCarbonmarkProject(project))
  );
  console.log(projects)
  return {
    props: {
      projects,
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 600,
  };
};

export default Home;
