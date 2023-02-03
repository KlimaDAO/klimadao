import { i18n } from "@lingui/core";
import { Custom404 } from "components/views/errors/Custom404";

import { WithRedux } from "components/WithRedux";
import { WithSimpleLocalization } from "components/WithSimpleLocalization";
import { GetStaticProps, NextPage } from "next";
import { messages as default_messages } from "../locale/en/messages";

// Use english translation on the server by default
export const getStaticProps: GetStaticProps = async () => {
  i18n.load("en", default_messages);
  i18n.activate("en");
  return {
    props: {},
  };
};

const Error404: NextPage = () => {
  return (
    <WithRedux>
      <WithSimpleLocalization>
        <Custom404 />
      </WithSimpleLocalization>
    </WithRedux>
  );
};
export default Error404;
