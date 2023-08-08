import { urls } from "@klimadao/lib/constants";
import { Domain } from "@klimadao/lib/types/domains";
import { isTorusProvider, useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { CopyAddressButton } from "components/CopyAddressButton";
import { Text } from "components/Text";
import { ViewWalletButton } from "components/ViewWalletButton";
import { FC } from "react";
import * as styles from "./styles";

interface AddressSectionProps {
  domain?: Domain;
  address?: string;
}
export const AddressSection: FC<AddressSectionProps> = (props) => {
  const web3 = useWeb3();
  const isTorus = isTorusProvider(web3?.provider?.provider);

  return (
    <div className={styles.address}>
      <Text t="body1">
        <Trans>Your Wallet Address:</Trans>
      </Text>
      {!props.address && (
        <Text t="body1" color="lightest" uppercase>
          <Trans>Not Connected</Trans>
        </Text>
      )}
      {props.address &&
        (isTorus ? (
          <ViewWalletButton address={props.address} href={urls.polygonTor} />
        ) : (
          <CopyAddressButton address={props.address} />
        ))}
      {props.domain && (
        <Text t="body1" color="lightest" className="domain">
          {props.domain.name}
        </Text>
      )}
    </div>
  );
};
