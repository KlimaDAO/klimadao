"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Pool`}
      chartTitle={t`Retirements by Pool`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
