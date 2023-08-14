import { Home } from "components/pages/Home";
import { getVerraCredits } from "lib/chartsData/getVerraCredits";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";


export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  const verraCredits = await getVerraCredits();
  return {
    props: {
      translation,
      fixedThemeName: "theme-light",
      verraCredits
    },
    revalidate: 3600,
  };
};

export default Home;
