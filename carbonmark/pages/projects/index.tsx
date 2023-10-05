import { getCategories, getCountries, getProjects, getVintages } from ".generated/carbonmark-api.sdk";
import { GetCategories200Item } from ".generated/carbonmark-api.sdk.schemas";
import { AxiosResponse } from 'axios';
import { Projects } from "components/pages/Projects";
import { loadTranslation } from "lib/i18n";
import {
  Category,
  CategoryName,
  Country,
  Project,
  Vintage,
} from "lib/types/carbonmark.types";
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
    const projects = (await getProjects()).data;
    const vintages = (await getVintages()).data;
    const categories = (await getCategories({
      transformResponse: (data: AxiosResponse<GetCategories200Item[], any>) => data.data.map((category) => ({
        /** @note because the API is returning trailing empty spaces on some categories, trim them here */
        id: category.id.trim() as CategoryName,
      }))
    })).data;
    const countries = (await getCountries()).data;
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
