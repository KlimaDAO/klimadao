"use client";
import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenVolumeOverTimePage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Volume Over Time<`}
      chartTitle={t`${bridgeLabel} Volume Over Time<`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
