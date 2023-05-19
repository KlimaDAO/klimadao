import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "lib/createUrls";
import { Price, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { RetireForm } from "./RetireForm";
import * as styles from "./styles";

export interface ProjectRetirePageProps {
  project: Project;
  poolPrice: Price;
}

export const ProjectRetire: NextPage<ProjectRetirePageProps> = (props) => {
  return (
    <>
      <PageHead
        title={t`Retire from ${props.project.projectID} | Carbonmark`}
        mediaTitle={t`Retire from ${props.project.name} | Carbonmark`}
        metaDescription={`${props.project.description}`}
      />

      <Layout>
        <div className={styles.container}>
          <div className={styles.backToProjectButton}>
            <Link
              href={createProjectLink(props.project)}
              className={styles.backToResults}
            >
              <ArrowBack className="arrow" />
              <Trans>Back to Project</Trans>
            </Link>
          </div>
          <div className={styles.loginButton}>
            <LoginButton className="desktopLogin" />
          </div>

          <RetireForm project={props.project} price={props.poolPrice} />
        </div>
      </Layout>
    </>
  );
};
