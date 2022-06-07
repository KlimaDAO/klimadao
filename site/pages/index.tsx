import { GetStaticProps } from "next";
import {
  fetchBlockRate,
  getTreasuryBalance,
  getStakingRewards,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const treasuryBalance = await getTreasuryBalance(INFURA_ID);
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);
  const blockRate = await fetchBlockRate();
  const weeklyStakingRewards = await getStakingRewards({
    days: 7,
    blockRate,
    infuraId: INFURA_ID,
  });

  return {
    props: {
      latestPost,
      treasuryBalance,
      translation,
      weeklyStakingRewards,
    },
    revalidate: 600,
  };
};

export default Home;
