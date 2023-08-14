import { Trans, t } from "@lingui/macro";
import { DigitalCarbonPricingChart } from "components/Charts/DigitalCarbonPricingChart";
import { VerraCreditsChart } from "components/Charts/VerraCreditsChart";
import * as chartStyles from "components/Charts/styles";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ChartData } from "lib/chartsData/getVerraCredits";
import { NextPage } from "next";
import * as styles from "./styles";

interface Props {
  verraCredits: ChartData
}

export const Home: NextPage<Props> = ({ verraCredits }) => {
  return (
    <>
      <PageHead
        title={t`Carbonmark | The Universal Carbon Marketplace`}
        mediaTitle={t`Carbonmark | The Universal Carbon Marketplace`}
        metaDescription={t`The largest selection of digital carbon credits worldwide. Buy, sell, and retire digital carbon from any project instantly with zero-commission trading.`}
      />
      <Layout>
        <h1><Trans>State of the Digital Carbon Market</Trans></h1>
        <div className={styles.global}>
          <div className={styles.mainColumn}>
            <div className={chartStyles.chartRow}>
              <VerraCreditsChart data={verraCredits}></VerraCreditsChart>
            </div>
          </div>
          <div className={styles.digitalCarbonPricingColumn}>
            <DigitalCarbonPricingChart></DigitalCarbonPricingChart>
          </div>

        </div>
      </Layout >
    </>
  );
};
