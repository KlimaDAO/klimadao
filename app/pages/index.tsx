import { Web3ContextProvider } from "@klimadao/lib/components";
import { i18n } from "@lingui/core";
import { PageHead } from "components/PageHead";
import { WithIsomorphicRouter } from "components/WithIsomorphicRouter";
import { WithRedux } from "components/WithRedux";
import { Home } from "components/views/Home";
import {
  BASE_URL,
  IS_PRODUCTION,
  WALLETCONNECT_PROJECT_ID,
} from "lib/constants";
import { NextPage } from "next";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectLocale } from "state/selectors";
import { messages as default_messages } from "../locale/en/messages";

// Use english translation on the server by default
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
  return (
    <Web3ContextProvider walletConnectProjectId={WALLETCONNECT_PROJECT_ID}>
      {props.children}
    </Web3ContextProvider>
  );
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
            mediaImageSrc={`${BASE_URL}/og-media.png`}
          />
          <Home />
        </WithIsomorphicRouter>
      </LocalizedWeb3ContextProvider>
    </WithRedux>
  );
};

export default HomePage;
