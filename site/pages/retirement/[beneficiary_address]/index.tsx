import { GetStaticProps } from "next";

import { IS_PRODUCTION } from "lib/constants";

import { getRetirements } from "@klimadao/lib/utils";
import { RetirementPage } from "components/pages/Retirement";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
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
