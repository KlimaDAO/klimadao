import { cx } from "@emotion/css";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

const getFormattedDate = (timestamp: string, locale: string) => {
  const date = new Date(parseInt(timestamp) * 1000); // expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

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

export const ActivityTable: FC<Props> = (props) => {
  const formatTonnes = (value: string | number) => {
    // < 1 tonne, show up to 3 decimals / > 1 tonne, show up to 2 decimals
    const precision = Number(value) < 1 ? 3 : 2;
    return trimWithLocale(value, precision, props.locale);
  };

  return (
    <div className={cx(styles.list, props.className)}>
      <div className={styles.listHeader}>
        <Text t="body4">{t`PROJECT`}</Text>
        <Text align="end" t="body4">{t`QTY`}</Text>
        <Text t="body4">{t`DATE`}</Text>
      </div>

      {props.retirements &&
        props.retirements.map((r) => (
          <Link
            key={r.id}
            href={createReceiptLink(props.address, r.index)}
            target="_blank"
          >
            <div className={styles.listItem}>
              <Text>
                {r.retire.credit.project.name ||
                  r.retire.credit.project.projectID}
              </Text>
              <Text align="end">
                {formatTonnes(r.retire.amount)}
                {t`t`}
              </Text>
              <Text>
                {getFormattedDate(r.retire.timestamp, props.locale || "en")}
              </Text>
            </div>
          </Link>
        ))}

      {props.hasRetirements && (
        <Link target="_blank" href={`/retirements/${props.address}`}>
          <Text className={styles.externalLink} t="button">
            {t`View all Retirements`} <LaunchIcon />
          </Text>
        </Link>
      )}

      {props.isLoadingRetirements && (
        <div className={styles.emptyList}>
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        </div>
      )}

      {props.noRetirements && !props.errorMessage && !props.initializing && (
        <div className={styles.emptyList}>
          <Text>
            <Trans>No Activity to show.</Trans>
          </Text>
        </div>
      )}

      {props.errorMessage && (
        <div className={styles.emptyList}>
          <Text className="error">{props.errorMessage}</Text>
        </div>
      )}
    </div>
  );
};
