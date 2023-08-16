"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByTokenDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Token`}
      chartTitle={t`Retirements by Token`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
