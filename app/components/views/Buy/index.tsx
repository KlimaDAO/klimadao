import { t, Trans } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";
import { providers } from "ethers";

import { Anchor, ButtonPrimary, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import LoginIcon from "@mui/icons-material/Login";
import { BalancesCard } from "components/BalancesCard";
import { DisclaimerModal } from "components/DisclaimerModal";
import { ImageCard } from "components/ImageCard";
import * as styles from "../styles";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
}

export const Buy = (props: Props) => {
  const { toggleModal } = useWeb3();
  return (
    <>
      <DisclaimerModal />
      <div className={styles.ctaCard}>
        <div className={styles.ctaCard_header}>
          {props.isConnected && props.address ? (
            <div>
              <Text t="h4" className={styles.ctaCard_header_title}>
                <Payment />
                <Trans id="buy.buy_klima">Buy KLIMA</Trans>
              </Text>
              <Text t="caption" className={styles.ctaCard_header_subtitle}>
                <Trans id="buy.cta_1">
                  If you are a beginner, we recommend following our step-by-step
                  tutorial: <Anchor href={urls.buy}>How to Buy KLIMA</Anchor>.
                </Trans>
              </Text>
              <Text t="caption" className={styles.ctaCard_header_subtitle}>
                <Trans id="buy.cta_2">
                  Otherwise, if you already have a wallet with MATIC on Polygon,
                  the best way to get KLIMA is to swap on{" "}
                  <Anchor href={urls.sushiSwap}>Sushi.com</Anchor>. If you
                  prefer to pay with a credit card instead, you can use{" "}
                  <Anchor href={urls.transakMatic}>Transak</Anchor> to buy KLIMA
                  directly.
                </Trans>
              </Text>
            </div>
          ) : (
            <>
              <Text t="h4" className={styles.ctaCard_header_title}>
                <LoginIcon />
                <Trans id="buy.please_log_in">
                  Please Log In Or Connect A Wallet
                </Trans>
              </Text>
              <Text t="body2">
                <Trans id="buy.connect_to_buy" comment="Long sentence">
                  This feature is available only to users who are logged in. You
                  can log in or create an account via the button below.
                </Trans>
              </Text>
              <ButtonPrimary
                label={t({
                  id: "shared.login_connect",
                  message: "Login / Connect",
                })}
                onClick={toggleModal}
              />
            </>
          )}
        </div>
      </div>
      <BalancesCard
        assets={["klima", "sklima"]}
        tooltip={
          <Trans id="stake.balancescard.tooltip" comment="Long sentence">
            Stake your KLIMA tokens to receive sKLIMA. After every rebase, your
            sKLIMA balance will increase by the given percentage.
          </Trans>
        }
      />
      <ImageCard />
    </>
  );
};
