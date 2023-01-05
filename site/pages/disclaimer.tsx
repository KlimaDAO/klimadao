import { Disclaimer } from "components/pages/About/Disclaimer";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

type Props = Record<string, unknown>;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
  };
};

export default Disclaimer;
