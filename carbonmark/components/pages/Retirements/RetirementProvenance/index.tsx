import { ProvenanceRecord } from ".generated/carbonmark-api-sdk/types";
import { GridContainer, Section } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { SocialLinks } from "components/SocialLinks";
import { Text } from "components/Text";
import { Navigation } from "components/shared/Navigation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RetirementProvenancePageProps } from "pages/retirements/[beneficiary]/[retirement_index]/provenance";
import { ProvenanceComponent } from "./ProvenanceComponent";
import { RetirementCard } from "./RetirementCard";
import * as styles from "./styles";

/**
 * Provenance Elements indexed by the address of the last sender
 */
type ProvenanceList = Record<string, ProvenanceRecord[]>;

/**
 * Splits Provenance records in different streams
 * Each stream tracks the provenance of the credits received by the last sender
 * @param provenance
 * @returns
 */
const splitProvenance = (records: ProvenanceRecord[]) => {
  if (records.length <= 3) return [records];
  // Sender of the last trasfer
  const lastSender = records[1].sender;
  // Stores the different carbon sources
  const provenanceList: ProvenanceList = {};
  records.forEach((record, index) => {
    // Ignore ORIGINATION, RETIMENT and last transfer records for now
    if (record.transactionType !== "TRANSFER" || index <= 1) return;

    // The transfer concerns the last sender
    if (record.receiver == lastSender) {
      if (provenanceList[record.sender]) {
        // Add  this transfer to an existing source
        provenanceList[record.sender].push(record);
      } else {
        // Initialize a new source
        provenanceList[record.sender] = [record];
      }
    } else {
      // If everything goes according to plan, we already identified the receiver of this transfer as a sender in one of the source
      const targetLastSender = Object.keys(provenanceList).find(
        (lastSender) => {
          return provenanceList[lastSender]
            .map((record) => record.sender)
            .includes(record.receiver);
        }
      );
      if (targetLastSender) {
        const targetProvenanceElement = provenanceList[targetLastSender];
        targetProvenanceElement.push(record);
      }
      // If the plan failed. We create another provenance list and log the traceability issue
      else {
        provenanceList[record.sender] = [record];
        console.error("Unable to trace carbon provenance properly", record);
      }
    }
  });
  // total carbon received from all sources
  const totalQuantity = Object.values(provenanceList).reduce(
    (acc, newRrecords) => newRrecords[0].originalAmount + acc,
    0
  );

  // Add bridging and retirement events to each recordList
  Object.values(provenanceList).forEach((newRrecords) => {
    // Quantity received from this source
    const quantity = newRrecords[0].originalAmount;
    // Add the last transfer to each recordList
    newRrecords.unshift(records[1]);
    records.forEach((record) => {
      if (record.transactionType === "RETIREMENT") {
        // We say that the amount retired from this source is proportional to the amount acquired from this source
        const retirement = { ...record };
        retirement.originalAmount *= quantity / totalQuantity;
        newRrecords.unshift(retirement);
      }
      if (record.transactionType === "ORIGINATION") {
        newRrecords.push(record);
      }
    });
  });
  // Sort results by amount retired
  return Object.values(provenanceList).sort((a, b) =>
    a[0].originalAmount > b[0].originalAmount ? -1 : 1
  );
};

/**
 * Renders the carbon provenance page
 * @param props
 * @returns
 */
export const RetirementProvenancePage: NextPage<
  RetirementProvenancePageProps
> = (props) => {
  const { locale } = useRouter();

  const formattedAmount = formatTonnes({
    amount: String(props.retirement.amount),
    locale: locale || "en",
  });

  const retiree =
    props.retirement.beneficiaryAddress ||
    props.nameserviceDomain ||
    concatAddress(props.retirement.beneficiaryAddress);

  const provenanceList = splitProvenance(props.provenance);

  return (
    <GridContainer>
      <PageHead
        title={t({
          id: "retirement.provenance.head.title",
          message: `Carbonmark | Carbon Retirement provenance`,
        })}
        mediaTitle={t({
          id: "retirement.provenance.head.metaTitle",
          message: `${retiree} retired ${formattedAmount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.provenance.head.metaDescription",
          message: "Transparent, on-chain offsets powered by Carbonmark.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" transparent={false} />
      <Section className={styles.section} variant="gray">
        <div className={styles.content}>
          <Text t="h1" align="center">
            <Trans>Carbon Provenance</Trans>
          </Text>
          <Text t="body1" align="center">
            <Trans>
              View the entire transaction history - from bridging event until
              retirement - for each credit and partial credit included in the
              following retirement transaction:
            </Trans>
          </Text>
          <RetirementCard
            retirement={props.retirement}
            beneficiaryAddress={props.beneficiaryAddress}
            retirementIndex={props.retirementIndex}
          />
          <div className={styles.social}>
            <Text t="body1">
              <Trans>Share this page</Trans>
            </Text>
            <SocialLinks
              twitterTags={["Carbonmark", "retirement"]}
              twitterTitle={`${retiree} retired ${formattedAmount} Tonnes of carbon`}
            ></SocialLinks>
          </div>
          {provenanceList.map((provenance, index) => (
            <ProvenanceComponent
              key={index}
              records={provenance}
              retirement={props.retirement}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
