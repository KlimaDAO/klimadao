import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "lib/createUrls";
import { getFullProjectId } from "lib/projectGetter";
import { Product, Project } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Link from "next/link";
import { RetireForm } from "./Pool/RetireForm";
import * as styles from "./styles";

export interface ProjectRetirePageProps {
  project: Project;
  product: Product;
}

export const ProjectRetire: NextPage<ProjectRetirePageProps> = (props) => {
  const fullProjectid = getFullProjectId(props.project);
  return (
    <>
      <PageHead
        title={t`Retire from ${fullProjectid} | Carbonmark`}
        mediaTitle={t`Retire from ${fullProjectid} | Carbonmark`}
        metaDescription={`${props.project.description}`}
      />

      <Layout>
        <div className={styles.container}>
          <Link
            href={createProjectLink(props.project)}
            className={styles.backToProject}
          >
            <ArrowBack className="arrow" />
            <Trans>Back to Project</Trans>
          </Link>
          <RetireForm project={props.project} product={props.product} />
        </div>
      </Layout>
    </>
  );
};
