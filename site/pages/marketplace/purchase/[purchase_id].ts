import { Purchase } from "@klimadao/lib/types/marketplace";
import { queryMarketplaceByPurchase } from "@klimadao/lib/utils";
import { MarketPlacePurchaseReceipt } from "components/pages/Marketplace/PurchaseReceipt";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  purchase_id: string;
}

interface PageProps {
  purchase: Purchase;
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

    const purchase = await queryMarketplaceByPurchase(params.purchase_id);

    if (!purchase) {
      throw new Error("No purchase found");
    }

    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        purchase,
        translation,
      },
      revalidate: 240,
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
