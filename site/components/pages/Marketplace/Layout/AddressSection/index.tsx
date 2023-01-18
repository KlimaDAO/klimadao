import { Text } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { FC } from "react";
import * as styles from "./styles";

interface AddressSectionProps {
  domain?: Domain;
  address?: string;
}
export const AddressSection: FC<AddressSectionProps> = (props) => {
  return (
    <div className={styles.address}>
      <Text t="caption">
        <Trans id="marketplace.menu.wallet_address">Your Wallet Address</Trans>:
      </Text>

      {props.domain ? (
        <div className="domain-wrapper">
          <img
            src={props.domain.imageUrl}
            alt="profile avatar"
            className="avatar"
          />
          <Text t="caption" color="lightest" className={"domain-name"}>
            {props.domain.name}
          </Text>
        </div>
      ) : (
        <Text t="caption" color="lightest">
          {props.address ? (
            concatAddress(props.address)
          ) : (
            <Trans id="marketplace.menu.not_connected">NOT CONNECTED</Trans>
          )}
        </Text>
      )}
    </div>
  );
};
