import { cx } from "@emotion/css";
import {
  Anchor as A,
  GridContainer,
  LogoWithClaim,
  OffsetraLogo,
  SCBLogo,
  Section,
  VlinderLogo,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { getImageSizes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Category } from "components/Category";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { Navigation } from "components/shared/Navigation";
import { useResponsive } from "hooks/useResponsive";
import { urls as carbonmarkUrls } from "lib/constants";
import { createProjectLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import { getFeatureFlag } from "lib/getFeatureFlag";
import { getCategoryFromProject } from "lib/projectGetter";
import { Project } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HeroCarousel } from "./HeroCarousel";
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
      {getFeatureFlag("heroCarousel") && <HeroCarousel />}
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
            <Trans>The Universal Carbon Marketplace</Trans>
          </Text>
          <Text t="body1" as="h2">
            <Trans>
              The largest selection of digital carbon credits worldwide. Buy,
              sell, and retire digital carbon from any project instantly with
              zero-commission trading.
            </Trans>
          </Text>
          <ButtonPrimary
            href="/projects"
            label={<Trans>Get Started</Trans>}
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
              <Trans>Our Partners</Trans>
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
            <Trans>
              Over 20 million verified digital carbon credits from hundreds of
              projects, with over $4 billion traded to date
            </Trans>
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
                        {formatToPrice(project.price, locale, true)}
                      </Text>
                      <Text as="h5">{project?.name}</Text>
                      <Text t="body1">
                        {project?.short_description || project?.description}
                      </Text>
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
            label={<Trans>Browse Projects</Trans>}
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
              <Trans>Buy or retire carbon</Trans>
            </Text>
            <Text t="body1" className="description">
              <Trans>Maximize your climate impact.</Trans>
            </Text>
            <Text t="body1" className="description">
              <Trans>
                Carbonmark doesn't charge an additional transaction fee and
                offers best-in-the-market pricing. Explore hundreds of verified
                carbon projects.
              </Trans>
            </Text>
            <Text t="body1" className="description">
              <Trans>
                Retire now, or acquire carbon to retire later - you decide what
                to do when you take ownership of your carbon assets.
              </Trans>
            </Text>
            <ButtonPrimary
              href="/projects"
              label={<Trans>Browse Projects</Trans>}
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
                      <Trans>Step 1</Trans>
                    </Text>
                    <TravelExploreOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>Choose a project and quantity</Trans>
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      <Trans>Step 2</Trans>
                    </Text>
                    <PaymentOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>Create a profile and get connected</Trans>
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      <Trans>Step 3</Trans>
                    </Text>
                    <ParkOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>
                      Retire instantly, or purchase and hold digital carbon
                    </Trans>
                  </Text>
                </div>
              </div>
            </div>
            <ButtonPrimary
              href="/projects"
              label={<Trans>Browse Projects</Trans>}
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
                      <Trans>Step 1</Trans>
                    </Text>
                    <ControlPointDuplicateOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>
                      Digitize your carbon by using a supported bridge
                    </Trans>
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      <Trans>Step 2</Trans>
                    </Text>
                    <PersonOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>Create a seller profile</Trans>
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <div className="card-title">
                    <Text t="body3" as="h4">
                      <Trans>Step 3</Trans>
                    </Text>
                    <MouseOutlinedIcon fontSize="large" />
                  </div>
                  <Text t="body3" className="card-info">
                    <Trans>
                      List your projects for sale in just a few clicks
                    </Trans>
                  </Text>
                </div>
              </div>
            </div>
            <ButtonPrimary
              href={urls.carbonmarkDemoForm}
              label={<Trans>Request Demo</Trans>}
              className={styles.browseButton}
              renderLink={(linkProps) => (
                <Link target="_blank" data-mobile-only {...linkProps} />
              )}
            />
          </div>
          <div>
            <Text t="h2" as="h2">
              <Trans>Sell carbon</Trans>
            </Text>
            <Text t="body1" className="description">
              <Trans>
                Create your own carbon storefront. Sell directly to
                organizations and individuals alike.
              </Trans>
            </Text>
            <Text t="body1" className="description">
              <Trans>
                Unprecedented transparency across the digital carbon market.
              </Trans>
            </Text>
            <ButtonPrimary
              href={urls.carbonmarkDemoForm}
              label={<Trans>Request Demo</Trans>}
              className={styles.browseButton}
              renderLink={(linkProps) => (
                <Link target="_blank" data-desktop-only {...linkProps} />
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
                <Trans>For carbon traders</Trans>
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>
                    Compare prices across all sellers and trading pools
                  </Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>
                    Real-time price and transaction data powered by the
                    blockchain
                  </Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>0% listing fee</Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>All assets sourced from major registries</Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>Instant settlement of all trades</Trans>
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
                <Trans>For project developers</Trans>
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>
                    Get paid immediately: transactions are resolved in seconds
                  </Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>List and sell for free</Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>
                    No barriers to entry for verified carbon projects
                  </Trans>
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  <Trans>Sell your digital carbon directly to buyers</Trans>
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
            <Trans>Learn more</Trans>
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
                    <Trans>Introducing Carbonmark</Trans>
                  </Text>
                  <Text t="body1">
                    <Trans>
                      Zero-fee carbon credit trading - instantaneous,
                      transparent, and always available. Learn more about what
                      Carbonmark can do for you as a carbon credit trader.
                    </Trans>
                  </Text>
                  <A href={carbonmarkUrls.intro}>
                    <Text t="h5" as="h6" className="readMore">
                      <Trans>Read more</Trans>
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
                    <Trans>FAQs</Trans>
                  </Text>
                  <Text t="body1">
                    <Trans>
                      What is Carbonmark? Answers to common questions about the
                      Digital Carbon Market interface that easily connects
                      buyers and sellers of verified carbon credits.
                    </Trans>
                  </Text>
                  <A href="/blog/carbonmark-faqs">
                    <Text t="h5" as="h6" className="readMore">
                      <Trans>Read more</Trans>
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
                    <Trans>Carbonmark's role</Trans>
                  </Text>
                  <Text t="body1">
                    <Trans>
                      Learn more about Carbonmark's role in improving the
                      Digital Carbon Market - and the Voluntary Carbon Market as
                      a whole.
                    </Trans>
                  </Text>
                  <A href="/blog/carbonmarks-role-in-the-digital-carbon-market">
                    <Text t="h5" as="h6" className="readMore">
                      <Trans>Read more</Trans>
                    </Text>
                  </A>
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary
            href="/resources"
            label={<Trans>Resources</Trans>}
            className={styles.browseButton}
            renderLink={(linkProps) => <Link {...linkProps} />}
          />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.poweredBySection)}>
        <Image fill alt="Powered By" src="/powered-by-bg.jpeg" />
        <div className="stack">
          <Text t="h2" as="h2">
            <Trans>Powered by</Trans>
            <A href={urls.home}>
              <LogoWithClaim />
            </A>
          </Text>
          <Text t="body1" className="description">
            <Trans>
              KlimaDAO provides the transparent, neutral, and public
              infrastructure required to accelerate climate finance on a global
              scale.
            </Trans>
          </Text>
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
