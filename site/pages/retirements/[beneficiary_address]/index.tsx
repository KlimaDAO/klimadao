import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

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
  beneficiary_address: string;
}

interface PageProps {
  beneficiaryAddress: Params["beneficiary_address"];
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[];
  nameserviceDomain?: string;
  canonicalUrl?: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    const { params, locale } = ctx;

    if (!params || !params?.beneficiary_address) {
      throw new Error("No params found");
    }

    let addressByDomain;
    const isDomainInURL = getIsDomainInURL(params.beneficiary_address);
    if (isDomainInURL) {
      addressByDomain = await getAddressByDomain(params.beneficiary_address);
    }

    // Do not continue if KNS or ENS Domain can not be resolved
    if (addressByDomain === null) {
      throw new Error("No valid KNS or ENS domain holder address found !");
    }

    const promises = [
      getRetirementTotalsAndBalances({
        address: addressByDomain || (params.beneficiary_address as string),
        providerUrl: getInfuraUrlPolygon(),
      }),
      queryKlimaRetiresByAddress(addressByDomain || params.beneficiary_address),
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
        beneficiaryAddress: params.beneficiary_address,
        nameserviceDomain: !!addressByDomain
          ? params.beneficiary_address
          : undefined,
        canonicalUrl: !!addressByDomain
          ? `${urls.retirements}/${addressByDomain}`
          : undefined,
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
