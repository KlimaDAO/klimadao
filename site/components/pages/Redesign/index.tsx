import { NextPage } from "next";
import Image from "next/image";

import {
  PageWrap,
  Columns,
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
import blackHole from "public/black_hole.png";

export interface Props {
  treasuryBalance: number;
  stakingAPY: number;
  price: number;
}

export const Home: NextPage<Props> = (props) => {
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
        <Section contentVariant="hero">
          <Columns variant="hero">
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
          </Columns>
        </Section>
        <Section variant="white" contentVariant="contained">
          <Heading
            align="center"
            text="KlimaDAO’s vision is a future where the cost of carbon to the climate is embedded into our economic system."
          />
          <Columns variant="contained">
            <Copy text="KlimaDAO is creating and governing a carbon-backed currency, which acts as the base unit of the on-chain carbon economy." />
            <Copy text="Through the KLIMA token, we can help to align incentives between investors, civil society, and organizations, towards a more sustainable future." />
          </Columns>
          <ContentBoxImage>
            <Image alt="GreenWormHole" src={blackHole} layout="fill" />
          </ContentBoxImage>
        </Section>
        <Footer />
      </PageWrap>
    </>
  );
};
