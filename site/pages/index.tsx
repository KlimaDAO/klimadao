import { GetStaticProps, NextPage } from "next";
import { ethers } from "ethers";
import Image from "next/image";
import s from "styles/pages/Home.module.css";
import t from "styles/typography.module.css";
import greenWormhole from "public/green-wormhole.png";
import polygonBadge from "public/polygon-badge.png";
import klimaLogo from "public/klima-logo.png";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BlackHoleTour from "components/BlackHoleTour";
import { externalHrefs } from "lib/constants";
import { PageHead } from "components/PageHead";
import { BookmarkBorderOutlined } from "@material-ui/icons";
import { DiscordIcon } from "components/Icons/DiscordIcon";
// DAPP IMPORTS
import IERC20ABI from "../../dapp/src/abi/IERC20.json";
import SKLIMAABI from "../../dapp/src/abi/klimadao/contracts/sKlima.json";
import DistributorABI from "../../dapp/src/abi/DistributorContractv4.json";

const BCT_ADDRESS = "0x2f800db0fdb5223b3c3f354886d907a671414a7f";
const TREASURY_ADDRESS = "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7";
const DISTRIBUTOR_ADDRESS = "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB";
const SKLIMA_ADDRESS = "0xb0C22d8D350C67420f06F48936654f567C73E8C8";
// const KLIMA_BCT_POOL = "0x9803c7ae526049210a1725f7487af26fe2c24614";

const epaSource =
  "https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references";
const hectaresForestPerTonne = 1 / 200;
const passengerVehiclesPerTonne = 1 / 4.6;
const litersGasPerTonne = 1 / 0.00195748898;

/** Returns localized string */
export const trimWithPlaceholder = (
  number: number | string | undefined,
  precision: number
) => {
  if (typeof number === "undefined" || Number.isNaN(number)) {
    return "Loading... ";
  }
  return Number(number).toLocaleString(undefined, {
    maximumFractionDigits: precision,
  });
};

const getProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
};

