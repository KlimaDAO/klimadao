import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { queryKlimaRetireByIndex } from "@klimadao/lib/utils";
import { getRetirementIndexInfo } from "@klimadao/lib/utils";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";

import { SingleRetirementPage } from "components/pages/Retirements/SingleRetirement";
import { loadTranslation } from "lib/i18n";

interface Params extends ParsedUrlQuery {
  beneficiary_address: string;
  retirement_index: string;
}

interface PageProps {
  beneficiaryAddress: Params["beneficiary_address"];
  retirementTotals: Params["retirement_index"];
  retirement: KlimaRetire;
  retirementIndexInfo: RetirementIndexInfoResult;
}

// second param should always be a number
const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    const { params, locale } = ctx;

    if (
      !params ||
      (!params?.beneficiary_address && !params?.retirement_index) ||
      (!!params.retirement_index && !isNumeric(params.retirement_index))
    ) {
      throw new Error("No matching params found");
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    const promises = [
      queryKlimaRetireByIndex(
        params?.beneficiary_address as string,
        retirementIndex
      ),
      getRetirementIndexInfo(
        params.beneficiary_address as string,
        retirementIndex
      ),
      loadTranslation(locale),
    ];

    const [retirement, retirementIndexInfo, translation] = await Promise.all(
      promises
    );

    if (!retirement) {
      throw new Error("No retirement found");
    }

    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        retirement,
        retirementIndexInfo,
        beneficiaryAddress: params.beneficiary_address,
        retirementTotals: params.retirement_index,
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

export default SingleRetirementPage;
