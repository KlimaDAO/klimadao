import { Project } from "@klimadao/lib/types/carbonmark";
import { getCarbonmarkProjects } from "@klimadao/lib/utils";
import { Projects } from "components/pages/Projects";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

interface PageProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  try {
    const projects = await getCarbonmarkProjects();
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default Projects;
