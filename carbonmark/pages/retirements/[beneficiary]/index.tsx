import { urls } from "@klimadao/lib/constants";
import { formatUnits } from "@klimadao/lib/utils";
import { Props, RetirementPage } from "components/pages/Retirements";
import { isAddress } from "ethers-v6";
import { loadTranslation } from "lib/i18n";
import { getAddressByDomain } from "lib/shared/getAddressByDomain";
import { getIsDomainInURL } from "lib/shared/getIsDomainInURL";
import { GetStaticProps } from "next";
import { queryKlimaRetiresByAddress } from "../../../lib/retirementDataQueries/retirementDataViaPolygonDigitalCarbon";

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
    const isValidAddress = !isDomainInURL && isAddress(beneficiaryInUrl);

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

    let totalRetirements = 0;
    let totalCarbonRetired = "0";

    const [klimaRetires, translation] = await Promise.all([
      queryKlimaRetiresByAddress(beneficiaryAddress),
      loadTranslation(locale),
    ]);

    if (Array.isArray(klimaRetires)) {
      totalRetirements = klimaRetires.length;

      try {
        totalCarbonRetired = klimaRetires
          .reduce((acc, retirement) => {
            const amount = formatUnits(retirement.retire.amount);
            return acc + parseFloat(amount);
          }, 0)
          .toString();
      } catch (e) {
        throw new Error(
          `Invalid retirement.amount in the array klimaRetires: ${e}`
        );
      }
    } else {
      console.error("klimaRetires is not an array");
    }

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
        canonicalUrl: `${urls.retirements_carbonmark}/${beneficiaryInUrl}`,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 240,
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

export default RetirementPage;
