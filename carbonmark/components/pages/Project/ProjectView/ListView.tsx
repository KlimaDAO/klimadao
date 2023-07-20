import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Vintage } from "components/Vintage";
import { formatToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import * as styles from "./styles";

type Props = {
  projects: Array<Project>;
};

export const ListView: React.FC<Props> = ({ projects }) => {
  const { locale } = useRouter();
  return (
    <div className={styles.listView}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Vintage</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project: Project, index: number) => (
            <tr key={index}>
              <td>{project.name || "! MISSING PROJECT NAME !"}</td>
              <td>{formatToPrice(project.price, locale)}</td>
              <td width="35%">
                <p className="description">
                  {project.short_description ||
                    project.description ||
                    t`No project description found`}
                </p>
              </td>
              <td>
                <Category category={getCategoryFromProject(project)} />
              </td>
              <td>
                <Vintage vintage={project.vintage} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
