import { Web3ContextProvider } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { i18n } from "@lingui/core";
import { PageHead } from "components/PageHead";
import { Home } from "components/views/Home";
import { WithIsomorphicRouter } from "components/WithIsomorphicRouter";
import { WithRedux } from "components/WithRedux";
import { IS_PRODUCTION } from "lib/constants";
import { getWeb3ModalStrings } from "lib/getWeb3ModalStrings";
import { NextPage } from "next";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectLocale } from "state/selectors";
import { messages as default_messages } from "../locale/en/messages";

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
    <Web3ContextProvider strings={getWeb3ModalStrings()}>
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
            mediaImageSrc={urls.mediaImage}
          />
          <Home />
        </WithIsomorphicRouter>
      </LocalizedWeb3ContextProvider>
    </WithRedux>
  );
};

export default HomePage;
