import { GetStaticProps } from "next";
import { getTreasuryBalance } from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { fetchCMSContent } from "lib/fetchCMSContent";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const treasuryBalance = await getTreasuryBalance();
  const latestPost = await fetchCMSContent("latestPost");
  const translation = await loadTranslation(ctx.locale);

  return {
    props: {
      latestPost,
      treasuryBalance,
      translation,
    },
    revalidate: 60,
  };
};

export default Home;
