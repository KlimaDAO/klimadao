import { GetStaticProps } from "next";

import { getPledge } from "queries/pledge";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { loadTranslation } from "lib/i18n";
import { getRetirements } from "lib/getRetirements";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;
  let retirements;

  try {
    const response = await getPledge({ address: address.toLowerCase() });
    const data = await response.json();

    pledge = data.pledge;
    retirements = await getRetirements({ address });
    console.log(retirements);
    if (!data.pledge) {
      pledge = null;
    }
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      translation,
      pledge,
      pageAddress: address,
      retirements,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default PledgeDashboard;
