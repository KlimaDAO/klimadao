import { GetStaticProps } from "next";
import { ethers } from "ethers";

import { loadTranslation } from "lib/i18n";
import { IS_PRODUCTION } from "lib/constants";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { getPledgeByAddress } from "components/pages/Pledge/lib/firebase";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;

  if (IS_PRODUCTION) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }

  if (!ethers.utils.isAddress(address)) {
    return {
      redirect: {
        destination: "/pledge",
        permanent: false,
      },
    };
  }

  try {
    const data = await getPledgeByAddress(address.toLowerCase());
    if (!data) throw new Error("Not found");

    pledge = data;
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
