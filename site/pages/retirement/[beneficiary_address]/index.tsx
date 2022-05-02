import { GetStaticProps } from "next";

import { getRetirements } from "@klimadao/lib/utils";
import { RetirementPage } from "components/pages/Retirement";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const { params, locale } = ctx;

    if (!params || !params?.beneficiary_address) {
      throw new Error("No params found");
    }
    const retirements = await getRetirements(
      params.beneficiary_address as string
    );

    const translation = await loadTranslation(locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        retirements,
        translation,
      },
      revalidate: 120,
    };
  } catch (e) {
    console.error("Failed to generate", e);
    return {
      notFound: true,
      revalidate: 120,
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
