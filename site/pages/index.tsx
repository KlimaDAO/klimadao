import Image from "next/image";
import s from "styles/pages/Home.module.css";
import t from "styles/typography.module.css";
import greenWormhole from "public/green-wormhole.png";
import klimaLogo from "public/klima-logo.png";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BlackHoleTour from "components/BlackHoleTour";
import { externalHrefs } from "lib/constants";
import { PageHead } from "components/PageHead";
import { BookmarkBorderOutlined } from "@material-ui/icons";
import { DiscordIcon } from "components/Icons/DiscordIcon";

const Home = () => {
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
            A carbon-backed digital currency and algorithmic climate protocol.
          </p>
          <nav className={s.stack}>
            <a className={s.iconButton} href={externalHrefs.emailSignUp}>
              <MailOutlineOutlinedIcon />
              sign up for updates
            </a>
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
              <h2 className={t.caption}>CO2 Consumed</h2>
              <p className={t.subtitle2}> {"<COMING SOON>"}</p>
              <div className={s.chartContainer}>
                <div className={s.chartColumn} style={{ height: "10%" }} />
                <div className={s.chartColumn} style={{ height: "20%" }} />
                <div className={s.chartColumn} style={{ height: "30%" }} />
                <div className={s.chartColumn} style={{ height: "50%" }} />
                <div className={s.chartColumn} style={{ height: "100%" }} />
              </div>
            </div>
            <div className={s.dataCardColumn}>
              <div className={s.dataCard}>
                <h2 className={t.caption}>APY</h2>
                <p className={t.subtitle2} style={{ textAlign: "center" }}>
                  {"<COMING SOON>"}
                </p>
              </div>
              <div className={s.dataCard}>
                <h2 className={t.caption}>Price (USD)</h2>
                <p className={t.subtitle2} style={{ textAlign: "center" }}>
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
        <h2 className={s.dividerSectionText}>
          A black hole for <span className={s.secondaryAccent}>carbon</span>
        </h2>
      </div>

      <BlackHoleTour />

      <div className={s.dividerSection}>
        <div className={s.centeredCard}>
          <h2 className={s.centeredCard_title}>
            A DAO, a protocol,{" "}
            <span className={s.secondaryAccent}>an ecosystem</span>
          </h2>
          <p className={s.centeredCard_text}>
            Klima DAO’s goal is to accelerate the price appreciation of carbon
            assets. A high price for carbon forces companies and economies to
            adapt more quickly to the realities of climate change, and makes
            low-carbon technologies and carbon-removal projects more profitable.
          </p>
          <p className={s.centeredCard_text}>
            Through the KLIMA token, we will maximise value creation for our
            community and create a virtuous cycle of growth. Eventually, the
            KLIMA token (each backed by real, verified carbon assets) will
            function as a truly sustainable asset and medium-of-exchange, with
            real planetary value.
          </p>
        </div>
      </div>

      <div className={s.dividerSection}>
        <h2 className={s.dividerSectionText}>
          Launching <span className={s.secondaryAccent}>Fall 2021</span>
        </h2>
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
