import { utils } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { urls } from "@klimadao/lib/constants";
import { KlimaRetire, PendingKlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  getRetirementDetails,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";

import { getPledgeByAddress } from "components/pages/Pledge/lib/firebase";
import { Pledge } from "components/pages/Pledge/types";
import { SingleRetirementPage } from "components/pages/Retirements/SingleRetirement";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
  retirement_index: string;
}

export interface SingleRetirementPageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  retirement: KlimaRetire | PendingKlimaRetire;
  retirementIndex: Params["retirement_index"];
  nameserviceDomain: string | null;
  /** Version of this page that google will rank. Prefers nameservice, otherwise is a self-referential 0x canonical */
  canonicalUrl?: string;
  pledge: Pledge | null;
}

// second param should always be a number
const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};

export const getStaticProps: GetStaticProps<
  SingleRetirementPageProps,
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
    const isValidAddress = !isDomainInURL && utils.isAddress(beneficiaryInUrl);

    if (!isDomainInURL && !isValidAddress) {
      throw new Error("Not a valid beneficiary address");
    }

    let beneficiaryAddress: string;
    if (isDomainInURL) {
      beneficiaryAddress = await getAddressByDomain(beneficiaryInUrl); // this fn should throw if it fails to resolve
    } else {
      beneficiaryAddress = beneficiaryInUrl;
    }

    let pledge: Pledge | null;
    try {
      pledge = await getPledgeByAddress(beneficiaryAddress.toLowerCase());
    } catch (_e) {
      // no pledge found
      pledge = null;
    }

    const retirementIndex = Number(params.retirement_index) - 1; // totals does not include index 0

    let retirement: KlimaRetire | PendingKlimaRetire;
    const [subgraphData, translation] = await Promise.all([
      queryKlimaRetireByIndex(beneficiaryAddress, retirementIndex),
      loadTranslation(locale),
    ]);
    if (subgraphData) {
      retirement = subgraphData;
    } else {
      // if the subgraph is slow to index, try grabbing the retirement directly from the storage contract
      const fallbackData = await getRetirementDetails({
        beneficiaryAddress,
        index: retirementIndex,
        infuraId: INFURA_ID,
      });
      if (!fallbackData) {
        // if no fallback data and no subgraph data, it probably never existed, return page 404
        throw new Error(
          `No retirement found for address ${beneficiaryAddress} at index ${retirementIndex}`
        );
      }
      // construct PendingKlimaRetire
      retirement = {
        pending: true,
        amount: fallbackData.amount,
        beneficiary: fallbackData.beneficiary,
        beneficiaryAddress,
        retirementMessage: fallbackData.retirementMessage,
      };
    }

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        beneficiaryAddress: beneficiaryAddress,
        canonicalUrl: `${urls.retirements}/${beneficiaryInUrl}/${params.retirement_index}`,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        retirement: retirement || null,
        retirementIndex: params.retirement_index,
        translation,
        pledge,
      },
      revalidate: retirement.pending ? 4 : 240,
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
