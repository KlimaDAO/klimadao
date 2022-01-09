import { NextPage } from "next";

import {
  PageWrap,
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
} from "@klimadao/lib/components";

import styles from "./index.module.css";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { urls } from "@klimadao/lib/constants";

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
            <ButtonPrimary
              key="Connect Wallet"
              label="Connect Wallet"
              onClick={() => console.log("Do we want this here?")}
            />,
          ]}
        >
          <NavItemDesktop url={urls.home} name="Home" active={true} />
          <NavItemDesktop url={urls.tutorial} name="Buy Klima" />
          <NavItemDesktop url={urls.stake} name="Stake" />
          <NavItemDesktop url={urls.wrap} name="Wrap" />
          <NavItemDesktop url={urls.bond} name="Bond" />
        </HeaderDesktop>
        <HeaderMobile>
          <NavItemMobile url={urls.home} name="Home" />
          <NavItemMobile url={urls.tutorial} name="Buy Klima" />
          <NavItemMobile url={urls.stake} name="Stake" />
          <NavItemMobile url={urls.stake} name="Wrap" />
          <NavItemMobile url={urls.bond} name="Bond" />
        </HeaderMobile>
        <Footer />
      </PageWrap>
    </>
  );
};
