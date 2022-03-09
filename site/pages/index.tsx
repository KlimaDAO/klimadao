import { GetStaticProps } from "next";
import {
  fetchBlockRate,
  getTreasuryBalance,
  getStakingRewards,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const treasuryBalance = await getTreasuryBalance();
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);
  const blockRate = await fetchBlockRate();
  const weeklyStakingRewards = await getStakingRewards(7, blockRate);

  return {
    props: {
      latestPost,
      treasuryBalance,
      translation,
      weeklyStakingRewards,
    },
    revalidate: 60,
  };
};

export default Home;
