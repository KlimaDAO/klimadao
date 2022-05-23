import { NextPage } from "next";

import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";
import { concatAddress } from "@klimadao/lib/utils";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { RetirementValue } from "./RetirementValue";
import { RetirementDate } from "./RetirementDate";
import { TextGroup } from "./TextGroup";
import { RetirementFooter } from "../Footer";
import { CopyURLButton } from "../CopyURLButton";

import { IS_PRODUCTION } from "lib/constants";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";
import { urls } from "@klimadao/lib/constants";
import { retirementTokenInfoMap } from "lib/getTokenInfo";

type Props = {
  beneficiaryAddress: string;
  retirementTotals: string;
  retirement?: KlimaRetire;
  retirementIndexInfo: RetirementIndexInfoResult;
};

export const SingleRetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress, retirement, retirementIndexInfo } = props;

  const tokenData = retirementTokenInfoMap[retirementIndexInfo.typeOfToken];

  // collect from indexInfo and optional data from subgraph
  const retireData = {
    amount: retirementIndexInfo.amount.replace(/\.?0+$/, ""), // remove whitespace 0s from string, e.g. 1.0 => 1
    tokenLabel: tokenData.label,
    tokenIcon: tokenData.icon,
    beneficiaryName: retirementIndexInfo.beneficiaryName,
    retirementMessage: retirementIndexInfo.retirementMessage,
    timestamp: retirement?.timestamp,
    transactionID: retirement?.transaction?.id,
  };

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.head.title",
          message: `KlimaDAO | Carbon Retirement Receipt`,
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `${
            retireData.beneficiaryName || concatAddress(beneficiaryAddress)
          } retired ${retireData.amount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.head.metaDescription",
          message: "Transparent, on-chain offsets powered by KlimaDAO.",
        })}
        mediaImageSrc={urls.mediaImage}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <RetirementHeader
          overline={retireData.beneficiaryName}
          title={t({
            id: "retirement.single.header.quantity",
            message: `${retireData.amount} t`,
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
              retireData.retirementMessage ||
              t({
                id: "retirement.single.retirementMessage.placeholder",
                message: "No retirement message provided",
              })
            }
          />
          <RetirementValue
            value={retireData.amount}
            label={retireData.tokenLabel}
            icon={retireData.tokenIcon}
          />
          <div className={styles.metaData}>
            <div className="column">
              <TextGroup
                title={
                  <Trans id="retirement.single.beneficiary.title">
                    Beneficiary
                  </Trans>
                }
                text={
                  retireData.beneficiaryName ||
                  t({
                    id: "retirement.single.beneficiary.placeholder",
                    message: "No beneficiary name provided",
                  })
                }
              />
              <TextGroup
                title={
                  <Trans id="retirement.single.beneficiaryAddress.title">
                    Beneficiary Address
                  </Trans>
                }
                text={
                  <a
                    className="address"
                    href={`${urls.retirements}/${beneficiaryAddress}`}
                  >
                    {concatAddress(beneficiaryAddress)}
                  </a>
                }
              />
            </div>
            <div className="column">
              <RetirementDate
                timestamp={
                  retireData.timestamp ||
                  t({
                    id: "retirement.single.timestamp.placeholder",
                    message: "No retirement timestamp provided",
                  })
                }
              />
              <TextGroup
                title={
                  <Trans id="retirement.single.retirementCertificate.title">
                    Certificate
                  </Trans>
                }
                text={
                  <Trans id="retirement.single.retirementCertificate.soon">
                    ...coming soon!
                  </Trans>
                }
              />
            </div>
          </div>
          <Text className={styles.data_description} t="body2" align="center">
            <Trans id="retirement.single.disclaimer">
              This represents the permanent retirement of tokenized carbon
              assets on the Polygon blockchain. This retirement and the
              associated data are immutable public records.
            </Trans>
          </Text>
        </div>
      </Section>
      <Section variant="gray" className={styles.sectionButtons}>
        <div className={styles.sectionButtonsWrap}>
          <CopyURLButton />
          {retireData.transactionID && (
            <ButtonPrimary
              variant="gray"
              href={`https://polygonscan.com/tx/${retireData.transactionID}`}
              target="_blank"
              rel="noopener noreferrer"
              label={t({
                id: "retirement.single.view_on_polygon_scan",
                message: "View on Polygonscan",
              })}
            />
          )}
        </div>
      </Section>
      <RetirementFooter />
      <Footer />
    </>
  );
};
