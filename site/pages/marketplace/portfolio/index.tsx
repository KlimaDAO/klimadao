import { GetStaticProps } from "next";
import { Portfolio } from "components/pages/Marketplace/Portfolio";
import { loadTranslation } from "lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Portfolio Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default Portfolio;
