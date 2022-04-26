import { GetStaticProps } from "next";
import { Custom404 } from "components/pages/errors/Custom404";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
  };
};

export default Custom404;
