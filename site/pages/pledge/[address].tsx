import { GetStaticProps } from "next";

import { Pledge } from "components/pages/Pledge";
import { getPledge } from "queries/pledge";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const { address } = ctx.params as { address: string };
  let pledge;

  try {
    const reponse = await getPledge(address.toLowerCase());
    const data = await reponse.json();
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
