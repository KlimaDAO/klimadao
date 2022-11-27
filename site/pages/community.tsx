import { Community } from "components/pages/About/Community";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
  };
};

export default Community;
