import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { INFURA_ID, IS_PRODUCTION } from "lib/constants";

import { getRetirementTotalsAndBalances } from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { RetirementPage } from "components/pages/Retirements";
import { loadTranslation } from "lib/i18n";

interface Params extends ParsedUrlQuery {
  beneficiary_address: string;
}

interface PageProps {
  beneficiaryAddress: Params["beneficiary_address"];
  retirements: RetirementsTotalsAndBalances;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    if (IS_PRODUCTION) {
      throw new Error("Not on Staging");
    }

    const { params, locale } = ctx;

    if (!params || !params?.beneficiary_address) {
      throw new Error("No params found");
    }

    const promises = [
      getRetirementTotalsAndBalances({
        address: params.beneficiary_address as string,
        infuraId: INFURA_ID,
      }),
      loadTranslation(locale),
    ];

    const [retirements, translation] = await Promise.all(promises);

    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        retirements,
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
