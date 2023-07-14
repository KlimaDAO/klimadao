import { Anchor, CopyAddressButton } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { WalletProvider, concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Text } from "components/Text";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

interface AddressSectionProps {
  domain?: Domain;
  address?: string;
}
export const AddressSection: FC<AddressSectionProps> = (props) => {
  const [isTorusWallet, setIsTorusWallet] = useState(false)
  useEffect(() => {
    setIsTorusWallet(localStorage.getItem("web3-wallet") == WalletProvider.TORUS);
  }, [])

  return (
    <div className={styles.address}>
      <Text t="body1">
        <Trans>Your Wallet Address:</Trans>
      </Text>
      {false && (
        <Text t="body1" color="lightest" uppercase>
          <Trans>Not Connected</Trans>
        </Text>
      )}
      {true /* props.address */ && (
        <div>
          <CopyAddressButton
            label={concatAddress(props.address || "0x123456789")}
            address={props.address}
            className="copyButton"
          />
          {true /* isTorusWallet */ && (
            <Anchor
              className={styles.iconAndText}
              href={`https://polygon.tor.us/`}
            >
              <Text className={styles.externalLink} t="body2" uppercase>
                View <LaunchIcon />
              </Text>
            </Anchor>
          )}
        </div>
      )}
      {props.domain && (
        <Text t="body1" color="lightest" className="domain">
          {props.domain.name}
        </Text>
      )}
    </div>
  );
};
