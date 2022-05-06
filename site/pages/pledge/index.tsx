import { GetStaticProps } from "next";

import { Pledge } from "components/pages/Pledge";
import { loadTranslation } from "lib/i18n";
import { IS_PRODUCTION } from "lib/constants";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);

  if (IS_PRODUCTION) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      translation,
    },
    revalidate: 180,
  };
};

export default Pledge;
