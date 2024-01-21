import { concatAddress, isTorusProvider, useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { FC, useEffect, useState } from "react";
import { ViewWalletButton } from "components/ViewWalletButton";
import { CopyAddressButton } from "components/CopyAddressButton";
import { urls } from "@klimadao/lib/constants";
import { useCopyToClipboard } from "@klimadao/lib/hooks";
import { cx } from "@emotion/css";
import * as styles from "./styles";
import { ButtonPrimary } from "@klimadao/lib/components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LaunchIcon from "@mui/icons-material/Launch";

type Props = {
  address: string;
};

export const ConnectedWallet: FC<Props> = (props) => {
  const web3 = useWeb3();
  const isTorus = isTorusProvider(web3?.provider?.provider);

  const [cachedAddress, setAddress] = useState<string>(
    props.address
  );
  const [copied, doCopy] = useCopyToClipboard();

  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);

  return (
    <Card>
      <Text t="h4">
        <Trans id="portfolio.balances.connected">Connected Wallet</Trans>
      </Text>
      {props.address && (
        <div className={styles.cardbody}>
          <span>{concatAddress(props.address, 20)}</span>
          <div className={styles.cardbody}>
            <ButtonPrimary
              /** Transparent by default */
              className={styles.marginLeft}
              variant={"transparent"}
              icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
              onClick={() => cachedAddress && doCopy(cachedAddress)}
              iconPos="suffix"
            />
            {isTorus && (
              <a
                className={cx(styles.marginLeft, styles.hrefLink)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(urls.polygonTor, '_blank');
                }} >
                <ButtonPrimary
                  variant="transparent"
                  icon={<LaunchIcon />}
                  iconPos="suffix"
                />
              </a>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
