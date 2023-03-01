import { Home } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: { translation, fixedThemeName: "theme-light" },
  };
};

export default Home;
