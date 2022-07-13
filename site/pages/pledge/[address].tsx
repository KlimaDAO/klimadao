import { GetStaticProps } from "next";
import { ethers } from "ethers";

import { loadTranslation } from "lib/i18n";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { getAddressByDomain } from "lib/getAddressByDomain";

import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { getPledgeByAddress } from "components/pages/Pledge/lib/firebase";
import { DEFAULT_VALUES } from "components/pages/Pledge/lib";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;
  let resolvedAddress;
  const isDomainInURL = getIsDomainInURL(address);
  const domain = isDomainInURL ? address : null;

  try {
    if (!isDomainInURL && !ethers.utils.isAddress(address)) throw new Error('Invalid address');
    resolvedAddress = isDomainInURL ? await getAddressByDomain(address) : address.toLowerCase();
  } catch {
    return {
      redirect: {
        destination: "/pledge",
        permanent: false,
      },
    };
  }

  try {
    const data = await getPledgeByAddress(resolvedAddress);
    if (!data) throw new Error("Not found");

    pledge = data;
  } catch (error) {
    pledge = DEFAULT_VALUES;
  }

  return {
    props: {
      domain,
      pageAddress: resolvedAddress,
      pledge: {
        ...pledge,
        ownerAddress: pledge?.ownerAddress || resolvedAddress,
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
