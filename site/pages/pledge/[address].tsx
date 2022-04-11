import { GetStaticProps } from "next";

import { Pledge } from "components/pages/Pledge";
import { getPledge } from "queries/pledge";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;

  try {
    const response = await getPledge(address.toLowerCase());
    const data = await response.json();
    pledge = data.pledge;

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
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export default Pledge;
