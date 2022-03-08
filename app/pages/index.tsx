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
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO | Official dApp"
        mediaTitle="KlimaDAO | Official dApp"
        metaDescription="Use the KLIMA dApp to bond, stake and earn interest."
        mediaImageSrc="/og-media.png"
      />
      <WithRedux>
        <WithIsomorphicRouter location="/#">
          <Home />
        </WithIsomorphicRouter>
      </WithRedux>
    </>
  );
};

export default HomePage;
