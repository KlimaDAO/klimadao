import { GetStaticProps, NextPage } from "next";
import { ethers, BigNumber } from "ethers";
import Image from "next/image";
import s from "styles/pages/Home.module.css";
import t from "styles/typography.module.css";
import greenWormhole from "public/green-wormhole.png";
import polygonBadge from "public/polygon-badge.png";
import klimaLogo from "public/klima-logo.png";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BlackHoleTour from "components/BlackHoleTour";
import { externalHrefs } from "lib/constants";
import { PageHead } from "components/PageHead";
import { DiscordIcon } from "components/Icons/DiscordIcon";

// DAPP IMPORTS
import IERC20ABI from "../lib/abi/IERC20.json";
import SKLIMAABI from "../lib/abi/sKlima.json";
import DistributorABI from "../lib/abi/DistributorContractv4.json";
import PairContractABI from "../lib/abi/PairContract.json";

// const KLIMA_ADDRESS = "0x4e78011ce80ee02d2c3e649fb657e45898257815";
const BCT_ADDRESS = "0x2f800db0fdb5223b3c3f354886d907a671414a7f";
const TREASURY_ADDRESS = "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7";
const DISTRIBUTOR_ADDRESS = "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB";
const SKLIMA_ADDRESS = "0xb0C22d8D350C67420f06F48936654f567C73E8C8";
const BCT_USDC_POOL_ADDRESS = "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64";
const KLIMA_BCT_POOL_ADDRESS = "0x9803c7ae526049210a1725f7487af26fe2c24614";

const epaSource =
  "https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references";
const hectaresForestPerTonne = 1 / 200;
const passengerVehiclesPerTonne = 1 / 4.6;
const litersGasPerTonne = 1 / 0.00195748898;

// ether e.g. Math.pow(10, 18);
const getInteger = (num: BigNumber, unit: string | number = "ether") => {
  const str = ethers.utils.formatUnits(num, unit);
  return Math.floor(Number(str));
};

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

const getOwnedBCTFromSLP = async (
  slpAddress: typeof BCT_USDC_POOL_ADDRESS | typeof KLIMA_BCT_POOL_ADDRESS
) => {
  const contract = new ethers.Contract(
    slpAddress,
    PairContractABI.abi,
    getProvider()
  );
  const [token0, token1, [reserve0, reserve1], treasurySLP, totalSLP] =
    await Promise.all([
      contract.token0() as string,
      contract.token1() as string,
      contract.getReserves(),
      contract.balanceOf(TREASURY_ADDRESS),
      contract.totalSupply(),
    ]);
  let reserve;
  if (token0.toLowerCase() === BCT_ADDRESS.toLowerCase()) {
    reserve = reserve0;
  } else if (token1.toLowerCase() === BCT_ADDRESS.toLowerCase()) {
    reserve = reserve1;
  } else {
    throw new Error("No BCT reserve found");
  }
  const bctSupply = getInteger(reserve);
  const ownership = treasurySLP / totalSLP; // decimal (percent) e.g. 0.95999
  const bctOwned = Math.floor(bctSupply * ownership);
  return bctOwned;
};

// klimaBctPrice = bct / klima
// bctUsdcPrice = usdc / bct
const getUsdcPrice = async (): Promise<number> => {
  const klimaBctContract = new ethers.Contract(
    KLIMA_BCT_POOL_ADDRESS,
    PairContractABI.abi,
    getProvider()
  );
  const bctUsdcContract = new ethers.Contract(
    BCT_USDC_POOL_ADDRESS,
    PairContractABI.abi,
    getProvider()
  );
  const [bctReserve, klimaReserve] = await klimaBctContract.getReserves();
  const klimaBctPrice =
    getInteger(bctReserve) / getInteger(klimaReserve, "gwei");
  const [usdcReserve, bctReserve2] = await bctUsdcContract.getReserves();
  const bctUsdcPrice = getInteger(usdcReserve, 6) / getInteger(bctReserve2);
  const price = Math.floor(klimaBctPrice * bctUsdcPrice);
  return price;
};

/**
 * NakedBCT + (klimaBctReserve * klimaBctTreasuryPercent) + (bctUsdcReserve * bctUsdcTreasuryPercent)
 */
const getTreasuryBalance = async (): Promise<number> => {
  try {
    const bctContract = new ethers.Contract(
      BCT_ADDRESS,
      IERC20ABI.abi,
      getProvider()
    );

    const nakedBCT = getInteger(await bctContract.balanceOf(TREASURY_ADDRESS));
    const bctUSDC = await getOwnedBCTFromSLP(BCT_USDC_POOL_ADDRESS);
    const bctKLIMA = await getOwnedBCTFromSLP(KLIMA_BCT_POOL_ADDRESS);
    const sum = nakedBCT + bctUSDC + bctKLIMA;
    return sum;
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
  price: number;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [treasuryBalance, stakingAPY, price] = await Promise.all([
    getTreasuryBalance(),
    getStakingAPY(),
    getUsdcPrice(),
  ]);
  return {
    props: {
      treasuryBalance,
      stakingAPY,
      price,
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
              <BookmarkBorderOutlinedIcon />
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
                <h2 className={t.overline}>🌳 CARBON IN TREASURY</h2>
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
                <div style={{ width: "100%", paddingBottom: "0.4rem" }} />
                <a
                  className={t.caption}
                  href={epaSource}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source
                </a>
              </div>
            </div>
            <div className={s.dataCardColumn}>
              <div className={s.dataCard}>
                <h2 className={t.overline}>CURRENT APY</h2>
                <p className={s.dataCard_priceTag}>{formattedAPY}</p>
              </div>
              <div className={s.dataCard}>
                <h2 className={t.overline}>Price (USDC)</h2>
                <p className={s.dataCard_priceTag}>
                  ${props.price.toLocaleString()}
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
          <Image
            className={s.polygonImage}
            src={polygonBadge}
            alt="Powered by Polygon"
          />
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
