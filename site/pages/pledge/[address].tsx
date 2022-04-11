import { GetStaticProps } from "next";

import { getPledge } from "queries/pledge";
import { PledgeDashboard } from "components/pages/Pledge/PledgeDashboard";
import { loadTranslation } from "lib/i18n";
import { getRetirements } from "lib/getRetirements";
import { getBalances } from "lib/getBalances";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };

  let balances;
  let pledge;
  let retirements;

  try {
    const response = await getPledge({ address: address.toLowerCase() });
    const data = await response.json();

    pledge = data.pledge;
    balances = await getBalances({ address });
    retirements = await getRetirements({ address });

    if (!data.pledge) {
      pledge = null;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      balances,
      pageAddress: address,
      pledge,
      retirements,
      translation,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default PledgeDashboard;
