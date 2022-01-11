import { NextPage } from "next";
import Image from "next/image";

import {
  PageWrap,
  ContentWrap,
  Section,
  ContentBox,
  ContentBoxImage,
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
  Heading,
  Copy,
} from "@klimadao/lib/components";

import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { urls } from "@klimadao/lib/constants";

import introPic from "public/intro.png";
export interface Props {
  treasuryBalance: number;
  stakingAPY: number;
  price: number;
}

export const Home: NextPage<Props> = (props) => {
  console.log("introPic", introPic);
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />
      <PageWrap>
        <HeaderDesktop
          buttons={[
            <ButtonPrimary key="Enter App" label="Enter App" href={urls.app} />,
          ]}
        >
          <NavItemDesktop url={urls.home} name="Home" active={true} />
          <NavItemDesktop
            url={urls.tutorial}
            name="Buy Klima"
            target="_blank"
            rel="noreferrer noopener"
          />
          <NavItemDesktop url={urls.stake} name="Stake" />
          <NavItemDesktop url={urls.wrap} name="Wrap" />
          <NavItemDesktop url={urls.bond} name="Bond" />
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
        </HeaderMobile>
        <ContentWrap>
          <Section>
            <ContentBox>
              <Copy text="👋 WELCOME TO" />
              <Heading text="KlimaDao" />
              <Copy text="KlimaDAO harnesses the power of cryptocurrency, blockchain and smart contracts to create incentives for environmental protection." />
              <ButtonPrimary
                key="Enter App"
                label="Enter App"
                href={urls.app}
              />
            </ContentBox>
            <ContentBoxImage variant="belowTextBox">
              <Image alt="Intro" src={introPic} layout="fill" />
            </ContentBoxImage>
          </Section>
        </ContentWrap>
        <Footer />
      </PageWrap>
    </>
  );
};
