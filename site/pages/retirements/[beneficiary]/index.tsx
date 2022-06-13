import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ethers } from "ethers";

import { getInfuraUrlPolygon } from "lib/getInfuraUrl";

import {
  getRetirementTotalsAndBalances,
  queryKlimaRetiresByAddress,
} from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import { RetirementPage } from "components/pages/Retirements";
import { loadTranslation } from "lib/i18n";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { getAddressByDomain } from "lib/getAddressByDomain";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
}

interface PageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[];
  nameserviceDomain: string | null;
  canonicalUrl: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    const { params, locale } = ctx;

    if (!params || !params?.beneficiary) {
      throw new Error("No params found");
    }

    let resolvedAddress: string;
    const isDomainInURL = getIsDomainInURL(params.beneficiary);
    if (isDomainInURL) {
      resolvedAddress = await getAddressByDomain(params.beneficiary); // this fn should throw if it fails to resolve
    } else if (ethers.utils.isAddress(params.beneficiary)) {
      resolvedAddress = params.beneficiary;
    } else {
      throw new Error("Not a valid beneficiary address");
    }

    const promises = [
      getRetirementTotalsAndBalances({
        address: resolvedAddress || (params.beneficiary as string),
        providerUrl: getInfuraUrlPolygon(),
      }),
      queryKlimaRetiresByAddress(resolvedAddress || params.beneficiary),
      loadTranslation(locale),
    ];

    const [totalsAndBalances, klimaRetires, translation] = await Promise.all(
      promises
    );

    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        totalsAndBalances,
        klimaRetires,
        beneficiaryAddress: resolvedAddress,
        nameserviceDomain: isDomainInURL ? params.beneficiary : null,
        canonicalUrl: `${urls.retirements}/${params.beneficiary}`,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default RetirementPage;
