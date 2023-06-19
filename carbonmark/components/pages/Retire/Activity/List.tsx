import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  queryKlimaRetiresByAddress,
  trimWithLocale,
  useWeb3,
} from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Card } from "components/Card";
import { LoginCard } from "components/LoginCard";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
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

export const RetirementsList: FC = () => {
  const { isConnected, address, initializing, toggleModal } = useWeb3();
  const [isLoadingRetirements, setIsLoadingRetirements] = useState(false);
  const [retirements, setRetirements] = useState<false | KlimaRetire[]>(false);
  const [error, setError] = useState("");

  const { locale } = useRouter();

  const isConnectedUser = isConnected && !!address;
  const noRetirements =
    isConnectedUser && !isLoadingRetirements && !retirements;
  const hasRetirements = !isLoadingRetirements && !!address && !!retirements;

  useEffect(() => {
    const initData = async () => {
      if (!isConnectedUser) {
        setRetirements(false);
        return;
      }
      try {
        setIsLoadingRetirements(true);

        const retirements = await queryKlimaRetiresByAddress(address);

        setRetirements(retirements);
      } catch (e) {
        console.error(e);
        setError(t`There was an error getting your retirement data`);
      } finally {
        setIsLoadingRetirements(false);
      }
    };
    initData();
  }, [isConnectedUser]);

  if (!isConnectedUser && !initializing) {
    return <LoginCard isLoading={isLoadingRetirements} onLogin={toggleModal} />;
  }

  return (
    <Card>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <Text t="body4">{t`PROJECTS`}</Text>
          <Text t="body4">{t`QTY`}</Text>
          <Text t="body4">{t`DATE`}</Text>
        </div>

        {hasRetirements &&
          retirements.map((r) => (
            <Link
              key={r.id}
              href={createReceiptLink(address, r.index)}
              target="_blank"
            >
              <div className={styles.listItem}>
                <Text>{r.offset.name || r.offset.projectID}</Text>
                <Text>
                  {trimWithLocale(r.amount, 2, locale)}
                  {t`t`}
                </Text>
                <Text>{getFormattedDate(r.timestamp, locale || "en")}</Text>
              </div>
            </Link>
          ))}

        {hasRetirements && (
          <Link target="_blank" href={`/retirements/${address}`}>
            <Text className={styles.externalLink} t="body4">
              {t`View all Retirements`} <LaunchIcon />
            </Text>
          </Link>
        )}

        {isLoadingRetirements && (
          <div className={styles.emptyList}>
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          </div>
        )}

        {noRetirements && !error && !initializing && (
          <div className={styles.emptyList}>
            <Text>
              <Trans>No Activity to show.</Trans>
            </Text>
          </div>
        )}

        {error && (
          <div className={styles.emptyList}>
            <Text className="error">{error}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};
