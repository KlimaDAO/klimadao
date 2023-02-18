import { cx } from "@emotion/css";
import {
  ButtonPrimary,
  CopyAddressButton,
  Section,
  Text,
} from "@klimadao/lib/components";
import { KlimaRetire, PendingKlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import {
  concatAddress,
  getImageSizes,
  trimWithLocale,
} from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { FacebookButton } from "components/FacebookButton";
import { Footer } from "components/Footer";
import { LinkedInButton } from "components/LinkedInButton";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Pledge } from "components/pages/Pledge/types";
import { TweetButton } from "components/TweetButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import sunsetMountains from "public/sunset-mountains.jpg";
import { RetirementFooter } from "../../Footer";
import { BuyKlima } from "../BuyKlima";
import { ProjectDetails } from "../ProjectDetails";
import { RetirementHeader } from "../RetirementHeader";
import { RetirementMessage } from "../RetirementMessage";
import * as styles from "../styles";
import { ViewPledgeButton } from "../ViewPledgeButton";

interface Props extends React.PropsWithChildren {
  beneficiaryAddress: string;
  retirement: KlimaRetire | PendingKlimaRetire;
  projectDetails: VerraProjectDetails | null;
  nameserviceDomain: string | null;
  canonicalUrl?: string;
  pledge: Pledge | null;
}

/**
 * Shared layout that can be used in pending and non-pending mode
 * */
export const SingleRetirementLayout = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}: Props) => {
  const { locale } = useRouter();

  const trimmedAmount = trimWithLocale(
    retirement.amount.replace(/\.?0+$/, ""),
    2,
    locale
  );

  const retiree =
    retirement.beneficiary ||
    props.nameserviceDomain ||
    concatAddress(props.beneficiaryAddress);

  return (
    <>
      <PageHead
        title={t({
          id: "retirement.head.title",
          message: `KlimaDAO | Carbon Retirement Receipt`,
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `${retiree} retired ${retirement.amount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.head.metaDescription",
          message: "Transparent, on-chain offsets powered by KlimaDAO.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" />
      <Section variant="gray" className={styles.section}>
        <RetirementHeader
          overline={retirement.beneficiary}
          title={t({
            id: "retirement.single.header.quantity",
            message: `${trimmedAmount}t`,
          })}
          subline={
            <Trans id="retirement.single.header.subline">
              CO2-Equivalent Emissions Offset (Metric Tonnes)
            </Trans>
          }
        />
        <div className={styles.retirementContent}>
          <RetirementMessage
            message={
              retirement.retirementMessage ||
              t({
                id: "retirement.single.retirementMessage.placeholder",
                message: "No retirement message provided",
              })
            }
          />
          {props.children}
          <Text className={styles.data_description} t="caption" align="start">
            <Trans id="retirement.single.disclaimer">
              This represents the permanent retirement of tokenized carbon
              assets on the Polygon blockchain. This retirement and the
              associated data are immutable public records.
            </Trans>
          </Text>
          <div className={styles.pledge_button}>
            <ViewPledgeButton pledge={props.pledge} />
            {props.pledge === null && (
              <Text className={styles.create_pledge} t="caption" align="center">
                <Trans id="retirement.single.is_this_your_retirement">
                  Is this your retirement?
                </Trans>
                <Link href={`/pledge/${props.beneficiaryAddress}`}>
                  <Trans id="retirement.single.create_a_pledge">
                    Create a pledge now.
                  </Trans>
                </Link>
              </Text>
            )}
          </div>
        </div>
      </Section>
      <Section variant="gray" className={styles.section}>
        <div className={styles.share_content}>
          <Image
            alt="Sunset Mountains"
            src={sunsetMountains}
            layout="fill"
            objectFit="cover"
            sizes={getImageSizes({ large: "1072px" })}
            placeholder="blur"
            className="image"
          />
          <Text className="title" t="h3">
            <Trans id="retirement.share.title">Share your impact</Trans>
          </Text>
          <div className="buttons">
            <TweetButton
              title={`${retiree} retired ${retirement.amount} Tonnes of carbon`}
              tags={["klimadao", "Offset"]}
            />
            <FacebookButton />
            <LinkedInButton />
            <CopyAddressButton variant="lightGray" shape="circle" />
          </div>
        </div>
      </Section>
      <Section variant="gray" className={styles.section}>
        <RetirementFooter />
      </Section>
      <Section variant="gray" className={styles.section}>
        <BuyKlima />
      </Section>
      <Section
        variant="gray"
        className={cx(styles.section, styles.sectionButtons)}
      >
        <div className={styles.sectionButtonsWrap}>
          <CopyAddressButton label="Copy Link" variant="gray" />
          {!retirement.pending && retirement.transaction.id && (
            <ButtonPrimary
              href={`https://polygonscan.com/tx/${retirement.transaction.id}`}
              target="_blank"
              variant="gray"
              rel="noopener noreferrer"
              label={t({
                id: "retirement.single.view_on_polygon_scan",
                message: "View on Polygonscan",
              })}
              className={styles.buttonViewOnPolygon}
            />
          )}
        </div>
      </Section>

      {!retirement.pending && retirement.offset && (
        <Section variant="gray" className={styles.section}>
          <ProjectDetails
            projectDetails={props.projectDetails ?? undefined}
            offset={retirement.offset}
          />
        </Section>
      )}
      <Footer />
    </>
  );
};
