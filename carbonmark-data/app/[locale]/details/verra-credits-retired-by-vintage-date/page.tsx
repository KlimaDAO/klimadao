"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredByVintageDatePage() {
  return (
    <DetailPage
      pageTitle={t`Credits Retired by Vintage Start Date`}
      chartTitle={t`Credits by Vintage Start Date`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
