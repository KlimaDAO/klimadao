import Link from "next/link";
import * as styles from "./styles";

import {
  PageWrap,
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
} from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { urls } from "@klimadao/lib/constants";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { FC, PropsWithChildren, ReactNode } from "react";

type PageName = "blog" | "community" | "contact";

export type Props = PropsWithChildren<ReactNode> & {
  activePage: PageName;
  title: string;
  mediaTitle: string;
  metaDescription: string;
  mediaImageSrc: string;
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

      <PageWrap>
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
            name={t({ message: "Buy Klima", id: "mainNav.buyKlima" })}
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemDesktop
            url={urls.stake}
            name={t({ message: "Stake", id: "mainNav.stake" })}
          />
          <NavItemDesktop
            url={urls.wrap}
            name={t({ message: "Wrap", id: "mainNav.wrap" })}
          />
          <NavItemDesktop
            url={urls.bond}
            name={t({ message: "Bond", id: "mainNav.bond" })}
          />
          <NavItemDesktop
            url={"/resources"}
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

        <div className={styles.layout}>
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
      </PageWrap>
    </>
  );
};
