import {
  getRetirements,
  getRetirementsId,
  getRetirementsIdProvenance,
} from ".generated/carbonmark-api-sdk/clients";
import {
  GetRetirementsIdProvenanceQueryResponse,
  GetRetirementsIdQueryResponse,
} from ".generated/carbonmark-api-sdk/types";
import { urls } from "@klimadao/lib/constants";
import { RetirementProvenancePage } from "components/pages/Retirements/RetirementProvenance";
import { isAddress } from "ethers-v6";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
  retirement_index: string;
}

export interface RetirementProvenancePageProps {
  /** The resolved 0x address */
  retirement: GetRetirementsIdQueryResponse;
  /** Version of this page that google will rank. Prefers nameservice, otherwise is a self-referential 0x canonical */
  canonicalUrl?: string;
  provenance: GetRetirementsIdProvenanceQueryResponse;
  nameserviceDomain: string | null;
  retirementIndex: string;
  beneficiaryAddress: string;
}

// second param should always be a number
const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};

export const getStaticProps: GetStaticProps<
  RetirementProvenancePageProps,
  Params
> = async (ctx) => {
  try {
    const { params, locale } = ctx;

    if (
      !params ||
      (!params?.beneficiary && !params?.retirement_index) ||
      (!!params.retirement_index && !isNumeric(params.retirement_index))
    ) {
      throw new Error("No matching params found");
    }

    const beneficiaryInUrl = params.beneficiary;
    const isDomainInURL = getIsDomainInURL(beneficiaryInUrl);
    const isValidAddress = !isDomainInURL && isAddress(beneficiaryInUrl);

    if (!isDomainInURL && !isValidAddress) {
      throw new Error("Not a valid beneficiary address");
    }

    let beneficiaryAddress: string;
    if (isDomainInURL) {
      beneficiaryAddress = await getAddressByDomain(beneficiaryInUrl); // this fn should throw if it fails to resolve
    } else {
      beneficiaryAddress = beneficiaryInUrl;
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    const searchedRetirement = (
      await getRetirements({ beneficiaryAddress, retirementIndex })
    )[0];

    if (searchedRetirement === undefined) {
      throw new Error("No retirement found");
    }
    const retirement = await getRetirementsId(searchedRetirement.hash);

    const [provenance, translation] = await Promise.all([
      getRetirementsIdProvenance(retirement.hash),
      loadTranslation(locale),
    ]);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        retirement: retirement,
        provenance,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        canonicalUrl: `${urls.retirements_carbonmark}/${beneficiaryInUrl}/${params.retirement_index}/provenance`,
        beneficiaryAddress: beneficiaryAddress,
        retirementIndex: params.retirement_index,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 86400,
    };
  } catch (e) {
    console.error("Failed to generate", e);
    return {
      notFound: true,
      revalidate: 1,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default RetirementProvenancePage;
