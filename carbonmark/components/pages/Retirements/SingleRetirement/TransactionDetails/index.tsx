import { cx } from "@emotion/css";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { t, Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { Col } from "components/TwoColLayout";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  tokenData: any;
  retirement: KlimaRetire;
};

export const TransactionDetails: FC<Props> = (props) => (
  <>
    <div className={styles.details}>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest" uppercase>
          <Trans id="retirement.single.title.transaction.record">
            Mutable transaction record
          </Trans>
        </Text>
      </div>
      <div className={styles.textGroup}>
        <Text t="button" color="lightest" uppercase>
          <Trans id="retirement.single.title.beneficiary.address">
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
          <Trans id="retirement.single.title.transaction.id">
            Transaction ID
          </Trans>
        </Text>
        <Text>
          {props.retirement.transaction?.id ||
            t({
              id: "retirement.single.transaction.id.placeholder",
              message: "No transaction id available",
            })}
        </Text>
      </div>
      <div className={styles.gridLayout}>
        <Col className="column">
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.asset.retired">
                Asset Retired:
              </Trans>
            </Text>
            <Text>{props.tokenData?.label}</Text>
          </div>
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.project">Project:</Trans>
            </Text>
            <Text>{props.retirement.offset.projectID}</Text>
          </div>
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.type">Type:</Trans>
            </Text>
            <Text>{props.retirement.offset.methodologyCategory}</Text>
          </div>
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.methodology">
                Methodology:
              </Trans>
            </Text>
            <Text>{props.retirement.offset.methodology}</Text>
          </div>
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.country.region">
                Country/Region:
              </Trans>
            </Text>
            <Text>
              {props.retirement.offset.country ||
                props.retirement.offset.region}
            </Text>
          </div>
          <div className={cx(styles.textGroup, "row")}>
            <Text t="button" color="lightest" uppercase>
              <Trans id="retirement.single.title.vintage">Vintage:</Trans>
            </Text>
            <Text>{props.retirement.offset.vintage}</Text>
          </div>
        </Col>
      </div>
    </div>
  </>
);
