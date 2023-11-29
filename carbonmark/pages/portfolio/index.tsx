import { Portfolio } from "components/pages/Portfolio";
import { withConditionalErrorBoundary } from "hocs/ConditionalErrorBoundary";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { isNotFoundError } from "next/dist/client/components/not-found";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
        fixedThemeName: "theme-light",
      },
    };
  } catch (e) {
    console.error("Failed to generate Portfolio Page", e);
    return {
      notFound: true,
    };
  }
};

/** We want to allow the page to render on user not found (404s) */
export default withConditionalErrorBoundary(Portfolio, {
  fallback: <h1>User cannot be found</h1>,
  predicate: isNotFoundError,
});
