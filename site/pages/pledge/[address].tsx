import { GetStaticProps } from "next";

import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { pledgeResolver } from "lib/moralis";
import { getPledgeByAddress } from "components/pages/Pledge/utils";
import { loadTranslation } from "lib/i18n";
import { IS_PRODUCTION } from "lib/constants";

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (IS_PRODUCTION) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }

  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;

  try {
    const data = await getPledgeByAddress(address.toLowerCase());

    if (!data) throw new Error("Not found");
    pledge = pledgeResolver(JSON.parse(JSON.stringify(data)));
  } catch (error) {
    pledge = null;
  }

  return {
    props: {
      pageAddress: address.toLowerCase(),
      pledge: {
        ...pledge,
        ownerAddress: pledge?.ownerAddress || address.toLowerCase(),
      },
      translation,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default PledgeDashboard;
