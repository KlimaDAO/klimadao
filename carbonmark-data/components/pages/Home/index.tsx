import {
  GridContainer
} from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { PageHead } from "components/PageHead";
import { NextPage } from "next";
import * as styles from "./styles";

export const Home: NextPage = () => {
  return (
    <GridContainer className={styles.global}>
      <PageHead
        title={t`Carbonmark | The Universal Carbon Marketplace`}
        mediaTitle={t`Carbonmark | The Universal Carbon Marketplace`}
        metaDescription={t`The largest selection of digital carbon credits worldwide. Buy, sell, and retire digital carbon from any project instantly with zero-commission trading.`}
      />
      KlimaData
    </GridContainer>
  );
};
