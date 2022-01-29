import Link from "next/link";
import * as styles from "./styles";

import {
  HeaderDesktop,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
} from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { urls } from "@klimadao/lib/constants";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { IS_PRODUCTION } from "lib/constants";
import { FC, PropsWithChildren, ReactNode } from "react";

type PageName = "blog" | "community" | "contact";

export type Props = PropsWithChildren<ReactNode> & {
  activePage: PageName;
  title: string;
  mediaTitle: string;
  metaDescription: string;
  mediaImageSrc: string;
  topMobileElement: FC<PropsWithChildren<ReactNode>>;
};

export const Container: FC<Props> = (props) => {
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={props.title}
        mediaTitle={props.mediaTitle}
        metaDescription={props.metaDescription}
        mediaImageSrc={props.mediaImageSrc}
      />

      <HeaderDesktop
        link={Link}
        buttons={[
          <ButtonPrimary
            key="Enter App"
            label={t({ message: "Enter App" })}
            href={urls.app}
          />,
        ]}
      >
        <NavItemDesktop
          url={"/"}
          name={t({ message: "Home", id: "mainNav.home" })}
          link={Link}
        />
        <NavItemDesktop
          url={urls.tutorial}
          name={t`Get Klima`}
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemDesktop
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemDesktop
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
        <NavItemDesktop
          url="/resources"
          name={t({ message: "Resources", id: "mainNav.resources" })}
          active={true}
          link={Link}
        />
      </HeaderDesktop>
      <HeaderMobile>
        <NavItemMobile
          url={urls.home}
          name={t({ message: "Home", id: "mainNav.home" })}
        />
        <NavItemMobile
          url={urls.tutorial}
          name={t({ message: "Buy Klima", id: "mainNav.buyKlima" })}
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Wrap", id: "mainNav.wrap" })}
        />
        <NavItemMobile
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
      </HeaderMobile>

      <div className={styles.layoutMobile}>
        <props.topMobileElement />
        <div className={styles.mobileNav}>
          <div />
          <div className={styles.mobileNavContent}>
            <ButtonPrimary
              className={styles.mobileNavButton}
              label={t`Blog`}
              href={"/resources/blog"}
              variant={props.activePage !== "blog" ? "gray" : null}
              link={Link}
            />
            <ButtonPrimary
              className={styles.mobileNavButton}
              label={t`Community`}
              href={"/resources/community"}
              variant={props.activePage !== "community" ? "gray" : null}
              link={Link}
            />
            <ButtonPrimary
              className={styles.mobileNavButton}
              label={t`Contact`}
              href={"/resources/contact"}
              variant={props.activePage !== "contact" ? "gray" : null}
              link={Link}
            />
          </div>
          <div />
        </div>
      </div>

      <div className={styles.layoutDesktop}>
        <div className={styles.spacing}>
          <div className={styles.resourcesNavigation}>
            <ul className={styles.list}>
              <li
                className={styles.listItem}
                data-active={props.activePage === "blog"}
              >
                <Link href="/resources/blog">
                  <a>
                    <Trans>Blog</Trans>
                    <ArrowBack className="arrow" />
                  </a>
                </Link>
              </li>
              <li
                className={styles.listItem}
                data-active={props.activePage === "community"}
              >
                <Link href="/resources/community">
                  <a>
                    <Trans>Community</Trans>
                    <ArrowBack className="arrow" />
                  </a>
                </Link>
              </li>
              <li
                className={styles.listItem}
                data-active={props.activePage === "contact"}
              >
                <Link href="/resources/contact">
                  <a>
                    <Trans>Contact Us</Trans>
                    <ArrowBack className="arrow" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {props.children}

      <Footer />
    </>
  );
};
