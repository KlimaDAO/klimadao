"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Issued Over Time`}
      chartTitle={t`Cummulative Verra Registry Credits Issued  Over Time`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
