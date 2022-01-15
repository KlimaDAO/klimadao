import { NextPage } from "next";
import Image from "next/image";
import NextImageFix from "components/pages/Redesign/NextImage";
import { t } from "@lingui/macro";

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
import forest from "public/forest.png";
import cars from "public/cars.png";
import gasolina from "public/gasolina.png";

export interface Props {
  treasuryBalance: number;
  stakingAPY: number;
  price: number;
}

export const Home: NextPage<Props> = (props) => {
  const formattedTreasuryBalance = props.treasuryBalance.toLocaleString();
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
            active={true}
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
        <Section contentVariant="hero">
          <Columns variant="hero">
            <ContentBox variant="hero">
              <Copy text={t({ message: "👋 WELCOME TO" })} />
              <Heading text={t({ message: "KlimaDao" })} />
              <Copy
                text={t({
                  message:
                    "KlimaDAO harnesses the power of cryptocurrency, blockchain and smart contracts to create incentives for environmental protection.",
                })}
              />
              <ButtonPrimary
                key="Enter App"
                label={t({ message: "Enter App" })}
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
            text={t({
              message:
                "KlimaDAO’s vision is a future where the cost of carbon to the climate is embedded into our economic system.",
            })}
          />
          <Columns variant="contained">
            <Copy
              text={t({
                message:
                  "KlimaDAO is creating and governing a carbon-backed currency, which acts as the base unit of the on-chain carbon economy.",
              })}
            />
            <Copy
              text={t({
                message:
                  "Through the KLIMA token, we can help to align incentives between investors, civil society, and organizations, towards a more sustainable future.",
              })}
            />
          </Columns>
          <ContentBoxImage>
            <NextImageFix alt="BlackHole" src={blackHole} />
          </ContentBoxImage>
        </Section>
        <Section variant="white" contentVariant="contained">
          <Heading
            align="center"
            variant="medium"
            text={t({ message: "TONS OF CARBON LOCKED BY KLIMA" })}
          />
          <Heading align="center" text={formattedTreasuryBalance} />
          <Heading
            align="center"
            variant="small"
            text={t({ message: "EQUIVALENT TO" })}
          />
          <Columns>
            <ContentBox>
              <NextImageFix alt="Forest" src={forest} />
              <Copy text={t({ message: "HECTARES OF FOREST" })} />
              <Heading
                align="center"
                variant="small"
                text={t({ message: "55,766" })}
              />
            </ContentBox>
            <ContentBox>
              <NextImageFix alt="Cars" src={cars} />
              <Copy text={t({ message: "PASSENGER VEHICLES" })} />
              <Heading
                align="center"
                variant="small"
                text={t({ message: "2,424,621" })}
              />
            </ContentBox>
            <ContentBox>
              <NextImageFix alt="Gasolina" src={gasolina} />
              <Copy text={t({ message: "LITERS OF GASOLINE" })} />
              <Heading
                align="center"
                variant="small"
                text={t({ message: "5,697,736,801" })}
              />
            </ContentBox>
          </Columns>
        </Section>
        <Footer />
      </PageWrap>
    </>
  );
};
