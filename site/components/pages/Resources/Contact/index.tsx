import { NextPage } from "next";
import Link from "next/link";

import {
  PageWrap,
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
  Columns,
  Copy,
  Heading,
  Paragraph,
  Section,
  ContentBox,
} from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import styles from "./index.module.css";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";

export interface Props {}

export const Contact: NextPage<Props> = ({}) => {
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="Contact KlimaDAO"
        mediaTitle="Contact KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />

      <PageWrap>
        <HeaderDesktop
          buttons={[
            <ButtonPrimary key="Enter App" label="Enter App" href={urls.app} />,
          ]}
        >
          <NavItemDesktop url={urls.home} name="Home" internal={true} />
          <NavItemDesktop
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemDesktop url={urls.stake} name="Stake" />
          <NavItemDesktop url={urls.wrap} name="Wrap" />
          <NavItemDesktop url={urls.bond} name="Bond" />
          <NavItemDesktop
            url={urls.contact}
            name="Contact"
            internal={true}
            active={true}
          />
        </HeaderDesktop>
        <HeaderMobile>
          <NavItemMobile url={urls.home} name="Home" />
          <NavItemMobile
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemMobile url={urls.stake} name="Stake" />
          <NavItemMobile url={urls.stake} name="Wrap" />
          <NavItemMobile url={urls.bond} name="Bond" />
          <NavItemMobile url={"/resources/contact"} name="Contact" />
        </HeaderMobile>
        <Section>
          <h1 className={styles.page_h1}>Contact</h1>
          <Columns>
            <div />
            <Copy
              className={styles.page_subHeader}
              text="Questions, concerns, ideas? Here are a few ways you can get in
                      touch. We love meeting institutions and individuals alike."
            />
            <div />
          </Columns>
        </Section>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <h2 style={{ marginTop: 0 }} className={styles.page_h2}>
              Questions & Support
            </h2>
            <Paragraph>
              Join our <Link href={"/resources/community"}>community</Link>{" "}
              Discord server and ask in the #questions channel. We have
              thousands of friendly, knowledgeable community members ready and
              willing to help you out.
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <h2 className={styles.page_h2}>Careers</h2>
            <Paragraph>
              We're hiring! Until we finish building out our careers page, you
              can submit a resume by joining our{" "}
              <a href={"https://discord.gg/uWvjTuZ65v"}>
                contributor's Discord server
              </a>{" "}
              and following the application instructions for whichever
              department(s) interest you.
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <h2 className={styles.page_h2}>Partnerships</h2>
            <Paragraph>
              Until we finish building out our partnerships page, we are
              directing potential partnership and collaboration inquiries to{" "}
              <a
                href={
                  "https://docs.google.com/forms/d/10ETkwPZyiiEz7BQSCEAxtXRSgQ9uTCO9LtaRqOVhoXk/viewform?chromeless=1&edit_requested=true"
                }
              >
                this contact form
              </a>
              .
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <h2 className={styles.page_h2}>Media</h2>
            <Paragraph>
              If you are a journalist or content creator, our marketing team
              would love to meet you. [TODO: NEED A LINK OR EMAIL FROM MARKETING
              TEAM]
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <h2 className={styles.page_h2}>Bug Reports</h2>
            <Paragraph>
              To file a bug report, join our community Discord server and ask
              your question in the #bug-reports channel. Someone in our{" "}
              <Link href={"/resources/community"}>community</Link> will be happy
              to investigate and find a solution for you.
            </Paragraph>
          </div>
          <div />
        </div>

        <Footer />
      </PageWrap>
    </>
  );
};
