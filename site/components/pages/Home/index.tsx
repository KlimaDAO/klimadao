import { NextPage } from "next";
import Image from "next/image";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import BlackHoleTour from "components/pages/Home/BlackHoleTour";
import { DiscordIcon } from "components/Icons/DiscordIcon";
import greenWormhole from "public/green-wormhole.jpg";
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
          <header>
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
          </header>
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
          <div style={{ display: "flex", gap: "2rem" }}>
            <a
              href="https://twitter.com/KlimaDAO"
              aria-label="Twitter link"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                className={styles.socialMediaIcons}
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
            <a
              href="https://discord.com/invite/klimadao"
              aria-label="Discord link"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                className={styles.socialMediaIcons}
                viewBox="0 0 16 16"
              >
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg>
            </a>
            <a
              href="https://github.com/KlimaDAO"
              aria-label="Github link"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                className={styles.socialMediaIcons}
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a
              href="https://klimadao.medium.com/"
              aria-label="Medium link"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                className={styles.socialMediaIcons}
                viewBox="0 0 16 16"
              >
                <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
              </svg>
            </a>
          </div>
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
            <a href={urls.discordInvite}>community</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
