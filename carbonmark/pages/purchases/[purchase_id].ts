import { Purchase } from "@klimadao/lib/types/marketplace";
import { getPurchase, getStaticProvider } from "@klimadao/lib/utils";
import { MarketPlacePurchaseReceipt } from "components/pages/Purchases";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  purchase_id: string;
}

interface PageProps {
  purchase: Purchase | null;
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

    const provider = getStaticProvider({ chain: "mumbai" }); // TODO: Change this to simply getStaticProvider() after switch to mainnet
    const transactionReceipt = await provider.getTransactionReceipt(
      params.purchase_id
    );

    if (!transactionReceipt) {
      throw new Error(
        "No transactionReceipt found. Not a valid transaction on chain."
      );
    }

    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    let purchase = null;
    try {
      purchase = await getPurchase({ id: params.purchase_id });
    } catch (e) {
      // Only log the error on server,
      // Render page with default data because transaction was valid on chain
      console.error("Failed to get Purchase from Marketplace API", e);
    }

    return {
      props: {
        purchase,
        translation,
        transaction: params.purchase_id,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Purchase Receipt Page", e);
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

export default MarketPlacePurchaseReceipt;
