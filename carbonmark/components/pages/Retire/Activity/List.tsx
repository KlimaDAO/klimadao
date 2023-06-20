import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { queryKlimaRetiresByAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Card } from "components/Card";
import { LoginCard } from "components/LoginCard";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";
import { ActivityTable } from "./Table";

export const RetirementsList: FC = () => {
  const { isConnected, address, initializing, toggleModal } = useWeb3();
  const [isLoadingRetirements, setIsLoadingRetirements] = useState(false);
  const [retirements, setRetirements] = useState<false | KlimaRetire[]>(false);
  const [error, setError] = useState("");

  const { locale } = useRouter();

  const isConnectedUser = isConnected && !!address && !initializing;
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
    isConnectedUser && initData();
  }, [isConnectedUser]);

  if (!isConnectedUser) {
    return <LoginCard isLoading={isLoadingRetirements} onLogin={toggleModal} />;
  }

  return (
    <Card>
      <ActivityTable
        className={styles.showOnDesktop}
        address={address}
        isLoadingRetirements={isLoadingRetirements}
        noRetirements={noRetirements}
        hasRetirements={hasRetirements}
        retirements={retirements}
        locale={locale || "en"}
        errorMessage={error}
        initializing={initializing}
      />
    </Card>
  );
};
