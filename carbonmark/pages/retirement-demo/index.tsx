import { RetirementDemo } from "components/pages/RetirementDemo";
import { getProjects } from "lib/api";
import { Project } from "lib/types/carbonmark.types";
import { range } from "lodash";
import { random } from "lodash/fp";
import { GetStaticProps } from "next";

// Pick 3 random projects from the results
const pickProjects = (projects: Project[]) =>
  range(3)
    .map(random(projects.length - 1))
    .map((n) => projects[n]);

export const getStaticProps: GetStaticProps = async () => {
  try {
    const projects = await getProjects();

    return {
      props: {
        projects: pickProjects(projects),
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

export default RetirementDemo;
