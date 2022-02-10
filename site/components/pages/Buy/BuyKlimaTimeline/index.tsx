import React, { FC, ReactNode } from "react";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

const cardContent: CardContent[] = [
  {
    title: "Install Metamask",
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          A wallet is a tool that will let you interact with the blockchain
          network securely. Though there are many other wallets, MetaMask Wallet
          is the most widely used, and the one we will be discussing here.
          Install MetaMask as a browser extension - available for Chrome,
          Firefox, Brave and Edge.
        </Text>
        <Text color="lighter">
          Use this link:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://metamask.io/"
            className={styles.link}
          >
            https://metamask.io/
          </a>
        </Text>
        <Text color="lighter">
          Video tutorial on How to Install the MetaMask Extension for Chrome.
        </Text>
      </div>
    ),
  },
  {
    title: "Connect metamask account to Zapper",
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          Using the browser you've designated for cryptocurrency trades, go to
          the Zapper website:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://zapper.fi/"
            className={styles.link}
          >
            https://zapper.fi/
          </a>
        </Text>
        <Text color="lighter">
          Click Connect Wallet on the homepage, and log in to your MetaMask
          account. It will ask you which account you'd like to connect - if you
          only have one account, this will already be selected for you. Click
          Next.
        </Text>
        <Text color="lighter">
          You can follow the tutorial that Zapper have shared on their website.
        </Text>
      </div>
    ),
  },
  {
    title: "Switch to Polygon network",
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          The KlimaDAO protocol operates on the Polygon network. By default,
          your MetaMask Wallet is connected to the Ethereum main network
          (mainnet). In order to interact with KLIMA, you need to switch to the
          Polygon main network (mainnet). Zapper can help you do this. Follow
          the steps below:
        </Text>
        <ol className={styles.ol}>
          <li>
            On Zapper, check the bottom left of your menu panel. Likely you are
            connected to the Ethereum network, as below
          </li>
          <li>
            Click the arrow to open a full list of networks available, and
            select Polygon.
          </li>
          <li>
            MetaMask will ask whether you would like to allow Zapper (“this
            site”) to add the Polygon network (formerly called 'Matic' network).
            Click Approve - this will save the Polygon network details in your
            MetaMask, and switch you over. At the bottom of the Zapper website,
            double check that you're now connected to Polygon:
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: "Fund wallet on the Polygon network",
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          So now you've connected to Zapper, and to the Polygon Network.
          Awesome! You'll notice that your wallet address is the same on Polygon
          as it is on Ethereum. However, transactions on Polygon require MATIC
          instead of ETH (to pay the network transaction fees). You need to fund
          your wallet with $1-2 USD worth - this will buy a small number of
          MATIC tokens.
        </Text>
        <Text color="lighter">
          You might also consider adding USDC to your wallet on the Polygon
          Network. You can use USDC tokens to swap for MATIC, KLIMA, and carbon
          tokens.
        </Text>
        <Text color="lighter">
          There are multiple ways to fund your Polygon wallet with MATIC or
          USDC. You can: Bridge some of the tokens you already have on Ethereum.
          Buy on a centralized token exchange website (CEX) Use an on-ramp
          service to buy directly with your credit card. Read below for more
          information on each option
        </Text>
        <Text t="h4">A: Bridge tokens from Ethereum to Polygon</Text>
        <Text color="lighter">
          If you already have funds in your wallet on Ethereum, you can bridge
          (transfer) them to your wallet on Polygon. NOTE: This can sometimes be
          expensive due to Ethereum's high network fees (also referred to as gas
          fees). You can do this directly in Zapper. Click on Bridge in the
          Zapper left menu, and complete the bridging transaction. Refer to this
          video for a full step-by-step guide on bridging from Ethereum to
          Polygon.
        </Text>
        <Text t="h4">B: Buy on a centralized token exchange (CEX)</Text>
        <Text t="h5">EXAMPLE 01 - Crypto.com</Text>
        <Text color="lighter">
          Here is a video tutorial on how to withdraw MATIC from crypto.com:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=6rvuH5h61Gc"
            className={styles.link}
          >
            https://www.youtube.com/watch?v=6rvuH5h61Gc
          </a>
        </Text>
        <Text t="h5">EXAMPLE 02 - Binance</Text>
        <Text color="lighter">
          Go to your Fiat and Spot Wallet, look for MATIC and click on Withdraw.
          Key in your MetaMask wallet in the address bar and select “MATIC” in
          the network as shown below: Note: Sometimes, Binance will suspend the
          network if it's too congested so check if it's available before buying
          Matic to withdraw.
        </Text>
        <Text t="h5">EXAMPLE 03 - OKX</Text>
        <Text color="lighter">
          OKX allows the direct withdrawal of MATIC to the Polygon network.
        </Text>
        <Text t="h5">EXAMPLE 04 - Coinbase</Text>
        <Text color="lighter">
          Coinbase does not allow buying into Polygon directly. You will first
          need to purchase USDC, and send it to your Metamask Ethereum wallet.
          Then you can use Zapper Bridge, as detailed in Option A above, to
          transfer to the Polygon network. Note that Coinbase sometimes places a
          hold on your funds for several days, preventing you from transferring
          them to another wallet during that time.
        </Text>
        <Text t="h4">C: Fiat-on-ramp</Text>
        <Text color="lighter">
          Use a fiat-to-crypto on-ramp like Transak to buy directly with your
          credit card for a fee. Be sure to select Polygon as your target
          network! You can find a list of other available options and more
          information on the polygon website.
        </Text>
      </div>
    ),
  },
  {
    title: "Swap MATIC, USDC or others for KLIMA on Zapper",
    description: (
      <div className={styles.description}>
        <Text color="lighter">
          The moment has finally come. With your funds available on the Polygon
          Network, you can use Zapper to swap for KLIMA, instantly.
        </Text>
        <ol className={styles.ol}>
          <li> On Zapper, click Exchange in the left menu panel.</li>
          <li>
            Specify your “From” currency - in this case MATIC - and your “To”
            currency, KLIMA. Zapper will quote you a live exchange rate, and
            suggest the best exchange route.
          </li>
          <li>
            Click Exchange, and Confirm the transaction in the MetaMask pop-up
            confirmation window.
          </li>
          <li>
            Congratulations! You now own KLIMA. You can see your KLIMA balance
            in your wallet by clicking Home in the left menu panel on Zapper.
          </li>
        </ol>
      </div>
    ),
  },
];

interface CardContent {
  title: string;
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

const BuyKlimaTimeline: FC = () => {
  return (
    <>
      {cardContent.map((content, index) => {
        return <Card key={index} content={content} index={index + 1} />;
      })}
    </>
  );
};

export default BuyKlimaTimeline;
