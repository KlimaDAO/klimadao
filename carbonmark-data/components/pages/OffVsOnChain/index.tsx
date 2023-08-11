import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { NextPage } from "next";

export const OffVsOnChain: NextPage = () => {
  return (
    <>
      <PageHead
        title={t`Carbonmark Data | Your onchain and offchain Carbon Dashboard`}
        mediaTitle={t`Carbonmark Data | Your onchain and offchain Carbon Dashboard`}
        metaDescription={t`Carbonmark Data | Your onchain and offchain Carbon Dashboard`}
      />
      <Layout>
        Hello
      </Layout >
    </>
  );
};
