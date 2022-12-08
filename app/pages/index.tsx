import { Home } from "components/views/Home";
import { WithIsomorphicRouter } from "components/WithIsomorphicRouter";
import { WithRedux } from "components/WithRedux";
import { NextPage } from "next";
import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { urls } from "@klimadao/lib/constants";
import { messages as default_messages } from "../locale/en/messages";
import { i18n } from "@lingui/core";
import { Web3ContextProvider } from "@klimadao/lib/components";
import { useSelector } from "react-redux";
import { selectLocale } from "state/selectors";
import { ReactNode } from "react";

export async function getStaticProps() {
  i18n.load("en", default_messages);
  i18n.activate("en");
  return {
    props: {},
  };
}

/** Wrap in component so we can render as child of WithRedux and invoke useSelector */
const LocalizedWeb3ContextProvider = (props: { children: ReactNode }) => {
  useSelector(selectLocale); // trigger re-render
  return <Web3ContextProvider>{props.children}</Web3ContextProvider>;
};

const HomePage: NextPage = () => {
  return (
    <WithRedux>
      <LocalizedWeb3ContextProvider>
        <WithIsomorphicRouter location="/#">
          <PageHead
            production={IS_PRODUCTION}
            title="KlimaDAO | Official App"
            mediaTitle="KlimaDAO | Official App"
            metaDescription="Use the KLIMA web app to bond, stake and earn rewards."
            mediaImageSrc={urls.mediaImage}
          />
          <Home />
        </WithIsomorphicRouter>
      </LocalizedWeb3ContextProvider>
    </WithRedux>
  );
};

export default HomePage;
