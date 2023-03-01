import { Home, Props } from "components/pages/Home";
import { getCarbonmarkProjects } from "lib/carbonmark";
import { loadTranslation } from "lib/i18n";
import { Project } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

interface HomeProps extends Props {
  projects?: Project[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async (ctx) => {
  const projects = await getCarbonmarkProjects();
  const translation = await loadTranslation(ctx.locale);
  return {
    props: { projects, translation, fixedThemeName: "theme-light" },
    revalidate: 600,
  };
};

export default Home;
