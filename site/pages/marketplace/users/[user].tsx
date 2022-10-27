import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Users } from "components/pages/Marketplace/Users";
import { loadTranslation } from "lib/i18n";

interface Params extends ParsedUrlQuery {
  user: string;
}

interface PageProps {
  user: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.user) {
    throw new Error("No matching params found");
  }

  try {
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        user: params.user,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Users Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Users;
