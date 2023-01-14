import {
  fetchBlockRate,
  getStakingRewards,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const treasuryBalance = await getTreasuryBalance({ infuraId: INFURA_ID });
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);
  const blockRate = await fetchBlockRate();
  const monthlyStakingRewards = await getStakingRewards({
    days: 31,
    blockRate,
    infuraId: INFURA_ID,
  });

  return {
    props: {
      latestPost,
      treasuryBalance,
      translation,
      monthlyStakingRewards,
    },
    revalidate: 600,
  };
};

export default Home;
