import { GetStaticProps } from "next";

import { queryKlimaRetireByIndex } from "@klimadao/lib/utils";
import { SingleRetirementPage } from "components/pages/Retirement/SingleRetirement";
import { loadTranslation } from "lib/i18n";
import { IS_PRODUCTION } from "lib/constants";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    if (IS_PRODUCTION) {
      throw new Error("Not on Staging");
    }

    const { params, locale } = ctx;

    if (
      !params ||
      (!params?.beneficiary_address && !params?.retirement_index) ||
      (!!params.retirement_index && Number(params.retirement_index) === NaN)
    ) {
      throw new Error("No params found");
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    const retirement = await queryKlimaRetireByIndex(
      params?.beneficiary_address as string,
      retirementIndex
    );

    if (!retirement) {
      throw new Error("No retirement found");
    }

    const translation = await loadTranslation(locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        retirement,
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
