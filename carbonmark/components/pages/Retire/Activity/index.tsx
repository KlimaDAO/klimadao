import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { LoginCard } from "components/LoginCard";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

export const RetireActivity: FC = () => {
  const { isConnected, address, toggleModal, initializing } = useWeb3();
  const { carbonmarkUser, isLoading } = useFetchUser(address);

  const isConnectedUser = isConnected && address;
  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered =
    isConnectedUser && !isLoading && carbonmarkUser === null;
  const isPending =
    (!isConnectedUser && initializing) || (isConnectedUser && isLoading);

  return (
    <TwoColLayout>
      <Col>
        {!isConnectedUser && !isPending && (
          <LoginCard isLoading={isLoading} onLogin={toggleModal} />
        )}
        {isPending && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}

        {isCarbonmarkUser && (
          <Text>
            <Trans>Hello Retire</Trans>
          </Text>
        )}

        {isUnregistered && (
          <>
            <Text>
              <Trans>
                Sorry. We could not find any data on Carbonmark for your user.
              </Trans>
            </Text>
            <Text>
              <Trans>
                Have you already created your Carbonmark{" "}
                <Link href={`/users/${address}`}>Profile</Link>?
              </Trans>
            </Text>
          </>
        )}
      </Col>

      <Col>
        <Text>
          <Trans>Sidebar</Trans>
        </Text>
      </Col>
    </TwoColLayout>
  );
};
