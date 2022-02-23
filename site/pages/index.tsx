import { GetStaticProps } from "next";
import {
  getKlimaUsdcPrice,
  getStakingAPY,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const [treasuryBalance, stakingAPY, price] = await Promise.all([
    getTreasuryBalance(),
    getStakingAPY(),
    getKlimaUsdcPrice(),
  ]);
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);

  return {
    props: {
      latestPost,
      price,
      stakingAPY,
      treasuryBalance,
      translation,
    },
    revalidate: 60,
  };
};

export default Home;
