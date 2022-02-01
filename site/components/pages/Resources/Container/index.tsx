import Link from "next/link";
import * as styles from "./styles";

import { ButtonPrimary, Section, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { PageHead } from "components/PageHead";
import { Navigation } from "components/Navigation";
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

      <Navigation activePage="Resources" />

      <div className={styles.navigationDesktopWrapper}>
        <div className={styles.navigationDesktop}>
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
      <Section variant="gray" style={{ padding: "unset" }}>
        <div className={styles.resourcesHeader}>
          <div className="resourcesHeader_textGroup">
            <Text t="h2" as="h2">
              <Trans>BLOG</Trans>
            </Text>
            <Text align="center" t="body2" color="lighter">
              <Trans>
                Updates and thought leadership from the founders, DAO
                contributors, advisors and community.
              </Trans>
            </Text>
          </div>

          <div className={styles.navigationMobile}>
            <ButtonPrimary
              className="navigationMobile_navItem"
              label={t`Blog`}
              href={"/resources/blog"}
              variant={props.activePage !== "blog" ? "gray" : null}
              link={Link}
            />
            <ButtonPrimary
              className="navigationMobile_navItem"
              label={t`Community`}
              href={"/resources/community"}
              variant={props.activePage !== "community" ? "gray" : null}
              link={Link}
            />
            <ButtonPrimary
              className="navigationMobile_navItem"
              label={t`Contact`}
              href={"/resources/contact"}
              variant={props.activePage !== "contact" ? "gray" : null}
              link={Link}
            />
          </div>
        </div>
      </Section>

      {props.children}

      <Footer />
    </>
  );
};
