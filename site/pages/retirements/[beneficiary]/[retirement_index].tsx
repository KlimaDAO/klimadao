import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ethers } from "ethers";

import {
  queryKlimaRetireByIndex,
  getVerraProjectByID,
  getRetirementIndexInfo,
} from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";

import { SingleRetirementPage } from "components/pages/Retirements/SingleRetirement";
import { loadTranslation } from "lib/i18n";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getDomainByAddress } from "lib/getDomainByAddress";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
  retirement_index: string;
}

interface PageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  retirementTotals: Params["retirement_index"];
  retirement: KlimaRetire | null;
  retirementIndexInfo: RetirementIndexInfoResult;
  projectDetails: VerraProjectDetails | null;
  nameserviceDomain: string | null;
  /** Version of this page that google will rank. Prefers nameservice, otherwise is a self-referential 0x canonical */
  canonicalUrl?: string;
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
      (!params?.beneficiary && !params?.retirement_index) ||
      (!!params.retirement_index && !isNumeric(params.retirement_index))
    ) {
      throw new Error("No matching params found");
    }

    const beneficiaryInUrl = params.beneficiary;
    const isDomainInURL = getIsDomainInURL(beneficiaryInUrl);
    const isValidAddress =
      !isDomainInURL && ethers.utils.isAddress(beneficiaryInUrl);

    if (!isDomainInURL && !isValidAddress) {
      throw new Error("Not a valid beneficiary address");
    }

    const nameserviceDomain =
      !isDomainInURL && (await getDomainByAddress(beneficiaryInUrl));

    // redirect now to this page again with nameserviceDomain in URL
    if (nameserviceDomain) {
      return {
        redirect: {
          destination: `/retirements/${nameserviceDomain}/${params.retirement_index}`,
          statusCode: 301,
        },
      };
    }

    let beneficiaryAddress: string;
    if (isDomainInURL) {
      beneficiaryAddress = await getAddressByDomain(beneficiaryInUrl); // this fn should throw if it fails to resolve
    } else {
      beneficiaryAddress = beneficiaryInUrl;
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    const promises: [
      Promise<KlimaRetire | false>,
      Promise<RetirementIndexInfoResult>,
      Promise<Record<string, unknown>>
    ] = [
      queryKlimaRetireByIndex(beneficiaryAddress, retirementIndex),
      getRetirementIndexInfo({
        beneficiaryAddress: beneficiaryAddress,
        index: retirementIndex,
        providerUrl: getInfuraUrlPolygon(),
      }),
      loadTranslation(locale),
    ];

    const [retirement, retirementIndexInfo, translation] = await Promise.all(
      promises
    );

    if (!retirementIndexInfo) {
      throw new Error("No retirement found");
    }

    if (!translation) {
      throw new Error("No translation found");
    }

    let projectDetails: VerraProjectDetails | null = null;
    if (retirement && !!retirement.offset.projectID) {
      projectDetails = await getVerraProjectByID(
        retirement.offset.projectID.replace("VCS-", "")
      );
    }

    return {
      props: {
        retirement: retirement || null,
        retirementIndexInfo,
        beneficiaryAddress: beneficiaryAddress,
        retirementTotals: params.retirement_index,
        translation,
        projectDetails,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        canonicalUrl: `${urls.retirements}/${beneficiaryInUrl}/${params.retirement_index}`,
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
