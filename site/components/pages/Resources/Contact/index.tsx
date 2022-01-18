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
  Paragraph,
  Section,
} from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";

import { urls } from "@klimadao/lib/constants";
import styles from "./index.module.css";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { FC, HTMLAttributes } from "react";

export type Props = HTMLHtmlElement & {};

type H2Props = HTMLAttributes<HTMLHeadingElement> & {};

const H2: FC<H2Props> = (props) => {
  return (
    <h2 {...props} className={styles.page_h2}>
      {props.children}
    </h2>
  );
};

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
          <NavItemDesktop url={urls.home} name="Home" link={Link} />
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
            link={Link}
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
          <h1 className={styles.page_h1}>
            <Trans>Contact</Trans>
          </h1>
          <div className={styles.page_section}>
            <div />
            <div className={styles.page_subHeader}>
              <Paragraph style={{ textAlign: "center" }}>
                <Trans>
                  Questions, concerns, ideas? Here are a few ways you can get in
                  touch. We love meeting institutions and individuals alike.
                </Trans>
              </Paragraph>
            </div>
            <div />
          </div>
        </Section>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <H2 style={{ marginTop: 0 }}>
              <Trans>Questions & Support</Trans>
            </H2>
            <Paragraph>
              <Trans>
                Join our <Link href={"/resources/community"}>community</Link>{" "}
                Discord server and ask in the #questions channel. We have
                thousands of friendly, knowledgeable community members ready and
                willing to help you out.
              </Trans>
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <H2>
              <Trans>Careers</Trans>
            </H2>
            <Paragraph>
              <Trans>
                We're hiring! Until we finish building out our careers page, you
                can submit a resume by joining our{" "}
                <a href={"https://discord.gg/uWvjTuZ65v"}>
                  contributor's Discord server
                </a>{" "}
                and following the application instructions for whichever
                department(s) interest you.
              </Trans>
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <H2>
              <Trans>Partnerships</Trans>
            </H2>
            <Paragraph>
              <Trans>
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
              </Trans>
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <H2>
              <Trans>Media</Trans>
            </H2>
            <Paragraph>
              <Trans>
                If you are a journalist or content creator, our marketing team
                would love to meet you. [TODO: NEED A LINK OR EMAIL FROM
                MARKETING TEAM]
              </Trans>
            </Paragraph>
          </div>
          <div />
        </div>

        <div className={styles.page_section}>
          <div />
          <div className={styles.page_sectionContent}>
            <H2>
              <Trans>Bug Reports</Trans>
            </H2>
            <Paragraph>
              <Trans>
                To file a bug report, join our community Discord server and ask
                your question in the #bug-reports channel. Someone in our{" "}
                <Link href={"/resources/community"}>community</Link> will be
                happy to investigate and find a solution for you.
              </Trans>
            </Paragraph>
          </div>
          <div />
        </div>

        <Footer />
      </PageWrap>
    </>
  );
};
