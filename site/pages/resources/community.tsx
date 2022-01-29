import { GetStaticProps } from "next";
import { Community } from "components/pages/Resources/Community";
import { loadTranslation } from "../../lib/i18n";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
    revalidate: 60,
  };
};

export default Community;
