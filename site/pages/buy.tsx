import { GetStaticProps } from "next";
import { Buy } from "components/pages/Buy";
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

export default Buy;
