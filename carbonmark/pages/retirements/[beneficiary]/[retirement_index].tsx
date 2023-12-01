import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import { urls } from "@klimadao/lib/constants";
import { KlimaRetire, PendingKlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  getRetirementDetails,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { SingleRetirementPage } from "components/pages/Retirements/SingleRetirement";
import { isAddress } from "ethers-v6";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import { DetailedProject } from "lib/types/carbonmark.types";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
  retirement_index: string;
}

export interface SingleRetirementPageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  retirement: KlimaRetire | PendingKlimaRetire | any; // @todo - fix types & remove any (offset not being picked up in types)
  retirementIndex: Params["retirement_index"];
  nameserviceDomain: string | null;
  /** Version of this page that google will rank. Prefers nameservice, otherwise is a self-referential 0x canonical */
  canonicalUrl?: string;
  project?: DetailedProject | null;
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

    const [subgraphData, translation] = await Promise.all([
      queryKlimaRetireByIndex(beneficiaryAddress, retirementIndex),
      loadTranslation(locale),
    ]);
    let retirement = subgraphData;
    let isPending = false;

    if (!retirement) {
      const retirementDetails = await getRetirementDetails({
        beneficiaryAddress,
        index: retirementIndex,
      });
      isPending = !!retirementDetails; // if the details exist on-chain, we know the subgraph is slow to index
    }

    if (isPending) {
      // retry queryKlimaRetireByIndex every half second for a maximum of 5 seconds (10 retries)
      const timeoutMs = 500;
      const maxRetries = 10;
      let retries = 0;
      while (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, timeoutMs));
        const data = await queryKlimaRetireByIndex(
          beneficiaryAddress,
          retirementIndex
        );
        if (data) {
          isPending = false;
          retirement = data;
          break;
        }
        retries++;
      }
    }

    if (!retirement && !isPending) {
      return {
        notFound: true,
        revalidate: 1,
      };
    }

    if (!translation) {
      throw new Error("No translation found");
    }

    let project;
    if (retirement?.offset.projectID && retirement?.offset.vintageYear) {
      project = await getProjectsId(
        `${retirement.offset.projectID}-${retirement.offset.vintageYear}`
      );
    }

    return {
      props: {
        project: project || null,
        beneficiaryAddress: beneficiaryAddress,
        canonicalUrl: `${urls.retirements_carbonmark}/${beneficiaryInUrl}/${params.retirement_index}`,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        retirement: retirement || null,
        retirementIndex: params.retirement_index,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: isPending ? 1 : 86400,
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

export default SingleRetirementPage;
