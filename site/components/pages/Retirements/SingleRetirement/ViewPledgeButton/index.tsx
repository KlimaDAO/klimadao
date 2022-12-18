import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Pledge } from "components/pages/Pledge/types";
import { FC } from "react";

type ViewPledgeButtonProps = {
  pledge: Pledge | null;
};

/** Logic for hiding or showing a link to the users pledge depending on a valid pledge */
export const ViewPledgeButton: FC<ViewPledgeButtonProps> = (props) => {
  const hasPledge = props.pledge !== null;
  /** @todo we need a better way of accessing the pledge url. This will break on any url change */
  const pledgeUrl = hasPledge
    ? `https://www.klimadao.finance/pledge/${props.pledge?.ownerAddress}`
    : undefined;
  const label = hasPledge
    ? t({
        id: "retirement.single.view_pledge",
        message: "View Pledge",
      })
    : t({
        id: "retirement.single.no_pledge",
        message: "This user has not created a pledge",
      });

  return (
    <ButtonPrimary
      href={pledgeUrl}
      disabled={!hasPledge}
      target="_blank"
      rel="noopener noreferrer"
      label={label}
    />
  );
};
