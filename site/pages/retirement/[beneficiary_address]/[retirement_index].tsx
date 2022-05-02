import { GetStaticProps } from "next";

import { getRetirementIndexInfo } from "@klimadao/lib/utils";
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
    const retirementIndexInfo = await getRetirementIndexInfo(
      params.beneficiary_address as string,
      Number(params.retirement_index)
    );

    const translation = await loadTranslation(locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        retirementIndexInfo,
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

export default SingleRetirementPage;
