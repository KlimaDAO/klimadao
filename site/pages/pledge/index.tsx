import { GetStaticProps } from "next";

import { Pledge } from "components/pages/Pledge";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);

  return {
    props: {
      translation,
    },
    revalidate: 180,
  };
};

export default Pledge;
