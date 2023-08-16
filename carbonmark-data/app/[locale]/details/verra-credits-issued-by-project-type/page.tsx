"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={t`Credits Issued by Project Type`}
      chartTitle={t`Credits by Project Type`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
