import { t } from "@lingui/macro";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenVolumeOverTimePage(props: TokenDetailPageProps) {
  const bridgeLabel = capitalize(props.params.bridge);
  return (
    <TokenDetailsDetailPage
      pageTitle={t`${bridgeLabel} volume over Time`}
      card={
        <TokenVolumeOverTimeCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={t`The volume of digital carbon credits in ${bridgeLabel} digital carbon pools over a given time period.`}
      {...props}
    />
  );
}
