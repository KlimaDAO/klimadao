import { PurchaseReceipt } from "components/pages/Purchases";
import { client } from "lib/api/client";
import { loadTranslation } from "lib/i18n";
import { getStaticProvider } from "lib/networkAware/getStaticProvider";
import { Purchase } from "lib/types/carbonmark.types";
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

    const provider = getStaticProvider();
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

    const response = await client[`/purchases/{id}`].get({
      params: {
        id: params.purchase_id,
      },
    });

    const purchase = await response.json();

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
    console.error("Failed to generate Carbonmark Purchase Receipt Page", e);
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
