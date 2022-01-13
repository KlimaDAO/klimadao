import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import greenWormhole from "public/green-wormhole.jpg";
import klimaLogo from "public/klima-logo.png";

import { urls } from "@klimadao/lib/constants";
import styles from "./index.module.css";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";

export interface Props {
}


export const Contact: NextPage<Props> = ({}) => {

  return (
    <div id="ContactContainer" className={styles.container}>
      <PageHead
        production={IS_PRODUCTION}
        title="Contact KlimaDAO"
        mediaTitle="Contact KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />

      <div></div>

      <div
        className={styles.page_contentContainer}
      >
        <h1 className={styles.page_header}>Contact</h1>

        <p>
          Questions, concerns, ideas? Here are a few ways you can get in touch. We love meeting institutions and
          individuals alike.
        </p>

        <h2 className={styles.page_subHeader}>Questions & Support</h2>

        <p>
          Join our <Link href={'/resources/community'}>community</Link> Discord server and ask in the #questions channel. We have thousands of friendly,
          knowledgeable community members ready and willing to help you out.
        </p>

        <h2 className={styles.page_subHeader}>Careers</h2>

        <p>
          We're hiring! Until we finish building out our careers page, you can submit a resume by joining our
          <a href={"https://discord.gg/uWvjTuZ65v"}>contributor's Discord server</a> and following the application instructions for whichever department(s) interest
          you.
        </p>

        <h2 className={styles.page_subHeader}>Partnerships</h2>

        <p>
          Until we finish building out our partnerships page, we are directing potential partnership and collaboration
          inquiries to
          <a href={'https://docs.google.com/forms/d/10ETkwPZyiiEz7BQSCEAxtXRSgQ9uTCO9LtaRqOVhoXk/viewform?chromeless=1&edit_requested=true'}>
            this contact form
          </a>.
        </p>

        <h2 className={styles.page_subHeader}>Media</h2>

        <p>
          If you are a journalist or content creator, our marketing team would love to meet you.
          [TODO: NEED A LINK OR EMAIL FROM MARKETING TEAM]
        </p>

        <h2 className={styles.page_subHeader}>Bug Reports</h2>

        <p>
          To file a bug report, join our community Discord server and ask your question in the #bug-reports channel.
          Someone in our <Link href={'/resources/community'}>community</Link> will be happy to investigate and find a solution for you.
        </p>

      </div>

      <div></div>

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
