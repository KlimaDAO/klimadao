import { Anchor as A, Text } from "@klimadao/lib/components";
import { FC, ReactNode } from "react";

import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import * as styles from "./styles";

const creditCardContent: CardContent[] = [
  {
    title: <Trans id="buy.beginner_01.title">Install Metamask</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.beginner_01.description_01">
            <A href="https://metamask.io/">Metamask</A> is the most popular
            wallet for Ethereum and Polygon. This is what you use to connect to
            our app and send transactions. Be sure to install the extension for
            your web browser.
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.beginner_02.title">Connect to our app</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.beginner_02.description_01">
            With the Metamask browser extension installed and your new wallet
            set up, head to{" "}
            <A href={urls.buy_dapp}>app.klimadao.finance/#/buy</A> and click
            "connect".
          </Trans>
        </Text>
        <Text color="lighter">
          <Trans id="buy.beginner_02.description_02">
            After you connect, the KlimaDAO app should prompt you to switch to
            the Polygon network automatically. Metamask will ask you to confirm
            this action.
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.beginner_03.title">Buy KLIMA</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.beginner_03.description_01">
            Once connected, you should be able to follow the steps in our app to
            complete your purchase.
          </Trans>
        </Text>
        <Text color="lighter">
          <Trans id="buy.beginner_03.description_2">
            You will be asked to provide an email, a payment method, and to
            verify your identity. The DAO does not receive or store any personal
            information whatsoever. This information is only used by our payment
            providers for legal compliance.
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.beginner_04.title">Buy MATIC (for new users)</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.beginner_04.description_01">
            In order to use KLIMA to stake, swap, or offset carbon emissions,
            you will need to execute transactions on the Polygon network. Every
            transaction requires a network fee paid in MATIC.
          </Trans>
        </Text>
        <Text color="lighter">
          <Trans id="buy.beginner_04.description_02">
            1 MATIC should be plenty for most users. You can connect to the
            official Polygon app and use their{" "}
            <A href="https://wallet.polygon.technology/gas-swap">
              Gas Swap tool
            </A>
            . This tool allows you to trade a variety of assets for MATIC for
            free.
          </Trans>
        </Text>
      </div>
    ),
  },
  {
    title: <Trans id="buy.beginner_05.title">Stake, offset, govern!</Trans>,
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          <Trans id="buy.beginner_05.description_01">
            Now that you have some KLIMA and some MATIC in your wallet, you
            should <A href={urls.stake}>stake</A> it for sKLIMA to start
            accruing rewards. You can also use it to offset carbon emissions.
            And as a token holder, you can use your KLIMA and sKLIMA to
            participate in the governance of the DAO! So keep an eye out for
            proposals on our <A href={urls.forum}>forum</A>.
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

export const CreditCardTimeline: FC = () => {
  return (
    <>
      {creditCardContent.map((content, index) => {
        return <Card key={index} content={content} index={index + 1} />;
      })}
    </>
  );
};
