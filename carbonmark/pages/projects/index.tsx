import {
  getCategories,
  getCountries,
  getVintages,
} from ".generated/carbonmark-api-sdk/clients";
import { Projects } from "components/pages/Projects";
import { fetchProjects } from "hooks/useFetchProjects";
import { loadTranslation } from "lib/i18n";
import {
  Category,
  Country,
  Project,
  Vintage,
} from "lib/types/carbonmark.types";
import { trim, update } from "lodash/fp";
import { GetServerSideProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  categories: Category[];
  countries: Country[];
  vintages: Vintage[];
}

export const getServerSideProps: GetServerSideProps<
  ProjectsPageStaticProps
> = async (ctx) => {
  try {
    const [projects, vintages, countries, categories, translation] =
      await Promise.all([
        fetchProjects(ctx.query),
        getVintages(),
        getCountries(),
        /** @note because the API is returning trailing empty spaces on some categories, trim them here */
        getCategories().then((categories) =>
          categories.map(update("id", trim))
        ),
        loadTranslation(ctx.locale),
      ]);

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
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e.message);
    return {
      notFound: true,
    };
  }
};

export default Projects;
