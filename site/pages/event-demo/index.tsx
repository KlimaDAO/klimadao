import { GetStaticProps } from "next";

import LiveOffset from "@klimadao/lib/abi/LiveOffset.json";
import { addresses } from "@klimadao/lib/constants";
import { getInfuraUrlPolygon, getJsonRpcProvider } from "@klimadao/lib/utils";
import { EventDemo } from "components/pages/EventDemo";
import { Contract } from "ethers";
<<<<<<< HEAD
import { loadTranslation } from "lib/i18n";
=======
import { getJsonRpcProvider, getInfuraUrl } from "@klimadao/lib/utils";
>>>>>>> bb810074 (infura id required and get url functions combined)

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    const provider = getJsonRpcProvider(
      getInfuraUrl({
        chain: "polygon",
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
      })
    );
    const LiveOffsetContract = new Contract(
      addresses["mainnet"].liveOffsetContract,
      LiveOffset.abi,
      provider
    );

    const [_beneficiaryAddress, _quantity, eventTitle] =
      await LiveOffsetContract.getEventData();

    return {
      props: {
        translation,
        fixedThemeName: "theme-dark",
        eventTitle: eventTitle || null,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.error("Failed to generate", e);
    return {
      notFound: true,
    };
  }
};

export default EventDemo;
