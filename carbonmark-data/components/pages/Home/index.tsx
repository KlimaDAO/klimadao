import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { NextPage } from "next";

export const Home: NextPage = () => {
  return (
    <>
      <PageHead
        title={t`Carbonmark | The Universal Carbon Marketplace`}
        mediaTitle={t`Carbonmark | The Universal Carbon Marketplace`}
        metaDescription={t`The largest selection of digital carbon credits worldwide. Buy, sell, and retire digital carbon from any project instantly with zero-commission trading.`}
      />
      <Layout activePage="Home" >
        Hello
      </Layout >
    </>
  );
};
