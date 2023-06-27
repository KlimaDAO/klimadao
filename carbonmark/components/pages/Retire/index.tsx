import { cx } from "@emotion/css";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { CopyAddressButton } from "components/CopyAddressButton";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectCard } from "components/ProjectCard";
import { Text } from "components/Text";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import { createProjectPoolRetireLink } from "lib/createUrls";
import { getDefaultPoolFromPrices } from "lib/getPoolData";
import { Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { RetireActivity } from "./Activity";
import { RetireFromPortfolio } from "./FromPortfolio";
import * as styles from "./styles";

export type PageProps = {
  featuredProjects: Project[];
  defaultProjects: Project[];
};

export const Retire: NextPage<PageProps> = (props) => {
  const { isConnected, address } = useWeb3();
  const isConnectedUser = !!address && isConnected;
  // collect nameserviceDomain Data if connected and domain is in URL
  const connectedDomain = useGetDomainFromAddress(address);

  const beneficiary = connectedDomain?.name || address;
  const displayName =
    connectedDomain?.name || (address && concatAddress(address));

  return (
    <>
      <PageHead
        title={t`Retire | Carbonmark`}
        mediaTitle={t`Retire | Carbonmark`}
        metaDescription={t`View a complete overview of the digital carbon that you retired. `}
      />

      <Layout fullContentWidth>
        <div className={styles.container}>
          <div>
            <Text t="h2">
              <Trans>Carbon Retirements</Trans>
            </Text>
            {isConnectedUser && (
              <div className={styles.beneficiary}>
                <Text t="body4">
                  <Trans>for beneficiary</Trans>{" "}
                  <span className="highlight">{displayName}</span>
                </Text>
                <CopyAddressButton
                  address={beneficiary}
                  variant="transparent"
                  className="copyButton"
                />
              </div>
            )}
          </div>
          <div className={styles.retireControls}>
            <LoginButton />
          </div>

          <RetireActivity />
        </div>

        <div className={cx(styles.fullWidth, "whiteBG")}>
          <div className={styles.content}>
            <div className={styles.cardsHeader}>
              <Text t="h4" className={styles.textWithIcon}>
                <LocalPoliceIcon className="featured" fontSize="inherit" />
                <Trans>Retire from a featured project</Trans>
              </Text>

              <Link href="/projects">
                <Text t="body4" className={styles.textLink}>
                  <Trans>View all Projects</Trans>
                </Text>
              </Link>
            </div>

            <Text className={styles.cardsDescription}>
              <Trans>
                We’ve hand-curated some of the best projects based on strict
                criteria, such as price, veracity, and global environmental
                impact.
              </Trans>
            </Text>

            <div className={styles.cardsList}>
              {props.featuredProjects.map((p) => (
                <ProjectCard
                  key={p.key}
                  project={p}
                  className={styles.featuredCard}
                />
              ))}
            </div>
          </div>
        </div>

        {isConnectedUser && (
          <div className={styles.content}>
            <div className={styles.cardsHeader}>
              <Text t="h4">
                <Trans>Retire from your portfolio</Trans>
              </Text>
              <Link href="/portfolio">
                <Text t="body4" className={styles.textLink}>
                  <Trans>View all Portfolio items</Trans>
                </Text>
              </Link>
            </div>
            <Text className={styles.cardsDescription}>
              <Trans>
                You can also retire any carbon asset in your wallet.
              </Trans>
            </Text>

            <RetireFromPortfolio address={address} />
          </div>
        )}

        <div
          className={cx(styles.fullWidth, {
            whiteBG: isConnectedUser,
          })}
        >
          <div className={styles.content}>
            <div className={styles.cardsHeader}>
              <Text t="h4" className={styles.textWithIcon}>
                <Trans>Quick Retire</Trans>
              </Text>
            </div>

            <Text className={styles.cardsDescription}>
              <Trans>
                Don’t want to go through the trouble of searching and selecting
                a project to retire? Here’s a list of discount retirements from
                trusted vendors.
              </Trans>
            </Text>

            <div className={styles.cardsList}>
              {props.defaultProjects.map((p) => {
                if (p.isPoolProject && !!p.prices)
                  return (
                    <ProjectCard
                      key={p.key}
                      project={p}
                      url={createProjectPoolRetireLink(
                        p,
                        getDefaultPoolFromPrices(p.prices)?.poolName || "bct" // typeguard
                      )}
                    />
                  );
                return null;
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
