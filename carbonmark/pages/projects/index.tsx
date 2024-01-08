import {
  getCategories,
  getCountries,
  getProjects,
  getVintages,
} from ".generated/carbonmark-api-sdk/clients";
import { Projects } from "components/pages/Projects";
import { loadTranslation } from "lib/i18n";
import {
  Category,
  Country,
  Project,
  Vintage,
} from "lib/types/carbonmark.types";
import { trim, update } from "lodash/fp";
import { GetStaticProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  categories: Category[];
  countries: Country[];
  vintages: Vintage[];
}

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async (
  ctx
) => {
  try {
    const projects = await getProjects();
    const vintages = await getVintages();
    const countries = await getCountries();
    /** @note because the API is returning trailing empty spaces on some categories, trim them here */
    const categories = (await getCategories()).map(update("id", trim));

    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        vintages,
        categories,
        countries,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e.message);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default Projects;
