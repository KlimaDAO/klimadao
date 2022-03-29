import { GetStaticProps } from "next";

import { Pledge } from "components/pages/Pledge";
import { getPledgeByAddress } from "lib/moralis";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  let profile;

  try {
    const queryAddress = ctx.params?.address as string;
    profile = await getPledgeByAddress(queryAddress.toLowerCase());
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      translation,
      profile,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default Pledge;
