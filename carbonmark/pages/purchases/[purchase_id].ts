import { getPurchasesId } from ".generated/carbonmark-api-sdk/clients";
import { PageProps, PurchaseReceipt } from "components/pages/Purchases";
import { IS_PRODUCTION } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { Purchase } from "lib/types/carbonmark.types";
import { isNil } from "lodash";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  purchase_id: string;
}

const isValidTransactionHash = (hash: string) => {
  return /^0x([A-Fa-f0-9]{64})$/.test(hash);
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  try {
    if (
      !params ||
      !params?.purchase_id ||
      !isValidTransactionHash(params.purchase_id)
    ) {
      throw new Error("No matching params found");
    }
    let purchase: Purchase | null = null;
    // try mainnet first
    try {
      purchase = await getPurchasesId(params.purchase_id);
      if (isNil(purchase)) throw new Error("No mainnet purchase found");
    } catch (e) {
      // if mainnet 404s, try testnet in next block
    }

    if (!purchase && !IS_PRODUCTION) {
      try {
        purchase = await getPurchasesId(params.purchase_id, {
          network: "mumbai",
        });
        if (isNil(purchase)) throw new Error("No testnet purchase found");
      } catch (e) {
        // if testnet 404s, check that txn exists on mainnet
      }
    }

    // if not found, check that the txn actually exists. If not, throw 404
    if (!purchase) {
      let transactionReceipt = await getStaticProvider().getTransactionReceipt(
        params.purchase_id
      );
      if (!transactionReceipt && !IS_PRODUCTION) {
        transactionReceipt = await getStaticProvider({
          chain: "mumbai",
        }).getTransactionReceipt(params.purchase_id);
      }
      if (!transactionReceipt) {
        throw new Error("No transaction receipt found");
      }
      // if the txn does exist, simply log for telemetry purposes, fall through to return `null` and handle case on the frontend.
      console.warn(
        `API and Subgraph failed to index recent purchase: purchase_id: ${params.purchase_id}`
      );
    }

    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        purchase,
        translation,
        transaction: params.purchase_id,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(
      "Failed to generate Carbonmark Purchase Receipt Page",
      e.message
    );
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default PurchaseReceipt;
