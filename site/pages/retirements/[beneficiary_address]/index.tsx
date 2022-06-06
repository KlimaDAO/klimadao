import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { INFURA_ID } from "lib/constants";

import {
  getRetirementTotalsAndBalances,
  queryKlimaRetiresByAddress,
} from "@klimadao/lib/utils";
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
        infuraId: INFURA_ID,
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
