import { GetStaticProps } from "next";

import { EventDemo } from "components/pages/EventDemo";
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
        fixedThemeName: "theme-dark",
      },
    };
  } catch (e) {
    console.error("Failed to generate", e);
    return {
      notFound: true,
    };
  }
};

export default EventDemo;
