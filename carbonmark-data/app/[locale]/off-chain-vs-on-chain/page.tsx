import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";

import OffVsOnChainClientWrapper from "components/pages/offVsOnChain/OffVsOnChainClientWrapper";
import OffVsOnChainTab from "components/pages/offVsOnChain/OffVsOnChainTab";

export default function OffVsOnChainPage() {
  const issuedCreditsTab = <OffVsOnChainTab status="issued" />;
  const retiredCreditsTab = <OffVsOnChainTab status="retired" />;
  return (
    <div>
      <PageHeader title={t`Off vs On-chain carbon`} />

      <OffVsOnChainClientWrapper
        issuedCreditsTab={issuedCreditsTab}
        retiredCreditsTab={retiredCreditsTab}
      />
    </div>
  );
}
