import { NextPage } from "next";

import { Section, Text } from "@klimadao/lib/components";
// import { useRouter } from "next/router";

import { Anchor } from "@klimadao/lib/components";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import * as styles from "./styles";

import { cx } from "@emotion/css";
import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";
import Image from "next/legacy/image";
import swapExample from "public/swap-example.jpg";
import walletConnectQRcodeExample from "public/walletconnect-example-qrcode.jpg";
import walletConnectExample from "public/walletconnect-example.jpg";

export const Buy: NextPage = () => {
  // const { locale } = useRouter();

  return (
    <>
      <PageHead
        title={t({ id: "buy.head.title", message: "How to buy KLIMA" })}
        mediaTitle={t({ id: "buy.head.title", message: "How to buy KLIMA" })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />
      <Navigation activePage="Buy" />

      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.textGroup1}>
            <Text t="h1">
              <Trans id="buy.how_to_buy">How to buy KLIMA</Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.how_to_paragraph_part_1">
                KLIMA is a carbon-backed digital asset and can be staked for
                rewards or used to offset digital carbon. Holding KLIMA also
                empowers you to vote and help govern the Digital Carbon Market.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.how_to_paragraph_part_2">
                This is a short tutorial for beginners who are new to Web3 and
                DeFi
              </Trans>
            </Text>
          </div>
          <div className={styles.textGroup2}>
            <Text t="h2">
              <Trans id="buy.summary_title">Summary</Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.summary_steps_title">
                The best and easiest way to get KLIMA is to follow these three
                steps:
              </Trans>
            </Text>
            <div className={styles.numberedItem}>
              <Text t="body2" className={styles.bold}>
                <Trans id="buy.step_1">1.</Trans>
              </Text>
              <Text t="body2">
                <Trans id="buy.create_wallet_description">
                  <span className={styles.bold}>Create a wallet.</span> We
                  recommend Torus Wallet, but our app supports most Web3 wallets
                  (Metamask, Coinbase Wallet, Brave, MyEtherWallet, and many
                  more).
                </Trans>
              </Text>
            </div>
            <div className={styles.numberedItem}>
              <Text t="body2" className={styles.bold}>
                <Trans id="buy.step_2">2.</Trans>
              </Text>
              <Text t="body2">
                <Trans id="buy.load_wallet_description">
                  <span className={styles.bold}>
                    Load your new wallet with MATIC tokens.
                  </span>{" "}
                  MATIC is the gas that powers the Polygon network. Every
                  transaction you execute on Polygon will require a few cents
                  worth of MATIC to pay the network fee.
                </Trans>
              </Text>
            </div>
            <div className={styles.numberedItem}>
              <Text t="body2" className={styles.bold}>
                <Trans id="buy.step_3">3.</Trans>
              </Text>
              <Text t="body2">
                <Trans id="buy.swap_for_klima_description">
                  <span className={styles.bold}>Swap for KLIMA.</span> Sushi is
                  a Decentralized Exchange where you can instantly trade some of
                  your MATIC tokens for KLIMA tokens at the lowest possible
                  price.
                </Trans>
              </Text>
            </div>
          </div>
          <div className={styles.textGroup1}>
            <Text t="h3">
              <Trans id="buy.create_wallet_item">1. Create a Wallet</Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.create_wallet_description1">
                Head to <Anchor href={urls.app}>app.klimadao.finance</Anchor>{" "}
                and click "Connect" at the top-right corner.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.create_wallet_description2">
                Choose the “Email or Social” sign-in option, which will direct
                you to log in with Torus. Torus is a technology that generates a
                secure wallet using your existing email or social login. You
                will be able to use this new Torus wallet across hundreds of
                other Web3 and DeFi apps.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.create_wallet_description3">
                When you are connected, you should see your new wallet address
                in the top left corner of the app.
              </Trans>
            </Text>
            <Text className={styles.advanced_text} t="body2">
              <Trans id="buy.create_wallet_description4">
                Advanced: if you don't want to use Torus, feel free to use any
                Polygon-compatible Web3 wallet.
              </Trans>
            </Text>
          </div>
          <div className={styles.textGroup1}>
            <Text t="h3">
              <Trans id="buy.load_wallet">
                2. Load your wallet with MATIC tokens
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.load_wallet_description1">
                Use a service like{" "}
                <Anchor href={urls.moonpayMatic}>MoonPay</Anchor> or{" "}
                <Anchor href={urls.transakMatic}>Transak</Anchor> or a
                centralized exchange like{" "}
                <Anchor href={urls.coinbase}>Coinbase</Anchor> to buy Polygon
                MATIC and send it to your newly created wallet.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.load_wallet_description2">
                <span className={styles.bold}>
                  Be sure that the MATIC tokens are sent to your new wallet
                  address!
                </span>{" "}
                You can copy the address to your clipboard by connecting to our
                app and clicking the address in the navigation menu.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.load_wallet_description3">
                <span className={styles.bold}>
                  Be sure to buy and send the MATIC through the Polygon network!
                </span>{" "}
                Some exchanges like Coinbase will ask you which network to send
                the MATIC tokens on. Make sure to always choose Polygon.
              </Trans>
            </Text>
          </div>
          <div className={styles.textGroup1}>
            <Text t="h3">
              <Trans id="buy.swap_wallet">
                3. Swap for KLIMA on{" "}
                <Anchor href={urls.sushiSwap}>Sushi.com</Anchor>
              </Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.connect_torus_sushi">
                3A. Connect Torus to Sushi.com using WalletConnect
              </Trans>
            </Text>
            <Text t="body2" className={cx(styles.advanced_text, styles.bold)}>
              <Trans id="buy.connect_advanced">
                Note: these instructions are for Torus wallet users only. Sushi
                supports a variety of different wallets.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.torus_login_description">
                In a new browser tab, go to the{" "}
                <Anchor href={urls.polygonTor}>Torus Polygon webapp</Anchor> and
                log in with your new Torus account. When you log in, you should
                see a WalletConnect widget.
              </Trans>
            </Text>
            <Image
              src={walletConnectExample}
              alt={t({
                id: "buy.wallet_connect_example",
                message: "wallet connect input example",
              })}
              objectFit="contain"
            />
            <Text t="body2">
              <Trans id="buy.connect_torus_sushi_description2">
                In a separate browser tab, visit{" "}
                <Anchor href={urls.sushiSwap}>Sushi.com</Anchor> and click
                "Connect" at the top-right corner. You will be presented with a
                few wallet options. Choose WalletConnect. After you choose
                WalletConnect you will see a QR code—click "Copy to Clipboard".
              </Trans>
            </Text>
            <Image
              src={walletConnectQRcodeExample}
              alt={t({
                id: "buy.wallet_connect_example_qr_code",
                message: "wallet connect qr code example",
              })}
              objectFit="contain"
            />
            <Text t="body2">
              <Trans id="buy.connect_torus_sushi_description3">
                Return to the Torus wallet app and paste this code into the
                WalletConnect widget. This will create a temporary connection
                between your wallet and{" "}
                <Anchor href={urls.sushiSwap}>Sushi.com</Anchor>.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.connect_torus_sushi_description4">
                When you return to the Sushi tab in your browser, you should see
                that your Torus address is now visible in the top-right corner.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.connect_torus_sushi_description5">
                Finally, use the drop-down menu on{" "}
                <Anchor href={urls.sushiSwap}>Sushi.com</Anchor> to switch to
                the Polygon network.
              </Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.swap_subtitle">3B. Swap MATIC for KLIMA</Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.swap_description1">
                After connecting your wallet and switching to the Polygon
                network, you should now be able to swap from MATIC to KLIMA.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.swap_description2">
                <span className={styles.bold}>
                  Important note: don't swap all your MATIC for KLIMA!
                </span>{" "}
                Save at least 0.5 MATIC to pay for future transaction fees.
              </Trans>
            </Text>
            <Image
              src={swapExample}
              alt={t({
                id: "buy.wallet_connect_example_qr_code",
                message: "wallet connect qr code example",
              })}
              objectFit="contain"
            />
            <Text t="body2">
              <Trans id="buy.swap_description3">
                If you are using Torus, keep the browser tab with the Torus app
                open. You will need to return to your wallet to approve and
                authorize the transactions.
              </Trans>
            </Text>
            <Text t="body2" className={styles.advanced_text}>
              <Trans id="buy.swap_description4">
                Optional: If you'd like your Sushi transactions themselves to be
                climate positive, you should enable the Sushi 'Green Fee',
                powered by KlimaDAO. This will spend 0.02 MATIC per transaction
                to purchase and retire digital carbon automatically!
              </Trans>
            </Text>
          </div>
          <div className={styles.textGroup1}>
            <Text t="h3">
              <Trans id="buy.staking_cta">Stake, earn, vote, and offset!</Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.staking_description1">
                Congrats! Now that you have some KLIMA in your wallet, we highly
                recommend <Anchor href={urls.stake}>staking</Anchor> that KLIMA
                for sKLIMA, which accrues rewards over time as the protocol
                grows.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.staking_description2">
                You can also use the app to spend KLIMA and{" "}
                <Anchor href={urls.retirements}>retire digital carbon</Anchor>{" "}
                on the blockchain.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.staking_description3">
                Finally, keep an eye out for{" "}
                <Anchor href={urls.snapshot}>ongoing votes</Anchor> and help
                guide the protocol in the right direction.
              </Trans>
            </Text>
          </div>
          <div className={styles.textGroup1}>
            <Text t="h3">
              <Trans id="buy.faq_title">FAQ</Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.question_why_matic">
                Why do I have to buy MATIC first?
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.question_why_matic_answer">
                The KLIMA token and protocol lives on the Polygon blockchain.
                MATIC is the “gas” that powers every transaction on Polygon. It
                is not possible to execute a transaction without paying the
                transaction fee. This means you will need to pay a few cents
                worth of MATIC for the following actions:
              </Trans>
            </Text>
            <ul>
              <Text t="body2">
                <li>
                  <Trans id="buy.question_why_matic_answer_bullet1">
                    Staking KLIMA for sKLIMA
                  </Trans>
                </li>
              </Text>
              <Text t="body2">
                <li>
                  <Trans id="buy.question_why_matic_answer_bullet2">
                    Swapping between different tokens
                  </Trans>
                </li>
              </Text>
              <Text t="body2">
                <li>
                  <Trans id="buy.question_why_matic_answer_bullet3">
                    Sending tokens to another wallet
                  </Trans>
                </li>
              </Text>
              <Text t="body2">
                <li>
                  <Trans id="buy.question_why_matic_answer_bullet4">
                    Using KLIMA or other tokens to offset carbon
                  </Trans>
                </li>
              </Text>
            </ul>
            <Text t="h4">
              <Trans id="buy.what_are_bonds">
                Are there other ways to get KLIMA? What are bonds?
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.bond_description1">
                Experienced crypto users can buy KLIMA directly from the
                protocol via bonds. To acquire KLIMA via bonds, you provide a
                carbon token or liquidity token and get discounted KLIMA tokens
                in return. This is the mechanism that the DAO uses to grow its
                treasury of digital carbon.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.bond_description_capacity">
                Bond capacity is limited and bonds are not always available.
              </Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.bond_question_credit_card">
                Can I buy KLIMA directly with a credit card?
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.bond_answer_cedit_card">
                Yes, some on-ramp providers like{" "}
                <Anchor href={urls.transakMatic}>Transak</Anchor> allow you to
                buy KLIMA directly with a credit card, for a fee. However, if
                your wallet doesn't have MATIC, you won't be able to transfer or
                perform other actions. For this reason, and to guarantee the
                best market rate, we recommend buying MATIC directly instead,
                and swapping your MATIC for KLIMA on Sushi.com.
              </Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.bond_question_cex">
                Why can't I find KLIMA on Coinbase or other centralized
                exchanges? Why do I have to use{" "}
                <Anchor href={urls.sushiSwap}>Sushi.com</Anchor>?
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.bond_answer_cex1">
                KLIMA is not traded on a centralized exchange like Coinbase,
                Binance, or Crypto.com as these exchanges typically charge very
                high listing fees and require financing from expensive market
                makers.
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.bond_answer_cex2">
                Instead, KLIMA tokens are traded on a "Decentralized Exchange"
                (DEX) that is powered by smart contracts and runs directly on
                the blockchain. DEXs have some major advantages. DEXs made it
                possible for the DAO to own the majority of liquidity, so it can
                maintain full autonomy and generate revenue to pay contributors.
                We chose to use Sushi's DEX technology as it already facilitates
                tens of millions of dollars in transactions per day.
              </Trans>
            </Text>
            <Text t="h4">
              <Trans id="buy.question_exchange">
                What if I want to use a different exchange, but they don't sell
                Polygon MATIC?
              </Trans>
            </Text>
            <Text t="body2">
              <Trans id="buy.answer_exchange">
                Advanced users can use the{" "}
                <Anchor href={urls.polygonBridge}>Polygon Bridge</Anchor> to
                move any asset from Ethereum to Polygon, and/or the{" "}
                <Anchor href={urls.polyscanGasStation}>Polygon Gas Swap</Anchor>{" "}
                to swap assets like USDC for MATIC.
              </Trans>
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
