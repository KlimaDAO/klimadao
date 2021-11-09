import { GetStaticProps } from "next";
import {
  getKlimaUsdcPrice,
  getStakingAPY,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [treasuryBalance, stakingAPY, price] = await Promise.all([
    getTreasuryBalance(),
    getStakingAPY(),
    getKlimaUsdcPrice(),
  ]);
  return {
    props: {
      treasuryBalance,
      stakingAPY,
      price,
    },
    revalidate: 240,
  };
};

export default Home;
