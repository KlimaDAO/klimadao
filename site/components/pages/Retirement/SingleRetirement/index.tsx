import { NextPage } from "next";

import { Text, Section } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { RetirementValue } from "./RetirementValue";
import { RetirementDate } from "./RetirementDate";
import { TextGroup } from "./TextGroup";

import { IS_PRODUCTION } from "lib/constants";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";

import { retirementTokenInfoMap } from "../../../../lib/getTokenInfo";

type Props = {
  beneficiaryAddress: string;
  retirementTotals: string;
  retirement?: KlimaRetire;
  retirementIndexInfo: RetirementIndexInfoResult;
};

export const SingleRetirementPage: NextPage<Props> = (props) => {
  const {
    beneficiaryAddress,
    retirementTotals,
    retirement,
    retirementIndexInfo,
  } = props;

  // collect from indexInfo and optional data from subgraph
  const retireData = {
    amount: retirementIndexInfo.amount,
    typeOfToken: retirementIndexInfo.typeOfToken,
    beneficiaryName: retirementIndexInfo.beneficiaryName,
    retirementMessage: retirementIndexInfo.retirementMessage,
    timestamp: retirement?.timestamp,
    transactionID: retirement?.transaction?.id,
  };

  const tokenData = retirementTokenInfoMap[retireData.typeOfToken];

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.head.title",
          message: `Your retirement number ${retirementTotals} for address: ${beneficiaryAddress}`,
          values: { retirementTotals, beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `Your retirement number ${retirementTotals} for address: ${beneficiaryAddress}`,
          values: { retirementTotals, beneficiaryAddress },
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <RetirementHeader
          title={`
            ${retireData.amount} ${tokenData.label} ${t({
            id: "retirement.single.header.offset",
            message: "Offset",
          })}`}
          subline={retireData.beneficiaryName}
        />
        <div className={styles.retirementContent}>
          {!!retireData.retirementMessage && (
            <RetirementMessage message={retireData.retirementMessage} />
          )}
          <RetirementValue
            value={retireData.amount}
            label={tokenData.label}
            icon={tokenData.icon}
          />
          <div className={styles.metaData}>
            <div className="column">
              {!!retireData.beneficiaryName && (
                <TextGroup
                  title={
                    <Trans id="retirement.single.beneficiary.title">
                      Beneficiary
                    </Trans>
                  }
                  text={retireData.beneficiaryName}
                />
              )}
              <TextGroup
                title={
                  <Trans id="retirement.single.beneficiaryAddress.title">
                    Beneficiary Address
                  </Trans>
                }
                text={
                  retireData.transactionID ? (
                    <a
                      className="address"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://polygonscan.com/tx/${retireData.transactionID}`}
                    >
                      {beneficiaryAddress}
                    </a>
                  ) : (
                    { beneficiaryAddress }
                  )
                }
              />
            </div>
            <div className="column">
              {retireData.timestamp && (
                <RetirementDate timestamp={retireData.timestamp} />
              )}
              <TextGroup
                title={
                  <Trans id="retirement.single.retirementCertificate.title">
                    Certificate
                  </Trans>
                }
                text={
                  <Trans id="retirement.single.retirementCertificate.link">
                    ...coming soon
                  </Trans>
                }
              />
            </div>
          </div>
          <Text className={styles.data_description}>
            <Trans id="retirement.single.description">
              This represents the permanent on-chain retirement of tokenized
              carbon assets. This data is written publically and immutably on
              the Polygon blockchain. Our open-source, permissionless,
              decentralized system ensures that these tokens or the underlying
              offsets can never be retired more than once.
            </Trans>
          </Text>
        </div>
      </Section>
      <Footer />
    </>
  );
};
