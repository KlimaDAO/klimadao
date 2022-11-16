import { FC, ReactNode } from "react";
import Link from "next/link";
import * as styles from "./styles";

import { ButtonPrimary, Section, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import ArrowBack from "@mui/icons-material/ArrowBack";

type PageName = "community" | "contact" | "disclaimer";

export type Props = {
  activePage: PageName;
  title: string;
  subline: JSX.Element | string;
  headerElements?: ReactNode;
};

export const AboutHeader: FC<Props> = (props) => {
  const isPageActive = (pageName: PageName) => props.activePage === pageName;

  return (
    <>
      <div className={styles.navigationDesktopWrapper}>
        <div className={styles.navigationDesktop}>
          <ul className={styles.list}>
            <li
              className={styles.listItem}
              data-active={isPageActive("community")}
            >
              <Link href="/community">
                <a>
                  <Trans id="shared.community">Community</Trans>
                  <ArrowBack className="arrow" />
                </a>
              </Link>
            </li>
            <li
              className={styles.listItem}
              data-active={isPageActive("contact")}
            >
              <Link href="/contact">
                <a>
                  <Trans id="shared.contact_us">Contact Us</Trans>
                  <ArrowBack className="arrow" />
                </a>
              </Link>
            </li>
            <li
              className={styles.listItem}
              data-active={isPageActive("disclaimer")}
            >
              <Link href="/disclaimer">
                <a>
                  <Trans id="shared.disclaimer">Disclaimer</Trans>
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
              label={t({ id: "shared.community", message: "Community" })}
              href={"/community"}
              variant={isPageActive("community") ? null : "gray"}
              renderLink={(linkProps) => <Link {...linkProps} />}
            />
            <ButtonPrimary
              label={t({ id: "shared.contact", message: "Contact" })}
              href={"/contact"}
              variant={isPageActive("contact") ? null : "gray"}
              renderLink={(linkProps) => <Link {...linkProps} />}
            />
            <ButtonPrimary
              label={t({ id: "shared.disclaimer", message: "Disclaimer" })}
              href={"/resources"}
              variant={isPageActive("disclaimer") ? null : "gray"}
              renderLink={(linkProps) => <Link {...linkProps} />}
            />
          </div>

          <div className="resourcesHeader_textGroup">
            <Text t="h2" as="h2">
              {props.title}
            </Text>
            <Text align="center" t="body3" color="lighter">
              {props.subline}
            </Text>
            {props.headerElements}
          </div>
        </div>
      </Section>
    </>
  );
};
