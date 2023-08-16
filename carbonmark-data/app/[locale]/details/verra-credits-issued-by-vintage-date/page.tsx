"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByVintagePage() {
  return (
    <DetailPage
      pageTitle={t`Credits Issued by Vintage Start Date`}
      chartTitle={t`Credits by Vintage Start Date`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
