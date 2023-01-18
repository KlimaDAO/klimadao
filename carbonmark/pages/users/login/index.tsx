import { Login } from "components/pages/Users/Login";
import { loadTranslation } from "lib/i18n";
import { GetStaticPropsContext } from "next";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { locale } = ctx;

  try {
    const translation = await loadTranslation(locale);

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
    console.error("Failed to generate Marketplace Login Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default Login;
