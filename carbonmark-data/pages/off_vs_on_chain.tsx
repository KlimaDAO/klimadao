import { OffVsOnChain } from "components/pages/OffVsOnChain";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";


export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 3600,
  };
};

export default OffVsOnChain;
