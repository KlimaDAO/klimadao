import { GetStaticProps } from "next";

import { EventDemo } from "components/pages/EventDemo";
import { loadTranslation } from "lib/i18n";
import LiveOffset from "@klimadao/lib/abi/LiveOffset.json";
import { addresses } from "@klimadao/lib/constants";
import { Contract } from "ethers";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);
    if (!translation) {
      throw new Error("No translation found");
    }
    const provider = getJsonRpcProvider(getInfuraUrlPolygon());
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
