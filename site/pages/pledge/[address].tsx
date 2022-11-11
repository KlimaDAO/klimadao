import { GetStaticProps } from "next";
import { utils } from "ethers";
import { ParsedUrlQuery } from "querystring";
import { urls } from "@klimadao/lib/constants";
import { getRetirementTotalsAndBalances } from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { loadTranslation } from "lib/i18n";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { getPledgeByAddress } from "components/pages/Pledge/lib/firebase";
import {
  DEFAULT_VALUES,
  queryHoldingsByAddress,
} from "components/pages/Pledge/lib";
import { Pledge, Holding } from "components/pages/Pledge/types";

interface Params extends ParsedUrlQuery {
  /** Either an 0x or a nameservice domain like atmosfearful.klima */
  address: string;
}

interface PageProps {
  canonicalUrl: string;
  domain: string | null;
  holdings: Holding[];
  pageAddress: string;
  pledge: Pledge;
  retirements: RetirementsTotalsAndBalances;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  try {
    const translation = await loadTranslation(ctx.locale);
    const { address } = ctx.params as { address: string };
    let pledge;
    let resolvedAddress;
    const isDomainInURL = getIsDomainInURL(address);
    const domain = isDomainInURL ? address : null;

    // enforces lowercase urls
    if (address !== address.toLowerCase()) {
      return {
        redirect: {
          destination: `/pledge/${address.toLowerCase()}`,
          permanent: true,
        },
      };
    }

    try {
      if (!isDomainInURL && !utils.isAddress(address))
        throw new Error("Invalid address");

      if (isDomainInURL) {
        resolvedAddress = await getAddressByDomain(address);
      } else {
        resolvedAddress = address.toLowerCase();
      }
    } catch {
      return {
        redirect: {
          destination: "/pledge",
          permanent: false,
        },
      };
    }

    const holdings = await queryHoldingsByAddress(resolvedAddress);
    const retirements = await getRetirementTotalsAndBalances({
      address: resolvedAddress,
    });

    try {
      const data = await getPledgeByAddress(resolvedAddress);
      if (!data) throw new Error("Not found");

      pledge = data;
    } catch (error) {
      pledge = { ...DEFAULT_VALUES, ownerAddress: resolvedAddress };
    }

    return {
      props: {
        canonicalUrl: `${urls.pledges}/${address}`,
        domain,
        holdings,
        pageAddress: resolvedAddress,
        pledge,
        retirements,
        translation,
      },
      revalidate: 180,
    };
  } catch (error) {
    console.error("Failed to generate", error);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default PledgeDashboard;
