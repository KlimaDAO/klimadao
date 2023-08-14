import { t } from "@lingui/macro";
import { DigitalCarbonPricingChart } from "components/Charts/DigitalCarbonPricingChart";
import { VerraCreditsChart } from "components/Charts/VerraCreditsChart";
import * as chartStyles from "components/Charts/styles";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { ChartData } from "lib/charts/getVerraCredits";
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
      <Layout title={t`State of the Digital Carbon Market`}>
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
