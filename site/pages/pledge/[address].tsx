import { urls } from "@klimadao/lib/constants";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { getRetirementTotalsAndBalances } from "@klimadao/lib/utils";
import { utils } from "ethers";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  DEFAULT_PLEDGE_VALUES,
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

    try {
      const data = await getPledgeByAddress(resolvedAddress);
      if (!data) throw new Error("Not found");

      pledge = data;
    } catch (error) {
      pledge = { ...DEFAULT_PLEDGE_VALUES, ownerAddress: resolvedAddress };
    }

    // const holdings = await queryHoldingsByAddress(resolvedAddress);
    let holdings;
    // add up retirements and holdings here
    let retirements: RetirementsTotalsAndBalances;
    if (pledge.wallets && Object.values(pledge.wallets).length) {
      const verifiedWallets = Object.values(pledge.wallets).filter(
        (wallet) => wallet.status === "verified"
      );
      // Retirements
      const retirementPromises = verifiedWallets.map((wallet) =>
        getRetirementTotalsAndBalances({
          address: wallet.address,
        })
      );
      retirementPromises.push(
        getRetirementTotalsAndBalances({
          address: resolvedAddress,
        })
      );
      const retirementValues: RetirementsTotalsAndBalances[] =
        await Promise.all(retirementPromises);
      const reducedRetirements =
        retirementValues.reduce<RetirementsTotalsAndBalances>(
          (prev, curr) => {
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
          },
          {
            totalRetirements: "0",
            totalTonnesRetired: "0.0",
            totalTonnesClaimedForNFTS: "0.0",
            bct: "0.0",
            mco2: "0.0",
            nct: "0.0",
            ubo: "0.0",
            nbo: "0.0",
          }
        );
      retirements = reducedRetirements;

      // Holdings
      const holdingsPromises = verifiedWallets.map((wallet) =>
        queryHoldingsByAddress(wallet.address)
      );
      holdingsPromises.push(queryHoldingsByAddress(resolvedAddress));
      const holdingsValues = await Promise.all(holdingsPromises);
      console.log(
        "holdingsValues",
        holdingsValues,
        holdingsPromises,
        await queryHoldingsByAddress(resolvedAddress)
      );
      const mergedHoldings = holdingsValues[0];
      holdings = mergedHoldings;
    } else {
      retirements = await getRetirementTotalsAndBalances({
        address: resolvedAddress,
      });
      holdings = await queryHoldingsByAddress(resolvedAddress);
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
