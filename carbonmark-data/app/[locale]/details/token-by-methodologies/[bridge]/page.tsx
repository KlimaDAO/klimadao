"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenDistributionOfMethodologiesPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Distribution of Methodologies`}
      chartTitle={t`${bridgeLabel} Distribution of Methodologies`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
