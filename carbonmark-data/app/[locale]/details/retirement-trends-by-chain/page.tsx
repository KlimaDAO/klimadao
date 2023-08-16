"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByChainDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Chain`}
      chartTitle={t`Retirements by Chain`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
