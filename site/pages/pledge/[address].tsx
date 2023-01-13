import { urls } from "@klimadao/lib/constants";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { getRetirementTotalsAndBalances } from "@klimadao/lib/utils";
import { utils } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  DEFAULT_VALUES,
  queryHoldingsByAddress,
} from "components/pages/Pledge/lib";
import {
  getParentPledges,
  getPledgeByAddress,
} from "components/pages/Pledge/lib/firebase";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { Holding, Pledge } from "components/pages/Pledge/types";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { loadTranslation } from "lib/i18n";

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
    const { address } = ctx.params as { address: string };
    // enforces lowercase urls
    if (address !== address.toLowerCase()) {
      return {
        redirect: {
          destination: `/pledge/${address.toLowerCase()}`,
          permanent: true,
        },
      };
    }
    const translation = await loadTranslation(ctx.locale);
    let pledge;
    let resolvedAddress;
    const isDomainInURL = getIsDomainInURL(address);
    const domain = isDomainInURL ? address : null;
    const parentPledges = await getParentPledges({
      address: address,
    });
    if (parentPledges.docs.length) {
      return {
        redirect: {
          destination: `/pledge/${parentPledges.docs[0]
            .data()
            .ownerAddress.toLowerCase()}`,
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

    try {
      const data = await getPledgeByAddress(resolvedAddress);
      if (!data) throw new Error("Not found");

      pledge = data;
    } catch (error) {
      pledge = { ...DEFAULT_VALUES, ownerAddress: resolvedAddress };
    }

    // add up retirements here
    let retirements: RetirementsTotalsAndBalances;
    if (pledge.wallets && Object.values(pledge.wallets).length) {
      const verifiedWallets = Object.values(pledge.wallets).filter(
        (wallet) => wallet.status === "verified"
      );
      const promises = verifiedWallets.map((wallet) =>
        getRetirementTotalsAndBalances({
          address: wallet.address,
        })
      );
      promises.push(
        getRetirementTotalsAndBalances({
          address: resolvedAddress,
        })
      );
      const values: RetirementsTotalsAndBalances[] = await Promise.all(
        promises
      );
      values.reduce<RetirementsTotalsAndBalances>((prev, curr) => {
        prev.totalRetirements = (
          Number(prev.totalRetirements) + Number(curr.totalRetirements)
        ).toString();
        prev.totalTonnesRetired = (
          Number(prev.totalTonnesRetired) + Number(curr.totalTonnesRetired)
        ).toString();
        prev.totalTonnesClaimedForNFTS = (
          Number(prev.totalTonnesClaimedForNFTS) +
          Number(curr.totalTonnesClaimedForNFTS)
        ).toString();
        prev.bct = (Number(prev.bct) + Number(curr.bct)).toString();
        prev.mco2 = (Number(prev.mco2) + Number(curr.mco2)).toString();
        prev.nct = (Number(prev.nct) + Number(curr.nct)).toString();
        prev.ubo = (Number(prev.ubo) + Number(curr.ubo)).toString();
        prev.nbo = (Number(prev.nbo) + Number(curr.nbo)).toString();

        return prev;
      }, {} as RetirementsTotalsAndBalances);
      if (values.length) {
        retirements = values[0];
      } else {
        retirements = values as unknown as RetirementsTotalsAndBalances;
      }
    } else {
      retirements = await getRetirementTotalsAndBalances({
        address: resolvedAddress,
      });
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