const getTreasuryBalance = async (): Promise<number> => {
  try {
    const provider = getProvider();
    const bctContract = new ethers.Contract(
      BCT_ADDRESS,
      IERC20ABI.abi,
      provider
    );
    const treasuryBalance = await bctContract.balanceOf(TREASURY_ADDRESS);
    const formatted = Math.floor(
      Number(ethers.utils.formatEther(treasuryBalance))
    );
    return formatted;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

const getStakingAPY = async (): Promise<number> => {
  const provider = getProvider();
  const distributorContract = new ethers.Contract(
    DISTRIBUTOR_ADDRESS,
    DistributorABI.abi,
    provider
  );
  const sohmMainContract = new ethers.Contract(
    SKLIMA_ADDRESS,
    SKLIMAABI.abi,
    provider
  );
  const circSupply = await sohmMainContract.circulatingSupply();
  const stakingReward = await distributorContract.nextRewardAt(5000);

  const stakingRebase = stakingReward / circSupply;
  const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3);
  return Math.floor(stakingAPY * 100);
};

interface Props {
  treasuryBalance: number;
  stakingAPY: number;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [treasuryBalance, stakingAPY] = await Promise.all([
    getTreasuryBalance(),
    getStakingAPY(),
  ]);
  return {
    props: {
      treasuryBalance,
      stakingAPY,
    },
    revalidate: 240,
  };
};

const Home: NextPage<Props> = (props) => {
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
    <div id="HomeContainer" className={s.container}>
      <PageHead
        title="Klima DAO"
        mediaTitle="KlimaDAO | Algorithmic climate protocol"
        metaDescription="Stake and earn interest with the world's first carbon-backed digital asset."
      />
      <div className={s.heroBackgroundContainer}>
        <div className={s.heroBgImgContainer}>
          <Image
            src={greenWormhole}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={s.heroGradient} />
        <div className={s.heroSection}>
          <div className={s.logoContainer}>
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
          <nav className={s.stack}>
            <a className={s.iconButton} href={externalHrefs.discordInvite}>
              <DiscordIcon className={s.discordIcon} />
              community
            </a>
            <a className={s.iconButton} href={externalHrefs.gitbook}>
              <DescriptionOutlinedIcon />
              docs
            </a>
            <a className={s.iconButton} href={externalHrefs.blog}>
              <BookmarkBorderOutlined />
              blog
            </a>
            <a className={s.iconButton} href={externalHrefs.app}>
              <ExitToAppOutlinedIcon />
              app
            </a>
          </nav>
          <div className={s.dataCardsContainer}>
            <div className={s.chartCard}>
              <div>
                <h2 className={t.overline}>CARBON IN TREASURY</h2>
                <p className={s.treasuryBalance}>
                  <span className={s.treasuryBalance_value}>
                    {formattedTreasuryBalance}
                  </span>
                  <span className={t.caption}>TONNES CO2</span>
                </p>
              </div>
              <div>
                <p className={t.overline}>Equivalent to</p>
                <p className={t.body2}>
                  <span className={s.emissionsValue}>{hectaresForest}</span>{" "}
                  hectares of forest
                </p>
                <p className={t.body2}>
                  <span className={s.emissionsValue}>{passengerVehicles}</span>{" "}
                  passenger vehicles (annual)
                </p>
                <p className={t.body2}>
                  <span className={s.emissionsValue}>{litersGas}</span> liters
                  of gasoline
                </p>
              </div>
            </div>
            <div className={s.dataCardColumn}>
              <div className={s.dataCard}>
                <h2 className={t.overline}>APY</h2>
                <p className={t.subtitle2} style={{ textAlign: "center" }}>
                  {formattedAPY}
                </p>
              </div>
              <div className={s.dataCard}>
                <h2 className={t.overline}>Price (USD)</h2>
                <p className={t.caption} style={{ textAlign: "center" }}>
                  {"<COMING SOON>"}
                </p>
              </div>
            </div>
          </div>
          <div className={s.scrollArrowNudge}>
            <ChevronLeftIcon />
          </div>
        </div>
      </div>

      <div className={s.dividerSection}>
        <div className={s.centeredCard}>
          <h2 className={s.centeredCard_title}>
            A DAO, a protocol,{" "}
            <span className={s.secondaryAccent}>an ecosystem</span>
          </h2>
          <p className={s.centeredCard_text}>
            KlimaDAO’s goal is to accelerate the price appreciation of carbon
            assets. A high price for carbon forces companies and economies to
            adapt more quickly to the realities of climate change, and makes
            low-carbon technologies and carbon-removal projects more profitable.
          </p>
          <p className={s.centeredCard_text}>
            Through the KLIMA token, we will maximize value creation for our
            community and create a virtuous cycle of growth. Eventually, the
            KLIMA token (each backed by real, verified carbon assets) will
            function as a truly sustainable asset and medium-of-exchange, with
            real planetary value.
          </p>
        </div>
      </div>

      <div className={s.dividerSection}>
        <h2 className={s.dividerSectionText}>
          A black hole for <span className={s.secondaryAccent}>carbon</span>
        </h2>
      </div>

      <BlackHoleTour />

      <div className={s.poweredBySection}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://polygon.technology"
        >
          <Image className={s.polygonImage} src={polygonBadge} />
        </a>
      </div>

      <footer className={s.footer}>
        <div className={s.footer_bgImageContainer}>
          <Image
            src={greenWormhole}
            alt=""
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
        <div className={s.footer_content}>
          <div className={s.footer_logo}>
            <Image
              src={klimaLogo}
              alt=""
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
            />
          </div>
          <nav className={s.footer_content_nav}>
            <a href={externalHrefs.app}>app</a>
            <a href={externalHrefs.gitbook}>docs</a>
            <a href={externalHrefs.blog}>blog</a>
            <a href={externalHrefs.emailSignUp}>newsletter</a>
            <a href={externalHrefs.discordInvite}>community</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;
