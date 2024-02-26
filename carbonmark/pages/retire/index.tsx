import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import { defaultProjects } from "@klimadao/lib/utils";
import { Retire } from "components/pages/Retire";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

const featuredProjectKeys = ["VCS-674-2014", "VCS-292-2020", "VCS-981-2017"];
const defaultProjectKeys = defaultProjects.map((p) => p.id);

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);

    const featuredProjects = await Promise.all(
      featuredProjectKeys.map(async (project) => await getProjectsId(project))
    );

    const defaultProjects = await Promise.all(
      defaultProjectKeys.map(async (project) => await getProjectsId(project))
    );

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
        featuredProjects,
        defaultProjects,
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
