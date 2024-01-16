import { cx } from "@emotion/css";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { getElapsedTime } from "lib/getElapsedTime";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

const createReceiptLink = (address: string, index: string) =>
  `/retirements/${address}/${Number(index) + 1}`;

type Props = {
  hasRetirements: boolean;
  retirements: KlimaRetire[] | false;
  address: string;
  locale: string;
  isLoadingRetirements: boolean;
  noRetirements: boolean;
  errorMessage: string;
  initializing: boolean;
  className: string;
};

export const ActivityQuotes: FC<Props> = (props) => {
  return (
    <div className={cx(styles.activityQuotes, props.className)}>
      <Text t="h4">
        <Trans>Retirement Activity</Trans>
      </Text>

      {props.noRetirements && !props.errorMessage && !props.initializing && (
        <Text>
          <i>
            <Trans>No activity to show</Trans>
          </i>
        </Text>
      )}

      {props.isLoadingRetirements && (
        <div className={styles.activityQuote}>
          <Spinner />
        </div>
      )}

      {props.retirements &&
        props.retirements.map((r) => (
          <Link
            key={r.id}
            href={createReceiptLink(props.address, r.index)}
            target="_blank"
            className={styles.activityQuote}
          >
            <Text t="h5">
              {r.retire.credit.project.name ||
                r.retire.credit.project.projectID}
            </Text>
            <Text color="lighter">
              <i>
                {getElapsedTime({
                  locale: props.locale,
                  timeStamp: Number(r.retire.timestamp),
                })}
              </i>
            </Text>
            <Text>
              <span className="account">
                <Trans>You</Trans>
              </span>{" "}
              <Trans>retired</Trans>{" "}
              <span className="number">
                {trimWithLocale(r.retire.amount, 2, props.locale)}
                {t`t`}
              </span>
            </Text>
          </Link>
        ))}

      {props.hasRetirements && (
        <Link target="_blank" href={`/retirements/${props.address}`}>
          <Text className={styles.externalLink} t="button">
            {t`View all Retirements`} <LaunchIcon />
          </Text>
        </Link>
      )}

      {props.errorMessage && (
        <Text className="error">{props.errorMessage}</Text>
      )}
    </div>
  );
};
