import { GetStaticProps } from "next";

import LiveOffset from "@klimadao/lib/abi/LiveOffset.json";
import { addresses } from "@klimadao/lib/constants";
import { getInfuraUrl, getJsonRpcProvider } from "@klimadao/lib/utils";
import { EventDemo } from "components/pages/EventDemo";
import { Contract } from "ethers";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    const provider = getJsonRpcProvider(
      getInfuraUrl({
        chain: "polygon",
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
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
