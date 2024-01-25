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
            Immutable transaction record
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
          {props.retirement.retire.beneficiaryAddress.id ||
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
          {props.retirement.retire?.hash ||
            t({
              id: "retirement.single.transaction_id.placeholder",
              message: "No transaction id available",
            })}
        </Text>
      </div>
      <div className={styles.gridLayout}>
        <Col className="column">
          {props.retirement?.retire.credit?.project?.projectID && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.project.title">Project:</Trans>
              </Text>
              <Text>{props.retirement.retire.credit.project.projectID}</Text>
            </div>
          )}
          {props.retirement?.retire?.credit?.project && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.type.title">Type:</Trans>
              </Text>
              <Text>{props.retirement.retire.credit.project.category}</Text>
            </div>
          )}
          {props.retirement?.retire.credit?.project?.methodologies && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.methodology.title">
                  Methodology:
                </Trans>
              </Text>
              <Text>
                {props.retirement?.retire.credit?.project?.methodologies}
              </Text>
            </div>
          )}
          {/* prettier-ignore */}
          {props.retirement.retire.credit.project.country &&
            props.retirement.retire.credit.project.region && (
              <div className={cx(styles.textGroup, "row")}>
                <Text t="button" color="lightest" uppercase>
                  <Trans id="retirement.single.country_region.title">
                    Country/Region:
                  </Trans>
                </Text>
                <Text>
                  {props.retirement.retire.credit.project.country ||
                    props.retirement.retire.credit.project.region}
                </Text>
              </div>
            )}
          {props.retirement.retire.credit.vintage && (
            <div className={cx(styles.textGroup, "row")}>
              <Text t="button" color="lightest" uppercase>
                <Trans id="retirement.single.vintage.title">Vintage:</Trans>
              </Text>
              <Text>{props.retirement.retire.credit.vintage}</Text>
            </div>
          )}
        </Col>
      </div>
    </div>
  </>
);
