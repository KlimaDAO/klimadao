import { FC } from "react";
import Link from "next/link";
import * as styles from "./styles";

import { ButtonPrimary, Section, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";

type PageName = "blog" | "community" | "contact";

export type Props = {
  activePage: PageName;
  title: string;
  subline: string;
  headerElements?: FC;
};

export const ResourcesHeader: FC<Props> = (props) => (
  <>
    <div className={styles.navigationDesktopWrapper}>
      <div className={styles.navigationDesktop}>
        <ul className={styles.list}>
          <li
            className={styles.listItem}
            data-active={props.activePage === "blog"}
          >
            <Link href="/blog">
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
            <Link href="/community">
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
            <Link href="/contact">
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
        <div className={styles.navigationMobile}>
          <ButtonPrimary
            className="navigationMobile_navItem"
            label={t`Blog`}
            href={"/blog"}
            variant={props.activePage !== "blog" ? "gray" : null}
            link={Link}
          />
          <ButtonPrimary
            className="navigationMobile_navItem"
            label={t`Community`}
            href={"/community"}
            variant={props.activePage !== "community" ? "gray" : null}
            link={Link}
          />
          <ButtonPrimary
            className="navigationMobile_navItem"
            label={t`Contact`}
            href={"/contact"}
            variant={props.activePage !== "contact" ? "gray" : null}
            link={Link}
          />
        </div>

        <div className="resourcesHeader_textGroup">
          <Text t="h2" as="h2">
            <Trans>{props.title}</Trans>
          </Text>
          <Text align="center" t="body3" color="lighter">
            <Trans>{props.subline}</Trans>
          </Text>
          {props.headerElements && <props.headerElements />}
        </div>
      </div>
    </Section>
  </>
);
