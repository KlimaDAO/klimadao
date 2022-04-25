import { GetStaticProps } from "next";
import { Custom500 } from "components/pages/errors/Custom500";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
    revalidate: 60,
  };
};

export default Custom500;
