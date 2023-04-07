import { CopyAddressButton } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

interface AddressSectionProps {
  domain?: Domain;
  address?: string;
}
export const AddressSection: FC<AddressSectionProps> = (props) => {
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
      {props.address && (
        <CopyAddressButton
          label={concatAddress(props.address)}
          address={props.address}
          className="copyButton"
        />
      )}
      {props.domain && (
        <Text t="body1" color="lightest" className="domain">
          {props.domain.name}
        </Text>
      )}
    </div>
  );
};
