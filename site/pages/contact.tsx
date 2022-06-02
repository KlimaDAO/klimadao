import { GetStaticProps } from "next";
import { Contact } from "components/pages/Resources/Contact";
import { loadTranslation } from "lib/i18n";

type Props = Record<string, unknown>;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: {
      translation,
    },
  };
};

export default Contact;
