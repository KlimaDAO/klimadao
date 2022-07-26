import React, { useRef } from "react";
import Image from "next/image";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";

import { Section, Text, Anchor } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaunchIcon from "@mui/icons-material/Launch";

import { cards } from "./cards";
import * as styles from "./styles";

export const Slider = () => {
  const { locale } = useRouter();

  const scrollToRefEnd = useRef<null | HTMLDivElement>(null);
  const scrollToRefStart = useRef<null | HTMLDivElement>(null);

  const scrollToEnd = () =>
    scrollToRefEnd.current &&
    scrollToRefEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  const scrollToStart = () => {
    console.log("SCROLL START");
    return (
      scrollToRefStart.current &&
      scrollToRefStart.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    );
  };

  const getRef = (index: number, length: number) => {
    if (index === 0) {
      return scrollToRefStart;
    }
    if (index === length - 1) {
      return scrollToRefEnd;
    } else {
      return null;
    }
  };

  return (
    <>
      <Section variant="black" className={styles.sliderSection}>
        <div className="slider_container">
          <Text t="h3" className="slider_title">
            <Trans id="infinity.organizations">
              Dozens of organizations have offset over 150,000 carbon tonnes
              with Klima Infinity
            </Trans>
          </Text>
          <div className="slider_button_container">
            <div className="slider_arrow" onClick={scrollToStart}>
              <ArrowBackIcon />
            </div>
            <div className="slider_arrow" onClick={scrollToEnd}>
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.sliderSection}>
        <div className="slider_cards_container">
          {cards.map((card, index) => (
            <div
              className="slider_card"
              key={`${card.link}-${index}`}
              ref={getRef(index, cards.length)}
            >
              <div className="slider_title_container">
                <div className="slider_image_container">
                  <Image layout="intrinsic" src={card.logo} alt="logo" />
                </div>
                <Anchor href={card.link}>
                  <LaunchIcon className="slider_launch_icon" />
                </Anchor>
              </div>
              <div className="slider_content">
                <Text t="body4" className="slider_quote">
                  <Trans id="infinity.quote">“{card.description}”</Trans>
                </Text>
                <div className="slider_footer">
                  <div>
                    <Text t="h3">
                      <Trans id="infinity.retired_tons_number">
                        {trimWithLocale(card.tonsRetired, 2, locale)}k
                      </Trans>
                    </Text>
                    <Text>
                      <Trans id="infinity.tonnes">Tonnes</Trans>
                    </Text>
                  </div>
                  <Text t="badge" className="slider_date">
                    <Trans id="infinity.retired_date">{card.date}</Trans>
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
