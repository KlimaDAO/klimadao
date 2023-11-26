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
          This is your portfolio, here you will find any of the supported carbon
          assets you own. Assets shown here can be retired or listed for sale.
        </Trans>
      </Text>
      <Text>
        <Trans>
          You do not currently have any supported carbon assets available for
          listing.
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
