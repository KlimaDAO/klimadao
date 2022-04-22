import { Home } from "components/views/Home";
import { WithIsomorphicRouter } from "components/WithIsomorphicRouter";
import { WithRedux } from "components/WithRedux";
import { NextPage } from "next";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { messages as default_messages } from "../locale/en/messages";
import { i18n } from "@lingui/core";

export async function getStaticProps() {
  i18n.load("en", default_messages);
  i18n.activate("en");
  return {
    props: {},
  };
}
const HomePage: NextPage = () => {
  return (
    <WithRedux>
      <WithIsomorphicRouter location="/#">
        <PageHead
          production={IS_PRODUCTION}
          title="KlimaDAO | Official App"
          mediaTitle="KlimaDAO | Official App"
          metaDescription="Use the KLIMA web app to bond, stake and earn rewards."
          mediaImageSrc="/og-media.png"
        />
        <Home />
      </WithIsomorphicRouter>
    </WithRedux>
  );
};

export default HomePage;
