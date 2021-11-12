import { NextPage } from "next";
import Image from "next/image";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import BlackHoleTour from "components/pages/Home/BlackHoleTour";
import { DiscordIcon } from "components/Icons/DiscordIcon";
import greenWormhole from "public/green-wormhole.png";
import polygonBadge from "public/polygon-badge.png";
import klimaLogo from "public/klima-logo.png";

import { urls } from "@klimadao/lib/constants";
import t from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
export interface Props {
  treasuryBalance: number;
  stakingAPY: number;
  price: number;
}

const hectaresForestPerTonne = 1 / 200;
const passengerVehiclesPerTonne = 1 / 4.6;
const litersGasPerTonne = 1 / 0.00195748898;

export const Home: NextPage<Props> = (props) => {
  const hectaresForest = Math.floor(
    props.treasuryBalance * hectaresForestPerTonne
  ).toLocaleString();
  const passengerVehicles = Math.floor(
    props.treasuryBalance * passengerVehiclesPerTonne
  ).toLocaleString();
  const litersGas = Math.floor(
    props.treasuryBalance * litersGasPerTonne
  ).toLocaleString();
  const formattedTreasuryBalance = props.treasuryBalance.toLocaleString();
  const formattedAPY = props.stakingAPY.toLocaleString() + "%";
  return (
    <div id="HomeContainer" className={styles.container}>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />
      <div className={styles.heroBackgroundContainer}>
        <div className={styles.heroBgImgContainer}>
          <Image
            src={greenWormhole}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles.heroGradient} />
        <div className={styles.heroSection}>
          <div className={styles.logoContainer}>
            <Image
              src={klimaLogo}
              alt=""
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
          <p className={t.h6}>
            Drive climate action and earn rewards with a carbon-backed,
            algorithmic digital currency.
          </p>
          <nav className={styles.stack}>
            <a className={styles.iconButton} href={urls.discordInvite}>
              <DiscordIcon className={styles.discordIcon} />
              community
            </a>
            <a className={styles.iconButton} href={urls.gitbook}>
              <DescriptionOutlinedIcon />
              docs
            </a>
            <a className={styles.iconButton} href={urls.blog}>
              <BookmarkBorderOutlinedIcon />
              blog
            </a>
            <a className={styles.iconButton} href={urls.app}>
              <ExitToAppOutlinedIcon />
              app
            </a>
          </nav>
          <div className={styles.dataCardsContainer}>
            <div className={styles.chartCard}>
              <div>
                <h2 className={t.overline}>🌳 CARBON IN TREASURY</h2>
                <p className={styles.treasuryBalance}>
                  <span className={styles.treasuryBalance_value}>
                    {formattedTreasuryBalance}
                  </span>
                  <span className={t.caption}>TONNES CO2</span>
                </p>
              </div>
              <div>
                <p className={t.overline}>Equivalent to</p>
                <p className={t.body2}>
                  <span className={styles.emissionsValue}>
                    {hectaresForest}
                  </span>{" "}
                  hectares of forest
                </p>
                <p className={t.body2}>
                  <span className={styles.emissionsValue}>
                    {passengerVehicles}
                  </span>{" "}
                  passenger vehicles (annual)
                </p>
                <p className={t.body2}>
                  <span className={styles.emissionsValue}>{litersGas}</span>{" "}
                  liters of gasoline
                </p>
                <div style={{ width: "100%", paddingBottom: "0.4rem" }} />
                <a
                  className={t.caption}
                  href={urls.epaSource}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source
                </a>
              </div>
            </div>
            <div className={styles.dataCardColumn}>
              <div className={styles.dataCard}>
                <h2 className={t.overline}>CURRENT APY</h2>
                <p className={styles.dataCard_priceTag}>{formattedAPY}</p>
              </div>
              <div className={styles.dataCard}>
                <h2 className={t.overline}>Price (USDC)</h2>
                <p className={styles.dataCard_priceTag}>
                  ${props.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.scrollArrowNudge}>
            <ChevronLeftIcon />
          </div>
        </div>
      </div>

      <div className={styles.dividerSection}>
        <div className={styles.centeredCard}>
          <h2 className={styles.centeredCard_title}>
            A DAO, a protocol,{" "}
            <span className={styles.secondaryAccent}>an ecosystem</span>
          </h2>
          <p className={styles.centeredCard_text}>
            KlimaDAO’s goal is to accelerate the price appreciation of carbon
            assets. A high price for carbon forces companies and economies to
            adapt more quickly to the realities of climate change, and makes
            low-carbon technologies and carbon-removal projects more profitable.
          </p>
          <p className={styles.centeredCard_text}>
            Through the KLIMA token, we will maximize value creation for our
            community and create a virtuous cycle of growth. Eventually, the
            KLIMA token (each backed by real, verified carbon assets) will
            function as a truly sustainable asset and medium-of-exchange, with
            real planetary value.
          </p>
        </div>
      </div>

      <div className={styles.dividerSection}>
        <h2 className={styles.dividerSectionText}>
          A black hole for{" "}
          <span className={styles.secondaryAccent}>carbon</span>
        </h2>
      </div>

      <BlackHoleTour />

      <div className={styles.poweredBySection}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://polygon.technology"
        >
          <Image
            className={styles.polygonImage}
            src={polygonBadge}
            alt="Powered by Polygon"
          />
        </a>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footer_bgImageContainer}>
          <Image
            src={greenWormhole}
            alt=""
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
        <div className={styles.footer_content}>
          <div className={styles.footer_logo}>
            <Image
              src={klimaLogo}
              alt=""
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
            />
          </div>
          <nav className={styles.footer_content_nav}>
            <a href={urls.app}>app</a>
            <a href={urls.gitbook}>docs</a>
            <a href={urls.blog}>blog</a>
            <a href={urls.emailSignUp}>newsletter</a>
            <a href={urls.discordInvite}>community</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
