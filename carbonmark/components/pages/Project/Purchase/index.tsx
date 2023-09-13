import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { createProjectLink } from "lib/createUrls";
import { isPoolToken } from "lib/getPoolData";
import {
  DetailedProject,
  Listing,
  TokenPrice,
} from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Link from "next/link";
import { InactivePurchase } from "./InactivePurchase";
import { ListingPurchase } from "./Listing";
import { PoolPurchase } from "./Pool";

import * as styles from "./styles";
export interface ProjectPurchasePageProps {
  project: DetailedProject;
  purchase: Listing | TokenPrice;
}

const getIsPoolPurchase = (purchase: TokenPrice): purchase is TokenPrice =>
  purchase.poolName !== undefined && isPoolToken(purchase.poolName);

const getIsListingPurchase = (purchase: Listing): purchase is Listing =>
  purchase.id !== undefined;

export const ProjectPurchase: NextPage<ProjectPurchasePageProps> = (props) => {
  const isPoolPurchase = getIsPoolPurchase(props.purchase as TokenPrice);
  const isListingPurchase =
    !isPoolPurchase && getIsListingPurchase(props.purchase as Listing);

  const isNone = !isPoolPurchase && !isListingPurchase;

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

          {isPoolPurchase && (
            <PoolPurchase
              project={props.project}
              price={props.purchase as TokenPrice}
            />
          )}

          {isListingPurchase && (
            <ListingPurchase
              project={props.project}
              listing={props.purchase as Listing}
            />
          )}

          {isNone && <InactivePurchase project={props.project} />}
        </div>
      </Layout>
    </>
  );
};
