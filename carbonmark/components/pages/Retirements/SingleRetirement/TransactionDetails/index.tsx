import { cx } from "@emotion/css";
import { CarbonToken } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t, Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { Col } from "components/TwoColLayout";
import { StaticImageData } from "next/image";
import { FC } from "react";
import * as styles from "./styles";

interface TokenData {
  key: string;
  icon: StaticImageData;
  label: Uppercase<CarbonToken>;
}

type Props = {
  tokenData: TokenData | null;
  retirement: KlimaRetire;
};

export const TransactionDetails: FC<Props> = (props) => (
  <>
    <div className={styles.details}>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest" uppercase>
          <Trans id="retirement.single.transaction_record.title">
            Mutable transaction record
          </Trans>
        </Text>
      </div>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest" uppercase>
          <Trans id="retirement.single.beneficiary_address.title">
            Beneficiary Address:
          </Trans>
        </Text>
        <Text>
          {props.retirement.beneficiaryAddress ||
            t({
              id: "retirement.single.beneficiary.address.placeholder",
              message: "No beneficiary address available",
            })}
        </Text>
      </div>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest" uppercase>
          <Trans id="retirement.single.transaction_id.title">
            Transaction ID
          </Trans>
        </Text>
        <Text>
          {props.retirement.transaction?.id ||
            t({
              id: "retirement.single.transaction_id.placeholder",
              message: "No transaction id available",
            })}
        </Text>
      </div>
      <div className={styles.gridLayout}>
        <Col className="column">
          {props.tokenData?.label && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.asset_retired.title">
                  Asset Retired:
                </Trans>
              </Text>
              <Text>{props.tokenData.label}</Text>
            </div>
          )}
          {props.retirement?.offset?.projectID && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.project.title">Project:</Trans>
              </Text>
              <Text>{props.retirement.offset.projectID}</Text>
            </div>
          )}
          {props.retirement?.offset?.methodologyCategory && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.type.title">Type:</Trans>
              </Text>
              <Text>{props.retirement.offset.methodologyCategory}</Text>
            </div>
          )}
          {props.retirement?.offset?.methodology && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.methodology.title">
                  Methodology:
                </Trans>
              </Text>
              <Text>{props.retirement.offset.methodology}</Text>
            </div>
          )}
          {/* prettier-ignore */}
          {props.retirement?.offset?.region &&
            props.retirement?.offset?.country && (
              <div className={cx(styles.textGroup, "row")}>
                <Text t="button" color="lightest" uppercase>
                  <Trans id="retirement.single.country_region.title">
                    Country/Region:
                  </Trans>
                </Text>
                <Text>
                  {props.retirement.offset.country ||
                    props.retirement.offset.region}
                </Text>
              </div>
            )}
          {props.retirement?.offset?.vintageYear && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.vintage.title">Vintage:</Trans>
              </Text>
              <Text>{props.retirement.offset.vintageYear}</Text>
            </div>
          )}
        </Col>
      </div>
    </div>
  </>
);
