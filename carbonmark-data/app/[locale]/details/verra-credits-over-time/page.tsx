"use client";
import { t } from "@lingui/macro";
import VerraCreditsChart from "components/charts/VerraCredits";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Over Time`}
      chartTitle={t`Verra Credits`}
      chart={
        /* @ts-expect-error Server Component */
        <VerraCreditsChart></VerraCreditsChart>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
