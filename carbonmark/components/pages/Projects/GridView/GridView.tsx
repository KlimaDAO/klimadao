import { SimpleProjectCard } from "components/SimpleProjectCard";
import { createProjectLink } from "lib/createUrls";
import { Project } from "lib/types/carbonmark.types";
import Link from "next/link";
import ViewProps from "../props";

export const GridView: React.FC<ViewProps> = ({ projects }) => {
  return (
    <>
      {projects?.map((project: Project, index: number) => (
        <Link
          passHref
          key={`${project.key}-${index}`}
          href={createProjectLink(project)}
        >
          <SimpleProjectCard project={project} />
        </Link>
      ))}
    </>
  );
};
