import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import Link from "next/link";
import { FC } from "react";

export const UnregisteredMessage: FC = () => {
  const { address } = useWeb3();
  return (
    <>
      <Text>
        <Trans>
          This is your portfolio. Here you will find supported carbon assets you
          own. Assets shown here can be retired or listed for sale in the
          marketplace once you have a profile.
        </Trans>
      </Text>
      <Text>
        <Trans>
          You must have a profile created to view carbon assets you own in your
          Carbonmark portfolio.
        </Trans>
      </Text>
      <Text>
        <Trans>
          To get started, be sure to complete your{" "}
          <Link href={`/users/${address}`}>profile</Link> and then head to the{" "}
          <Link href={`/projects`}>marketplace</Link> to purchase carbon assets.
        </Trans>
      </Text>
    </>
  );
};
