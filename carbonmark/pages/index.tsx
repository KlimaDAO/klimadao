import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import { Home } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";
import { waitForApi } from "lib/waitForApi";
import { compact } from "lodash";
import { GetStaticProps } from "next";

const defaultProjectKeys = ["VCS-1052-2012", "VCS-1764-2020", "VCS-1190-2018"];

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Wait for the preview environment API to come online
  if (process.env.NEXT_PUBLIC_USE_PREVIEW_CARBONMARK_API) await waitForApi();
  const translation = await loadTranslation(ctx.locale);
  const projects = await Promise.all(
    defaultProjectKeys.map((project) => getProjectsId(project))
  );
  return {
    props: {
      projects: compact(projects),
      translation,
      fixedThemeName: "theme-light",
    },
    revalidate: 600,
  };
};

export default Home;
