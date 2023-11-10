import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "lib/createUrls";
import { isPoolToken } from "lib/getPoolData";
import { getFullProjectId } from "lib/projectGetter";
import { DetailedProject, Listing, TokenPrice } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Link from "next/link";
import { ListingRetire } from "./Listing";
import { PoolRetire } from "./Pool";
import * as styles from "./styles";

export interface ProjectRetirePageProps {
  project: DetailedProject;
  purchase: Listing | TokenPrice;
}

const getIsPoolRetire = (purchase: TokenPrice): purchase is TokenPrice =>
  purchase.poolName !== undefined && isPoolToken(purchase.poolName);

const getIsListingRetire = (purchase: Listing): purchase is Listing =>
  purchase.id !== undefined;

export const ProjectRetire: NextPage<ProjectRetirePageProps> = (props) => {

  const isPoolPurchase = getIsPoolRetire(props.purchase as TokenPrice);
  const isListingPurchase =
    !isPoolPurchase && getIsListingRetire(props.purchase as Listing);

  const isNone = !isPoolPurchase && !isListingPurchase;

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

          {isPoolPurchase && (
            <PoolRetire
              project={props.project}
              poolPrice={props.purchase as TokenPrice}
            />
          )}

          {isListingPurchase && (
            <ListingRetire
              project={props.project}
              listing={props.purchase as Listing}
            />
          )}

        </div>
      </Layout>
    </>
  );
};
