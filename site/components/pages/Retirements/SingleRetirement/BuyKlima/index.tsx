import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { getImageSizes } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { createLinkWithLocaleQuery } from "lib/i18n";
import Image from "next/image";
import { useRouter } from "next/router";
import droneView from "public/drone_view.png";
import * as styles from "./styles";

export const BuyKlima = () => {
  const { locale } = useRouter();
  return (
    <div className={styles.footerBuyKlima}>
      <Image
        alt="Drone View"
        src={droneView}
        layout="fill"
        objectFit="cover"
        sizes={getImageSizes({ large: "1072px" })}
        placeholder="blur"
      />
      <div className={styles.buyKlimaImageGradient}></div>
      <Text t="h2" as="h2" className={styles.footerBuyKlimaText}>
        <Trans id="retirement.footer.buy_klima.title">
          Acquire, stake, and get rewarded.
        </Trans>
      </Text>
      <Text className={styles.footerBuyKlimaText}>
        <Trans id="retirement.footer.buy_klima.text">
          Use carbon-backed KLIMA tokens to govern, swap, and earn staking
          rewards— then use those rewards to offset your emissions!
        </Trans>
      </Text>
      <div className={styles.footerButtons}>
        <ButtonPrimary
          label={t({
            id: "retirement.footer.buy_klima.button.buy",
            message: "Buy",
          })}
          href={urls.buy}
        />
        <ButtonPrimary
          label={t({
            id: "retirement.footer.buy_klima.button.offset",
            message: "Offset",
          })}
          href={createLinkWithLocaleQuery(urls.offset, locale)}
          variant="gray"
        />
      </div>
    </div>
  );
};
