import { cx } from "@emotion/css";
import {
  Anchor as A,
  GridContainer,
  LinkedInIcon,
  LogoWithClaim,
  OffsetraLogo,
  SCBLogo,
  Section,
  TwitterIcon,
  VlinderLogo,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { getImageSizes } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Category } from "components/Category";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Navigation } from "components/shared/Navigation";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { useResponsive } from "hooks/useResponsive";
import { urls as carbonmarkUrls } from "lib/constants";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as styles from "./styles";

export interface Props {
  projects?: Project[];
}

export const Home: NextPage<Props> = (props) => {
  const { locale } = useRouter();
  const { isMobile } = useResponsive();
  return (
    <GridContainer className={styles.global}>
      <PageHead
        title={t`Carbonmark | The Universal Carbon Marketplace`}
        mediaTitle={t`Carbonmark | The Universal Carbon Marketplace`}
        metaDescription={t`The largest selection of digital carbon credits worldwide. Buy, sell, and retire digital carbon from any project instantly with zero-commission trading.`}
      />
      <Section className={styles.hero}>
        <Image
          fill
          alt="Carbonmark Hero"
          src="/hero_background.jpg"
          className="hero_img"
        />
        <Navigation transparent activePage="Home" />
        <div className={cx(["stack", styles.heroBackground])}>
          <Text t="h1" as="h1">
            The Universal Carbon Marketplace
          </Text>
          <Text t="body1" as="h2">
            The largest selection of digital carbon credits worldwide. Buy,
            sell, and retire digital carbon from any project instantly with
            zero-commission trading.
          </Text>
          <ButtonPrimary
            href="/projects"
            label="Get Started"
            className={styles.browseButton}
            renderLink={(linkProps) => <Link {...linkProps} />}
          />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.partnersSection)}>
        <Image
          fill
          data-desktop-only
          alt="Partners Background"
          src="/partners-bg.jpeg"
        />
        <Image
          fill
          data-mobile-only
          alt="Partners Background"
          src="/partners-bg-sm.jpeg"
        />
        <div className="stack">
          <div className="">
            <Text t="h2" as="h2">
              Our Partners
            </Text>
            <div className="partners">
              <div>
                <Image
                  src="/circle.png"
                  width="194"
                  height="50"
                  alt="Circle Logo"
                />
                <Image src="/c3.png" width="57" height="58" alt="C3 Logo" />
                <VlinderLogo height="50" />
              </div>
              <div>
                <SCBLogo height="50" />
                <OffsetraLogo height="50" />
              </div>
            </div>
          </div>
          <Text t="h2" as="h2">
            Over 20 million verified digital carbon credits from hundreds of
            projects, with over $4 billion traded to date
          </Text>
          <div className={cx(styles.list, "partners-list")}>
            <div className="card-wrapper">
              {props.projects?.map((project, idx) => (
                <Link
                  passHref
                  key={`${project.key}-${idx}`}
                  href={createProjectLink(project)}
                >
                  <div className={cx(styles.card, "card")}>
                    <div className={styles.cardImage}>
                      <ProjectImage
                        category={getCategoryFromProject(project)}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <Text t="body3" as="h4">
                        {project?.price &&
                          formatBigToPrice(project.price, locale)}
                      </Text>
                      <Text as="h5">{project?.name}</Text>
                      <Text t="body1">{project?.description}</Text>
                      <div className={styles.tags}>
                        <Category category={getCategoryFromProject(project)} />
                        <Vintage vintage={project.vintage} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <ButtonPrimary
            href="/projects"
            label="Browse Projects"
            className={styles.browseButton}
            renderLink={(linkProps) => <Link {...linkProps} />}
          />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.offsetCarbonSection)}>
        <Image fill alt="Offset Carbon" src="/offset-carbon-bg.jpeg" />
        <div className="stack">
          <div>
            <Text t="h2" as="h2">
              Buy or retire carbon
            </Text>
            <Text t="body1" className="description">
              Maximize your climate impact.
            </Text>
            <Text t="body1" className="description">
              Carbonmark doesn't charge an additional transaction fee and offers
              best-in-the-market pricing. Explore hundreds of verified carbon
              projects.
            </Text>
            <Text t="body1" className="description">
              Retire now, or acquire carbon to retire later - you decide what to
              do when you take ownership of your carbon assets.
            </Text>
            <ButtonPrimary
              href="/projects"
              label="Browse Projects"
              className={styles.browseButton}
              renderLink={(linkProps) => (
                <Link data-desktop-only {...linkProps} />
              )}
            />
          </div>
          <div>
            <div className={styles.list}>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 1
                    </Text>
                    <TravelExploreOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    Choose a project and quantity
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 2
                    </Text>
                    <PaymentOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    Create a profile and get connected
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 3
                    </Text>
                    <ParkOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    Retire instantly, or purchase and hold digital carbon
                  </Text>
                </div>
              </div>
            </div>
            <ButtonPrimary
              href="/projects"
              label="Browse Projects"
              className={cx(styles.browseButton, "mobile-only")}
              renderLink={(linkProps) => (
                <Link data-mobile-only {...linkProps} />
              )}
            />
          </div>
        </div>
      </Section>
      <Section className={cx(styles.section, styles.sellCarbonSection)}>
        <Image fill alt="Sell Carbon" src="/sell-carbon-bg.jpeg" />
        <div className="stack">
          <div>
            <div className={styles.list}>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 1
                    </Text>
                    <ControlPointDuplicateOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    Digitize your carbon by using a supported bridge
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 2
                    </Text>
                    <PersonOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    Create a seller profile
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      Step 3
                    </Text>
                    <MouseOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    List your projects for sale in just a few clicks
                  </Text>
                </div>
              </div>
            </div>
            <ButtonPrimary
              href="/profile"
              label="Create Profile"
              className={styles.browseButton}
              renderLink={(linkProps) => (
                <Link data-mobile-only {...linkProps} />
              )}
            />
          </div>
          <div>
            <Text t="h2" as="h2">
              Sell carbon
            </Text>
            <Text t="body1" className="description">
              Create your own carbon storefront. Sell directly to organizations
              and individuals alike.
            </Text>
            <Text t="body1" className="description">
              Unprecedented transparency across the digital carbon market.
            </Text>
            <ButtonPrimary
              href="/profile"
              label="Create Profile"
              className={styles.browseButton}
              renderLink={(linkProps) => (
                <Link data-desktop-only {...linkProps} />
              )}
            />
          </div>
        </div>
      </Section>
      <Section className={styles.sectionImage}>
        <div className="carbon-traders">
          <div className="pattern-bg">
            <Image fill alt="Pattern" src="/carbon-traders-bg.jpeg" />
            <div>
              <Text t="h2" as="h2">
                For carbon traders
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Compare prices across all sellers and trading pools
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Real-time price and transaction data powered by the blockchain
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  0% listing fee
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  All assets sourced from major registries
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Instant settlement of all trades
                </li>
              </ul>
            </div>
          </div>
          <div className="image-bg">
            <Image fill alt="Pattern" src="/plant-pots.jpeg" />
          </div>
        </div>
      </Section>
      <Section className={styles.sectionImage}>
        <div className="project-devs">
          <div className="image-bg">
            <Image fill alt="Pattern" src="/plant.jpeg" />
          </div>
          <div className="pattern-bg">
            <Image fill alt="Pattern" src="/project-devs-bg.jpeg" />
            <div>
              <Text t="h2" as="h2">
                For project developers
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Get paid immediately: transactions are resolved in seconds
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  List and sell for free
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  No barriers to entry for verified carbon projects
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Sell your digital carbon directly to buyers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <Section className={cx(styles.section, styles.learnMoreSection)}>
        <Image fill alt="Learn More" src="/learn-more-bg.jpeg" />
        <div className="stack">
          <Text t="h2" as="h2">
            Learn more
          </Text>
          <div
            className={cx(styles.list, { [styles.learnMoreList]: isMobile })}
          >
            <div className="card-wrapper">
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="Article"
                    src="/article-bg.png"
                    sizes={getImageSizes({ large: "320px" })}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="h5" as="h5">
                    Introducing Carbonmark
                  </Text>
                  <Text t="body1">
                    Zero-fee carbon credit trading - instantaneous, transparent,
                    and always available. Learn more about what Carbonmark can
                    do for you as a carbon credit trader.
                  </Text>
                  <A href={carbonmarkUrls.intro}>
                    <Text t="h5" as="h6" className="readMore">
                      Read more
                    </Text>
                  </A>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="FAQs"
                    src="/faq-bg.png"
                    sizes={getImageSizes({ large: "320px" })}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="h5" as="h5">
                    FAQs
                  </Text>
                  <Text t="body1">
                    What is Carbonmark? Answers to common questions about the
                    Digital Carbon Market interface that easily connects buyers
                    and sellers of verified carbon credits.
                  </Text>
                  <A href="/blog/carbonmark-faqs">
                    <Text t="h5" as="h6" className="readMore">
                      Read more
                    </Text>
                  </A>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="Role"
                    src="/role-bg.png"
                    sizes={getImageSizes({ large: "320px" })}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="h5" as="h5">
                    Carbonmark's role
                  </Text>
                  <Text t="body1">
                    Learn more about Carbonmark's role in improving the Digital
                    Carbon Market - and the Voluntary Carbon Market as a whole.
                  </Text>
                  <A href="/blog/carbonmarks-role-in-the-digital-carbon-market">
                    <Text t="h5" as="h6" className="readMore">
                      Read more
                    </Text>
                  </A>
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary
            href="/resources"
            label="Resources"
            className={styles.browseButton}
            renderLink={(linkProps) => <Link {...linkProps} />}
          />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.poweredBySection)}>
        <Image fill alt="Powered By" src="/powered-by-bg.jpeg" />
        <div className="stack">
          <Text t="h2" as="h2">
            Powered by
            <A href={urls.home}>
              <LogoWithClaim />
            </A>
          </Text>
          <Text t="body1" className="description">
            KlimaDAO provides the transparent, neutral, and public
            infrastructure required to accelerate climate finance on a global
            scale.
          </Text>
        </div>
      </Section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <nav className={styles.footerNav}>
            <Link href="/blog/privacy-policy">
              <Trans>Privacy policy</Trans>
            </Link>
            <Link href="/blog/terms-of-use">
              <Trans>Terms of use</Trans>
            </Link>
            <Link href="https://share-eu1.hsforms.com/1_VneTUObQZmJm4kNcRuEoQg3axk">
              <Trans>Contact</Trans>
            </Link>
            <Link href={carbonmarkUrls.help}>
              <Trans>Help</Trans>
            </Link>
            <Link href="/resources">
              <Trans>Resources</Trans>
            </Link>
            <A href={urls.home}>
              <Trans>KlimaDAO</Trans>
            </A>
          </nav>
          <nav className={styles.footerIcons}>
            <A href={urls.twitterCarbonmark}>
              <TwitterIcon />
            </A>
            <A href={urls.linkedInCarbonmark}>
              <LinkedInIcon />
            </A>
          </nav>
        </div>
      </footer>
    </GridContainer>
  );
};
