import { GetStaticProps } from "next";
import {
  fetchBlockRate,
  getTreasuryBalance,
  getStakingRewards,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const infuraURL = getInfuraUrlPolygon();
  const treasuryBalance = await getTreasuryBalance(infuraURL);
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);
  const blockRate = await fetchBlockRate();
  const weeklyStakingRewards = await getStakingRewards({
    days: 31,
    blockRate,
    providerUrl: infuraURL,
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
