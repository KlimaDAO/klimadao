import { ButtonPrimary } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { Pledge } from "components/pages/Pledge/types";
import { FC } from "react";

type ViewPledgeButtonProps = {
  pledge: Pledge | null;
};

/** Logic for hiding or showing a link to the users pledge depending on a valid pledge */
export const ViewPledgeButton: FC<ViewPledgeButtonProps> = (props) => {
  if (props.pledge) {
    return (
      <ButtonPrimary
        href={`${urls.pledges}/${props.pledge?.ownerAddress}`}
        label={t({
          id: "retirement.single.view_pledge",
          message: "View Pledge",
        })}
      />
    );
  }

  return (
    <ButtonPrimary
      disabled={true}
      label={t({
        id: "retirement.single.no_pledge",
        message: "This user has not created a pledge",
      })}
    />
  );
};
