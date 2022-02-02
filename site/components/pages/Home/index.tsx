import { NextPage } from "next";
import Image from "next/image";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import BlackHoleTour from "components/pages/Home/BlackHoleTour";
import { DiscordIcon } from "components/Icons/DiscordIcon";
import { GithubIcon } from "@klimadao/lib/components";
import { TwitterIcon } from "@klimadao/lib/components";
import greenWormhole from "public/green-wormhole.jpg";
import polygonBadge from "public/polygon-badge.png";
import klimaLogo from "public/klima-logo.png";

import { urls } from "@klimadao/lib/constants";

import T from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";

import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";

import { Trans } from "@lingui/macro";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

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
          <header className={styles.header}>
            <div className={styles.header_leftCol}>
              <div className={styles.logoContainer}>
                <Image
                  src={klimaLogo}
                  alt=""
                  layout="responsive"
                  objectFit="contain"
                  priority
                />
              </div>
              <p className={T.h6}>
                <Trans>
                  Drive climate action and earn rewards with a carbon-backed,
                  algorithmic digital currency.
                </Trans>
              </p>
            </div>
            {!IS_PRODUCTION && <ChangeLanguageButton />}
          </header>
          <nav className={styles.stack}>
            <a className={styles.iconButton} href={urls.discordInvite}>
              <DiscordIcon className={styles.discordIcon} />
              <Trans id="menu.community">community</Trans>
            </a>
            <a className={styles.iconButton} href={urls.gitbook}>
              <DescriptionOutlinedIcon />
              <Trans id="menu.docs">docs</Trans>
            </a>
            <a className={styles.iconButton} href={urls.blog}>
              <BookmarkBorderOutlinedIcon />
              <Trans id="menu.blog">blog</Trans>
            </a>
            <a className={styles.iconButton} href={urls.app}>
              <ExitToAppOutlinedIcon />
              <Trans id="menu.app">app</Trans>
            </a>
            <div className={styles.lowerStack}>
              <a
                className={styles.lowerIconButton}
                href={urls.twitter}
                target="_blank"
                rel="noreferrer noopener"
              >
                <TwitterIcon />
              </a>
              <a
                className={styles.lowerIconButton}
                href={urls.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubIcon />
              </a>
            </div>
          </nav>
          <div className={styles.dataCardsContainer}>
            <div className={styles.chartCard}>
              <div>
                <h2 className={T.overline}>
                  🌳{" "}
                  <Trans id="info.carbon_in_treasury">CARBON IN TREASURY</Trans>
                </h2>
                <p className={styles.treasuryBalance}>
                  <span className={styles.treasuryBalance_value}>
                    {formattedTreasuryBalance}
                  </span>
                  <span className={T.caption}>
                    <Trans id="info.CO2_tons">TONNES CO2</Trans>
                  </span>
                </p>
              </div>
              <div>
                <p className={T.overline}>
                  <Trans id="info.equivalent_to">Equivalent to</Trans>
                </p>
                <p className={T.body2}>
                  <span className={styles.emissionsValue}>
                    {hectaresForest}
                  </span>{" "}
                  <Trans id="info.equivalent_to.hectars_of_forest">
                    hectares of forest
                  </Trans>
                </p>
                <p className={T.body2}>
                  <span className={styles.emissionsValue}>
                    {passengerVehicles}
                  </span>{" "}
                  <Trans id="info.equivalent_to.passenger_vehicles">
                    passenger vehicles (annual)
                  </Trans>
                </p>
                <p className={T.body2}>
                  <span className={styles.emissionsValue}>{litersGas}</span>{" "}
                  <Trans id="info.equivalent_to.liters_of_gasoline">
                    liters of gasoline
                  </Trans>
                </p>
                <div style={{ width: "100%", paddingBottom: "0.4rem" }} />
                <a
                  className={T.caption}
                  href={urls.epaSource}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Trans id="info.equivalent_to.source">source</Trans>
                </a>
              </div>
            </div>
            <div className={styles.dataCardColumn}>
              <div className={styles.dataCard}>
                <h2 className={T.overline}>
                  <Trans id="info.current_apy">CURRENT APY</Trans>
                </h2>
                <p className={styles.dataCard_priceTag}>{formattedAPY}</p>
              </div>
              <div className={styles.dataCard}>
                <h2 className={T.overline}>
                  <Trans id="info.price">Price (USDC)</Trans>
                </h2>
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
            <Trans id="card.dao.title">A DAO, a protocol,</Trans>{" "}
            <span className={styles.secondaryAccent}>an ecosystem</span>
          </h2>
          <p className={styles.centeredCard_text}>
            <Trans id="card.dao.goal">
              KlimaDAO’s goal is to accelerate the price appreciation of carbon
              assets. A high price for carbon forces companies and economies to
              adapt more quickly to the realities of climate change, and makes
              low-carbon technologies and carbon-removal projects more
              profitable.
            </Trans>
          </p>
          <p className={styles.centeredCard_text}>
            <Trans id="card.dao.value">
              Through the KLIMA token, we will maximize value creation for our
              community and create a virtuous cycle of growth. Eventually, the
              KLIMA token (each backed by real, verified carbon assets) will
              function as a truly sustainable asset and medium-of-exchange, with
              real planetary value.
            </Trans>
          </p>
        </div>
      </div>

      <div className={styles.dividerSection}>
        <h2 className={styles.dividerSectionText}>
          A blackhole for <span className={styles.secondaryAccent}>carbon</span>
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
            <a href={urls.app}>
              <Trans id="footer.app">app</Trans>
            </a>
            <a href={urls.gitbook}>
              <Trans id="footer.docs">docs</Trans>
            </a>
            <a href={urls.blog}>
              <Trans id="footer.blog">blog</Trans>
            </a>
            <a href={urls.discordInvite}>
              <Trans id="footer.community">community</Trans>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
