import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { IS_PRODUCTION } from "lib/constants";

import { getRetirements } from "@klimadao/lib/utils";
import { RetirementsResult } from "@klimadao/lib/types/offset";

import { RetirementPage } from "components/pages/Retirements";
import { loadTranslation } from "lib/i18n";

interface Params extends ParsedUrlQuery {
  beneficiary_address: string;
}

interface PageProps {
  beneficiaryAddress: Params["beneficiary_address"];
  retirements: RetirementsResult;
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
      getRetirements(params.beneficiary_address as string),
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
