import { utils } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { urls } from "@klimadao/lib/constants";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  getInfuraUrl,
  getRetirementTotalsAndBalances,
  queryKlimaRetiresByAddress,
} from "@klimadao/lib/utils";

import { RetirementPage } from "components/pages/Retirements";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getDomainByAddress } from "lib/getDomainByAddress";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
}

interface PageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[] | null;
  nameserviceDomain: string | null;
  canonicalUrl: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    const { params, locale } = ctx;

    if (!params || !params?.beneficiary) {
      throw new Error("No params found");
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
          destination: `/retirements/${nameserviceDomain}`,
          statusCode: 301,
        },
      };
    }

    // enforces lowercase urls
    if (!isDomainInURL && beneficiaryInUrl !== beneficiaryInUrl.toLowerCase()) {
      return {
        redirect: {
          destination: `/retirements/${beneficiaryInUrl.toLowerCase()}`,
          permanent: true,
        },
      };
    }

    let beneficiaryAddress: string;
    if (isDomainInURL) {
      beneficiaryAddress = await getAddressByDomain(beneficiaryInUrl); // this fn should throw if it fails to resolve
    } else {
      beneficiaryAddress = beneficiaryInUrl;
    }

    const promises = [
      getRetirementTotalsAndBalances({
        address: beneficiaryAddress,
        providerUrl: getInfuraUrl({
          chain: "polygon",
          infuraId: INFURA_ID,
        }),
      }),
      queryKlimaRetiresByAddress(beneficiaryAddress),
      loadTranslation(locale),
    ];

    const [totalsAndBalances, klimaRetires, translation] = await Promise.all(
      promises
    );

    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        totalsAndBalances,
        klimaRetires: klimaRetires || null,
        beneficiaryAddress: beneficiaryAddress,
        nameserviceDomain: isDomainInURL ? beneficiaryInUrl : null,
        canonicalUrl: `${urls.retirements}/${beneficiaryInUrl}`,
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
