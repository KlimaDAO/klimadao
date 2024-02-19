import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { getUSDCBalance } from "lib/actions";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { Balance } from "lib/types/carbonmark.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const Balances: FC = () => {
  const { locale } = useRouter();
  const { address, networkLabel } = useWeb3();
  const [balances, setBalances] = useState<Balance[]>([]);

  const updateBalance = (updatedBalance: Balance) => {
    setBalances((prevState) => {
      const withoutFormerBalance = prevState.filter(
        (b) => b.tokenName !== updatedBalance.tokenName
      );
      return [...withoutFormerBalance, updatedBalance];
    });
  };

  // load USDC.e
  useEffect(() => {
    if (!address) return;

    const usdcBalance = async () => {
      const usdc = await getUSDCBalance({
        userAddress: address,
        network: networkLabel,
      });

      updateBalance({
        tokenName: "usdc",
        balance: formatToPrice(usdc, locale),
      });
    };
    usdcBalance();
  }, [address]);

  return (
    <Card>
      <Text t="h4">
        <Trans id="portfolio.balances.title">Balances</Trans>
      </Text>
      <div className={styles.list}>
        {balances?.length &&
          balances?.map((balance) => (
            <div className={styles.listItem} key={balance.tokenName}>
              <div className={styles.itemWithIcon}>
                <div className="icon">
                  <Image
                    src={carbonmarkTokenInfoMap[balance.tokenName].icon}
                    width={20}
                    height={20}
                    alt={balance.tokenName}
                  />
                </div>
                <Text t="body1">
                  {carbonmarkTokenInfoMap[balance.tokenName].label}
                </Text>
              </div>
              <Text t="body1" className={styles.itemWithIcon}>
                {balance.balance}
              </Text>
            </div>
          ))}
      </div>
    </Card>
  );
};
