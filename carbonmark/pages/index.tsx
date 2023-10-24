import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import { Home } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";
import { compact } from 'lodash';
import { GetStaticProps } from "next";


const defaultProjectKeys = ["VCS-674-2014", "VCS-292-2020", "VCS-981-2017"];

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const projects = await Promise.all(
    defaultProjectKeys.map((project) => getProjectsId(project))
  );
  return {
    props: {
      projects: compact(projects),
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 600,
  };
};

export default Home;
