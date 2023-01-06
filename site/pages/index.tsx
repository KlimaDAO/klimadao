import {
  fetchBlockRate,
  getInfuraUrl,
  getStakingRewards,
  getTreasuryBalance,
} from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const infuraURL = getInfuraUrl({
    chain: "polygon",
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
  });
  const treasuryBalance = await getTreasuryBalance(infuraURL);
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);
  const blockRate = await fetchBlockRate();
  const monthlyStakingRewards = await getStakingRewards({
    days: 31,
    blockRate,
    providerUrl: infuraURL,
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
