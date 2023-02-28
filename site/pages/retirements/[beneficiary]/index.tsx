import { urls } from "@klimadao/lib/constants";
import {
  getTotalCarbonRetired,
  getTotalRetirements,
  queryKlimaRetiresByAddress,
} from "@klimadao/lib/utils";
import { Props, RetirementPage } from "components/pages/Retirements";
import { utils } from "ethers";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { loadTranslation } from "lib/i18n";
import { INFURA_ID } from "lib/secrets";
import { GetStaticProps } from "next";

type Params = {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  beneficiary: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
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

    const [totalRetirements, totalCarbonRetired, klimaRetires, translation] =
      await Promise.all([
        getTotalRetirements({ beneficiaryAddress, infuraId: INFURA_ID }),
        getTotalCarbonRetired({ beneficiaryAddress, infuraId: INFURA_ID }),
        queryKlimaRetiresByAddress(beneficiaryAddress),
        loadTranslation(locale),
      ]);

    if (!translation) {
      throw new Error("No translation found");
    }
    return {
      props: {
        totalRetirements,
        totalCarbonRetired,
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
