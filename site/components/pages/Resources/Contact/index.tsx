import { NextPage } from "next";
import Link from "next/link";

import { Paragraph, Section } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";

import { urls } from "@klimadao/lib/constants";
import styles from "./index.module.css";
import { Container } from "../Container";

export type Props = HTMLHtmlElement;

export const Contact: NextPage<Props> = () => {
  return (
    <Container
      activePage={"contact"}
      title={t`Contact KlimaDAO`}
      mediaTitle={t`Contact KlimaDAO`}
      metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
      mediaImageSrc="/og-media.jpg"
    >
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
          <h2 style={{ marginTop: 0 }}>
            <Trans>Questions & Support</Trans>
          </h2>
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
          <h2>
            <Trans>Careers</Trans>
          </h2>
          <Paragraph>
            <Trans>
              We're hiring! Until we finish building out our careers page, you
              can submit a resume by joining our{" "}
              <a href={urls.discordContributorsInvite}>
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
          <h2>
            <Trans>Partnerships</Trans>
          </h2>
          <Paragraph>
            <Trans>
              Until we finish building out our partnerships page, we are
              directing potential partnership and collaboration inquiries to{" "}
              <a href={urls.partnerShipsContactForm}>this contact form</a>.
            </Trans>
          </Paragraph>
        </div>
        <div />
      </div>

      <div className={styles.page_section}>
        <div />
        <div className={styles.page_sectionContent}>
          <h2>
            <Trans>Media</Trans>
          </h2>
          <Paragraph>
            <Trans>
              If you are a journalist or content creator, our marketing team
              would love to meet you. Use this{" "}
              <a href={urls.mediaRequestForm}>Media Request Form</a>.
            </Trans>
          </Paragraph>
        </div>
        <div />
      </div>

      <div className={styles.page_section}>
        <div />
        <div className={styles.page_sectionContent}>
          <h2>
            <Trans>Bug Reports</Trans>
          </h2>
          <Paragraph>
            <Trans>
              To file a bug report, join our community Discord server and ask
              your question in the #bug-reports channel. Someone in our{" "}
              <Link href={"/resources/community"}>community</Link> will be happy
              to investigate and find a solution for you.
            </Trans>
          </Paragraph>
        </div>
        <div />
      </div>
    </Container>
  );
};
