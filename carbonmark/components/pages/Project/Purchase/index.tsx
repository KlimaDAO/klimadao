import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "lib/createUrls";
import { Listing, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { InactivePurchase } from "./InactivePurchase";
import { PurchaseForm } from "./PurchaseForm";
import * as styles from "./styles";
export interface ProjectPurchasePageProps {
  project: Project;
  listing: Listing;
}

export const ProjectPurchase: NextPage<ProjectPurchasePageProps> = (props) => {
  const isActiveListing = props.listing.active && !props.listing.deleted;

  return (
    <>
      <PageHead
        title={t`Purchase ${props.project.projectID} | Carbonmark`}
        mediaTitle={t`Purchase ${props.project.name} | Carbonmark`}
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
          {!isActiveListing && (
            <InactivePurchase project={props.project} listing={props.listing} />
          )}

          {isActiveListing && (
            <PurchaseForm project={props.project} listing={props.listing} />
          )}
        </div>
      </Layout>
    </>
  );
};
