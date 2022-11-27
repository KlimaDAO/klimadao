import { Anchor as A, Text } from "@klimadao/lib/components";
import { FC, ReactNode } from "react";

import { Trans } from "@lingui/macro";
import * as styles from "./styles";

const zapperContent: CardContent[] = [
  {
    title: <Trans id="buy.zapper_01.title">Load your Polygon wallet</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.zapper_01.description_01">
            Make sure you have a wallet like Metamask installed, connected to
            Polygon network, and loaded with some MATIC.
          </Trans>
        </Text>
        <Text color="lighter">
          <Trans id="buy.zapper_01.description_02">
            You can load your Polygon wallet directly using popular on-ramp
            services like <A href="https://global.transak.com/">Transak</A> or
            our partner <A href="https://app.klimadao.finance/#/buy">Mobilum</A>
            . Alternatively, you can load your wallet with assets on Ethereum
            and <A href="https://wallet.polygon.technology/">bridge</A> them to
            the Polygon network
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.zapper_02.title">Connect to Zapper.fi</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.zapper_02.description_02">
            Head to <A href="https://zapper.fi/">zapper.fi</A> and click
            Connect.
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.zapper_03.title">SWAP</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.zapper_03.description_01">
            Use the “Swap” interface in Zapper to set up your trade. If you are
            having trouble, check out the resources and tutorials provided by
            the Zapper team.
          </Trans>
        </Text>
      </div>
    ),
  },
];

interface CardContent {
  title: ReactNode;
  description: ReactNode;
}

interface CardProps {
  content: CardContent;
  index: number;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div className={styles.card}>
      <div className="index">
        <Text t="h4" color="lighter">
          00{props.index}
        </Text>
      </div>
      <div className="content">
        <Text t="h3" as="h3" className={styles.title}>
          {props.content.title}
        </Text>
        {props.content.description}
      </div>
    </div>
  );
};

export const ZapperTimeline: FC = () => {
  return (
    <>
      {zapperContent.map((content, index) => {
        return <Card key={index} content={content} index={index + 1} />;
      })}
    </>
  );
};
