import { GetStaticProps } from "next";
import { Buy } from "components/pages/Buy";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
      fixedThemeName: "theme-dark", // ONLY FOR TESTING, REMOVE BEFORE MERGE
    },
  };
};

export default Buy;
