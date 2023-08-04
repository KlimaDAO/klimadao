import { CarbonmarkApi } from "carbonmark-api/src/routes/projects/projects.types";
import { Projects } from "components/pages/Projects";
import { api } from "lib/api/sdk";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Category, CategoryName, Country, Vintage } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export interface ProjectsPageStaticProps {
  projects: CarbonmarkApi.Get.Project[];
  categories: Category[];
  countries: Country[];
  vintages: Vintage[];
}

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async (
  ctx
) => {
  try {
    const projects = await api.carbonmark.getAllProjects();
    const vintages = await fetcher<string[]>(urls.api.vintages);
    let categories = await fetcher<Category[]>(urls.api.categories);
    /** @note because the API is returning trailing empty spaces on some categories, trim them here */
    categories = categories.map((category) => ({
      id: category.id.trim() as CategoryName,
    }));
    const countries = await fetcher<Country[]>(urls.api.countries);
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
    console.error("Failed to generate Carbonmark Projects Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default Projects;
