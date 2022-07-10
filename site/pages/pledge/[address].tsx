import { GetStaticProps } from "next";
import { ethers } from "ethers";

import { loadTranslation } from "lib/i18n";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { getPledgeByAddress } from "components/pages/Pledge/lib/firebase";
import {
  DEFAULT_VALUES,
  queryHoldingsByAddress,
} from "components/pages/Pledge/lib";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;

  if (!ethers.utils.isAddress(address)) {
    return {
      redirect: {
        destination: "/pledge",
        permanent: false,
      },
    };
  }
  const holdings = await queryHoldingsByAddress(address);

  console.log({ holdings });

  try {
    const data = await getPledgeByAddress(address.toLowerCase());
    if (!data) throw new Error("Not found");

    pledge = data;
  } catch (error) {
    pledge = DEFAULT_VALUES;
  }

  return {
    props: {
      pageAddress: address.toLowerCase(),
      pledge: {
        ...pledge,
        ownerAddress: pledge?.ownerAddress || address.toLowerCase(),
      },
      holdings,
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
