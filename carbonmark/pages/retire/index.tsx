import { defaultProjects } from "@klimadao/lib/utils";
import { Retire } from "components/pages/Retire";
import { api } from "lib/api/sdk";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

const featuredProjectKeys = ["VCS-674-2014", "VCS-292-2020", "VCS-981-2017"];
const defaultProjectKeys = defaultProjects.map((p) => p.id);

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);

    const featuredProjects = await Promise.all(
      featuredProjectKeys.map(api.carbonmark.getProject)
    );

    const defaultProjects = await Promise.all(
      defaultProjectKeys.map(api.carbonmark.getProject)
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
