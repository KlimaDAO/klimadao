import { GetStaticProps } from "next";
import {
  getKlimaUsdcPrice,
  getStakingAPY,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const [treasuryBalance, stakingAPY, price] = await Promise.all([
    getTreasuryBalance(),
    getStakingAPY(),
    getKlimaUsdcPrice(),
  ]);
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === "production"
  );
  return {
    props: {
      treasuryBalance,
      stakingAPY,
      price,
      translation,
    },
    revalidate: 60,
  };
};

export default Home;
