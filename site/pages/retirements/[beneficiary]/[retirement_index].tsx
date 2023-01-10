import { utils } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { urls } from "@klimadao/lib/constants";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import {
  getInfuraUrl,
  getRetirementIndexInfo,
  getVerraProjectByID,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";

import { SingleRetirementPage } from "components/pages/Retirements/SingleRetirement";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getDomainByAddress } from "lib/getDomainByAddress";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
  retirement_index: string;
}

interface PageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  retirement: KlimaRetire | null;
  retirementIndex: Params["retirement_index"];
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
    const isValidAddress = !isDomainInURL && utils.isAddress(beneficiaryInUrl);

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
        providerUrl: getInfuraUrl({
          chain: "polygon",
          infuraId: INFURA_ID,
        }),
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
        beneficiaryAddress: beneficiaryAddress,
        canonicalUrl: `${urls.retirements}/${beneficiaryInUrl}/${params.retirement_index}`,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        projectDetails,
        retirement: retirement || null,
        retirementIndex: params.retirement_index,
        retirementIndexInfo,
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
