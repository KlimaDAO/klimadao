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

interface Params extends ParsedUrlQuery {
  beneficiary_address: string;
  retirement_index: string;
}

interface PageProps {
  beneficiaryAddress: Params["beneficiary_address"];
  retirementTotals: Params["retirement_index"];
  retirement: KlimaRetire;
  retirementIndexInfo: RetirementIndexInfoResult;
  projectDetails: VerraProjectDetails | null;
  nameserviceDomain?: string;
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
      (!params?.beneficiary_address && !params?.retirement_index) ||
      (!!params.retirement_index && !isNumeric(params.retirement_index))
    ) {
      throw new Error("No matching params found");
    }

    let resolvedAddress: string;
    const isDomainInURL = getIsDomainInURL(params.beneficiary_address);
    if (isDomainInURL) {
      resolvedAddress = await getAddressByDomain(params.beneficiary_address); // this fn should throw if it fails to resolve
    } else if (ethers.utils.isAddress(params.beneficiary_address)) {
      resolvedAddress = params.beneficiary_address;
    } else {
      throw new Error("Not a valid beneficiary address");
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    const promises: [
      Promise<KlimaRetire | false>,
      Promise<RetirementIndexInfoResult>,
      Promise<Record<string, unknown>>
    ] = [
      queryKlimaRetireByIndex(
        resolvedAddress || (params.beneficiary_address as string),
        retirementIndex
      ),
      getRetirementIndexInfo({
        beneficiaryAdress:
          resolvedAddress || (params.beneficiary_address as string),
        index: retirementIndex,
        providerUrl: getInfuraUrlPolygon(),
      }),
      loadTranslation(locale),
    ];

    const [retirement, retirementIndexInfo, translation] = await Promise.all(
      promises
    );

    if (!retirement || !retirementIndexInfo) {
      throw new Error("No retirement found");
    }

    if (!translation) {
      throw new Error("No translation found");
    }

    let projectDetails = null;
    if (!!retirement.offset.projectID) {
      projectDetails = await getVerraProjectByID(
        retirement.offset.projectID.replace("VCS-", "")
      );
    }

    return {
      props: {
        retirement,
        retirementIndexInfo,
        beneficiaryAddress: params.beneficiary_address,
        retirementTotals: params.retirement_index,
        translation,
        projectDetails,
        nameserviceDomain: !!resolvedAddress
          ? params.beneficiary_address
          : undefined,
        canonicalUrl: !!resolvedAddress
          ? `${urls.retirements}/${resolvedAddress}/${params.retirement_index}`
          : undefined,
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
