import Link from "next/link";
import * as styles from "./styles";
import { cx } from "@emotion/css";

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
};

export const Container: FC<Props> = (props) => {
  const getListItemClasses = (name: PageName) => {
    if (name === props.activePage) {
      return cx(styles.listItem, styles.listItemActive);
    }
    return styles.listItem;
  };

  const _listItem = (name: PageName) => {
    return (
      <li className={getListItemClasses(name)}>
        <Link href={`/resources/${name}`}>
          <a>
            <Trans>{name}</Trans>
            {name === props.activePage && <ArrowBack />}
          </a>
        </Link>
      </li>
    );
  };

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t`Contact KlimaDAO`}
        mediaTitle={t`Contact KlimaDAO`}
        metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
        mediaImageSrc="/og-media.jpg"
      />

      <PageWrap>
        <HeaderDesktop
          buttons={[
            <ButtonPrimary
              key="Enter App"
              label={t({ message: "Enter App" })}
              href={urls.app}
            />,
          ]}
        >
          <NavItemDesktop
            url={urls.home}
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
            url={urls.resources}
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
                {_listItem("blog")}
                {_listItem("community")}
                {_listItem("contact")}
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
